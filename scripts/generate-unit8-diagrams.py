"""Generate publication-ready Black & White SVG diagrams for Unit 8 Theory of Production.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "public" / "images" / "uploads"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


def generate_variable_proportions_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 520" width="100%" height="auto" role="img" aria-label="Law of Variable Proportions showing Three Stages of Production">
  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .axis { stroke: #111111; stroke-width: 2; stroke-linecap: round; }
    .curve { fill: none; stroke: #111111; stroke-width: 3.5; stroke-linecap: round; }
    .stage-div { stroke: #666666; stroke-width: 1.5; stroke-dasharray: 5 4; }
    .point-dot { fill: #111111; stroke: #ffffff; stroke-width: 2; }
    .text-title { font-family: 'Manrope', system-ui, sans-serif; font-size: 14px; font-weight: 800; fill: #111111; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 12px; font-weight: 700; fill: #111111; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11px; font-weight: 600; fill: #333333; text-anchor: middle; }
    .stage-box { fill: #fafafa; stroke: #111111; stroke-width: 1; rx: 4; }
  </style>

  <rect class="bg" width="100%" height="100%" rx="10"/>

  <!-- ================= TOP PANEL: TOTAL PRODUCT (TP) ================= -->
  <g transform="translate(0, 0)">
    <text class="text-title" x="40" y="28">Panel (a): Total Product (TP) Curve</text>
    
    <line class="axis" x1="80" y1="230" x2="80" y2="40"/>
    <line class="axis" x1="80" y1="230" x2="740" y2="230"/>
    <text class="text-label" x="20" y="45">Output</text>
    <text class="text-label" x="65" y="240">O</text>

    <!-- Stage Boundary Lines -->
    <line class="stage-div" x1="330" y1="40" x2="330" y2="480"/>
    <line class="stage-div" x1="570" y1="40" x2="570" y2="480"/>

    <!-- TP S-shaped Curve -->
    <path class="curve" d="M 80 230 Q 220 200 260 140 T 570 55 Q 650 55 720 95"/>
    <text class="text-title" x="725" y="100">TP</text>

    <!-- Point of Inflexion at (260, 140) -->
    <circle class="point-dot" cx="260" cy="140" r="5"/>
    <text class="text-label" x="180" y="135">Point of Inflexion</text>

    <!-- TP Maximum at (570, 55) -->
    <circle class="point-dot" cx="570" cy="55" r="6"/>
    <text class="text-label" x="510" y="48">TP Max (MP = 0)</text>
  </g>

  <!-- ================= BOTTOM PANEL: AP AND MP ================= -->
  <g transform="translate(0, 260)">
    <text class="text-title" x="40" y="28">Panel (b): Marginal Product (MP) &amp; Average Product (AP)</text>
    
    <!-- Axes (X-axis at y=170, below is negative MP) -->
    <line class="axis" x1="80" y1="220" x2="80" y2="40"/>
    <line class="axis" x1="80" y1="170" x2="740" y2="170"/>
    <text class="text-label" x="15" y="45">AP, MP</text>
    <text class="text-label" x="680" y="162">Labor (L)</text>
    <text class="text-label" x="65" y="178">O</text>

    <!-- AP Curve (rises to max at L=4 where AP=MP, then falls) -->
    <path class="curve" d="M 80 170 Q 220 70 330 90 T 700 155"/>
    <text class="text-title" x="705" y="160">AP</text>

    <!-- MP Curve (rises to max at Inflexion, cuts AP at AP max, reaches 0 at L=8, goes negative) -->
    <path class="curve" stroke-width="3" d="M 80 170 Q 180 30 260 40 T 330 90 Q 450 140 570 170 T 700 215"/>
    <text class="text-title" x="705" y="220">MP</text>

    <!-- Stage 1 end (AP=MP) at (330, 90) -->
    <circle class="point-dot" cx="330" cy="90" r="5"/>
    <text class="text-label" x="335" y="85">AP = MP (AP Max)</text>

    <!-- Stage 2 end (MP=0) at (570, 170) -->
    <circle class="point-dot" cx="570" cy="170" r="6"/>
    <text class="text-label" x="550" y="190">MP = 0</text>
  </g>

  <!-- Stage Labels along the bottom -->
  <g transform="translate(0, 485)">
    <!-- Stage I -->
    <rect class="stage-box" x="90" y="0" width="230" height="24"/>
    <text class="text-sub" x="205" y="16">Stage I: Increasing Returns</text>

    <!-- Stage II -->
    <rect class="stage-box" x="340" y="0" width="220" height="24"/>
    <text class="text-sub" x="450" y="16" font-weight="800">Stage II: Diminishing (Rational)</text>

    <!-- Stage III -->
    <rect class="stage-box" x="580" y="0" width="150" height="24"/>
    <text class="text-sub" x="655" y="16">Stage III: Negative</text>
  </g>
</svg>"""


