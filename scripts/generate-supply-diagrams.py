"""Generate publication-ready Black & White SVG diagrams for Unit 5 Supply.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "public" / "images" / "uploads"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


def generate_supply_curve_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 420" width="100%" height="auto" role="img" aria-label="Upward Sloping Supply Curve and Movement Along the Curve">
  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .axis { stroke: #111111; stroke-width: 2; stroke-linecap: round; }
    .supply-line { fill: none; stroke: #111111; stroke-width: 3.5; stroke-linecap: round; }
    .guide-line { stroke: #666666; stroke-width: 1.5; stroke-dasharray: 4 4; }
    .point-dot { fill: #111111; stroke: #ffffff; stroke-width: 2; }
    .text-title { font-family: 'Manrope', system-ui, sans-serif; font-size: 15px; font-weight: 800; fill: #111111; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 12.5px; font-weight: 700; fill: #111111; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11px; font-weight: 600; fill: #444444; }
  </style>

  <rect class="bg" width="100%" height="100%" rx="10"/>
  <text class="text-title" x="40" y="32">The Upward-Sloping Supply Curve (SS)</text>
  <text class="text-sub" x="40" y="50">Direct Relationship: Higher Price (P) =&gt; Greater Quantity Supplied (Qs)</text>

  <!-- Axes -->
  <line class="axis" x1="80" y1="360" x2="80" y2="70"/>
  <line class="axis" x1="80" y1="360" x2="600" y2="360"/>
  <text class="text-label" x="40" y="80">Price (P)</text>
  <text class="text-label" x="530" y="385">Quantity Supplied (Q)</text>
  <text class="text-label" x="65" y="375">O</text>

  <!-- Supply Line from (120, 320) to (520, 100) -->
  <line class="supply-line" x1="120" y1="320" x2="520" y2="100"/>
  <text class="text-title" x="530" y="95">SS</text>

  <!-- Point A: Lower price (200, 276) -->
  <line class="guide-line" x1="80" y1="276" x2="200" y2="276"/>
  <line class="guide-line" x1="200" y1="276" x2="200" y2="360"/>
  <circle class="point-dot" cx="200" cy="276" r="6"/>
  <text class="text-label" x="50" y="280">P₁</text>
  <text class="text-label" x="195" y="380">Q₁</text>
  <text class="text-label" x="210" y="272">A (Initial State)</text>

  <!-- Point C: Higher price (440, 144) -->
  <line class="guide-line" x1="80" y1="144" x2="440" y2="144"/>
  <line class="guide-line" x1="440" y1="144" x2="440" y2="360"/>
  <circle class="point-dot" cx="440" cy="144" r="6"/>
  <text class="text-label" x="50" y="148">P₂</text>
  <text class="text-label" x="435" y="380">Q₂</text>
  <text class="text-label" x="450" y="140">C (Expansion)</text>

  <!-- Movement arrow -->
  <line x1="240" y1="245" x2="380" y2="175" stroke="#111111" stroke-width="2"/>
  <polygon points="385,170 373,172 380,183" fill="#111111"/>
  <text class="text-sub" x="320" y="220" transform="rotate(-28 320 220)">Extension of Supply (P ↑ ⇒ Qs ↑)</text>
</svg>"""


