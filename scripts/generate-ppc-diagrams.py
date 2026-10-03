"""Generate detailed, accessible SVG diagrams for PPC Points, PPC Schedule, and PPC Shifts.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "public" / "images" / "uploads"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


def generate_ppc_from_schedule_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 540" width="100%" height="auto" role="img" aria-label="PPC curve derived from production schedule table">
  <defs>
    <marker id="arrow-sched" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#146b63"/>
    </marker>
    <filter id="sched-shadow" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="3" stdDeviation="4" flood-opacity="0.10"/>
    </filter>
  </defs>

  <style>
    .bg { fill: var(--paper-card, #ffffff); }
    .axis { stroke: var(--ink, #122a3a); stroke-width: 2.5; stroke-linecap: round; }
    .grid { stroke: var(--line, #dde5e2); stroke-width: 1; stroke-dasharray: 4 4; }
    .curve { fill: none; stroke: #146b63; stroke-width: 4; stroke-linecap: round; }
    .proj-line { stroke: #94a3b8; stroke-width: 1.5; stroke-dasharray: 4 4; }
    .title-text { font-family: 'Manrope', system-ui, sans-serif; font-size: 16px; font-weight: 800; fill: var(--ink, #122a3a); }
    .axis-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 14px; font-weight: 700; fill: var(--ink, #122a3a); }
    .tick-label { font-family: 'IBM Plex Mono', monospace; font-size: 12px; font-weight: 600; fill: var(--ink-soft, #47607a); }
    .point-tag { font-family: 'Manrope', system-ui, sans-serif; font-size: 13px; font-weight: 800; fill: #146b63; }
    .card-box { fill: var(--paper, #f8fafc); stroke: var(--line, #cbd5e1); stroke-width: 1.5; rx: 8; }
    .card-title { font-family: 'Manrope', system-ui, sans-serif; font-size: 13px; font-weight: 800; fill: #146b63; }
    .card-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11.5px; font-weight: 600; fill: var(--ink-soft, #47607a); }
    .point-dot { stroke-width: 3; stroke: #ffffff; fill: #146b63; }
  </style>

  <!-- Background Card -->
  <rect class="bg" width="100%" height="100%" rx="14"/>

  <!-- Graph Axes -->
  <!-- Y-Axis (Food in tonnes) -->
  <line class="axis" x1="110" y1="450" x2="110" y2="45" marker-end="url(#arrow-sched)"/>
  <!-- X-Axis (Clothing in '000 units) -->
  <line class="axis" x1="110" y1="450" x2="750" y2="450" marker-end="url(#arrow-sched)"/>

  <!-- Axis Titles -->
  <text class="axis-label" x="25" y="38" text-anchor="start">Food Production (Tonnes)</text>
  <text class="axis-label" x="750" y="480" text-anchor="end">Clothing Production ('000 Units)</text>
  <text class="tick-label" x="92" y="468">0</text>

  <!-- X-Axis Ticks &amp; Values -->
  <line class="axis" x1="218" y1="450" x2="218" y2="456"/>
  <text class="tick-label" x="218" y="474" text-anchor="middle">10</text>

  <line class="axis" x1="326" y1="450" x2="326" y2="456"/>
  <text class="tick-label" x="326" y="474" text-anchor="middle">20</text>

  <line class="axis" x1="434" y1="450" x2="434" y2="456"/>
  <text class="tick-label" x="434" y="474" text-anchor="middle">30</text>

  <line class="axis" x1="542" y1="450" x2="542" y2="456"/>
  <text class="tick-label" x="542" y="474" text-anchor="middle">40</text>

  <line class="axis" x1="650" y1="450" x2="650" y2="456"/>
  <text class="tick-label" x="650" y="474" text-anchor="middle">50</text>

  <!-- Y-Axis Ticks &amp; Values -->
  <line class="axis" x1="104" y1="342" x2="110" y2="342"/>
  <text class="tick-label" x="98" y="346" text-anchor="end">60</text>

  <line class="axis" x1="104" y1="252" x2="110" y2="252"/>
  <text class="tick-label" x="98" y="256" text-anchor="end">110</text>

  <line class="axis" x1="104" y1="180" x2="110" y2="180"/>
  <text class="tick-label" x="98" y="184" text-anchor="end">150</text>

  <line class="axis" x1="104" y1="126" x2="110" y2="126"/>
  <text class="tick-label" x="98" y="130" text-anchor="end">180</text>

  <line class="axis" x1="104" y1="90" x2="110" y2="90"/>
  <text class="tick-label" x="98" y="94" text-anchor="end">200</text>

  <!-- Projection Grid Lines for Points B, C, D, E -->
  <!-- Point B (10, 180) -> (218, 126) -->
  <line class="proj-line" x1="110" y1="126" x2="218" y2="126"/>
  <line class="proj-line" x1="218" y1="450" x2="218" y2="126"/>

  <!-- Point C (20, 150) -> (326, 180) -->
  <line class="proj-line" x1="110" y1="180" x2="326" y2="180"/>
  <line class="proj-line" x1="326" y1="450" x2="326" y2="180"/>

  <!-- Point D (30, 110) -> (434, 252) -->
  <line class="proj-line" x1="110" y1="252" x2="434" y2="252"/>
  <line class="proj-line" x1="434" y1="450" x2="434" y2="252"/>

  <!-- Point E (40, 60) -> (542, 342) -->
  <line class="proj-line" x1="110" y1="342" x2="542" y2="342"/>
  <line class="proj-line" x1="542" y1="450" x2="542" y2="342"/>

  <!-- PPC Smooth Curve through Points A(110,90) -> B(218,126) -> C(326,180) -> D(434,252) -> E(542,342) -> F(650,450) -->
  <path class="curve" d="M 110 90 C 240 100, 480 200, 650 450"/>

  <!-- Points and Badges -->
  <!-- Point A -->
  <circle class="point-dot" cx="110" cy="90" r="6"/>
  <text class="point-tag" x="122" y="86">A (0, 200)</text>

  <!-- Point B -->
  <circle class="point-dot" cx="218" cy="126" r="6"/>
  <text class="point-tag" x="230" y="122">B (10, 180)</text>

  <!-- Point C -->
  <circle class="point-dot" cx="326" cy="180" r="6"/>
  <text class="point-tag" x="338" y="176">C (20, 150)</text>

  <!-- Point D -->
  <circle class="point-dot" cx="434" cy="252" r="6"/>
  <text class="point-tag" x="446" y="248">D (30, 110)</text>

  <!-- Point E -->
  <circle class="point-dot" cx="542" cy="342" r="6"/>
  <text class="point-tag" x="554" y="338">E (40, 60)</text>

  <!-- Point F -->
  <circle class="point-dot" cx="650" cy="450" r="6"/>
  <text class="point-tag" x="656" y="440">F (50, 0)</text>

  <!-- Callout Legend Box -->
  <g filter="url(#sched-shadow)">
    <rect class="card-box" x="460" y="60" width="330" height="80"/>
    <circle cx="478" cy="82" r="5" fill="#146b63"/>
    <text class="card-title" x="492" y="86">Concave to Origin (Bowed-Out)</text>
    <text class="card-sub" x="492" y="106">Steeper slope = Increasing Opportunity Cost</text>
    <text class="card-sub" x="492" y="124">MRT increases as more clothing is produced</text>
  </g>
</svg>"""


