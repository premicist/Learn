"""Generate publication-ready Black & White SVG diagrams for Unit 6 Consumer Behaviour.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "public" / "images" / "uploads"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


def generate_dmu_curves_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 500" width="100%" height="auto" role="img" aria-label="Law of Diminishing Marginal Utility showing Total Utility and Marginal Utility curves">
  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .axis { stroke: #111111; stroke-width: 2; stroke-linecap: round; }
    .curve { fill: none; stroke: #111111; stroke-width: 3.5; stroke-linecap: round; }
    .guide-line { stroke: #666666; stroke-width: 1.5; stroke-dasharray: 4 4; }
    .point-dot { fill: #111111; stroke: #ffffff; stroke-width: 2.5; }
    .text-title { font-family: 'Manrope', system-ui, sans-serif; font-size: 14px; font-weight: 800; fill: #111111; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 12px; font-weight: 700; fill: #111111; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11px; font-weight: 600; fill: #333333; }
    .panel-bg { fill: #fafafa; stroke: #cccccc; stroke-width: 1; rx: 6; }
  </style>

  <rect class="bg" width="100%" height="100%" rx="10"/>

  <!-- ================= TOP PANEL: TOTAL UTILITY (TU) ================= -->
  <g transform="translate(0, 0)">
    <text class="text-title" x="40" y="28">Panel (a): Total Utility (TU) Curve</text>
    
    <!-- Axes -->
    <line class="axis" x1="80" y1="210" x2="80" y2="40"/>
    <line class="axis" x1="80" y1="210" x2="720" y2="210"/>
    <text class="text-label" x="25" y="45">TU (Utils)</text>
    <text class="text-label" x="65" y="222">O</text>

    <!-- TU Curve points: (80,210), 1:(170,140), 2:(260,95), 3:(350,65), 4:(440,48), 5:(530,42), 6:(620,40), 7:(700,55) -->
    <path class="curve" d="M 80 210 Q 250 80 530 42 T 620 40 Q 660 42 700 65"/>
    <text class="text-title" x="710" y="70">TU</text>

    <!-- Point of Satiety at Unit 6 (620, 40) -->
    <circle class="point-dot" cx="620" cy="40" r="6"/>
    <line class="guide-line" x1="620" y1="40" x2="620" y2="210"/>
    <text class="text-label" x="540" y="32">Point of Satiety (Max TU = 60)</text>

    <!-- Quantity ticks -->
    <text class="text-label" x="165" y="226">1</text>
    <text class="text-label" x="255" y="226">2</text>
    <text class="text-label" x="345" y="226">3</text>
    <text class="text-label" x="435" y="226">4</text>
    <text class="text-label" x="525" y="226">5</text>
    <text class="text-label" x="615" y="226">6</text>
    <text class="text-label" x="695" y="226">7</text>
  </g>

  <!-- ================= BOTTOM PANEL: MARGINAL UTILITY (MU) ================= -->
  <g transform="translate(0, 240)">
    <text class="text-title" x="40" y="28">Panel (b): Marginal Utility (MU) Curve</text>
    
    <!-- Axes (X-axis at y=160, below is negative MU) -->
    <line class="axis" x1="80" y1="210" x2="80" y2="40"/>
    <line class="axis" x1="80" y1="160" x2="720" y2="160"/>
    <text class="text-label" x="25" y="45">MU (Utils)</text>
    <text class="text-label" x="660" y="152">Quantity (Q)</text>
    <text class="text-label" x="65" y="165">O</text>

    <!-- Zero line & Disutility label -->
    <text class="text-sub" x="635" y="195">Negative Zone (Disutility)</text>

    <!-- MU Curve: Line from (170, 60) down to (620, 160) and past into (700, 195) -->
    <line class="curve" x1="120" y1="45" x2="700" y2="190"/>
    <text class="text-title" x="710" y="195">MU</text>

    <!-- Alignment with Point of Satiety (620, 160) -->
    <line class="guide-line" x1="620" y1="-30" x2="620" y2="160"/>
    <circle class="point-dot" cx="620" cy="160" r="6"/>
    <text class="text-label" x="575" y="148">MU = 0 (Satiety)</text>

    <!-- Quantity ticks -->
    <text class="text-label" x="165" y="176">1</text>
    <text class="text-label" x="255" y="176">2</text>
    <text class="text-label" x="345" y="176">3</text>
    <text class="text-label" x="435" y="176">4</text>
    <text class="text-label" x="525" y="176">5</text>
    <text class="text-label" x="615" y="176">6</text>
    <text class="text-label" x="695" y="176">7</text>
  </g>
</svg>"""


