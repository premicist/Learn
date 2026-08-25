"""Generate deterministic visual assets from note frontmatter visualBlocks.

The pilot intentionally uses only Python's standard library plus PyYAML for
frontmatter parsing. It accepts the editor-friendly Decap CMS object shape and
normalizes it before validating formulas, tables, and graph points. Validated
responsive SVG assets are written into public/generated/visuals.
"""
from __future__ import annotations

import html
import math
import re
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
NOTES_DIR = ROOT / "content" / "notes"
OUTPUT_DIR = ROOT / "public" / "generated" / "visuals"


def frontmatter(raw: str) -> dict:
    match = re.match(r"^---\n(.*?)\n---(?:\n|$)", raw, flags=re.DOTALL)
    if not match:
        return {}
    value = yaml.safe_load(match.group(1)) or {}
    return value if isinstance(value, dict) else {}


def fail(note: Path, message: str) -> None:
    raise SystemExit(f"{note.name}: {message}")


def number(value, note: Path, label: str) -> float:
    try:
        parsed = float(value)
    except (TypeError, ValueError):
        fail(note, f"{label} must be numeric")
    if not math.isfinite(parsed):
        fail(note, f"{label} must be finite")
    return parsed


def normalize_rows(rows, note: Path, label: str) -> list[list[object]]:
    if not isinstance(rows, list):
        fail(note, f"{label} must be a non-empty list")
    normalized: list[list[object]] = []
    for row_index, row in enumerate(rows, start=1):
        if isinstance(row, list):
            normalized.append(row)
        elif isinstance(row, dict) and isinstance(row.get("cells"), list):
            normalized.append(row["cells"])
        else:
            fail(note, f"{label}[{row_index}] must be a cell list or an object with cells")
    if not normalized:
        fail(note, f"{label} must be a non-empty list")
    return normalized


def normalize_points(points, note: Path, label: str) -> list[list[object]]:
    if not isinstance(points, list) or len(points) < 2:
        fail(note, f"{label} must contain at least two points")
    normalized: list[list[object]] = []
    for point_index, point in enumerate(points, start=1):
        if isinstance(point, list) and len(point) == 2:
            normalized.append(point)
        elif isinstance(point, dict) and "x" in point and "y" in point:
            normalized.append([point["x"], point["y"]])
        else:
            fail(note, f"{label}[{point_index}] must contain x and y")
    return normalized


def normalize_blocks(note: Path, blocks) -> list[dict]:
    if not isinstance(blocks, list):
        fail(note, "visualBlocks must be a list")
    normalized: list[dict] = []
    for index, block in enumerate(blocks, start=1):
        if not isinstance(block, dict):
            fail(note, f"visualBlocks[{index}] must be an object")
        block_copy = dict(block)
        if block_copy.get("type") == "table" and "rows" in block_copy:
            block_copy["rows"] = normalize_rows(block_copy["rows"], note, f"visualBlocks[{index}].rows")
        if block_copy.get("type") == "graph" and "points" in block_copy:
            block_copy["points"] = normalize_points(block_copy["points"], note, f"visualBlocks[{index}].points")
        normalized.append(block_copy)
    return normalized


def validate_blocks(note: Path, blocks: list[dict]) -> dict | None:
    blocks = normalize_blocks(note, blocks)
    table_rows: list[list[object]] | None = None
    graph_block: dict | None = None
    for index, block in enumerate(blocks, start=1):
        block_type = block.get("type")
        if block_type not in {"formula", "table", "graph"}:
            fail(note, f"visualBlocks[{index}].type must be formula, table, or graph")
        if not isinstance(block.get("title"), str) or not block["title"].strip():
            fail(note, f"visualBlocks[{index}].title is required")

        if block_type == "formula":
            if not isinstance(block.get("expression"), str) or not block["expression"].strip():
                fail(note, f"visualBlocks[{index}].expression is required")
            if block.get("explanation") is not None and not isinstance(block["explanation"], str):
                fail(note, f"visualBlocks[{index}].explanation must be text")

        if block_type == "table":
            columns = block.get("columns")
            rows = block.get("rows")
            if not isinstance(columns, list) or not columns or not all(isinstance(column, str) for column in columns):
                fail(note, f"visualBlocks[{index}].columns must be a non-empty list of strings")
            if not isinstance(rows, list) or not rows:
                fail(note, f"visualBlocks[{index}].rows must be a non-empty list")
            for row_index, row in enumerate(rows, start=1):
                if not isinstance(row, list) or len(row) != len(columns):
                    fail(note, f"visualBlocks[{index}].rows[{row_index}] must match the column count")
            table_rows = rows

        if block_type == "graph":
            asset = block.get("asset")
            points = block.get("points")
            if not isinstance(asset, str) or not asset.startswith("/generated/visuals/") or not asset.endswith(".svg"):
                fail(note, f"visualBlocks[{index}].asset must be a generated SVG path")
            if not isinstance(points, list) or len(points) < 2:
                fail(note, f"visualBlocks[{index}].points must contain at least two points")
            for point_index, point in enumerate(points, start=1):
                if not isinstance(point, list) or len(point) != 2:
                    fail(note, f"visualBlocks[{index}].points[{point_index}] must contain x and y")
                number(point[0], note, f"visualBlocks[{index}].points[{point_index}].x")
                number(point[1], note, f"visualBlocks[{index}].points[{point_index}].y")
            if not isinstance(block.get("xLabel"), str) or not isinstance(block.get("yLabel"), str):
                fail(note, f"visualBlocks[{index}] requires xLabel and yLabel")
            graph_block = block

    if table_rows is not None and graph_block is not None:
        table_points = [(number(row[1], note, "table worker count"), number(row[2], note, "table average wage")) for row in table_rows]
        graph_points = [(number(point[0], note, "graph x"), number(point[1], note, "graph y")) for point in graph_block["points"]]
        if table_points != graph_points:
            fail(note, "table and graph points do not match")
        for row, (workers, wage) in zip(table_rows, table_points):
            fund = number(str(row[0]).replace("Rs. ", "").replace(",", ""), note, "wage fund")
            expected = round(fund / workers, 2)
            if round(wage, 2) != expected:
                fail(note, f"average wage check failed for {workers} workers: expected {expected}, got {wage}")

    return graph_block