def generate_ppc_points_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="auto" role="img" aria-label="Production Possibility Curve showing points P1, G, and H">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#146b63"/>
    </marker>
    <marker id="arrow-gray" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#64748b"/>
    </marker>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="3" stdDeviation="4" flood-opacity="0.12"/>
    </filter>
  </defs>

  <style>
    .bg { fill: var(--paper-card, #ffffff); }
    .axis { stroke: var(--ink, #122a3a); stroke-width: 2.5; stroke-linecap: round; }
    .grid { stroke: var(--line, #dde5e2); stroke-width: 1; stroke-dasharray: 4 4; }
    .curve { fill: none; stroke: #146b63; stroke-width: 4; stroke-linecap: round; }
    .point-line { stroke: #94a3b8; stroke-width: 1.5; stroke-dasharray: 4 4; }
    .callout-box { fill: var(--paper, #f8fafc); stroke: var(--line, #cbd5e1); stroke-width: 1.5; rx: 8; }
    .title-text { font-family: 'Manrope', system-ui, sans-serif; font-size: 17px; font-weight: 800; fill: var(--ink, #122a3a); }
    .axis-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 14px; font-weight: 700; fill: var(--ink, #122a3a); }
    .badge-title { font-family: 'Manrope', system-ui, sans-serif; font-size: 13px; font-weight: 800; }
    .badge-desc { font-family: 'Manrope', system-ui, sans-serif; font-size: 11.5px; font-weight: 600; fill: var(--ink-soft, #47607a); }
    .point-dot { stroke-width: 3; stroke: #ffffff; }
  </style>

  <!-- Background Card -->
  <rect class="bg" width="100%" height="100%" rx="14"/>

  <!-- Graph Axes -->
  <!-- Y-Axis (Capital Goods) -->
  <line class="axis" x1="100" y1="420" x2="100" y2="50" marker-end="url(#arrow)"/>
  <!-- X-Axis (Consumer Goods) -->
  <line class="axis" x1="100" y1="420" x2="720" y2="420" marker-end="url(#arrow)"/>

  <!-- Axis Labels -->
  <text class="axis-label" x="25" y="42" text-anchor="start">Capital Goods (Y)</text>
  <text class="axis-label" x="720" y="445" text-anchor="end">Consumer Goods (X)</text>
  <text class="axis-label" x="85" y="438">O</text>

  <!-- Production Possibility Curve (Quarter ellipse/concave arc) -->
  <!-- Intercepts: (100, 90) on Y-axis down to (620, 420) on X-axis -->
  <path class="curve" d="M 100 90 Q 320 110 500 240 T 620 420"/>

  <!-- Intercept Points -->
  <circle cx="100" cy="90" r="5" fill="#146b63"/>
  <text x="75" y="95" class="axis-label">A</text>
  <circle cx="620" cy="420" r="5" fill="#146b63"/>
  <text x="620" y="445" class="axis-label">B</text>

  <!-- Point 1: P1 (ON the Curve) -->
  <!-- Coordinate approx: (380, 160) -->
  <line class="point-line" x1="380" y1="420" x2="380" y2="160"/>
  <line class="point-line" x1="100" y1="160" x2="380" y2="160"/>
  <circle class="point-dot" cx="380" cy="160" r="8" fill="#146b63"/>

  <!-- Point 2: G (INSIDE the Curve - Inefficient) -->
  <!-- Coordinate approx: (250, 290) -->
  <line class="point-line" x1="250" y1="420" x2="250" y2="290"/>
  <line class="point-line" x1="100" y1="290" x2="250" y2="290"/>
  <circle class="point-dot" cx="250" cy="290" r="8" fill="#dc2626"/>

  <!-- Point 3: H (OUTSIDE the Curve - Unattainable) -->
  <!-- Coordinate approx: (530, 130) -->
  <line class="point-line" x1="530" y1="420" x2="530" y2="130"/>
  <line class="point-line" x1="100" y1="130" x2="530" y2="130"/>
  <circle class="point-dot" cx="530" cy="130" r="8" fill="#7c3aed"/>

  <!-- Point Labels and Callout Cards -->
  <!-- Callout for P1 -->
  <g filter="url(#shadow)">
    <rect class="callout-box" x="250" y="30" width="310" height="52"/>
    <circle cx="268" cy="56" r="6" fill="#146b63"/>
    <text x="282" y="49" class="badge-title" fill="#146b63">P₁ : Point ON the Curve</text>
    <text x="282" y="68" class="badge-desc">Full Efficiency &amp; Maximum Output</text>
  </g>
  <!-- Connector line to P1 -->
  <line x1="380" y1="84" x2="380" y2="148" stroke="#146b63" stroke-width="1.8" stroke-dasharray="3 3" marker-end="url(#arrow)"/>

  <!-- Callout for G (Inside) -->
  <g filter="url(#shadow)">
    <rect class="callout-box" x="140" y="325" width="280" height="52"/>
    <circle cx="158" cy="351" r="6" fill="#dc2626"/>
    <text x="172" y="344" class="badge-title" fill="#dc2626">G : Point INSIDE the Curve</text>
    <text x="172" y="363" class="badge-desc">Inefficiency &amp; Unemployed Resources</text>
  </g>
  <!-- Connector line to G -->
  <line x1="250" y1="323" x2="250" y2="302" stroke="#dc2626" stroke-width="1.8" marker-end="url(#arrow)"/>

  <!-- Callout for H (Outside) -->
  <g filter="url(#shadow)">
    <rect class="callout-box" x="480" y="45" width="300" height="52"/>
    <circle cx="498" cy="71" r="6" fill="#7c3aed"/>
    <text x="512" y="64" class="badge-title" fill="#7c3aed">H : Point OUTSIDE the Curve</text>
    <text x="512" y="83" class="badge-desc">Unattainable with Current Resources</text>
  </g>
  <!-- Connector line to H -->
  <line x1="570" y1="99" x2="540" y2="122" stroke="#7c3aed" stroke-width="1.8" marker-end="url(#arrow)"/>

  <!-- Curve Label -->
  <text x="540" y="330" class="title-text" fill="#146b63" font-size="15">PPC Frontier</text>
</svg>"""


def generate_ppc_shifts_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="auto" role="img" aria-label="Shifts in the Production Possibility Curve showing Outward and Inward shifts">
  <defs>
    <marker id="arrow-axis" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#122a3a"/>
    </marker>
    <marker id="shift-right" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#16a34a"/>
    </marker>
    <marker id="shift-left" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#dc2626"/>
    </marker>
    <filter id="card-shadow" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="3" stdDeviation="4" flood-opacity="0.12"/>
    </filter>
  </defs>

  <style>
    .bg { fill: var(--paper-card, #ffffff); }
    .axis { stroke: var(--ink, #122a3a); stroke-width: 2.5; stroke-linecap: round; }
    .curve-base { fill: none; stroke: #146b63; stroke-width: 3.5; stroke-linecap: round; }
    .curve-outward { fill: none; stroke: #16a34a; stroke-width: 3.5; stroke-linecap: round; }
    .curve-inward { fill: none; stroke: #dc2626; stroke-width: 3.5; stroke-dasharray: 6 5; stroke-linecap: round; }
    .shift-arrow-right { stroke: #16a34a; stroke-width: 2.2; }
    .shift-arrow-left { stroke: #dc2626; stroke-width: 2.2; }
    .title-text { font-family: 'Manrope', system-ui, sans-serif; font-size: 16px; font-weight: 800; }
    .axis-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 14px; font-weight: 700; fill: var(--ink, #122a3a); }
    .legend-box { fill: var(--paper, #f8fafc); stroke: var(--line, #cbd5e1); stroke-width: 1.5; rx: 8; }
    .legend-title { font-family: 'Manrope', system-ui, sans-serif; font-size: 12.5px; font-weight: 800; }
    .legend-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11px; font-weight: 600; fill: var(--ink-soft, #47607a); }
  </style>

  <!-- Background Card -->
  <rect class="bg" width="100%" height="100%" rx="14"/>

  <!-- Graph Axes -->
  <line class="axis" x1="100" y1="420" x2="100" y2="50" marker-end="url(#arrow-axis)"/>
  <line class="axis" x1="100" y1="420" x2="720" y2="420" marker-end="url(#arrow-axis)"/>

  <!-- Axis Labels -->
  <text class="axis-label" x="25" y="42" text-anchor="start">Capital Goods (Y)</text>
  <text class="axis-label" x="720" y="445" text-anchor="end">Consumer Goods (X)</text>
  <text class="axis-label" x="85" y="438">O</text>

  <!-- 1. Leftward / Inward Shift (PPC3 - Economic Contraction) -->
  <path class="curve-inward" d="M 100 160 Q 250 180 370 280 T 470 420"/>
  <text x="475" y="415" class="title-text" fill="#dc2626">PPC₃</text>

  <!-- 2. Baseline Curve (PPC1 - Initial Equilibrium) -->
  <path class="curve-base" d="M 100 100 Q 320 120 480 240 T 590 420"/>
  <text x="595" y="415" class="title-text" fill="#146b63">PPC₁</text>

  <!-- 3. Rightward / Outward Shift (PPC2 - Economic Growth) -->
  <path class="curve-outward" d="M 100 50 Q 380 70 570 210 T 700 420"/>
  <text x="705" y="415" class="title-text" fill="#16a34a">PPC₂</text>

  <!-- Directional Shift Arrows -->
  <!-- Outward shift arrows -->
  <line class="shift-arrow-right" x1="330" y1="175" x2="385" y2="135" marker-end="url(#shift-right)"/>
  <line class="shift-arrow-right" x1="450" y1="280" x2="510" y2="245" marker-end="url(#shift-right)"/>

  <!-- Inward shift arrows -->
  <line class="shift-arrow-left" x1="310" y1="190" x2="255" y2="225" marker-end="url(#shift-left)"/>
  <line class="shift-arrow-left" x1="430" y1="300" x2="370" y2="335" marker-end="url(#shift-left)"/>

  <!-- Legend Cards -->
  <!-- PPC2: Outward Shift Card -->
  <g filter="url(#card-shadow)">
    <rect class="legend-box" x="430" y="30" width="340" height="52"/>
    <circle cx="448" cy="56" r="6" fill="#16a34a"/>
    <text x="462" y="49" class="legend-title" fill="#16a34a">PPC₂ : Rightward / Outward Shift</text>
    <text x="462" y="68" class="legend-sub">Economic Growth, Tech Advances &amp; More Resources</text>
  </g>

  <!-- PPC1: Baseline Card -->
  <g filter="url(#card-shadow)">
    <rect class="legend-box" x="430" y="90" width="340" height="46"/>
    <circle cx="448" cy="113" r="6" fill="#146b63"/>
    <text x="462" y="109" class="legend-title" fill="#146b63">PPC₁ : Initial Frontier (Base Level)</text>
    <text x="462" y="125" class="legend-sub">Existing Resources &amp; Current Technology</text>
  </g>

  <!-- PPC3: Inward Shift Card -->
  <g filter="url(#card-shadow)">
    <rect class="legend-box" x="430" y="144" width="340" height="52"/>
    <circle cx="448" cy="170" r="6" fill="#dc2626"/>
    <text x="462" y="163" class="legend-title" fill="#dc2626">PPC₃ : Leftward / Inward Shift</text>
    <text x="462" y="182" class="legend-sub">Resource Depletion, Natural Disasters &amp; War</text>
  </g>
</svg>"""


def main():
    (OUTPUT_DIR / "ppc-from-schedule.svg").write_text(generate_ppc_from_schedule_svg(), encoding="utf-8")
    (OUTPUT_DIR / "ppc-efficiency-points.svg").write_text(generate_ppc_points_svg(), encoding="utf-8")
    print("Generated ppc-from-schedule.svg and ppc-efficiency-points.svg successfully in public/images/uploads/")


if __name__ == "__main__":
    main()