def generate_supply_shifts_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 420" width="100%" height="auto" role="img" aria-label="Shifts in the Supply Curve">
  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .axis { stroke: #111111; stroke-width: 2; stroke-linecap: round; }
    .curve-base { fill: none; stroke: #111111; stroke-width: 3; stroke-linecap: round; }
    .curve-right { fill: none; stroke: #111111; stroke-width: 3; stroke-linecap: round; }
    .curve-left { fill: none; stroke: #111111; stroke-width: 3; stroke-dasharray: 6 5; stroke-linecap: round; }
    .guide-line { stroke: #666666; stroke-width: 1.5; stroke-dasharray: 4 4; }
    .text-title { font-family: 'Manrope', system-ui, sans-serif; font-size: 15px; font-weight: 800; fill: #111111; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 12.5px; font-weight: 700; fill: #111111; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11px; font-weight: 600; fill: #333333; }
  </style>

  <rect class="bg" width="100%" height="100%" rx="10"/>
  <text class="text-title" x="40" y="32">Shifts in the Supply Curve (Changes in Supply)</text>
  <text class="text-sub" x="40" y="50">Caused by non-price factors (input costs, technology, subsidies, taxes) at constant price P₀</text>

  <!-- Axes -->
  <line class="axis" x1="80" y1="360" x2="80" y2="70"/>
  <line class="axis" x1="80" y1="360" x2="620" y2="360"/>
  <text class="text-label" x="40" y="80">Price (P)</text>
  <text class="text-label" x="540" y="385">Quantity Supplied (Q)</text>
  <text class="text-label" x="65" y="375">O</text>

  <!-- 1. Leftward Shift (S2 - Decrease in Supply) -->
  <line class="curve-left" x1="90" y1="260" x2="350" y2="90"/>
  <text class="text-title" x="355" y="85">S₂ (Decrease)</text>

  <!-- 2. Baseline Curve (S0) -->
  <line class="curve-base" x1="180" y1="340" x2="470" y2="90"/>
  <text class="text-title" x="475" y="85">S₀ (Initial)</text>

  <!-- 3. Rightward Shift (S1 - Increase in Supply) -->
  <line class="curve-right" x1="280" y1="340" x2="580" y2="100"/>
  <text class="text-title" x="585" y="95">S₁ (Increase)</text>

  <!-- Fixed Price Line at y=200 -->
  <line class="guide-line" x1="80" y1="200" x2="520" y2="200"/>
  <text class="text-label" x="50" y="204">P₀</text>

  <!-- Quantity markers -->
  <circle cx="180" cy="200" r="5" fill="#111111"/>
  <line class="guide-line" x1="180" y1="200" x2="180" y2="360"/>
  <text class="text-label" x="175" y="380">Q₂</text>

  <circle cx="340" cy="200" r="5" fill="#111111"/>
  <line class="guide-line" x1="340" y1="200" x2="340" y2="360"/>
  <text class="text-label" x="335" y="380">Q₀</text>

  <circle cx="460" cy="200" r="5" fill="#111111"/>
  <line class="guide-line" x1="460" y1="200" x2="460" y2="360"/>
  <text class="text-label" x="455" y="380">Q₁</text>

  <!-- Shift arrows -->
  <!-- Rightward arrow -->
  <line x1="355" y1="200" x2="445" y2="200" stroke="#111111" stroke-width="2.5"/>
  <polygon points="450,200 440,195 440,205" fill="#111111"/>
  <text class="text-sub" x="365" y="190">Increase (S₀ → S₁)</text>

  <!-- Leftward arrow -->
  <line x1="325" y1="200" x2="195" y2="200" stroke="#111111" stroke-width="2.5"/>
  <polygon points="190,200 200,195 200,205" fill="#111111"/>
  <text class="text-sub" x="210" y="190">Decrease (S₀ → S₂)</text>
</svg>"""


def generate_five_degrees_supply_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 240" width="100%" height="auto" role="img" aria-label="Five Degrees of Price Elasticity of Supply">
  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .axis { stroke: #111111; stroke-width: 1.8; stroke-linecap: round; }
    .line { fill: none; stroke: #111111; stroke-width: 2.5; stroke-linecap: round; }
    .text-title { font-family: 'Manrope', system-ui, sans-serif; font-size: 13px; font-weight: 800; fill: #111111; text-anchor: middle; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 11px; font-weight: 700; fill: #111111; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 10px; font-weight: 600; fill: #444444; text-anchor: middle; }
  </style>

  <!-- Panel 1: Perfectly Inelastic (Es = 0) -->
  <g transform="translate(10, 10)">
    <rect class="bg" width="160" height="210" rx="8"/>
    <text class="text-title" x="80" y="24">1. Perfectly Inelastic</text>
    <text class="text-sub" x="80" y="38">Es = 0 (Vertical Line)</text>
    <line class="axis" x1="25" y1="180" x2="25" y2="55"/>
    <line class="axis" x1="25" y1="180" x2="145" y2="180"/>
    <text class="text-label" x="14" y="58">P</text>
    <text class="text-label" x="140" y="195">Q</text>
    <!-- Vertical supply line -->
    <line class="line" x1="85" y1="65" x2="85" y2="180"/>
    <text class="text-sub" x="80" y="202">Fixed Output</text>
  </g>

  <!-- Panel 2: Relatively Inelastic (Es < 1) -->
  <g transform="translate(190, 10)">
    <rect class="bg" width="160" height="210" rx="8"/>
    <text class="text-title" x="80" y="24">2. Relatively Inelastic</text>
    <text class="text-sub" x="80" y="38">Es &lt; 1 (Steep, Cuts X-axis)</text>
    <line class="axis" x1="25" y1="180" x2="25" y2="55"/>
    <line class="axis" x1="25" y1="180" x2="145" y2="180"/>
    <text class="text-label" x="14" y="58">P</text>
    <text class="text-label" x="140" y="195">Q</text>
    <!-- Steep line starting on X-axis -->
    <line class="line" x1="65" y1="180" x2="125" y2="65"/>
    <text class="text-sub" x="80" y="202">%ΔQs &lt; %ΔP</text>
  </g>

  <!-- Panel 3: Unitary Elastic (Es = 1) -->
  <g transform="translate(370, 10)">
    <rect class="bg" width="160" height="210" rx="8"/>
    <text class="text-title" x="80" y="24">3. Unitary Elastic</text>
    <text class="text-sub" x="80" y="38">Es = 1 (Passes Origin)</text>
    <line class="axis" x1="25" y1="180" x2="25" y2="55"/>
    <line class="axis" x1="25" y1="180" x2="145" y2="180"/>
    <text class="text-label" x="14" y="58">P</text>
    <text class="text-label" x="140" y="195">Q</text>
    <!-- 45-degree ray through origin -->
    <line class="line" x1="25" y1="180" x2="135" y2="70"/>
    <text class="text-sub" x="80" y="202">%ΔQs = %ΔP</text>
  </g>

  <!-- Panel 4: Relatively Elastic (Es > 1) -->
  <g transform="translate(550, 10)">
    <rect class="bg" width="160" height="210" rx="8"/>
    <text class="text-title" x="80" y="24">4. Relatively Elastic</text>
    <text class="text-sub" x="80" y="38">Es &gt; 1 (Flat, Cuts Y-axis)</text>
    <line class="axis" x1="25" y1="180" x2="25" y2="55"/>
    <line class="axis" x1="25" y1="180" x2="145" y2="180"/>
    <text class="text-label" x="14" y="58">P</text>
    <text class="text-label" x="140" y="195">Q</text>
    <!-- Flat line starting on Y-axis -->
    <line class="line" x1="25" y1="140" x2="140" y2="75"/>
    <text class="text-sub" x="80" y="202">%ΔQs &gt; %ΔP</text>
  </g>

  <!-- Panel 5: Perfectly Elastic (Es = ∞) -->
  <g transform="translate(730, 10)">
    <rect class="bg" width="160" height="210" rx="8"/>
    <text class="text-title" x="80" y="24">5. Perfectly Elastic</text>
    <text class="text-sub" x="80" y="38">Es = ∞ (Horizontal Line)</text>
    <line class="axis" x1="25" y1="180" x2="25" y2="55"/>
    <line class="axis" x1="25" y1="180" x2="145" y2="180"/>
    <text class="text-label" x="14" y="58">P</text>
    <text class="text-label" x="140" y="195">Q</text>
    <!-- Horizontal supply line -->
    <line class="line" x1="25" y1="110" x2="145" y2="110"/>
    <text class="text-sub" x="80" y="202">Infinite supply at price P</text>
  </g>
</svg>"""


def generate_market_equilibrium_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 450" width="100%" height="auto" role="img" aria-label="Market Equilibrium and Price Determination">
  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .axis { stroke: #111111; stroke-width: 2; stroke-linecap: round; }
    .demand-curve { fill: none; stroke: #111111; stroke-width: 3.5; stroke-linecap: round; }
    .supply-curve { fill: none; stroke: #111111; stroke-width: 3.5; stroke-linecap: round; }
    .guide-line { stroke: #666666; stroke-width: 1.5; stroke-dasharray: 4 4; }
    .zone-line { stroke: #111111; stroke-width: 2; stroke-dasharray: 3 3; }
    .point-dot { fill: #111111; stroke: #ffffff; stroke-width: 2.5; }
    .text-title { font-family: 'Manrope', system-ui, sans-serif; font-size: 15px; font-weight: 800; fill: #111111; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 13px; font-weight: 700; fill: #111111; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11.5px; font-weight: 600; fill: #333333; }
    .badge { font-family: 'Manrope', system-ui, sans-serif; font-size: 12px; font-weight: 800; fill: #111111; }
  </style>

  <rect class="bg" width="100%" height="100%" rx="10"/>
  <text class="text-title" x="40" y="32">Market Equilibrium: Interaction of Demand and Supply</text>
  <text class="text-sub" x="40" y="50">Equilibrium occurs at Point E where Quantity Demanded equals Quantity Supplied (Qd = Qs)</text>

  <!-- Axes -->
  <line class="axis" x1="90" y1="390" x2="90" y2="70"/>
  <line class="axis" x1="90" y1="390" x2="630" y2="390"/>
  <text class="text-label" x="45" y="80">Price (P)</text>
  <text class="text-label" x="520" y="415">Quantity (Q)</text>
  <text class="text-label" x="75" y="405">O</text>

  <!-- Demand Curve (DD) from (140, 90) to (560, 370) -->
  <line class="demand-curve" x1="140" y1="90" x2="560" y2="370"/>
  <text class="text-title" x="570" y="375">DD</text>

  <!-- Supply Curve (SS) from (140, 370) to (560, 90) -->
  <line class="supply-curve" x1="140" y1="370" x2="560" y2="90"/>
  <text class="text-title" x="570" y="95">SS</text>

  <!-- Equilibrium Point E at (350, 230) -->
  <circle class="point-dot" cx="350" cy="230" r="7"/>
  <line class="guide-line" x1="90" y1="230" x2="350" y2="230"/>
  <line class="guide-line" x1="350" y1="230" x2="350" y2="390"/>
  <text class="text-label" x="55" y="235">P* (Eq. Price)</text>
  <text class="text-label" x="325" y="415">Q* (Eq. Quantity)</text>
  <text class="badge" x="365" y="225">E (Qd = Qs)</text>

  <!-- High Price (P1 = 150): Excess Supply (Surplus) -->
  <line class="guide-line" x1="90" y1="150" x2="470" y2="150"/>
  <text class="text-label" x="60" y="155">P₁</text>
  <line class="zone-line" x1="230" y1="150" x2="470" y2="150"/>
  <circle cx="230" cy="150" r="5" fill="#111111"/>
  <circle cx="470" cy="150" r="5" fill="#111111"/>
  <text class="badge" x="350" y="140" text-anchor="middle">Excess Supply (Surplus: Qs &gt; Qd)</text>
  <text class="text-sub" x="350" y="170" text-anchor="middle">↓ Downward pressure on price toward P*</text>

  <!-- Low Price (P2 = 310): Excess Demand (Shortage) -->
  <line class="guide-line" x1="90" y1="310" x2="470" y2="310"/>
  <text class="text-label" x="60" y="315">P₂</text>
  <line class="zone-line" x1="230" y1="310" x2="470" y2="310"/>
  <circle cx="230" cy="310" r="5" fill="#111111"/>
  <circle cx="470" cy="310" r="5" fill="#111111"/>
  <text class="badge" x="350" y="300" text-anchor="middle">Excess Demand (Shortage: Qd &gt; Qs)</text>
  <text class="text-sub" x="350" y="330" text-anchor="middle">↑ Upward pressure on price toward P*</text>
</svg>"""


def main():
    (OUTPUT_DIR / "law-of-supply-curve.svg").write_text(generate_supply_curve_svg(), encoding="utf-8")
    (OUTPUT_DIR / "supply-shifts.svg").write_text(generate_supply_shifts_svg(), encoding="utf-8")
    (OUTPUT_DIR / "five-degrees-supply-elasticity.svg").write_text(generate_five_degrees_supply_svg(), encoding="utf-8")
    (OUTPUT_DIR / "market-equilibrium-price-determination.svg").write_text(generate_market_equilibrium_svg(), encoding="utf-8")
    print("Generated 4 Black & White Supply SVG diagrams successfully.")


if __name__ == "__main__":
    main()
