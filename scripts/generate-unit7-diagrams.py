"""Generate publication-ready Black & White SVG diagrams for Unit 7 Consumer Behaviour II.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "public" / "images" / "uploads"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


def generate_ic_and_map_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 400" width="100%" height="auto" role="img" aria-label="Indifference Curve and Indifference Map">
  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .axis { stroke: #111111; stroke-width: 2; stroke-linecap: round; }
    .curve { fill: none; stroke: #111111; stroke-width: 3; stroke-linecap: round; }
    .point-dot { fill: #111111; stroke: #ffffff; stroke-width: 2; }
    .text-title { font-family: 'Manrope', system-ui, sans-serif; font-size: 14px; font-weight: 800; fill: #111111; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 12px; font-weight: 700; fill: #111111; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11px; font-weight: 600; fill: #333333; }
    .card { fill: #ffffff; stroke: #111111; stroke-width: 1.2; rx: 8; }
  </style>

  <rect class="bg" width="100%" height="100%" rx="10"/>

  <!-- Left: Single Indifference Curve -->
  <g transform="translate(30, 20)">
    <rect class="card" width="340" height="355"/>
    <text class="text-title" x="170" y="30" text-anchor="middle">Panel (a): Single Indifference Curve (IC)</text>
    
    <line class="axis" x1="45" y1="300" x2="45" y2="60"/>
    <line class="axis" x1="45" y1="300" x2="310" y2="300"/>
    <text class="text-label" x="15" y="65">Good Y</text>
    <text class="text-label" x="255" y="325">Good X</text>
    <text class="text-label" x="30" y="315">O</text>

    <!-- Smooth convex IC curve -->
    <path class="curve" d="M 65 75 Q 110 180 290 270"/>
    <text class="text-title" x="295" y="275">IC₁</text>

    <!-- Points along the curve -->
    <circle class="point-dot" cx="80" cy="115" r="5"/><text class="text-label" x="90" y="115">A (1, 12)</text>
    <circle class="point-dot" cx="115" cy="170" r="5"/><text class="text-label" x="125" y="170">B (2, 8)</text>
    <circle class="point-dot" cx="160" cy="210" r="5"/><text class="text-label" x="170" y="210">C (3, 5)</text>
    <circle class="point-dot" cx="215" cy="245" r="5"/><text class="text-label" x="225" y="245">D (4, 3)</text>

    <text class="text-sub" x="170" y="340" text-anchor="middle">All points yield identical utility: U(A) = U(B) = U(C)</text>
  </g>

  <!-- Right: Indifference Map -->
  <g transform="translate(410, 20)">
    <rect class="card" width="340" height="355"/>
    <text class="text-title" x="170" y="30" text-anchor="middle">Panel (b): Indifference Map</text>
    
    <line class="axis" x1="45" y1="300" x2="45" y2="60"/>
    <line class="axis" x1="45" y1="300" x2="310" y2="300"/>
    <text class="text-label" x="15" y="65">Good Y</text>
    <text class="text-label" x="255" y="325">Good X</text>
    <text class="text-label" x="30" y="315">O</text>

    <!-- Family of ICs -->
    <path class="curve" d="M 60 135 Q 95 220 250 280"/>
    <text class="text-title" x="255" y="285">IC₁</text>

    <path class="curve" d="M 75 105 Q 120 180 275 250"/>
    <text class="text-title" x="280" y="255">IC₂</text>

    <path class="curve" d="M 90 75 Q 145 140 300 220"/>
    <text class="text-title" x="305" y="225">IC₃</text>

    <text class="text-sub" x="170" y="340" text-anchor="middle">Higher curve represents higher satisfaction (IC₃ &gt; IC₂ &gt; IC₁)</text>
  </g>
</svg>"""