def generate_consumer_producer_surplus_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 430" width="100%" height="auto" role="img" aria-label="Consumer Surplus and Producer Surplus in Market Equilibrium">
  <defs>
    <!-- Hatch pattern for Consumer Surplus -->
    <pattern id="hatch-cs" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="8" stroke="#333333" stroke-width="1.5" />
    </pattern>
    <!-- Dot pattern for Producer Surplus -->
    <pattern id="dot-ps" width="8" height="8" patternUnits="userSpaceOnUse">
      <circle cx="4" cy="4" r="1.5" fill="#555555" />
    </pattern>
  </defs>

  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .axis { stroke: #111111; stroke-width: 2; stroke-linecap: round; }
    .curve { fill: none; stroke: #111111; stroke-width: 3.5; stroke-linecap: round; }
    .guide-line { stroke: #666666; stroke-width: 1.5; stroke-dasharray: 4 4; }
    .text-title { font-family: 'Manrope', system-ui, sans-serif; font-size: 15px; font-weight: 800; fill: #111111; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 13px; font-weight: 700; fill: #111111; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11.5px; font-weight: 600; fill: #333333; }
    .legend-box { fill: #ffffff; stroke: #111111; stroke-width: 1.2; rx: 6; }
  </style>

  <rect class="bg" width="100%" height="100%" rx="10"/>
  <text class="text-title" x="40" y="32">Consumer Surplus and Producer Surplus</text>
  <text class="text-sub" x="40" y="50">Total Economic Welfare = Consumer Surplus (CS) + Producer Surplus (PS)</text>

  <!-- Axes -->
  <line class="axis" x1="80" y1="370" x2="80" y2="70"/>
  <line class="axis" x1="80" y1="370" x2="620" y2="370"/>
  <text class="text-label" x="40" y="80">Price (P)</text>
  <text class="text-label" x="540" y="395">Quantity (Q)</text>
  <text class="text-label" x="65" y="385">O</text>

  <!-- Equilibrium Intersection: Demand (80, 90) to (540, 370), Supply (80, 370) to (540, 90) -->
  <!-- Equilibrium Point E at (310, 230), Price line y=230, x from 80 to 310 -->
  
  <!-- Shaded Area 1: Consumer Surplus Triangle (80, 90) -> (310, 230) -> (80, 230) -->
  <polygon points="80,90 310,230 80,230" fill="url(#hatch-cs)" opacity="0.85"/>

  <!-- Shaded Area 2: Producer Surplus Triangle (80, 370) -> (310, 230) -> (80, 230) -->
  <polygon points="80,370 310,230 80,230" fill="url(#dot-ps)" opacity="0.85"/>

  <!-- Demand Line (DD) -->
  <line class="curve" x1="80" y1="90" x2="520" y2="360"/>
  <text class="text-title" x="530" y="365">DD (Demand)</text>
  <text class="text-label" x="55" y="95">A</text>

  <!-- Supply Line (SS) -->
  <line class="curve" x1="80" y1="370" x2="520" y2="100"/>
  <text class="text-title" x="530" y="105">SS (Supply)</text>
  <text class="text-label" x="55" y="375">B</text>

  <!-- Equilibrium Lines -->
  <line class="guide-line" x1="80" y1="230" x2="310" y2="230"/>
  <line class="guide-line" x1="310" y1="230" x2="310" y2="370"/>
  <circle cx="310" cy="230" r="6" fill="#111111"/>
  <text class="text-label" x="325" y="235">E (Equilibrium)</text>
  <text class="text-label" x="45" y="235">P*</text>
  <text class="text-label" x="300" y="395">Q*</text>

  <!-- Legends -->
  <g transform="translate(380, 160)">
    <rect class="legend-box" width="270" height="120"/>
    
    <!-- CS Legend -->
    <rect x="16" y="20" width="24" height="24" fill="url(#hatch-cs)" stroke="#111111"/>
    <text class="text-label" x="50" y="33">Consumer Surplus (CS)</text>
    <text class="text-sub" x="50" y="47">Area A-E-P* (Benefit to buyers)</text>

    <!-- PS Legend -->
    <rect x="16" y="65" width="24" height="24" fill="url(#dot-ps)" stroke="#111111"/>
    <text class="text-label" x="50" y="78">Producer Surplus (PS)</text>
    <text class="text-sub" x="50" y="92">Area P*-E-B (Benefit to sellers)</text>
  </g>
</svg>"""


def generate_equi_marginal_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 740 380" width="100%" height="auto" role="img" aria-label="Law of Equi-Marginal Utility and Consumer Equilibrium">
  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .axis { stroke: #111111; stroke-width: 2; stroke-linecap: round; }
    .curve { fill: none; stroke: #111111; stroke-width: 3; stroke-linecap: round; }
    .guide-line { stroke: #666666; stroke-width: 1.5; stroke-dasharray: 4 4; }
    .text-title { font-family: 'Manrope', system-ui, sans-serif; font-size: 15px; font-weight: 800; fill: #111111; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 12.5px; font-weight: 700; fill: #111111; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11px; font-weight: 600; fill: #333333; text-anchor: middle; }
    .card { fill: #ffffff; stroke: #111111; stroke-width: 1.2; rx: 8; }
  </style>

  <rect class="bg" width="100%" height="100%" rx="10"/>
  <text class="text-title" x="40" y="32">The Law of Equi-Marginal Utility (Gossen's Second Law)</text>
  <text class="text-sub" x="370" y="52">Consumer maximizes total utility when: (MUx / Px) = (MUy / Py) = MUm</text>

  <!-- Left Chart: Good X -->
  <g transform="translate(40, 70)">
    <rect class="card" width="310" height="270"/>
    <text class="text-title" x="155" y="24" text-anchor="middle">Good X Allocation</text>
    
    <line class="axis" x1="45" y1="220" x2="45" y2="45"/>
    <line class="axis" x1="45" y1="220" x2="280" y2="220"/>
    <text class="text-label" x="12" y="50">MUx/Px</text>
    <text class="text-label" x="250" y="240">Units of X</text>
    
    <!-- Downward line -->
    <line class="curve" x1="55" y1="65" x2="260" y2="205"/>
    <text class="text-label" x="265" y="205">MUx/Px</text>

    <!-- Equilibrium Line y=140 -->
    <line class="guide-line" x1="45" y1="140" x2="165" y2="140"/>
    <line class="guide-line" x1="165" y1="140" x2="165" y2="220"/>
    <circle cx="165" cy="140" r="5" fill="#111111"/>
    <text class="text-label" x="15" y="145">MUm</text>
    <text class="text-label" x="160" y="240">X*</text>
  </g>

  <!-- Right Chart: Good Y -->
  <g transform="translate(390, 70)">
    <rect class="card" width="310" height="270"/>
    <text class="text-title" x="155" y="24" text-anchor="middle">Good Y Allocation</text>
    
    <line class="axis" x1="45" y1="220" x2="45" y2="45"/>
    <line class="axis" x1="45" y1="220" x2="280" y2="220"/>
    <text class="text-label" x="12" y="50">MUy/Py</text>
    <text class="text-label" x="250" y="240">Units of Y</text>
    
    <!-- Downward line -->
    <line class="curve" x1="55" y1="75" x2="260" y2="210"/>
    <text class="text-label" x="265" y="210">MUy/Py</text>

    <!-- Equilibrium Line y=140 -->
    <line class="guide-line" x1="45" y1="140" x2="155" y2="140"/>
    <line class="guide-line" x1="155" y1="140" x2="155" y2="220"/>
    <circle cx="155" cy="140" r="5" fill="#111111"/>
    <text class="text-label" x="15" y="145">MUm</text>
    <text class="text-label" x="150" y="240">Y*</text>
  </g>
</svg>"""


def main():
    (OUTPUT_DIR / "law-of-dmu-tu-mu.svg").write_text(generate_dmu_curves_svg(), encoding="utf-8")
    (OUTPUT_DIR / "consumer-surplus-producer-surplus.svg").write_text(generate_consumer_producer_surplus_svg(), encoding="utf-8")
    (OUTPUT_DIR / "equi-marginal-utility-equilibrium.svg").write_text(generate_equi_marginal_svg(), encoding="utf-8")
    print("Generated 3 Black & White Consumer Behaviour SVG diagrams successfully.")


if __name__ == "__main__":
    main()
