"""Generate clean, publication-ready Black & White SVG diagrams for Unit 4 Elasticity.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "public" / "images" / "uploads"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


def generate_five_degrees_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 240" width="100%" height="auto" role="img" aria-label="Five Degrees of Price Elasticity of Demand">
  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .axis { stroke: #111111; stroke-width: 1.8; stroke-linecap: round; }
    .line { fill: none; stroke: #111111; stroke-width: 2.5; stroke-linecap: round; }
    .text-title { font-family: 'Manrope', system-ui, sans-serif; font-size: 13px; font-weight: 800; fill: #111111; text-anchor: middle; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 11px; font-weight: 700; fill: #111111; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 10px; font-weight: 600; fill: #444444; text-anchor: middle; }
  </style>

  <!-- Panel 1: Perfectly Inelastic (Ep = 0) -->
  <g transform="translate(10, 10)">
    <rect class="bg" width="160" height="210" rx="8"/>
    <text class="text-title" x="80" y="24">1. Perfectly Inelastic</text>
    <text class="text-sub" x="80" y="38">Ep = 0 (Vertical Line)</text>
    <line class="axis" x1="25" y1="180" x2="25" y2="55"/>
    <line class="axis" x1="25" y1="180" x2="145" y2="180"/>
    <text class="text-label" x="14" y="58">P</text>
    <text class="text-label" x="140" y="195">Q</text>
    <!-- Vertical demand line -->
    <line class="line" x1="85" y1="65" x2="85" y2="180"/>
    <text class="text-sub" x="85" y="202">Quantity fixed</text>
  </g>

  <!-- Panel 2: Relatively Inelastic (Ep < 1) -->
  <g transform="translate(190, 10)">
    <rect class="bg" width="160" height="210" rx="8"/>
    <text class="text-title" x="80" y="24">2. Relatively Inelastic</text>
    <text class="text-sub" x="80" y="38">Ep &lt; 1 (Steep Curve)</text>
    <line class="axis" x1="25" y1="180" x2="25" y2="55"/>
    <line class="axis" x1="25" y1="180" x2="145" y2="180"/>
    <text class="text-label" x="14" y="58">P</text>
    <text class="text-label" x="140" y="195">Q</text>
    <!-- Steep demand line -->
    <line class="line" x1="50" y1="65" x2="115" y2="180"/>
    <text class="text-sub" x="80" y="202">%ΔQ &lt; %ΔP</text>
  </g>

  <!-- Panel 3: Unitary Elastic (Ep = 1) -->
  <g transform="translate(370, 10)">
    <rect class="bg" width="160" height="210" rx="8"/>
    <text class="text-title" x="80" y="24">3. Unitary Elastic</text>
    <text class="text-sub" x="80" y="38">Ep = 1 (Rect. Hyperbola)</text>
    <line class="axis" x1="25" y1="180" x2="25" y2="55"/>
    <line class="axis" x1="25" y1="180" x2="145" y2="180"/>
    <text class="text-label" x="14" y="58">P</text>
    <text class="text-label" x="140" y="195">Q</text>
    <!-- Rectangular hyperbola arc -->
    <path class="line" d="M 45 70 Q 75 110 135 170"/>
    <text class="text-sub" x="80" y="202">%ΔQ = %ΔP (TR Constant)</text>
  </g>

  <!-- Panel 4: Relatively Elastic (Ep > 1) -->
  <g transform="translate(550, 10)">
    <rect class="bg" width="160" height="210" rx="8"/>
    <text class="text-title" x="80" y="24">4. Relatively Elastic</text>
    <text class="text-sub" x="80" y="38">Ep &gt; 1 (Flat Curve)</text>
    <line class="axis" x1="25" y1="180" x2="25" y2="55"/>
    <line class="axis" x1="25" y1="180" x2="145" y2="180"/>
    <text class="text-label" x="14" y="58">P</text>
    <text class="text-label" x="140" y="195">Q</text>
    <!-- Flat demand line -->
    <line class="line" x1="38" y1="95" x2="138" y2="155"/>
    <text class="text-sub" x="80" y="202">%ΔQ &gt; %ΔP</text>
  </g>

  <!-- Panel 5: Perfectly Elastic (Ep = ∞) -->
  <g transform="translate(730, 10)">
    <rect class="bg" width="160" height="210" rx="8"/>
    <text class="text-title" x="80" y="24">5. Perfectly Elastic</text>
    <text class="text-sub" x="80" y="38">Ep = ∞ (Horizontal Line)</text>
    <line class="axis" x1="25" y1="180" x2="25" y2="55"/>
    <line class="axis" x1="25" y1="180" x2="145" y2="180"/>
    <text class="text-label" x="14" y="58">P</text>
    <text class="text-label" x="140" y="195">Q</text>
    <!-- Horizontal demand line -->
    <line class="line" x1="25" y1="110" x2="145" y2="110"/>
    <text class="text-sub" x="80" y="202">Infinite Q at price P</text>
  </g>
</svg>"""