def generate_returns_to_scale_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 740 420" width="100%" height="auto" role="img" aria-label="Returns to Scale along an Expansion Path">
  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .axis { stroke: #111111; stroke-width: 2; stroke-linecap: round; }
    .curve { fill: none; stroke: #111111; stroke-width: 2.5; stroke-linecap: round; }
    .scale-line { stroke: #111111; stroke-width: 3; stroke-linecap: round; }
    .guide-line { stroke: #666666; stroke-width: 1.5; stroke-dasharray: 4 4; }
    .point-dot { fill: #111111; stroke: #ffffff; stroke-width: 2; }
    .text-title { font-family: 'Manrope', system-ui, sans-serif; font-size: 15px; font-weight: 800; fill: #111111; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 12.5px; font-weight: 700; fill: #111111; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11px; font-weight: 600; fill: #333333; }
    .card { fill: #ffffff; stroke: #111111; stroke-width: 1.2; rx: 6; }
  </style>

  <rect class="bg" width="100%" height="100%" rx="10"/>
  <text class="text-title" x="40" y="32">Returns to Scale along the Expansion Path</text>
  <text class="text-sub" x="40" y="50">Output changes when all factor inputs (Labor L and Capital K) expand proportionally</text>

  <!-- Axes -->
  <line class="axis" x1="80" y1="360" x2="80" y2="70"/>
  <line class="axis" x1="80" y1="360" x2="660" y2="360"/>
  <text class="text-label" x="25" y="80">Capital (K)</text>
  <text class="text-label" x="580" y="385">Labor (L)</text>
  <text class="text-label" x="65" y="375">O</text>

  <!-- Isoquants IQ1=100, IQ2=200, IQ3=300, IQ4=400 -->
  <path class="curve" d="M 100 230 Q 150 310 260 340"/><text class="text-label" x="265" y="340">IQ₁ = 100</text>
  <path class="curve" d="M 130 160 Q 210 250 360 290"/><text class="text-label" x="365" y="290">IQ₂ = 200</text>
  <path class="curve" d="M 180 110 Q 300 180 490 230"/><text class="text-label" x="495" y="230">IQ₃ = 300</text>
  <path class="curve" d="M 250 75 Q 410 120 620 170"/><text class="text-label" x="625" y="170">IQ₄ = 400</text>

  <!-- Scale Line / Expansion Path from Origin through (180, 260), (270, 205), (380, 145), (510, 95) -->
  <line class="scale-line" x1="80" y1="360" x2="550" y2="75"/>
  <text class="text-title" x="555" y="70">Expansion Path</text>

  <!-- Points along Expansion Path -->
  <circle class="point-dot" cx="180" cy="270" r="5"/><text class="text-label" x="190" y="270">A</text>
  <circle class="point-dot" cx="265" cy="210" r="5"/><text class="text-label" x="275" y="210">B</text>
  <circle class="point-dot" cx="370" cy="145" r="5"/><text class="text-label" x="380" y="145">C</text>
  <circle class="point-dot" cx="500" cy="90" r="5"/><text class="text-label" x="510" y="90">D</text>

  <!-- Legend Box -->
  <g transform="translate(420, 245)">
    <rect class="card" width="280" height="95"/>
    <text class="text-label" x="14" y="24">1. Increasing Returns (IRS):</text>
    <text class="text-sub" x="14" y="40">Distance AB &lt; OA (%ΔOutput &gt; %ΔInputs)</text>
    <text class="text-label" x="14" y="60">2. Constant Returns (CRS):</text>
    <text class="text-sub" x="14" y="74">Distance BC = AB (%ΔOutput = %ΔInputs)</text>
  </g>
</svg>"""


def generate_short_run_costs_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 440" width="100%" height="auto" role="img" aria-label="Short Run Average Cost and Marginal Cost Curves">
  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .axis { stroke: #111111; stroke-width: 2; stroke-linecap: round; }
    .curve { fill: none; stroke: #111111; stroke-width: 3.5; stroke-linecap: round; }
    .guide-line { stroke: #666666; stroke-width: 1.5; stroke-dasharray: 4 4; }
    .point-dot { fill: #111111; stroke: #ffffff; stroke-width: 2.5; }
    .text-title { font-family: 'Manrope', system-ui, sans-serif; font-size: 15px; font-weight: 800; fill: #111111; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 13px; font-weight: 700; fill: #111111; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11.5px; font-weight: 600; fill: #333333; }
  </style>

  <rect class="bg" width="100%" height="100%" rx="10"/>
  <text class="text-title" x="40" y="32">Short-Run Cost Curves: AFC, AVC, ATC, and MC</text>
  <text class="text-sub" x="40" y="50">MC cuts both AVC and ATC at their respective minimum points from below</text>

  <!-- Axes -->
  <line class="axis" x1="80" y1="370" x2="80" y2="70"/>
  <line class="axis" x1="80" y1="370" x2="660" y2="370"/>
  <text class="text-label" x="25" y="80">Cost (Rs.)</text>
  <text class="text-label" x="590" y="395">Output (Q)</text>
  <text class="text-label" x="65" y="385">O</text>

  <!-- 1. AFC (Rectangular Hyperbola) -->
  <path class="curve" stroke-width="2.5" d="M 110 120 Q 150 310 580 345"/>
  <text class="text-label" x="590" y="345">AFC</text>

  <!-- 2. AVC (U-Shaped, min at 280, 240) -->
  <path class="curve" stroke-width="3" d="M 120 280 Q 280 230 580 150"/>
  <text class="text-label" x="590" y="150">AVC</text>
  <circle class="point-dot" cx="280" cy="240" r="5"/>
  <text class="text-sub" x="240" y="260">Min AVC</text>

  <!-- 3. ATC / AC (U-Shaped, min at 380, 175) -->
  <path class="curve" stroke-width="3.5" d="M 130 180 Q 380 160 580 90"/>
  <text class="text-label" x="590" y="90">ATC (AC)</text>
  <circle class="point-dot" cx="380" cy="175" r="5"/>
  <text class="text-sub" x="350" y="195">Min ATC</text>

  <!-- 4. MC (U-Shaped, cuts AVC min at 280,240 and ATC min at 380,175) -->
  <path class="curve" stroke-width="4" d="M 120 330 Q 200 280 280 240 T 380 175 L 530 65"/>
  <text class="text-title" x="540" y="65">MC</text>
</svg>"""


def generate_lrac_envelope_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 440" width="100%" height="auto" role="img" aria-label="Long-Run Average Cost as an Envelope Planning Curve">
  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .axis { stroke: #111111; stroke-width: 2; stroke-linecap: round; }
    .sac-curve { fill: none; stroke: #555555; stroke-width: 2; stroke-linecap: round; }
    .lac-curve { fill: none; stroke: #111111; stroke-width: 4; stroke-linecap: round; }
    .guide-line { stroke: #666666; stroke-width: 1.5; stroke-dasharray: 4 4; }
    .point-dot { fill: #111111; stroke: #ffffff; stroke-width: 2.5; }
    .text-title { font-family: 'Manrope', system-ui, sans-serif; font-size: 15px; font-weight: 800; fill: #111111; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 13px; font-weight: 700; fill: #111111; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11.5px; font-weight: 600; fill: #333333; text-anchor: middle; }
    .card { fill: #ffffff; stroke: #111111; stroke-width: 1.2; rx: 6; }
  </style>

  <rect class="bg" width="100%" height="100%" rx="10"/>
  <text class="text-title" x="40" y="32">Long-Run Average Cost (LAC) as an Envelope Curve</text>
  <text class="text-sub" x="390" y="50">LAC wraps tangent to family of Short-Run Average Cost (SAC) curves for various plant sizes</text>

  <!-- Axes -->
  <line class="axis" x1="80" y1="370" x2="80" y2="70"/>
  <line class="axis" x1="80" y1="370" x2="720" y2="370"/>
  <text class="text-label" x="25" y="80">Unit Cost (Rs.)</text>
  <text class="text-label" x="650" y="395">Output (Q)</text>
  <text class="text-label" x="65" y="385">O</text>

  <!-- SAC 1 (Small plant) -->
  <path class="sac-curve" d="M 100 200 Q 160 140 220 220"/><text class="text-label" x="145" y="145">SAC₁</text>

  <!-- SAC 2 (Medium-small plant) -->
  <path class="sac-curve" d="M 190 170 Q 260 110 330 190"/><text class="text-label" x="245" y="115">SAC₂</text>

  <!-- SAC 3 (Optimal plant - MES) -->
  <path class="sac-curve" stroke-width="2.5" d="M 300 150 Q 380 90 460 170"/><text class="text-label" x="370" y="95">SAC₃</text>

  <!-- SAC 4 (Large plant) -->
  <path class="sac-curve" d="M 430 170 Q 500 110 570 190"/><text class="text-label" x="485" y="115">SAC₄</text>

  <!-- SAC 5 (Mega plant) -->
  <path class="sac-curve" d="M 540 200 Q 600 140 660 220"/><text class="text-label" x="585" y="145">SAC₅</text>

  <!-- Flatter Envelope LAC Curve tangent to SACs -->
  <path class="lac-curve" d="M 100 220 Q 380 80 660 220"/>
  <text class="text-title" x="670" y="225">LAC (Planning Curve)</text>

  <!-- Optimum Scale / MES Point at (380, 160) -->
  <circle class="point-dot" cx="380" cy="160" r="6"/>
  <line class="guide-line" x1="380" y1="160" x2="380" y2="370"/>
  <text class="text-label" x="340" y="395">Q* (Optimum Scale / MES)</text>

  <!-- Economies and Diseconomies annotations -->
  <text class="text-label" x="200" y="270">← Economies of Scale (Falling LAC)</text>
  <text class="text-label" x="430" y="270">Diseconomies of Scale (Rising LAC) →</text>
</svg>"""


def generate_break_even_chart_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 740 440" width="100%" height="auto" role="img" aria-label="Break-Even Analysis Chart">
  <defs>
    <!-- Hatch pattern for Loss Area -->
    <pattern id="hatch-loss" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="8" stroke="#777777" stroke-width="1.2" />
    </pattern>
    <!-- Dot pattern for Profit Area -->
    <pattern id="dot-profit" width="8" height="8" patternUnits="userSpaceOnUse">
      <circle cx="4" cy="4" r="1.5" fill="#333333" />
    </pattern>
  </defs>

  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .axis { stroke: #111111; stroke-width: 2; stroke-linecap: round; }
    .tr-line { fill: none; stroke: #111111; stroke-width: 3.5; stroke-linecap: round; }
    .tc-line { fill: none; stroke: #111111; stroke-width: 3; stroke-linecap: round; }
    .tfc-line { fill: none; stroke: #444444; stroke-width: 2; stroke-dasharray: 6 4; }
    .guide-line { stroke: #666666; stroke-width: 1.5; stroke-dasharray: 4 4; }
    .point-dot { fill: #111111; stroke: #ffffff; stroke-width: 2.5; }
    .text-title { font-family: 'Manrope', system-ui, sans-serif; font-size: 15px; font-weight: 800; fill: #111111; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 13px; font-weight: 700; fill: #111111; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11.5px; font-weight: 600; fill: #333333; }
    .card { fill: #ffffff; stroke: #111111; stroke-width: 1.2; rx: 6; }
  </style>

  <rect class="bg" width="100%" height="100%" rx="10"/>
  <text class="text-title" x="40" y="32">Break-Even Analysis Chart (Cost-Volume-Profit)</text>
  <text class="text-sub" x="40" y="50">Break-Even Point (BEP) occurs where Total Revenue equals Total Cost (TR = TC, Profit = 0)</text>

  <!-- Axes -->
  <line class="axis" x1="90" y1="370" x2="90" y2="70"/>
  <line class="axis" x1="90" y1="370" x2="680" y2="370"/>
  <text class="text-label" x="30" y="80">Cost / Revenue (Rs.)</text>
  <text class="text-label" x="600" y="395">Sales Volume (Q)</text>
  <text class="text-label" x="75" y="385">O</text>

  <!-- 1. TFC (Horizontal Line at y=280) -->
  <line class="tfc-line" x1="90" y1="280" x2="650" y2="280"/>
  <text class="text-label" x="655" y="285">TFC (Fixed Cost)</text>

  <!-- Shaded Areas: Loss Triangle (90,280 -> 340,195 -> 90,370) and Profit Triangle (340,195 -> 600,105 -> 600,165) -->
  <polygon points="90,280 340,195 90,370" fill="url(#hatch-loss)" opacity="0.8"/>
  <polygon points="340,195 620,95 620,175" fill="url(#dot-profit)" opacity="0.8"/>

  <!-- 2. TC Line from (90, 280) through (340, 195) to (620, 100) -->
  <line class="tc-line" x1="90" y1="280" x2="620" y2="100"/>
  <text class="text-title" x="625" y="105">TC</text>

  <!-- 3. TR Line from (90, 370) through (340, 195) to (620, 60) -->
  <line class="tr-line" x1="90" y1="370" x2="620" y2="60"/>
  <text class="text-title" x="625" y="65">TR</text>

  <!-- Break-Even Point BEP at (340, 195) -->
  <circle class="point-dot" cx="340" cy="195" r="7"/>
  <line class="guide-line" x1="90" y1="195" x2="340" y2="195"/>
  <line class="guide-line" x1="340" y1="195" x2="340" y2="370"/>
  <text class="text-label" x="40" y="200">BEP_Sales</text>
  <text class="text-label" x="315" y="395">BEP_Units</text>
  <text class="text-title" x="355" y="195">BEP (TR = TC)</text>

  <!-- Actual Sales Volume at x=520 -->
  <line class="guide-line" x1="520" y1="110" x2="520" y2="370"/>
  <text class="text-label" x="500" y="395">Actual_Q</text>

  <!-- Margin of Safety Annotation -->
  <line x1="345" y1="350" x2="515" y2="350" stroke="#111111" stroke-width="2"/>
  <polygon points="340,350 350,346 350,354" fill="#111111"/>
  <polygon points="520,350 510,346 510,354" fill="#111111"/>
  <text class="text-sub" x="430" y="342">Margin of Safety (MOS)</text>

  <!-- Legend Box -->
  <g transform="translate(130, 90)">
    <rect class="card" width="180" height="70"/>
    <rect x="12" y="12" width="18" height="18" fill="url(#hatch-loss)" stroke="#111111"/>
    <text class="text-label" x="38" y="26">Loss Zone (TC &gt; TR)</text>
    <rect x="12" y="40" width="18" height="18" fill="url(#dot-profit)" stroke="#111111"/>
    <text class="text-label" x="38" y="54">Profit Zone (TR &gt; TC)</text>
  </g>
</svg>"""


def main():
    (OUTPUT_DIR / "law-of-variable-proportions-stages.svg").write_text(generate_variable_proportions_svg(), encoding="utf-8")
    (OUTPUT_DIR / "returns-to-scale-isoquants.svg").write_text(generate_returns_to_scale_svg(), encoding="utf-8")
    (OUTPUT_DIR / "short-run-cost-curves-srac-smc.svg").write_text(generate_short_run_costs_svg(), encoding="utf-8")
    (OUTPUT_DIR / "lrac-envelope-curve.svg").write_text(generate_lrac_envelope_svg(), encoding="utf-8")
    (OUTPUT_DIR / "break-even-analysis-chart.svg").write_text(generate_break_even_chart_svg(), encoding="utf-8")
    print("Generated 5 Black & White Unit 8 SVG diagrams successfully.")


if __name__ == "__main__":
    main()
