"""Generate publication-ready Black & White SVG diagrams for Unit 10 Pricing Practices and Strategies.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "public" / "images" / "uploads"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


def generate_third_degree_discrimination_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 920 380" width="100%" height="auto" role="img" aria-label="Third-Degree Price Discrimination across Two Sub-Markets">
  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .axis { stroke: #111111; stroke-width: 2; stroke-linecap: round; }
    .curve { fill: none; stroke: #111111; stroke-width: 2.5; stroke-linecap: round; }
    .mc-line { fill: none; stroke: #111111; stroke-width: 3.5; stroke-linecap: round; }
    .guide-line { stroke: #666666; stroke-width: 1.5; stroke-dasharray: 4 4; }
    .point-dot { fill: #111111; stroke: #ffffff; stroke-width: 2; }
    .text-title { font-family: 'Manrope', system-ui, sans-serif; font-size: 14px; font-weight: 800; fill: #111111; text-anchor: middle; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 12px; font-weight: 700; fill: #111111; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11px; font-weight: 600; fill: #333333; text-anchor: middle; }
    .card { fill: #ffffff; stroke: #111111; stroke-width: 1.2; rx: 8; }
  </style>

  <rect class="bg" width="100%" height="100%" rx="10"/>

  <!-- Panel 1: Market A (Inelastic Demand) -->
  <g transform="translate(20, 20)">
    <rect class="card" width="280" height="335"/>
    <text class="text-title" x="140" y="26">Market A (Inelastic Demand)</text>
    <text class="text-sub" x="140" y="42">Steep Curves ⇒ Higher Price (P_A)</text>
    
    <line class="axis" x1="40" y1="270" x2="40" y2="60"/>
    <line class="axis" x1="40" y1="270" x2="255" y2="270"/>
    <text class="text-label" x="10" y="65">P_A</text>
    <text class="text-label" x="235" y="290">Q_A</text>
    <text class="text-label" x="25" y="285">O</text>

    <!-- Steep AR_A and MR_A -->
    <line class="curve" stroke-width="3" x1="40" y1="75" x2="210" y2="250"/><text class="text-label" x="215" y="255">AR_A</text>
    <line class="curve" x1="40" y1="75" x2="135" y2="270"/><text class="text-label" x="140" y="285">MR_A</text>

    <!-- Marginal Cost MC* line across at y=190 -->
    <line class="guide-line" x1="40" y1="190" x2="250" y2="190"/>
    
    <!-- Equilibrium in Market A: MR_A = MC* at x=88, y=190 -->
    <circle class="point-dot" cx="88" cy="190" r="5"/>
    <line class="guide-line" x1="88" y1="125" x2="88" y2="270"/>
    <circle class="point-dot" cx="88" cy="125" r="5"/>
    <line class="guide-line" x1="40" y1="125" x2="88" y2="125"/>

    <text class="text-label" x="10" y="130">P_A*</text>
    <text class="text-label" x="78" y="290">Q_A*</text>
    <text class="text-sub" x="140" y="320">Inelastic: Higher Price P_A</text>
  </g>

  <!-- Panel 2: Market B (Elastic Demand) -->
  <g transform="translate(320, 20)">
    <rect class="card" width="280" height="335"/>
    <text class="text-title" x="140" y="26">Market B (Elastic Demand)</text>
    <text class="text-sub" x="140" y="42">Flat Curves ⇒ Lower Price (P_B)</text>
    
    <line class="axis" x1="40" y1="270" x2="40" y2="60"/>
    <line class="axis" x1="40" y1="270" x2="255" y2="270"/>
    <text class="text-label" x="10" y="65">P_B</text>
    <text class="text-label" x="235" y="290">Q_B</text>
    <text class="text-label" x="25" y="285">O</text>

    <!-- Flatter AR_B and MR_B -->
    <line class="curve" stroke-width="3" x1="40" y1="100" x2="245" y2="230"/><text class="text-label" x="245" y="245">AR_B</text>
    <line class="curve" x1="40" y1="100" x2="185" y2="270"/><text class="text-label" x="190" y="285">MR_B</text>

    <!-- Marginal Cost MC* line across at y=190 -->
    <line class="guide-line" x1="40" y1="190" x2="250" y2="190"/>
    
    <!-- Equilibrium in Market B: MR_B = MC* at x=115, y=190 -->
    <circle class="point-dot" cx="115" cy="190" r="5"/>
    <line class="guide-line" x1="115" y1="150" x2="115" y2="270"/>
    <circle class="point-dot" cx="115" cy="150" r="5"/>
    <line class="guide-line" x1="40" y1="150" x2="115" y2="150"/>

    <text class="text-label" x="10" y="155">P_B*</text>
    <text class="text-label" x="105" y="290">Q_B*</text>
    <text class="text-sub" x="140" y="320">Elastic: Lower Price P_B</text>
  </g>

  <!-- Panel 3: Combined Market & MC -->
  <g transform="translate(620, 20)">
    <rect class="card" width="280" height="335"/>
    <text class="text-title" x="140" y="26">Combined Industry Output</text>
    <text class="text-sub" x="140" y="42">Condition: MR_Total = MC_Total</text>
    
    <line class="axis" x1="40" y1="270" x2="40" y2="60"/>
    <line class="axis" x1="40" y1="270" x2="255" y2="270"/>
    <text class="text-label" x="10" y="65">Cost</text>
    <text class="text-label" x="235" y="290">Q_Total</text>
    <text class="text-label" x="25" y="285">O</text>

    <!-- Combined MR curve -->
    <line class="curve" x1="40" y1="85" x2="235" y2="270"/><text class="text-label" x="235" y="285">ΣMR</text>

    <!-- MC Curve cutting ΣMR at (150, 190) -->
    <path class="mc-line" d="M 60 260 Q 110 210 150 190 L 230 110"/><text class="text-label" x="235" y="110">MC</text>

    <!-- Equilibrium intersection at (150, 190) -->
    <circle class="point-dot" cx="150" cy="190" r="6"/>
    <line class="guide-line" x1="40" y1="190" x2="150" y2="190"/>
    <line class="guide-line" x1="150" y1="190" x2="150" y2="270"/>
    <text class="text-label" x="10" y="195">MC*</text>
    <text class="text-label" x="135" y="290">Q_Total*</text>
    <text class="text-sub" x="140" y="320">Q_Total = Q_A + Q_B</text>
  </g>
</svg>"""


