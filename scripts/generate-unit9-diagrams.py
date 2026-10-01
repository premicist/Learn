"""Generate publication-ready Black & White SVG diagrams for Unit 9 Market Structure.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "public" / "images" / "uploads"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


def generate_market_spectrum_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 260" width="100%" height="auto" role="img" aria-label="Spectrum of Market Structures">
  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .card { fill: #fafafa; stroke: #111111; stroke-width: 1.5; rx: 8; }
    .arrow-line { stroke: #111111; stroke-width: 2.5; stroke-linecap: round; }
    .text-title { font-family: 'Manrope', system-ui, sans-serif; font-size: 15px; font-weight: 800; fill: #111111; text-anchor: middle; }
    .text-name { font-family: 'Manrope', system-ui, sans-serif; font-size: 13px; font-weight: 800; fill: #111111; text-anchor: middle; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11px; font-weight: 600; fill: #333333; text-anchor: middle; }
    .text-end { font-family: 'Manrope', system-ui, sans-serif; font-size: 12px; font-weight: 800; fill: #111111; }
  </style>

  <rect class="bg" width="100%" height="100%" rx="10"/>
  <text class="text-title" x="420" y="32">The Spectrum of Market Structures</text>

  <!-- Spectrum Axis Line -->
  <line class="arrow-line" x1="40" y1="65" x2="800" y2="65"/>
  <polygon points="40,65 52,60 52,70" fill="#111111"/>
  <polygon points="800,65 788,60 788,70" fill="#111111"/>

  <text class="text-end" x="40" y="55">Highest Competition (Price Taker)</text>
  <text class="text-end" x="590" y="55">Total Monopoly (Price Maker)</text>

  <!-- 5 Market Structure Cards -->
  <!-- 1. Perfect Competition -->
  <g transform="translate(30, 85)">
    <rect class="card" width="145" height="150"/>
    <text class="text-name" x="72" y="24">1. Perfect Comp.</text>
    <text class="text-sub" x="72" y="48">Infinite sellers</text>
    <text class="text-sub" x="72" y="66">Identical goods</text>
    <text class="text-sub" x="72" y="84">Zero price power</text>
    <text class="text-sub" x="72" y="102">P = AR = MR</text>
    <text class="text-sub" x="72" y="130" font-style="italic">e.g. Agriculture</text>
  </g>

  <!-- 2. Monopolistic Competition -->
  <g transform="translate(190, 85)">
    <rect class="card" width="145" height="150"/>
    <text class="text-name" x="72" y="24">2. Monopolistic</text>
    <text class="text-sub" x="72" y="48">Many sellers</text>
    <text class="text-sub" x="72" y="66">Differentiated</text>
    <text class="text-sub" x="72" y="84">Limited power</text>
    <text class="text-sub" x="72" y="102">Free entry/exit</text>
    <text class="text-sub" x="72" y="130" font-style="italic">e.g. Restaurants</text>
  </g>

  <!-- 3. Oligopoly -->
  <g transform="translate(350, 85)">
    <rect class="card" width="145" height="150"/>
    <text class="text-name" x="72" y="24">3. Oligopoly</text>
    <text class="text-sub" x="72" y="48">Few large sellers</text>
    <text class="text-sub" x="72" y="66">Interdependence</text>
    <text class="text-sub" x="72" y="84">High barriers</text>
    <text class="text-sub" x="72" y="102">Kinked demand</text>
    <text class="text-sub" x="72" y="130" font-style="italic">e.g. Airlines, Auto</text>
  </g>

  <!-- 4. Duopoly -->
  <g transform="translate(510, 85)">
    <rect class="card" width="145" height="150"/>
    <text class="text-name" x="72" y="24">4. Duopoly</text>
    <text class="text-sub" x="72" y="48">Exactly 2 sellers</text>
    <text class="text-sub" x="72" y="66">Strategic rivalry</text>
    <text class="text-sub" x="72" y="84">Cournot / Bertrand</text>
    <text class="text-sub" x="72" y="102">Shared market</text>
    <text class="text-sub" x="72" y="130" font-style="italic">e.g. Visa / Master</text>
  </g>

  <!-- 5. Pure Monopoly -->
  <g transform="translate(670, 85)">
    <rect class="card" width="145" height="150"/>
    <text class="text-name" x="72" y="24">5. Monopoly</text>
    <text class="text-sub" x="72" y="48">Single seller</text>
    <text class="text-sub" x="72" y="66">No substitutes</text>
    <text class="text-sub" x="72" y="84">Complete price maker</text>
    <text class="text-sub" x="72" y="102">Total entry barrier</text>
    <text class="text-sub" x="72" y="130" font-style="italic">e.g. Water Utility</text>
  </g>
</svg>"""