def fmt(value: float) -> str:
    if abs(value - round(value)) < 1e-9:
        return f"{int(round(value)):,}"
    return f"{value:,.2f}"


def write_svg(note: Path, block: dict) -> None:
    points = [(number(point[0], note, "graph x"), number(point[1], note, "graph y")) for point in block["points"]]
    width, height = 760, 390
    left, right, top, bottom = 86, 26, 44, 76
    chart_width, chart_height = width - left - right, height - top - bottom
    min_y = 0.0
    max_y = max(1.0, max(point[1] for point in points) * 1.12)

    def x(index: int) -> float:
        return left + index * chart_width / max(1, len(points) - 1)

    def y(value: float) -> float:
        return top + (max_y - value) * chart_height / (max_y - min_y)

    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" role="img" aria-labelledby="title desc">',
        f'<title id="title">{html.escape(block["title"])}</title>',
        f'<desc id="desc">{html.escape(block["yLabel"])} plotted against {html.escape(block["xLabel"])}.</desc>',
        '<rect width="100%" height="100%" fill="#ffffff"/>',
        '<style>text{font-family:Inter,Arial,sans-serif;fill:#334155} .axis{stroke:#64748b;stroke-width:1.5} .line{fill:none;stroke:#146b63;stroke-width:4;stroke-linecap:round;stroke-linejoin:round} .dot{fill:#b4872a;stroke:#ffffff;stroke-width:3}</style>',
    ]
    for fraction in (0, 0.5, 1):
        value = max_y - fraction * (max_y - min_y)
        y_pos = y(value)
        parts.append(f'<text x="{left-12}" y="{y_pos+5:.1f}" text-anchor="end" font-size="13">{html.escape(fmt(value))}</text>')
    parts.append(f'<line class="axis" x1="{left}" y1="{top}" x2="{left}" y2="{height-bottom}"/>')
    parts.append(f'<line class="axis" x1="{left}" y1="{height-bottom}" x2="{width-right}" y2="{height-bottom}"/>')
    points_string = " ".join(f"{x(index):.1f},{y(value):.1f}" for index, (_, value) in enumerate(points))
    parts.append(f'<polyline class="line" points="{points_string}"/>')
    for index, (workers, wage) in enumerate(points):
        x_pos, y_pos = x(index), y(wage)
        parts.append(f'<circle class="dot" cx="{x_pos:.1f}" cy="{y_pos:.1f}" r="7"/>')
        parts.append(f'<text x="{x_pos:.1f}" y="{height-bottom+26}" text-anchor="middle" font-size="12">{html.escape(fmt(workers))}</text>')
    parts.append(f'<text x="{(left + width-right)/2:.1f}" y="{height-16}" text-anchor="middle" font-size="14" font-weight="600">{html.escape(block["xLabel"])}</text>')
    parts.append(f'<text x="18" y="{(top + height-bottom)/2:.1f}" text-anchor="middle" font-size="14" font-weight="600" transform="rotate(-90 18 {(top + height-bottom)/2:.1f})">{html.escape(block["yLabel"])}</text>')
    parts.append("</svg>")

    asset_path = ROOT / "public" / block["asset"].lstrip("/")
    asset_path.parent.mkdir(parents=True, exist_ok=True)
    asset_path.write_text("\n".join(parts) + "\n", encoding="utf-8")


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    generated = 0
    for note in sorted(NOTES_DIR.glob("*.md")):
        data = frontmatter(note.read_text(encoding="utf-8"))
        blocks = data.get("visualBlocks") or []
        if not blocks:
            continue
        graph_block = validate_blocks(note, blocks)
        if graph_block:
            write_svg(note, graph_block)
            generated += 1
    print(f"Generated {generated} Python-validated visual asset(s).")


if __name__ == "__main__":
    main()