def generate_peak_load_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 430" width="100%" height="auto" role="img" aria-label="Peak-Load Pricing Diagram">
  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .axis { stroke: #111111; stroke-width: 2; stroke-linecap: round; }
    .curve { fill: none; stroke: #111111; stroke-width: 3; stroke-linecap: round; }
    .smc-curve { fill: none; stroke: #111111; stroke-width: 3.5; stroke-linecap: round; }
    .guide-line { stroke: #666666; stroke-width: 1.5; stroke-dasharray: 4 4; }
    .point-dot { fill: #111111; stroke: #ffffff; stroke-width: 2.5; }
    .text-title { font-family: 'Manrope', system-ui, sans-serif; font-size: 15px; font-weight: 800; fill: #111111; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 12.5px; font-weight: 700; fill: #111111; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11px; font-weight: 600; fill: #333333; }
    .card { fill: #ffffff; stroke: #111111; stroke-width: 1.2; rx: 6; }
  </style>

  <rect class="bg" width="100%" height="100%" rx="10"/>
  <text class="text-title" x="40" y="32">Peak-Load Pricing (Time-Variant Pricing)</text>
  <text class="text-sub" x="40" y="50">Higher price P_Peak charged during capacity constraints; lower price P_OffPeak during excess capacity</text>

  <!-- Axes -->
  <line class="axis" x1="80" y1="370" x2="80" y2="70"/>
  <line class="axis" x1="80" y1="370" x2="620" y2="370"/>
  <text class="text-label" x="35" y="80">Price (P)</text>
  <text class="text-label" x="540" y="395">Quantity (Q)</text>
  <text class="text-label" x="65" y="385">O</text>

  <!-- 1. Off-Peak Demand (D_OP) & MR_OP -->
  <line class="curve" x1="80" y1="180" x2="330" y2="340"/>
  <text class="text-label" x="335" y="345">D_OffPeak</text>

  <line class="curve" stroke-width="2" stroke-dasharray="4 3" x1="80" y1="180" x2="220" y2="370"/>
  <text class="text-label" x="225" y="375">MR_OP</text>

  <!-- 2. Peak Demand (D_Peak) & MR_Peak -->
  <line class="curve" x1="80" y1="90" x2="550" y2="330"/>
  <text class="text-title" x="555" y="335">D_Peak</text>

  <line class="curve" stroke-width="2" stroke-dasharray="4 3" x1="80" y1="90" x2="360" y2="370"/>
  <text class="text-label" x="365" y="375">MR_Peak</text>

  <!-- Short-Run Marginal Cost (SMC): Flat at first, surges near capacity -->
  <path class="smc-curve" d="M 80 270 L 280 270 Q 400 260 480 80"/>
  <text class="text-title" x="485" y="80">SMC (Capacity Limit)</text>

  <!-- Off-Peak Equilibrium: MR_OP cuts SMC at (165, 270) -> Price P_OP on D_OP at (165, 235) -->
  <circle class="point-dot" cx="165" cy="235" r="5"/>
  <line class="guide-line" x1="80" y1="235" x2="165" y2="235"/>
  <line class="guide-line" x1="165" y1="235" x2="165" y2="370"/>
  <text class="text-label" x="30" y="240">P_OffPeak</text>
  <text class="text-label" x="145" y="395">Q_OffPeak</text>

  <!-- Peak Equilibrium: MR_Peak cuts SMC at (320, 270) -> Price P_Peak on D_Peak at (320, 195) -->
  <circle class="point-dot" cx="320" cy="195" r="6"/>
  <line class="guide-line" x1="80" y1="195" x2="320" y2="195"/>
  <line class="guide-line" x1="320" y1="195" x2="320" y2="370"/>
  <text class="text-label" x="30" y="200">P_Peak</text>
  <text class="text-label" x="310" y="395">Q_Peak</text>

  <!-- Summary Note Box -->
  <g transform="translate(420, 150)">
    <rect class="card" width="240" height="110"/>
    <text class="text-label" x="14" y="24">Peak Pricing Rules:</text>
    <text class="text-sub" x="14" y="44">1. High Season/Hours: P_Peak ↑</text>
    <text class="text-sub" x="14" y="62">2. Low Season/Hours: P_OffPeak ↓</text>
    <text class="text-sub" x="14" y="80">3. Rations limited capacity</text>
    <text class="text-sub" x="14" y="98">4. Prevents congestion failure</text>
  </g>
</svg>"""


def generate_transfer_pricing_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 390" width="100%" height="auto" role="img" aria-label="Transfer Pricing Mechanisms in Vertically Integrated Firms">
  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .axis { stroke: #111111; stroke-width: 2; stroke-linecap: round; }
    .curve { fill: none; stroke: #111111; stroke-width: 3; stroke-linecap: round; }
    .guide-line { stroke: #666666; stroke-width: 1.5; stroke-dasharray: 4 4; }
    .point-dot { fill: #111111; stroke: #ffffff; stroke-width: 2; }
    .text-title { font-family: 'Manrope', system-ui, sans-serif; font-size: 14px; font-weight: 800; fill: #111111; text-anchor: middle; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 12px; font-weight: 700; fill: #111111; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11px; font-weight: 600; fill: #333333; text-anchor: middle; }
    .card { fill: #ffffff; stroke: #111111; stroke-width: 1.2; rx: 8; }
  </style>

  <rect class="bg" width="100%" height="100%" rx="10"/>

  <!-- Left: Transfer Pricing with NO External Market -->
  <g transform="translate(30, 20)">
    <rect class="card" width="330" height="345"/>
    <text class="text-title" x="165" y="28">Scenario 1: No External Market</text>
    <text class="text-sub" x="165" y="46">Rule: Set Transfer Price = Upstream MC (Pt = MCu)</text>

    <line class="axis" x1="45" y1="290" x2="45" y2="70"/>
    <line class="axis" x1="45" y1="290" x2="300" y2="290"/>
    <text class="text-label" x="15" y="75">Price</text>
    <text class="text-label" x="250" y="310">Quantity</text>

    <!-- Upstream MC line -->
    <line class="curve" x1="45" y1="210" x2="280" y2="120"/>
    <text class="text-label" x="285" y="125">MC_u (Pt)</text>

    <!-- Total Marginal Cost (MC_Total = MC_u + MC_d) -->
    <line class="curve" stroke-width="3.5" x1="45" y1="150" x2="280" y2="60"/>
    <text class="text-title" x="285" y="65">MC_Total</text>

    <text class="text-sub" x="165" y="330">Avoids double marginalization</text>
  </g>

  <!-- Right: Transfer Pricing WITH Competitive External Market -->
  <g transform="translate(400, 20)">
    <rect class="card" width="330" height="345"/>
    <text class="text-title" x="165" y="28">Scenario 2: Competitive External Market</text>
    <text class="text-sub" x="165" y="46">Rule: Set Transfer Price = External Market Price (Pt = Pm)</text>

    <line class="axis" x1="45" y1="290" x2="45" y2="70"/>
    <line class="axis" x1="45" y1="290" x2="300" y2="290"/>
    <text class="text-label" x="15" y="75">Price</text>
    <text class="text-label" x="250" y="310">Quantity</text>

    <!-- Horizontal External Market Price line Pt = Pm -->
    <line class="curve" stroke-width="3.5" x1="45" y1="160" x2="280" y2="160"/>
    <text class="text-title" x="285" y="165">P_t = P_m</text>

    <!-- Upstream MC curve -->
    <path class="curve" d="M 55 250 Q 150 200 260 90"/>
    <text class="text-label" x="265" y="95">MC_u</text>

    <text class="text-sub" x="165" y="330">Divisions buy/sell excess on open market</text>
  </g>
</svg>"""


def generate_skimming_penetration_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 380" width="100%" height="auto" role="img" aria-label="Skimming Pricing vs. Penetration Pricing Trajectories">
  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .axis { stroke: #111111; stroke-width: 2; stroke-linecap: round; }
    .skim-line { fill: none; stroke: #111111; stroke-width: 3.5; stroke-linecap: round; }
    .pen-line { fill: none; stroke: #111111; stroke-width: 3.5; stroke-dasharray: 6 5; stroke-linecap: round; }
    .guide-line { stroke: #666666; stroke-width: 1.5; stroke-dasharray: 4 4; }
    .text-title { font-family: 'Manrope', system-ui, sans-serif; font-size: 15px; font-weight: 800; fill: #111111; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 13px; font-weight: 700; fill: #111111; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11.5px; font-weight: 600; fill: #333333; }
    .card { fill: #ffffff; stroke: #111111; stroke-width: 1.2; rx: 8; }
  </style>

  <rect class="bg" width="100%" height="100%" rx="10"/>
  <text class="text-title" x="40" y="32">New Product Pricing Trajectories: Skimming vs. Penetration</text>

  <!-- Axes -->
  <line class="axis" x1="80" y1="320" x2="80" y2="70"/>
  <line class="axis" x1="80" y1="320" x2="700" y2="320"/>
  <text class="text-label" x="35" y="80">Price (P)</text>
  <text class="text-label" x="620" y="345">Product Lifecycle / Time</text>
  <text class="text-label" x="65" y="335">O</text>

  <!-- 1. Skimming Trajectory (Starts High at y=90, drops to y=220) -->
  <path class="skim-line" d="M 80 95 Q 220 105 400 180 T 680 230"/>
  <text class="text-title" x="685" y="235">1. Skimming Pricing</text>
  <text class="text-label" x="90" y="90">High Launch Price (Recoup R&amp;D)</text>

  <!-- 2. Penetration Trajectory (Starts Low at y=270, rises slightly to y=230) -->
  <path class="pen-line" d="M 80 270 Q 280 270 480 250 T 680 230"/>
  <text class="text-title" x="685" y="275">2. Penetration Pricing</text>
  <text class="text-label" x="90" y="290">Low Entry Price (Mass Market Share)</text>

  <!-- Strategy Summary Cards -->
  <!-- Skimming Card -->
  <g transform="translate(180, 130)">
    <rect class="card" width="220" height="65"/>
    <text class="text-label" x="12" y="22">Skimming Strategy:</text>
    <text class="text-sub" x="12" y="38">• Price-inelastic innovators</text>
    <text class="text-sub" x="12" y="54">• High margin, low volume</text>
  </g>

  <!-- Penetration Card -->
  <g transform="translate(420, 130)">
    <rect class="card" width="220" height="65"/>
    <text class="text-label" x="12" y="22">Penetration Strategy:</text>
    <text class="text-sub" x="12" y="38">• Price-elastic mass market</text>
    <text class="text-sub" x="12" y="54">• High volume, economies of scale</text>
  </g>
</svg>"""


def main():
    (OUTPUT_DIR / "third-degree-price-discrimination-3panel.svg").write_text(generate_third_degree_discrimination_svg(), encoding="utf-8")
    (OUTPUT_DIR / "peak-load-pricing-diagram.svg").write_text(generate_peak_load_svg(), encoding="utf-8")
    (OUTPUT_DIR / "transfer-pricing-models.svg").write_text(generate_transfer_pricing_svg(), encoding="utf-8")
    (OUTPUT_DIR / "skimming-vs-penetration-lifecycles.svg").write_text(generate_skimming_penetration_svg(), encoding="utf-8")
    print("Generated 4 Black & White Unit 10 SVG diagrams successfully.")


if __name__ == "__main__":
    main()
