"""Generate publication-ready clean SVG diagrams for Demand, Supply, and Market Equilibrium.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "public" / "images" / "uploads"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


def generate_demand_curve_schedule_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 440" width="100%" height="auto" role="img" aria-label="Downward Sloping Demand Curve Derived from Schedule">
  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .axis { stroke: #111111; stroke-width: 2; stroke-linecap: round; }
    .demand-line { fill: none; stroke: #146b63; stroke-width: 3.5; stroke-linecap: round; }
    .guide-line { stroke: #8098ab; stroke-width: 1.2; stroke-dasharray: 4 4; }
    .point-dot { fill: #146b63; stroke: #ffffff; stroke-width: 2; }
    .text-title { font-family: 'Fraunces', Georgia, serif; font-size: 16px; font-weight: 700; fill: #122a3a; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 12.5px; font-weight: 700; fill: #122a3a; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11px; font-weight: 600; fill: #47607a; }
    .point-label { font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 700; fill: #0e4a45; }
  </style>

  <rect class="bg" width="100%" height="100%" rx="10"/>
  <text class="text-title" x="40" y="34">माग वक्ररेखा (Demand Curve derived from Schedule)</text>
  <text class="text-sub" x="40" y="52">Inverse Relationship: Higher Price (P) ⇒ Lower Quantity Demanded (Qd)</text>

  <!-- Axes -->
  <line class="axis" x1="90" y1="370" x2="90" y2="70"/>
  <line class="axis" x1="90" y1="370" x2="610" y2="370"/>
  <text class="text-label" x="30" y="78">मूल्य (रु.)</text>
  <text class="text-label" x="510" y="398">माग परिमाण (एकाइ)</text>
  <text class="text-label" x="72" y="388">O</text>

  <!-- Demand Line DD -->
  <line class="demand-line" x1="120" y1="100" x2="550" y2="340"/>
  <text class="text-title" x="560" y="346" fill="#146b63">DD</text>

  <!-- Points from Schedule: P=50->Q=10, P=40->Q=20, P=30->Q=30, P=20->Q=40, P=10->Q=50 -->
  <!-- Scale: Y axis: 370 is 0, 316 is 10, 262 is 20, 208 is 30, 154 is 40, 100 is 50 -->
  <!-- Scale: X axis: 90 is 0, 176 is 10, 262 is 20, 348 is 30, 434 is 40, 520 is 50 -->

  <!-- (10, 50): X=176, Y=100 -->
  <line class="guide-line" x1="90" y1="100" x2="176" y2="100"/>
  <line class="guide-line" x1="176" y1="100" x2="176" y2="370"/>
  <circle class="point-dot" cx="176" cy="100" r="5"/>
  <text class="text-label" x="65" y="105">५०</text>
  <text class="text-label" x="170" y="388">१०</text>
  <text class="point-label" x="186" y="98">A (10, 50)</text>

  <!-- (20, 40): X=262, Y=154 -->
  <line class="guide-line" x1="90" y1="154" x2="262" y2="154"/>
  <line class="guide-line" x1="262" y1="154" x2="262" y2="370"/>
  <circle class="point-dot" cx="262" cy="154" r="5"/>
  <text class="text-label" x="65" y="159">४०</text>
  <text class="text-label" x="256" y="388">२०</text>
  <text class="point-label" x="272" y="152">B (20, 40)</text>

  <!-- (30, 30): X=348, Y=208 -->
  <line class="guide-line" x1="90" y1="208" x2="348" y2="208"/>
  <line class="guide-line" x1="348" y1="208" x2="348" y2="370"/>
  <circle class="point-dot" cx="348" cy="208" r="5"/>
  <text class="text-label" x="65" y="213">३०</text>
  <text class="text-label" x="342" y="388">३०</text>
  <text class="point-label" x="358" y="206">C (30, 30)</text>

  <!-- (40, 20): X=434, Y=262 -->
  <line class="guide-line" x1="90" y1="262" x2="434" y2="262"/>
  <line class="guide-line" x1="434" y1="262" x2="434" y2="370"/>
  <circle class="point-dot" cx="434" cy="262" r="5"/>
  <text class="text-label" x="65" y="267">२०</text>
  <text class="text-label" x="428" y="388">४०</text>
  <text class="point-label" x="444" y="260">D (40, 20)</text>

  <!-- (50, 10): X=520, Y=316 -->
  <line class="guide-line" x1="90" y1="316" x2="520" y2="316"/>
  <line class="guide-line" x1="520" y1="316" x2="520" y2="370"/>
  <circle class="point-dot" cx="520" cy="316" r="5"/>
  <text class="text-label" x="65" y="321">१०</text>
  <text class="text-label" x="514" y="388">५०</text>
  <text class="point-label" x="530" y="314">E (50, 10)</text>
</svg>"""