def generate_cross_elasticity_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 260" width="100%" height="auto" role="img" aria-label="Types of Cross Elasticity of Demand">
  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .axis { stroke: #111111; stroke-width: 1.8; stroke-linecap: round; }
    .line { fill: none; stroke: #111111; stroke-width: 2.5; stroke-linecap: round; }
    .text-title { font-family: 'Manrope', system-ui, sans-serif; font-size: 14px; font-weight: 800; fill: #111111; text-anchor: middle; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 11px; font-weight: 700; fill: #111111; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11px; font-weight: 600; fill: #444444; text-anchor: middle; }
  </style>

  <!-- Panel 1: Substitutes (Exy > 0) -->
  <g transform="translate(15, 10)">
    <rect class="bg" width="230" height="235" rx="8"/>
    <text class="text-title" x="115" y="26">(a) Substitute Goods</text>
    <text class="text-sub" x="115" y="42">Exy &gt; 0 (Upward Sloping)</text>
    <line class="axis" x1="35" y1="195" x2="35" y2="60"/>
    <line class="axis" x1="35" y1="195" x2="205" y2="195"/>
    <text class="text-label" x="12" y="65">Py</text>
    <text class="text-label" x="195" y="212">Qx</text>
    <!-- Upward sloping curve -->
    <line class="line" x1="55" y1="175" x2="185" y2="85"/>
    <text class="text-sub" x="115" y="224">Example: Tea vs. Coffee</text>
  </g>

  <!-- Panel 2: Complements (Exy < 0) -->
  <g transform="translate(275, 10)">
    <rect class="bg" width="230" height="235" rx="8"/>
    <text class="text-title" x="115" y="26">(b) Complementary Goods</text>
    <text class="text-sub" x="115" y="42">Exy &lt; 0 (Downward Sloping)</text>
    <line class="axis" x1="35" y1="195" x2="35" y2="60"/>
    <line class="axis" x1="35" y1="195" x2="205" y2="195"/>
    <text class="text-label" x="12" y="65">Py</text>
    <text class="text-label" x="195" y="212">Qx</text>
    <!-- Downward sloping curve -->
    <line class="line" x1="55" y1="85" x2="185" y2="175"/>
    <text class="text-sub" x="115" y="224">Example: Car and Petrol</text>
  </g>

  <!-- Panel 3: Unrelated (Exy = 0) -->
  <g transform="translate(535, 10)">
    <rect class="bg" width="230" height="235" rx="8"/>
    <text class="text-title" x="115" y="26">(c) Unrelated Goods</text>
    <text class="text-sub" x="115" y="42">Exy = 0 (Vertical Straight Line)</text>
    <line class="axis" x1="35" y1="195" x2="35" y2="60"/>
    <line class="axis" x1="35" y1="195" x2="205" y2="195"/>
    <text class="text-label" x="12" y="65">Py</text>
    <text class="text-label" x="195" y="212">Qx</text>
    <!-- Vertical line -->
    <line class="line" x1="120" y1="75" x2="120" y2="195"/>
    <text class="text-sub" x="115" y="224">Example: Shoes and Butter</text>
  </g>
</svg>"""


def generate_point_elasticity_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400" width="100%" height="auto" role="img" aria-label="Point Elasticity on a Linear Demand Curve">
  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .axis { stroke: #111111; stroke-width: 2; stroke-linecap: round; }
    .demand-line { stroke: #111111; stroke-width: 3; stroke-linecap: round; }
    .point-dot { fill: #111111; stroke: #ffffff; stroke-width: 2; }
    .text-title { font-family: 'Manrope', system-ui, sans-serif; font-size: 15px; font-weight: 800; fill: #111111; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 13px; font-weight: 700; fill: #111111; }
    .text-formula { font-family: 'IBM Plex Mono', monospace; font-size: 12px; font-weight: 600; fill: #222222; }
  </style>

  <rect class="bg" width="100%" height="100%" rx="10"/>

  <text class="text-title" x="40" y="32">Point (Geometric) Elasticity on a Linear Demand Curve</text>
  <text class="text-formula" x="40" y="52">Formula: Ep = Lower Segment / Upper Segment (MN / MA)</text>

  <!-- Axes -->
  <line class="axis" x1="80" y1="340" x2="80" y2="70"/>
  <line class="axis" x1="80" y1="340" x2="560" y2="340"/>
  <text class="text-label" x="45" y="80">Price (P)</text>
  <text class="text-label" x="500" y="365">Quantity (Q)</text>
  <text class="text-label" x="65" y="355">O</text>

  <!-- Linear Demand Line from (80, 90) to (500, 340) -->
  <line class="demand-line" x1="80" y1="90" x2="500" y2="340"/>

  <!-- Points along the line -->
  <!-- 1. Point A (Y-intercept) -->
  <circle class="point-dot" cx="80" cy="90" r="5"/>
  <text class="text-label" x="90" y="95">A (Ep = ∞) — Lower Segment (AN) / 0</text>

  <!-- 2. Point B (Upper segment) -->
  <circle class="point-dot" cx="185" cy="152" r="5"/>
  <text class="text-label" x="198" y="150">B (Ep &gt; 1) — Lower &gt; Upper</text>

  <!-- 3. Point M (Midpoint) -->
  <circle class="point-dot" cx="290" cy="215" r="6"/>
  <text class="text-label" x="305" y="215">M (Ep = 1, Midpoint) — MN = MA</text>

  <!-- 4. Point C (Lower segment) -->
  <circle class="point-dot" cx="395" cy="278" r="5"/>
  <text class="text-label" x="408" y="280">C (Ep &lt; 1) — Lower &lt; Upper</text>

  <!-- 5. Point N (X-intercept) -->
  <circle class="point-dot" cx="500" cy="340" r="5"/>
  <text class="text-label" x="510" y="340">N (Ep = 0) — 0 / Upper (NA)</text>
</svg>"""


def generate_total_revenue_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 340" width="100%" height="auto" role="img" aria-label="Total Revenue and Price Elasticity Relationship">
  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .axis { stroke: #111111; stroke-width: 2; stroke-linecap: round; }
    .tr-curve { fill: none; stroke: #111111; stroke-width: 3; stroke-linecap: round; }
    .guide-line { stroke: #666666; stroke-width: 1.5; stroke-dasharray: 4 4; }
    .text-title { font-family: 'Manrope', system-ui, sans-serif; font-size: 15px; font-weight: 800; fill: #111111; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 12.5px; font-weight: 700; fill: #111111; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11px; font-weight: 600; fill: #333333; text-anchor: middle; }
  </style>

  <rect class="bg" width="100%" height="100%" rx="10"/>
  <text class="text-title" x="40" y="30">Total Revenue (TR) and Price Elasticity Relationship</text>

  <!-- Axes -->
  <line class="axis" x1="70" y1="280" x2="70" y2="60"/>
  <line class="axis" x1="70" y1="280" x2="620" y2="280"/>
  <text class="text-label" x="35" y="70">Total Revenue (TR)</text>
  <text class="text-label" x="560" y="305">Output (Q)</text>
  <text class="text-label" x="55" y="295">O</text>

  <!-- Parabolic Total Revenue Curve -->
  <path class="tr-curve" d="M 70 280 Q 345 60 620 280"/>

  <!-- Peak TR Marker at (345, 115) -->
  <line class="guide-line" x1="345" y1="115" x2="345" y2="280"/>
  <circle cx="345" cy="115" r="5" fill="#111111"/>
  <text class="text-label" x="355" y="112">Max TR (MR = 0)</text>

  <!-- Three Elasticity Zones -->
  <!-- Zone 1: Elastic (Left) -->
  <text class="text-title" x="200" y="180" text-anchor="middle">Elastic Zone (Ep &gt; 1)</text>
  <text class="text-sub" x="200" y="198">Price Cut ⇒ TR Increases</text>
  <text class="text-sub" x="200" y="214">MR &gt; 0 (Positive)</text>

  <!-- Zone 2: Unitary (Peak) -->
  <text class="text-title" x="345" y="145" text-anchor="middle">Unitary (Ep = 1)</text>
  <text class="text-sub" x="345" y="160">TR is Maximized (Peak)</text>

  <!-- Zone 3: Inelastic (Right) -->
  <text class="text-title" x="490" y="180" text-anchor="middle">Inelastic Zone (Ep &lt; 1)</text>
  <text class="text-sub" x="490" y="198">Price Cut ⇒ TR Decreases</text>
  <text class="text-sub" x="490" y="214">MR &lt; 0 (Negative)</text>
</svg>"""


def main():
    (OUTPUT_DIR / "five-degrees-price-elasticity.svg").write_text(generate_five_degrees_svg(), encoding="utf-8")
    (OUTPUT_DIR / "cross-elasticity-types.svg").write_text(generate_cross_elasticity_svg(), encoding="utf-8")
    (OUTPUT_DIR / "point-elasticity-linear-demand.svg").write_text(generate_point_elasticity_svg(), encoding="utf-8")
    (OUTPUT_DIR / "total-revenue-price-elasticity.svg").write_text(generate_total_revenue_svg(), encoding="utf-8")
    print("Generated 4 Black & White Elasticity SVG diagrams successfully.")


if __name__ == "__main__":
    main()