def generate_exceptional_ic_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 380" width="100%" height="auto" role="img" aria-label="Exceptional Shapes of Indifference Curves">
  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .axis { stroke: #111111; stroke-width: 2; stroke-linecap: round; }
    .curve { fill: none; stroke: #111111; stroke-width: 3; stroke-linecap: round; }
    .text-title { font-family: 'Manrope', system-ui, sans-serif; font-size: 14px; font-weight: 800; fill: #111111; text-anchor: middle; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 12px; font-weight: 700; fill: #111111; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11px; font-weight: 600; fill: #333333; text-anchor: middle; }
    .card { fill: #ffffff; stroke: #111111; stroke-width: 1.2; rx: 8; }
  </style>

  <rect class="bg" width="100%" height="100%" rx="10"/>

  <!-- Left: Perfect Substitutes -->
  <g transform="translate(30, 20)">
    <rect class="card" width="340" height="335"/>
    <text class="text-title" x="170" y="30">(a) Perfect Substitutes</text>
    <text class="text-sub" x="170" y="48">Linear Straight Line (Constant MRS = 1)</text>
    
    <line class="axis" x1="45" y1="280" x2="45" y2="70"/>
    <line class="axis" x1="45" y1="280" x2="310" y2="280"/>
    <text class="text-label" x="15" y="75">Good Y</text>
    <text class="text-label" x="255" y="305">Good X</text>
    <text class="text-label" x="30" y="295">O</text>

    <!-- Straight linear ICs -->
    <line class="curve" x1="45" y1="180" x2="165" y2="280"/><text class="text-title" x="175" y="275">IC₁</text>
    <line class="curve" x1="45" y1="120" x2="225" y2="280"/><text class="text-title" x="235" y="275">IC₂</text>
    <line class="curve" x1="45" y1="75" x2="280" y2="280"/><text class="text-title" x="290" y="275">IC₃</text>
    
    <text class="text-sub" x="170" y="320">Example: 5-Rupee Coin vs. 5-Rupee Note</text>
  </g>

  <!-- Right: Perfect Complements -->
  <g transform="translate(410, 20)">
    <rect class="card" width="340" height="335"/>
    <text class="text-title" x="170" y="30">(b) Perfect Complements</text>
    <text class="text-sub" x="170" y="48">L-Shaped / Right-Angled (MRS = 0 or ∞)</text>
    
    <line class="axis" x1="45" y1="280" x2="45" y2="70"/>
    <line class="axis" x1="45" y1="280" x2="310" y2="280"/>
    <text class="text-label" x="10" y="75">Left Shoes</text>
    <text class="text-label" x="240" y="305">Right Shoes</text>
    <text class="text-label" x="30" y="295">O</text>

    <!-- L-shaped curves -->
    <polyline class="curve" points="110,90 110,220 280,220"/><text class="text-title" x="290" y="215">IC₁</text>
    <polyline class="curve" points="170,90 170,160 280,160"/><text class="text-title" x="290" y="155">IC₂</text>
    
    <text class="text-sub" x="170" y="320">Example: Left Shoe &amp; Right Shoe (Fixed 1:1 Ratio)</text>
  </g>
</svg>"""


def generate_budget_line_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 390" width="100%" height="auto" role="img" aria-label="Budget Line Shifts and Rotations">
  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .axis { stroke: #111111; stroke-width: 2; stroke-linecap: round; }
    .line-base { fill: none; stroke: #111111; stroke-width: 3; stroke-linecap: round; }
    .line-shift { fill: none; stroke: #111111; stroke-width: 2.5; stroke-dasharray: 5 4; stroke-linecap: round; }
    .text-title { font-family: 'Manrope', system-ui, sans-serif; font-size: 14px; font-weight: 800; fill: #111111; text-anchor: middle; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 12px; font-weight: 700; fill: #111111; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11px; font-weight: 600; fill: #333333; text-anchor: middle; }
    .card { fill: #ffffff; stroke: #111111; stroke-width: 1.2; rx: 8; }
  </style>

  <rect class="bg" width="100%" height="100%" rx="10"/>

  <!-- Left: Parallel Shift due to Income Change -->
  <g transform="translate(30, 20)">
    <rect class="card" width="340" height="345"/>
    <text class="text-title" x="170" y="28">Panel (a): Income Change (Parallel Shift)</text>
    <text class="text-sub" x="170" y="46">Prices constant; Money Income M changes</text>

    <line class="axis" x1="45" y1="290" x2="45" y2="70"/>
    <line class="axis" x1="45" y1="290" x2="310" y2="290"/>
    <text class="text-label" x="15" y="75">Good Y</text>
    <text class="text-label" x="255" y="315">Good X</text>
    <text class="text-label" x="30" y="305">O</text>

    <!-- Inward shift (M down) -->
    <line class="line-shift" x1="45" y1="200" x2="160" y2="290"/>
    <text class="text-label" x="165" y="285">A₂B₂ (Income ↓)</text>

    <!-- Base line AB -->
    <line class="line-base" x1="45" y1="140" x2="225" y2="290"/>
    <text class="text-label" x="230" y="285">AB (Base)</text>

    <!-- Outward shift (M up) -->
    <line class="line-shift" x1="45" y1="80" x2="290" y2="290"/>
    <text class="text-label" x="270" y="315">A₁B₁ (Income ↑)</text>
    
    <text class="text-sub" x="170" y="330">Slope remains constant: - Px / Py</text>
  </g>

  <!-- Right: Rotation due to Price Change -->
  <g transform="translate(410, 20)">
    <rect class="card" width="340" height="345"/>
    <text class="text-title" x="170" y="28">Panel (b): Price Change (Pivot / Rotation)</text>
    <text class="text-sub" x="170" y="46">Income &amp; Py constant; Price of X (Px) changes</text>

    <line class="axis" x1="45" y1="290" x2="45" y2="70"/>
    <line class="axis" x1="45" y1="290" x2="310" y2="290"/>
    <text class="text-label" x="15" y="75">Good Y</text>
    <text class="text-label" x="255" y="315">Good X</text>
    <text class="text-label" x="30" y="305">O</text>
    <text class="text-label" x="28" y="145">A</text>

    <!-- Inward rotation (Px up) -->
    <line class="line-shift" x1="45" y1="140" x2="150" y2="290"/>
    <text class="text-label" x="140" y="310">B₂ (Px ↑)</text>

    <!-- Base line AB -->
    <line class="line-base" x1="45" y1="140" x2="215" y2="290"/>
    <text class="text-label" x="210" y="310">B (Base)</text>

    <!-- Outward rotation (Px down) -->
    <line class="line-shift" x1="45" y1="140" x2="290" y2="290"/>
    <text class="text-label" x="280" y="310">B₁ (Px ↓)</text>

    <text class="text-sub" x="170" y="330">Pivots on fixed Y-intercept (A = M / Py)</text>
  </g>
</svg>"""


def generate_consumer_equilibrium_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 430" width="100%" height="auto" role="img" aria-label="Consumer Equilibrium under Indifference Curve Analysis">
  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .axis { stroke: #111111; stroke-width: 2; stroke-linecap: round; }
    .budget-line { stroke: #111111; stroke-width: 3.5; stroke-linecap: round; }
    .ic-curve { fill: none; stroke: #111111; stroke-width: 2.5; stroke-linecap: round; }
    .guide-line { stroke: #666666; stroke-width: 1.5; stroke-dasharray: 4 4; }
    .point-dot { fill: #111111; stroke: #ffffff; stroke-width: 2.5; }
    .text-title { font-family: 'Manrope', system-ui, sans-serif; font-size: 15px; font-weight: 800; fill: #111111; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 13px; font-weight: 700; fill: #111111; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11.5px; font-weight: 600; fill: #333333; }
    .card { fill: #ffffff; stroke: #111111; stroke-width: 1.2; rx: 6; }
  </style>

  <rect class="bg" width="100%" height="100%" rx="10"/>
  <text class="text-title" x="40" y="30">Consumer Equilibrium: Tangency of Budget Line &amp; IC</text>
  <text class="text-sub" x="40" y="48">Equilibrium Condition: MRSxy = Px / Py (Slope of IC = Slope of Budget Line)</text>

  <!-- Axes -->
  <line class="axis" x1="80" y1="360" x2="80" y2="70"/>
  <line class="axis" x1="80" y1="360" x2="620" y2="360"/>
  <text class="text-label" x="35" y="80">Good Y</text>
  <text class="text-label" x="540" y="385">Good X</text>
  <text class="text-label" x="65" y="375">O</text>

  <!-- Budget Line AB from (80, 100) to (500, 360) -->
  <line class="budget-line" x1="80" y1="100" x2="500" y2="360"/>
  <text class="text-title" x="55" y="105">A (M/Py)</text>
  <text class="text-title" x="495" y="385">B (M/Px)</text>

  <!-- Indifference Curves -->
  <!-- IC1 (Intersects Budget Line at R and S) -->
  <path class="ic-curve" d="M 90 170 Q 150 290 380 340"/>
  <text class="text-title" x="385" y="340">IC₁ (Sub-optimal)</text>

  <!-- IC2 (Tangent at Point E) -->
  <path class="ic-curve" stroke-width="3.5" d="M 120 120 Q 240 240 470 310"/>
  <text class="text-title" x="475" y="310">IC₂ (Equilibrium)</text>

  <!-- IC3 (Unattainable) -->
  <path class="ic-curve" d="M 180 85 Q 320 180 560 270"/>
  <text class="text-title" x="565" y="270">IC₃ (Unattainable)</text>

  <!-- Equilibrium Point E at (255, 208) -->
  <circle class="point-dot" cx="255" cy="208" r="7"/>
  <line class="guide-line" x1="80" y1="208" x2="255" y2="208"/>
  <line class="guide-line" x1="255" y1="208" x2="255" y2="360"/>
  <text class="text-label" x="45" y="212">Ye*</text>
  <text class="text-label" x="245" y="385">Xe*</text>
  <text class="text-title" x="270" y="200">E (Tangency: MRSxy = Px/Py)</text>

  <!-- Points R and S on IC1 -->
  <circle cx="128" cy="130" r="4" fill="#111111"/><text class="text-label" x="135" y="130">R (MRS &gt; Px/Py)</text>
  <circle cx="395" cy="295" r="4" fill="#111111"/><text class="text-label" x="405" y="295">S (MRS &lt; Px/Py)</text>
</svg>"""


def generate_icc_pcc_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 390" width="100%" height="auto" role="img" aria-label="Income Consumption Curve and Price Consumption Curve">
  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .axis { stroke: #111111; stroke-width: 2; stroke-linecap: round; }
    .curve { fill: none; stroke: #111111; stroke-width: 3.5; stroke-linecap: round; }
    .budget-line { stroke: #888888; stroke-width: 1.5; stroke-linecap: round; }
    .point-dot { fill: #111111; stroke: #ffffff; stroke-width: 2; }
    .text-title { font-family: 'Manrope', system-ui, sans-serif; font-size: 14px; font-weight: 800; fill: #111111; text-anchor: middle; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 12px; font-weight: 700; fill: #111111; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11px; font-weight: 600; fill: #333333; text-anchor: middle; }
    .card { fill: #ffffff; stroke: #111111; stroke-width: 1.2; rx: 8; }
  </style>

  <rect class="bg" width="100%" height="100%" rx="10"/>

  <!-- Left: Income Consumption Curve (ICC) -->
  <g transform="translate(30, 20)">
    <rect class="card" width="340" height="345"/>
    <text class="text-title" x="170" y="28">Panel (a): Income Consumption Curve (ICC)</text>
    <text class="text-sub" x="170" y="46">Locus of equilibrium points as income rises</text>

    <line class="axis" x1="45" y1="290" x2="45" y2="70"/>
    <line class="axis" x1="45" y1="290" x2="310" y2="290"/>
    <text class="text-label" x="15" y="75">Good Y</text>
    <text class="text-label" x="255" y="315">Good X</text>
    <text class="text-label" x="30" y="305">O</text>

    <!-- Parallel budget lines -->
    <line class="budget-line" x1="45" y1="210" x2="160" y2="290"/>
    <line class="budget-line" x1="45" y1="150" x2="225" y2="290"/>
    <line class="budget-line" x1="45" y1="90" x2="290" y2="290"/>

    <!-- Tangency points E1, E2, E3 -->
    <circle class="point-dot" cx="100" cy="250" r="5"/><text class="text-label" x="108" y="248">E₁</text>
    <circle class="point-dot" cx="140" cy="205" r="5"/><text class="text-label" x="148" y="203">E₂</text>
    <circle class="point-dot" cx="185" cy="155" r="5"/><text class="text-label" x="193" y="153">E₃</text>

    <!-- Upward ICC line connecting E1, E2, E3 -->
    <path class="curve" d="M 45 290 L 100 250 L 140 205 L 185 155 L 240 100"/>
    <text class="text-title" x="260" y="95">ICC</text>

    <text class="text-sub" x="170" y="330">Normal Goods: ICC slopes upward to the right</text>
  </g>

  <!-- Right: Price Consumption Curve (PCC) -->
  <g transform="translate(410, 20)">
    <rect class="card" width="340" height="345"/>
    <text class="text-title" x="170" y="28">Panel (b): Price Consumption Curve (PCC)</text>
    <text class="text-sub" x="170" y="46">Locus of equilibrium points as Price of X falls</text>

    <line class="axis" x1="45" y1="290" x2="45" y2="70"/>
    <line class="axis" x1="45" y1="290" x2="310" y2="290"/>
    <text class="text-label" x="15" y="75">Good Y</text>
    <text class="text-label" x="255" y="315">Good X</text>
    <text class="text-label" x="30" y="305">O</text>

    <!-- Rotating budget lines from fixed A -->
    <line class="budget-line" x1="45" y1="130" x2="140" y2="290"/>
    <line class="budget-line" x1="45" y1="130" x2="210" y2="290"/>
    <line class="budget-line" x1="45" y1="130" x2="290" y2="290"/>

    <!-- Tangency points E1, E2, E3 -->
    <circle class="point-dot" cx="95" cy="180" r="5"/><text class="text-label" x="103" y="175">E₁</text>
    <circle class="point-dot" cx="135" cy="195" r="5"/><text class="text-label" x="143" y="190">E₂</text>
    <circle class="point-dot" cx="190" cy="215" r="5"/><text class="text-label" x="198" y="210">E₃</text>

    <!-- Downward/Flatter PCC line -->
    <path class="curve" d="M 45 130 Q 95 175 135 195 T 260 230"/>
    <text class="text-title" x="280" y="230">PCC</text>

    <text class="text-sub" x="170" y="330">Derives the downward-sloping demand curve for X</text>
  </g>
</svg>"""


def main():
    (OUTPUT_DIR / "indifference-curve-and-map.svg").write_text(generate_ic_and_map_svg(), encoding="utf-8")
    (OUTPUT_DIR / "exceptional-indifference-curves.svg").write_text(generate_exceptional_ic_svg(), encoding="utf-8")
    (OUTPUT_DIR / "budget-line-shifts-rotations.svg").write_text(generate_budget_line_svg(), encoding="utf-8")
    (OUTPUT_DIR / "consumer-equilibrium-indifference-curve.svg").write_text(generate_consumer_equilibrium_svg(), encoding="utf-8")
    (OUTPUT_DIR / "icc-and-pcc-curves.svg").write_text(generate_icc_pcc_svg(), encoding="utf-8")
    print("Generated 5 Black & White Unit 7 SVG diagrams successfully.")


if __name__ == "__main__":
    main()