def generate_demand_movement_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 430" width="100%" height="auto" role="img" aria-label="Movement along Demand Curve">
  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .axis { stroke: #111111; stroke-width: 2; stroke-linecap: round; }
    .demand-line { fill: none; stroke: #146b63; stroke-width: 3.5; stroke-linecap: round; }
    .guide-line { stroke: #8098ab; stroke-width: 1.2; stroke-dasharray: 4 4; }
    .point-dot { fill: #146b63; stroke: #ffffff; stroke-width: 2; }
    .text-title { font-family: 'Fraunces', Georgia, serif; font-size: 16px; font-weight: 700; fill: #122a3a; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 12.5px; font-weight: 700; fill: #122a3a; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11px; font-weight: 600; fill: #47607a; }
    .arrow-ext { stroke: #146b63; stroke-width: 2.5; fill: #146b63; }
    .arrow-cont { stroke: #b23a2b; stroke-width: 2.5; fill: #b23a2b; }
  </style>

  <rect class="bg" width="100%" height="100%" rx="10"/>
  <text class="text-title" x="40" y="34">माग रेखामा हुने चाल (Movement Along Demand Curve)</text>
  <text class="text-sub" x="40" y="52">मूल्य परिवर्तन हुँदा एउटै माग रेखामा हुने विस्तार (Extension) र सङ्कुचन (Contraction)</text>

  <!-- Axes -->
  <line class="axis" x1="90" y1="360" x2="90" y2="70"/>
  <line class="axis" x1="90" y1="360" x2="610" y2="360"/>
  <text class="text-label" x="35" y="78">मूल्य (P)</text>
  <text class="text-label" x="520" y="388">माग परिमाण (Q)</text>
  <text class="text-label" x="72" y="378">O</text>

  <!-- Demand Line DD -->
  <line class="demand-line" x1="130" y1="100" x2="530" y2="320"/>
  <text class="text-title" x="540" y="326" fill="#146b63">DD</text>

  <!-- Point A: Initial State (P0, Q0) at (330, 210) -->
  <line class="guide-line" x1="90" y1="210" x2="330" y2="210"/>
  <line class="guide-line" x1="330" y1="210" x2="330" y2="360"/>
  <circle class="point-dot" cx="330" cy="210" r="6"/>
  <text class="text-label" x="55" y="215">P₀</text>
  <text class="text-label" x="325" y="380">Q₀</text>
  <text class="text-label" x="345" y="206">A (प्रारम्भिक बिन्दु)</text>

  <!-- Point B: Extension of Demand (P1, Q1) at (450, 276) -->
  <line class="guide-line" x1="90" y1="276" x2="450" y2="276"/>
  <line class="guide-line" x1="450" y1="276" x2="450" y2="360"/>
  <circle class="point-dot" cx="450" cy="276" r="6"/>
  <text class="text-label" x="55" y="281">P₁</text>
  <text class="text-label" x="445" y="380">Q₁</text>
  <text class="text-label" x="465" y="272" fill="#146b63">B (मागको विस्तार)</text>

  <!-- Point C: Contraction of Demand (P2, Q2) at (210, 144) -->
  <line class="guide-line" x1="90" y1="144" x2="210" y2="144"/>
  <line class="guide-line" x1="210" y1="144" x2="210" y2="360"/>
  <circle class="point-dot" cx="210" cy="144" r="6"/>
  <text class="text-label" x="55" y="149">P₂</text>
  <text class="text-label" x="205" y="380">Q₂</text>
  <text class="text-label" x="225" y="140" fill="#b23a2b">C (मागको सङ्कुचन)</text>

  <!-- Movement Arrows -->
  <!-- A to B (Downward - Extension) -->
  <line x1="350" y1="225" x2="415" y2="260" stroke="#146b63" stroke-width="2.5"/>
  <polygon points="425,265 412,263 418,252" fill="#146b63"/>
  <text class="text-sub" x="375" y="250" fill="#146b63">विस्तार (P↓ ⇒ Q↑)</text>

  <!-- A to C (Upward - Contraction) -->
  <line x1="310" y1="195" x2="245" y2="160" stroke="#b23a2b" stroke-width="2.5"/>
  <polygon points="235,155 248,157 242,168" fill="#b23a2b"/>
  <text class="text-sub" x="200" y="185" fill="#b23a2b">सङ्कुचन (P↑ ⇒ Q↓)</text>
</svg>"""


def generate_demand_shifts_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 430" width="100%" height="auto" role="img" aria-label="Shift in Demand Curve">
  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .axis { stroke: #111111; stroke-width: 2; stroke-linecap: round; }
    .d0-line { fill: none; stroke: #122a3a; stroke-width: 3; stroke-linecap: round; }
    .d1-line { fill: none; stroke: #146b63; stroke-width: 3; stroke-linecap: round; stroke-dasharray: 6 3; }
    .d2-line { fill: none; stroke: #b23a2b; stroke-width: 3; stroke-linecap: round; stroke-dasharray: 6 3; }
    .guide-line { stroke: #8098ab; stroke-width: 1.2; stroke-dasharray: 4 4; }
    .point-dot { stroke: #ffffff; stroke-width: 2; }
    .text-title { font-family: 'Fraunces', Georgia, serif; font-size: 16px; font-weight: 700; fill: #122a3a; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 12.5px; font-weight: 700; fill: #122a3a; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11px; font-weight: 600; fill: #47607a; }
  </style>

  <rect class="bg" width="100%" height="100%" rx="10"/>
  <text class="text-title" x="40" y="34">माग रेखाको स्थानान्तरण (Shift in Demand Curve)</text>
  <text class="text-sub" x="40" y="52">मूल्य स्थिर रही अन्य तत्वहरू (आम्दानी, रुचि) का कारण मागमा वृद्धि र कमी</text>

  <!-- Axes -->
  <line class="axis" x1="90" y1="360" x2="90" y2="70"/>
  <line class="axis" x1="90" y1="360" x2="610" y2="360"/>
  <text class="text-label" x="35" y="78">मूल्य (P)</text>
  <text class="text-label" x="520" y="388">माग परिमाण (Q)</text>
  <text class="text-label" x="72" y="378">O</text>

  <!-- Constant Price Line P0 -->
  <line stroke="#b4872a" stroke-width="2" stroke-dasharray="5 5" x1="90" y1="210" x2="560" y2="210"/>
  <text class="text-label" x="45" y="215" fill="#b4872a">P₀ (स्थिर)</text>

  <!-- D2 (Decrease - Leftward Shift) -->
  <line class="d2-line" x1="90" y1="140" x2="370" y2="330"/>
  <text class="text-title" x="380" y="336" fill="#b23a2b">D₂D₂</text>
  <circle class="point-dot" fill="#b23a2b" cx="210" cy="210" r="5.5"/>
  <line class="guide-line" x1="210" y1="210" x2="210" y2="360"/>
  <text class="text-label" x="205" y="380" fill="#b23a2b">Q₂</text>

  <!-- D0 (Initial Demand Curve) -->
  <line class="d0-line" x1="170" y1="100" x2="490" y2="330"/>
  <text class="text-title" x="500" y="336" fill="#122a3a">D₀D₀</text>
  <circle class="point-dot" fill="#122a3a" cx="330" cy="210" r="5.5"/>
  <line class="guide-line" x1="330" y1="210" x2="330" y2="360"/>
  <text class="text-label" x="325" y="380">Q₀</text>

  <!-- D1 (Increase - Rightward Shift) -->
  <line class="d1-line" x1="250" y1="100" x2="570" y2="330"/>
  <text class="text-title" x="580" y="336" fill="#146b63">D₁D₁</text>
  <circle class="point-dot" fill="#146b63" cx="450" cy="210" r="5.5"/>
  <line class="guide-line" x1="450" y1="210" x2="450" y2="360"/>
  <text class="text-label" x="445" y="380" fill="#146b63">Q₁</text>

  <!-- Shift Arrows -->
  <!-- Right shift arrow -->
  <line x1="350" y1="150" x2="410" y2="150" stroke="#146b63" stroke-width="2.5"/>
  <polygon points="418,150 406,145 406,155" fill="#146b63"/>
  <text class="text-sub" x="425" y="154" fill="#146b63">मागमा वृद्धि (दायाँतर्फ)</text>

  <!-- Left shift arrow -->
  <line x1="290" y1="280" x2="230" y2="280" stroke="#b23a2b" stroke-width="2.5"/>
  <polygon points="222,280 234,275 234,285" fill="#b23a2b"/>
  <text class="text-sub" x="120" y="284" fill="#b23a2b">मागमा कमी (बायाँतर्फ)</text>
</svg>"""


def main():
    (OUTPUT_DIR / "demand-curve-schedule.svg").write_text(generate_demand_curve_schedule_svg(), encoding="utf-8")
    (OUTPUT_DIR / "demand-movement-along-curve.svg").write_text(generate_demand_movement_svg(), encoding="utf-8")
    (OUTPUT_DIR / "demand-shifts.svg").write_text(generate_demand_shifts_svg(), encoding="utf-8")
    print("Generated demand SVG diagrams successfully.")


if __name__ == "__main__":
    main()