def generate_perfect_comp_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 400" width="100%" height="auto" role="img" aria-label="Perfect Competition: Industry Price Determination and Firm Equilibrium">
  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .axis { stroke: #111111; stroke-width: 2; stroke-linecap: round; }
    .curve { fill: none; stroke: #111111; stroke-width: 3; stroke-linecap: round; }
    .firm-demand { stroke: #111111; stroke-width: 3.5; stroke-linecap: round; }
    .guide-line { stroke: #666666; stroke-width: 1.5; stroke-dasharray: 4 4; }
    .point-dot { fill: #111111; stroke: #ffffff; stroke-width: 2; }
    .text-title { font-family: 'Manrope', system-ui, sans-serif; font-size: 14px; font-weight: 800; fill: #111111; text-anchor: middle; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 12px; font-weight: 700; fill: #111111; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11px; font-weight: 600; fill: #333333; text-anchor: middle; }
    .card { fill: #ffffff; stroke: #111111; stroke-width: 1.2; rx: 8; }
  </style>

  <rect class="bg" width="100%" height="100%" rx="10"/>

  <!-- Left Panel: Industry Price Determination -->
  <g transform="translate(30, 20)">
    <rect class="card" width="340" height="355"/>
    <text class="text-title" x="170" y="30">Industry (Price Maker)</text>
    <text class="text-sub" x="170" y="48">Price determined by Market Demand &amp; Supply</text>

    <line class="axis" x1="45" y1="300" x2="45" y2="70"/>
    <line class="axis" x1="45" y1="300" x2="310" y2="300"/>
    <text class="text-label" x="15" y="75">Price (P)</text>
    <text class="text-label" x="240" y="325">Industry Output (Q)</text>
    <text class="text-label" x="30" y="315">O</text>

    <!-- Demand (DD) & Supply (SS) -->
    <line class="curve" x1="60" y1="90" x2="280" y2="280"/><text class="text-label" x="285" y="285">DD</text>
    <line class="curve" x1="60" y1="280" x2="280" y2="90"/><text class="text-label" x="285" y="95">SS</text>

    <!-- Equilibrium Price P* at y=185 -->
    <circle class="point-dot" cx="170" cy="185" r="5"/>
    <line class="guide-line" x1="45" y1="185" x2="170" y2="185"/>
    <line class="guide-line" x1="170" y1="185" x2="170" y2="300"/>
    <text class="text-label" x="20" y="190">P*</text>
    <text class="text-label" x="160" y="320">Q*</text>
    <text class="text-label" x="180" y="180">E (DD = SS)</text>
  </g>

  <!-- Right Panel: Individual Firm (Price Taker) -->
  <g transform="translate(410, 20)">
    <rect class="card" width="340" height="355"/>
    <text class="text-title" x="170" y="30">Individual Firm (Price Taker)</text>
    <text class="text-sub" x="170" y="48">Faces horizontal demand: P* = AR = MR</text>

    <line class="axis" x1="45" y1="300" x2="45" y2="70"/>
    <line class="axis" x1="45" y1="300" x2="310" y2="300"/>
    <text class="text-label" x="15" y="75">Price (P)</text>
    <text class="text-label" x="250" y="325">Firm Output (q)</text>
    <text class="text-label" x="30" y="315">O</text>

    <!-- Horizontal Demand Line at y=185 -->
    <line class="firm-demand" x1="45" y1="185" x2="300" y2="185"/>
    <text class="text-label" x="160" y="175">P* = AR = MR = d</text>

    <!-- SAC U-curve tangent at (175, 185) -->
    <path class="curve" d="M 90 235 Q 175 140 260 235"/>
    <text class="text-label" x="265" y="240">SAC</text>

    <!-- SMC U-curve cutting SAC at min (175, 185) -->
    <path class="curve" stroke-width="3" d="M 115 270 Q 145 220 175 185 L 235 90"/>
    <text class="text-label" x="240" y="95">SMC</text>

    <!-- Firm Equilibrium Point e at (175, 185) -->
    <circle class="point-dot" cx="175" cy="185" r="5"/>
    <line class="guide-line" x1="175" y1="185" x2="175" y2="300"/>
    <text class="text-label" x="165" y="320">q*</text>
    <text class="text-label" x="185" y="195">e (P = MR = MC)</text>
  </g>
</svg>"""


def generate_monopoly_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 430" width="100%" height="auto" role="img" aria-label="Monopoly Price and Output Determination">
  <defs>
    <!-- Pattern for Supernormal Profit -->
    <pattern id="profit-hatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="8" stroke="#333333" stroke-width="1.5" />
    </pattern>
  </defs>

  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .axis { stroke: #111111; stroke-width: 2; stroke-linecap: round; }
    .curve { fill: none; stroke: #111111; stroke-width: 3.5; stroke-linecap: round; }
    .guide-line { stroke: #666666; stroke-width: 1.5; stroke-dasharray: 4 4; }
    .point-dot { fill: #111111; stroke: #ffffff; stroke-width: 2.5; }
    .text-title { font-family: 'Manrope', system-ui, sans-serif; font-size: 15px; font-weight: 800; fill: #111111; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 12.5px; font-weight: 700; fill: #111111; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11px; font-weight: 600; fill: #333333; }
    .card { fill: #ffffff; stroke: #111111; stroke-width: 1.2; rx: 6; }
  </style>

  <rect class="bg" width="100%" height="100%" rx="10"/>
  <text class="text-title" x="40" y="30">Monopoly Price &amp; Output Determination</text>
  <text class="text-sub" x="40" y="48">Profit Maximizing Rule: MR = MC (Price P* charged from AR Demand curve)</text>

  <!-- Axes -->
  <line class="axis" x1="80" y1="370" x2="80" y2="70"/>
  <line class="axis" x1="80" y1="370" x2="620" y2="370"/>
  <text class="text-label" x="35" y="80">Price / Cost (Rs.)</text>
  <text class="text-label" x="540" y="395">Output (Q)</text>
  <text class="text-label" x="65" y="385">O</text>

  <!-- Downward AR Demand Line from (80, 110) to (540, 340) -->
  <line class="curve" x1="80" y1="110" x2="540" y2="340"/>
  <text class="text-title" x="550" y="345">AR (Demand)</text>

  <!-- Downward MR Line from (80, 110) to (340, 370) -->
  <line class="curve" x1="80" y1="110" x2="340" y2="370"/>
  <text class="text-title" x="345" y="385">MR</text>

  <!-- U-shaped AC Curve (min at 320, 210) -->
  <path class="curve" stroke-width="2.5" d="M 120 280 Q 300 180 500 240"/>
  <text class="text-label" x="510" y="245">AC</text>

  <!-- U-shaped MC Curve cutting MR at e(225, 230) -->
  <path class="curve" stroke-width="3.5" d="M 120 340 Q 180 270 225 230 L 380 90"/>
  <text class="text-title" x="390" y="95">MC</text>

  <!-- Equilibrium MR = MC point e at (225, 230) -->
  <circle class="point-dot" cx="225" cy="230" r="6"/>
  <text class="text-label" x="235" y="235">e (MR = MC)</text>

  <!-- Vertical line from Q* (x=225) up to AR (y=182) and AC (y=215) -->
  <line class="guide-line" x1="225" y1="182" x2="225" y2="370"/>
  <text class="text-label" x="215" y="395">Q*</text>

  <!-- Supernormal Profit Box: (80, 182) to (225, 182) to (225, 215) to (80, 215) -->
  <polygon points="80,182 225,182 225,215 80,215" fill="url(#profit-hatch)" opacity="0.85"/>
  <circle class="point-dot" cx="225" cy="182" r="6"/>
  <circle class="point-dot" cx="225" cy="215" r="5"/>
  <line class="guide-line" x1="80" y1="182" x2="225" y2="182"/>
  <line class="guide-line" x1="80" y1="215" x2="225" y2="215"/>
  <text class="text-label" x="50" y="186">P*</text>
  <text class="text-label" x="50" y="219">C</text>

  <!-- Legend Box -->
  <g transform="translate(360, 140)">
    <rect class="card" width="280" height="90"/>
    <rect x="14" y="15" width="22" height="22" fill="url(#profit-hatch)" stroke="#111111"/>
    <text class="text-label" x="45" y="30">Supernormal Profit Area</text>
    <text class="text-sub" x="45" y="46">Rectangle P*-A-B-C = (P* - C) × Q*</text>
    <text class="text-sub" x="14" y="72">High entry barriers protect long-run profits</text>
  </g>
</svg>"""


def generate_monopolistic_comp_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 420" width="100%" height="auto" role="img" aria-label="Monopolistic Competition Long-Run Equilibrium and Excess Capacity">
  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .axis { stroke: #111111; stroke-width: 2; stroke-linecap: round; }
    .curve { fill: none; stroke: #111111; stroke-width: 3; stroke-linecap: round; }
    .guide-line { stroke: #666666; stroke-width: 1.5; stroke-dasharray: 4 4; }
    .point-dot { fill: #111111; stroke: #ffffff; stroke-width: 2.5; }
    .text-title { font-family: 'Manrope', system-ui, sans-serif; font-size: 15px; font-weight: 800; fill: #111111; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 12.5px; font-weight: 700; fill: #111111; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11px; font-weight: 600; fill: #333333; }
    .card { fill: #ffffff; stroke: #111111; stroke-width: 1.2; rx: 6; }
  </style>

  <rect class="bg" width="100%" height="100%" rx="10"/>
  <text class="text-title" x="40" y="32">Monopolistic Competition: Long-Run Tangency &amp; Excess Capacity</text>
  <text class="text-sub" x="40" y="50">Chamberlin's Excess Capacity Theorem: Tangency occurs on falling segment of LAC (qA &lt; qM)</text>

  <!-- Axes -->
  <line class="axis" x1="80" y1="360" x2="80" y2="70"/>
  <line class="axis" x1="80" y1="360" x2="640" y2="360"/>
  <text class="text-label" x="35" y="80">Price (P)</text>
  <text class="text-label" x="560" y="385">Output (Q)</text>
  <text class="text-label" x="65" y="375">O</text>

  <!-- Downward AR & MR Lines (Elastic) -->
  <line class="curve" stroke-width="2.5" x1="80" y1="120" x2="520" y2="300"/>
  <text class="text-label" x="525" y="305">AR (d)</text>

  <line class="curve" stroke-width="2.5" x1="80" y1="120" x2="340" y2="360"/>
  <text class="text-label" x="345" y="375">MR</text>

  <!-- U-shaped LAC Curve tangent to AR at T(260, 194), with minimum at M(380, 160) -->
  <path class="curve" stroke-width="3.5" d="M 120 300 Q 260 170 380 160 T 580 230"/>
  <text class="text-title" x="590" y="235">LAC</text>

  <!-- LMC Curve cutting LAC min at (380, 160) and MR at (260, 280) -->
  <path class="curve" stroke-width="2.5" d="M 160 350 Q 230 300 260 280 L 460 90"/>
  <text class="text-title" x="470" y="95">LMC</text>

  <!-- Tangency Point T at (260, 194) -->
  <circle class="point-dot" cx="260" cy="194" r="6"/>
  <line class="guide-line" x1="80" y1="194" x2="260" y2="194"/>
  <line class="guide-line" x1="260" y1="194" x2="260" y2="360"/>
  <text class="text-label" x="45" y="198">P*</text>
  <text class="text-label" x="240" y="385">q_A (Actual)</text>
  <text class="text-label" x="270" y="190">T (P = LAC, Normal Profit)</text>

  <!-- Ideal Output Point M (Min LAC) at (380, 160) -->
  <circle class="point-dot" cx="380" cy="160" r="6"/>
  <line class="guide-line" x1="380" y1="160" x2="380" y2="360"/>
  <text class="text-label" x="360" y="385">q_M (Ideal Output)</text>
  <text class="text-label" x="390" y="155">Min LAC</text>

  <!-- Excess Capacity Line Indicator -->
  <line x1="265" y1="340" x2="375" y2="340" stroke="#111111" stroke-width="2.5"/>
  <polygon points="260,340 270,336 270,344" fill="#111111"/>
  <polygon points="380,340 370,336 370,344" fill="#111111"/>
  <text class="text-sub" x="320" y="330">Excess Capacity = q_M - q_A</text>
</svg>"""


def generate_kinked_demand_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 430" width="100%" height="auto" role="img" aria-label="Sweezy's Kinked Demand Curve Model of Oligopoly">
  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .axis { stroke: #111111; stroke-width: 2; stroke-linecap: round; }
    .kink-line { fill: none; stroke: #111111; stroke-width: 3.5; stroke-linecap: round; }
    .mr-line { fill: none; stroke: #111111; stroke-width: 2.5; stroke-linecap: round; }
    .mr-gap { stroke: #111111; stroke-width: 2; stroke-dasharray: 4 4; }
    .mc-curve { fill: none; stroke: #555555; stroke-width: 2.5; stroke-linecap: round; }
    .guide-line { stroke: #666666; stroke-width: 1.5; stroke-dasharray: 4 4; }
    .point-dot { fill: #111111; stroke: #ffffff; stroke-width: 2.5; }
    .text-title { font-family: 'Manrope', system-ui, sans-serif; font-size: 15px; font-weight: 800; fill: #111111; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 12.5px; font-weight: 700; fill: #111111; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11px; font-weight: 600; fill: #333333; }
    .card { fill: #ffffff; stroke: #111111; stroke-width: 1.2; rx: 6; }
  </style>

  <rect class="bg" width="100%" height="100%" rx="10"/>
  <text class="text-title" x="40" y="32">Paul Sweezy's Kinked Demand Curve (Oligopoly Price Rigidity)</text>
  <text class="text-sub" x="40" y="50">Rivals ignore price increases (elastic dk) but match price cuts (inelastic kD)</text>

  <!-- Axes -->
  <line class="axis" x1="80" y1="370" x2="80" y2="70"/>
  <line class="axis" x1="80" y1="370" x2="620" y2="370"/>
  <text class="text-label" x="35" y="80">Price (P)</text>
  <text class="text-label" x="540" y="395">Output (Q)</text>
  <text class="text-label" x="65" y="385">O</text>

  <!-- Kinked Demand Curve: Elastic segment from (80, 110) to K(300, 190), Inelastic segment from K(300, 190) to (540, 360) -->
  <line class="kink-line" x1="80" y1="110" x2="300" y2="190"/>
  <line class="kink-line" x1="300" y1="190" x2="520" y2="360"/>
  <text class="text-label" x="150" y="140">Elastic Segment (d-k)</text>
  <text class="text-label" x="420" y="310">Inelastic Segment (k-D)</text>
  <text class="text-title" x="530" y="365">dKD (Demand)</text>

  <!-- Discontinuous MR Curve -->
  <!-- Upper MR from (80, 110) to (300, 240) -->
  <line class="mr-line" x1="80" y1="110" x2="300" y2="240"/>
  <text class="text-label" x="275" y="235">a</text>

  <!-- Vertical Discontinuous Gap (a to b) from y=240 to y=300 -->
  <line class="mr-gap" x1="300" y1="240" x2="300" y2="300"/>
  <text class="text-label" x="275" y="305">b</text>

  <!-- Lower MR from (300, 300) to (420, 370) -->
  <line class="mr-line" x1="300" y1="300" x2="420" y2="370"/>
  <text class="text-title" x="425" y="385">MR</text>

  <!-- Marginal Cost curves shifting within the gap (SMC1 and SMC2) -->
  <path class="mc-curve" d="M 170 320 Q 240 270 300 255 T 450 150"/><text class="text-label" x="455" y="150">MC₁</text>
  <path class="mc-curve" d="M 190 340 Q 250 290 300 280 T 470 170"/><text class="text-label" x="475" y="170">MC₂</text>

  <!-- Kink Point K at (300, 190) -->
  <circle class="point-dot" cx="300" cy="190" r="7"/>
  <line class="guide-line" x1="80" y1="190" x2="300" y2="190"/>
  <line class="guide-line" x1="300" y1="190" x2="300" y2="370"/>
  <text class="text-label" x="40" y="195">P* (Rigid Price)</text>
  <text class="text-label" x="280" y="395">Q* (Rigid Output)</text>
  <text class="text-title" x="315" y="185">K (The Kink)</text>

  <!-- Explanation note -->
  <text class="text-sub" x="320" y="270">Discontinuous MR Gap (a-b)</text>
  <text class="text-sub" x="320" y="285">Price P* stays rigid as MC shifts</text>
</svg>"""


def main():
    (OUTPUT_DIR / "market-structures-spectrum.svg").write_text(generate_market_spectrum_svg(), encoding="utf-8")
    (OUTPUT_DIR / "perfect-competition-equilibrium.svg").write_text(generate_perfect_comp_svg(), encoding="utf-8")
    (OUTPUT_DIR / "monopoly-equilibrium-profit.svg").write_text(generate_monopoly_svg(), encoding="utf-8")
    (OUTPUT_DIR / "monopolistic-competition-excess-capacity.svg").write_text(generate_monopolistic_comp_svg(), encoding="utf-8")
    (OUTPUT_DIR / "sweezy-kinked-demand-curve.svg").write_text(generate_kinked_demand_svg(), encoding="utf-8")
    print("Generated 5 Black & White Unit 9 SVG diagrams successfully.")


if __name__ == "__main__":
    main()
