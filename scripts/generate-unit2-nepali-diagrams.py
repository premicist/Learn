"""Generate publication-ready clean SVG diagrams for Nepali economics unit 2.1 lessons.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "public" / "images" / "uploads"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


def generate_supply_curve_schedule_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 440" width="100%" height="auto" role="img" aria-label="Upward Sloping Supply Curve Derived from Schedule">
  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .axis { stroke: #111111; stroke-width: 2; stroke-linecap: round; }
    .supply-line { fill: none; stroke: #146b63; stroke-width: 3.5; stroke-linecap: round; }
    .guide-line { stroke: #8098ab; stroke-width: 1.2; stroke-dasharray: 4 4; }
    .point-dot { fill: #146b63; stroke: #ffffff; stroke-width: 2; }
    .text-title { font-family: 'Fraunces', Georgia, serif; font-size: 16px; font-weight: 700; fill: #122a3a; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 12.5px; font-weight: 700; fill: #122a3a; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11px; font-weight: 600; fill: #47607a; }
    .point-label { font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 700; fill: #0e4a45; }
  </style>

  <rect class="bg" width="100%" height="100%" rx="10"/>
  <text class="text-title" x="40" y="34">आपूर्ति वक्ररेखा (Supply Curve derived from Schedule)</text>
  <text class="text-sub" x="40" y="52">Direct Relationship: Higher Price (P) ⇒ Greater Quantity Supplied (Qs)</text>

  <!-- Axes -->
  <line class="axis" x1="90" y1="370" x2="90" y2="70"/>
  <line class="axis" x1="90" y1="370" x2="610" y2="370"/>
  <text class="text-label" x="30" y="78">मूल्य (रु.)</text>
  <text class="text-label" x="500" y="398">आपूर्ति परिमाण (एकाइ)</text>
  <text class="text-label" x="72" y="388">O</text>

  <!-- Supply Line SS: (176, 316) to (520, 100) -->
  <line class="supply-line" x1="130" y1="340" x2="550" y2="80"/>
  <text class="text-title" x="560" y="86" fill="#146b63">SS</text>

  <!-- Scale: Y axis: 370 is 0, 316 is 10, 262 is 20, 208 is 30, 154 is 40, 100 is 50 -->
  <!-- Scale: X axis: 90 is 0, 176 is 10, 262 is 20, 348 is 30, 434 is 40, 520 is 50 -->

  <!-- (10, 10): X=176, Y=316 -->
  <line class="guide-line" x1="90" y1="316" x2="176" y2="316"/>
  <line class="guide-line" x1="176" y1="316" x2="176" y2="370"/>
  <circle class="point-dot" cx="176" cy="316" r="5"/>
  <text class="text-label" x="65" y="321">१०</text>
  <text class="text-label" x="170" y="388">१०</text>
  <text class="point-label" x="186" y="318">A (10, 10)</text>

  <!-- (20, 20): X=262, Y=262 -->
  <line class="guide-line" x1="90" y1="262" x2="262" y2="262"/>
  <line class="guide-line" x1="262" y1="262" x2="262" y2="370"/>
  <circle class="point-dot" cx="262" cy="262" r="5"/>
  <text class="text-label" x="65" y="267">२०</text>
  <text class="text-label" x="256" y="388">२०</text>
  <text class="point-label" x="272" y="264">B (20, 20)</text>

  <!-- (30, 30): X=348, Y=208 -->
  <line class="guide-line" x1="90" y1="208" x2="348" y2="208"/>
  <line class="guide-line" x1="348" y1="208" x2="348" y2="370"/>
  <circle class="point-dot" cx="348" cy="208" r="5"/>
  <text class="text-label" x="65" y="213">३०</text>
  <text class="text-label" x="342" y="388">३०</text>
  <text class="point-label" x="358" y="210">C (30, 30)</text>

  <!-- (40, 40): X=434, Y=154 -->
  <line class="guide-line" x1="90" y1="154" x2="434" y2="154"/>
  <line class="guide-line" x1="434" y1="154" x2="434" y2="370"/>
  <circle class="point-dot" cx="434" cy="154" r="5"/>
  <text class="text-label" x="65" y="159">४०</text>
  <text class="text-label" x="428" y="388">४०</text>
  <text class="point-label" x="444" y="156">D (40, 40)</text>

  <!-- (50, 50): X=520, Y=100 -->
  <line class="guide-line" x1="90" y1="100" x2="520" y2="100"/>
  <line class="guide-line" x1="520" y1="100" x2="520" y2="370"/>
  <circle class="point-dot" cx="520" cy="100" r="5"/>
  <text class="text-label" x="65" y="105">५०</text>
  <text class="text-label" x="514" y="388">५०</text>
  <text class="point-label" x="530" y="102">E (50, 50)</text>
</svg>"""


def generate_supply_movement_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 430" width="100%" height="auto" role="img" aria-label="Movement along Supply Curve">
  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .axis { stroke: #111111; stroke-width: 2; stroke-linecap: round; }
    .supply-line { fill: none; stroke: #146b63; stroke-width: 3.5; stroke-linecap: round; }
    .guide-line { stroke: #8098ab; stroke-width: 1.2; stroke-dasharray: 4 4; }
    .point-dot { fill: #146b63; stroke: #ffffff; stroke-width: 2; }
    .text-title { font-family: 'Fraunces', Georgia, serif; font-size: 16px; font-weight: 700; fill: #122a3a; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 12.5px; font-weight: 700; fill: #122a3a; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11px; font-weight: 600; fill: #47607a; }
  </style>

  <rect class="bg" width="100%" height="100%" rx="10"/>
  <text class="text-title" x="40" y="34">आपूर्ति रेखामा हुने चाल (Movement Along Supply Curve)</text>
  <text class="text-sub" x="40" y="52">मूल्य परिवर्तन हुँदा एउटै आपूर्ति रेखामा हुने विस्तार (Extension) र सङ्कुचन (Contraction)</text>

  <!-- Axes -->
  <line class="axis" x1="90" y1="360" x2="90" y2="70"/>
  <line class="axis" x1="90" y1="360" x2="610" y2="360"/>
  <text class="text-label" x="35" y="78">मूल्य (P)</text>
  <text class="text-label" x="510" y="388">आपूर्ति परिमाण (Q)</text>
  <text class="text-label" x="72" y="378">O</text>

  <!-- Supply Line SS -->
  <line class="supply-line" x1="140" y1="320" x2="520" y2="100"/>
  <text class="text-title" x="530" y="105" fill="#146b63">SS</text>

  <!-- Point A: Initial State (P0, Q0) at (330, 210) -->
  <line class="guide-line" x1="90" y1="210" x2="330" y2="210"/>
  <line class="guide-line" x1="330" y1="210" x2="330" y2="360"/>
  <circle class="point-dot" cx="330" cy="210" r="6"/>
  <text class="text-label" x="55" y="215">P₀</text>
  <text class="text-label" x="325" y="380">Q₀</text>
  <text class="text-label" x="345" y="215">A (प्रारम्भिक बिन्दु)</text>

  <!-- Point B: Extension of Supply (P1, Q1) at (450, 140) -->
  <line class="guide-line" x1="90" y1="140" x2="450" y2="140"/>
  <line class="guide-line" x1="450" y1="140" x2="450" y2="360"/>
  <circle class="point-dot" cx="450" cy="140" r="6"/>
  <text class="text-label" x="55" y="145">P₁</text>
  <text class="text-label" x="445" y="380">Q₁</text>
  <text class="text-label" x="465" y="145" fill="#146b63">B (आपूर्तिको विस्तार)</text>

  <!-- Point C: Contraction of Supply (P2, Q2) at (210, 280) -->
  <line class="guide-line" x1="90" y1="280" x2="210" y2="280"/>
  <line class="guide-line" x1="210" y1="280" x2="210" y2="360"/>
  <circle class="point-dot" cx="210" cy="280" r="6"/>
  <text class="text-label" x="55" y="285">P₂</text>
  <text class="text-label" x="205" y="380">Q₂</text>
  <text class="text-label" x="225" y="285" fill="#b23a2b">C (आपूर्तिको सङ्कुचन)</text>

  <!-- Movement Arrows -->
  <!-- A to B (Upward - Extension) -->
  <line x1="350" y1="195" x2="415" y2="160" stroke="#146b63" stroke-width="2.5"/>
  <polygon points="423,155 410,157 416,168" fill="#146b63"/>
  <text class="text-sub" x="330" y="168" fill="#146b63">विस्तार (P↑ ⇒ Qs↑)</text>

  <!-- A to C (Downward - Contraction) -->
  <line x1="310" y1="225" x2="245" y2="260" stroke="#b23a2b" stroke-width="2.5"/>
  <polygon points="237,265 250,263 244,252" fill="#b23a2b"/>
  <text class="text-sub" x="200" y="245" fill="#b23a2b">सङ्कुचन (P↓ ⇒ Qs↓)</text>
</svg>"""


def generate_market_equilibrium_detailed_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 460" width="100%" height="auto" role="img" aria-label="Market Equilibrium with Surplus and Shortage Zones">
  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .axis { stroke: #111111; stroke-width: 2; stroke-linecap: round; }
    .demand-line { fill: none; stroke: #146b63; stroke-width: 3.5; stroke-linecap: round; }
    .supply-line { fill: none; stroke: #b4872a; stroke-width: 3.5; stroke-linecap: round; }
    .guide-line { stroke: #8098ab; stroke-width: 1.5; stroke-dasharray: 4 4; }
    .point-dot { fill: #122a3a; stroke: #ffffff; stroke-width: 2.5; }
    .zone-surplus { fill: rgba(180, 135, 42, 0.12); stroke: #b4872a; stroke-width: 1; stroke-dasharray: 3 3; }
    .zone-shortage { fill: rgba(20, 107, 99, 0.12); stroke: #146b63; stroke-width: 1; stroke-dasharray: 3 3; }
    .text-title { font-family: 'Fraunces', Georgia, serif; font-size: 16px; font-weight: 700; fill: #122a3a; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 12.5px; font-weight: 700; fill: #122a3a; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11px; font-weight: 600; fill: #47607a; }
    .zone-tag { font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 700; }
  </style>

  <rect class="bg" width="100%" height="100%" rx="10"/>
  <text class="text-title" x="40" y="34">बजार सन्तुलन, अतिरिक्त आपूर्ति र अतिरिक्त माग (Market Equilibrium)</text>
  <text class="text-sub" x="40" y="52">Intersection of Demand (DD) &amp; Supply (SS) at Equilibrium Point E (Pe, Qe)</text>

  <!-- Axes -->
  <line class="axis" x1="90" y1="390" x2="90" y2="70"/>
  <line class="axis" x1="90" y1="390" x2="630" y2="390"/>
  <text class="text-label" x="25" y="78">मूल्य (P)</text>
  <text class="text-label" x="510" y="415">माग र आपूर्ति परिमाण (Q)</text>
  <text class="text-label" x="72" y="405">O</text>

  <!-- Demand Line DD: (140, 100) to (540, 360) -->
  <line class="demand-line" x1="140" y1="100" x2="540" y2="360"/>
  <text class="text-title" x="550" y="366" fill="#146b63">DD (माग रेखा)</text>

  <!-- Supply Line SS: (140, 360) to (540, 100) -->
  <line class="supply-line" x1="140" y1="360" x2="540" y2="100"/>
  <text class="text-title" x="550" y="106" fill="#b4872a">SS (आपूर्ति रेखा)</text>

  <!-- Equilibrium Point E at (340, 230) -->
  <line class="guide-line" x1="90" y1="230" x2="340" y2="230"/>
  <line class="guide-line" x1="340" y1="230" x2="340" y2="390"/>
  <circle class="point-dot" cx="340" cy="230" r="7"/>
  <text class="text-label" x="45" y="235">Pₑ (३०)</text>
  <text class="text-label" x="330" y="410">Qₑ (३०)</text>
  <text class="text-title" x="355" y="226" fill="#122a3a">E (सन्तुलन बिन्दु)</text>

  <!-- Higher Price P1 (40) at Y=165 => Surplus Zone -->
  <line class="guide-line" x1="90" y1="165" x2="440" y2="165"/>
  <text class="text-label" x="45" y="170" fill="#b4872a">P₁ (४०)</text>
  <circle cx="240" cy="165" r="5" fill="#146b63"/>
  <circle cx="440" cy="165" r="5" fill="#b4872a"/>

  <!-- Surplus polygon between Y=165 and E(340,230) -->
  <polygon points="240,165 440,165 340,230" class="zone-surplus"/>
  <text class="zone-tag" x="275" y="152" fill="#785206">अतिरिक्त आपूर्ति (Surplus: Qs &gt; Qd)</text>
  <text class="text-sub" x="295" y="185" fill="#785206">मूल्य घट्ने दबाब ↓</text>

  <!-- Lower Price P2 (20) at Y=295 => Shortage Zone -->
  <line class="guide-line" x1="90" y1="295" x2="440" y2="295"/>
  <text class="text-label" x="45" y="300" fill="#146b63">P₂ (२०)</text>
  <circle cx="240" cy="295" r="5" fill="#b4872a"/>
  <circle cx="440" cy="295" r="5" fill="#146b63"/>

  <!-- Shortage polygon between E(340,230) and Y=295 -->
  <polygon points="340,230 240,295 440,295" class="zone-shortage"/>
  <text class="zone-tag" x="280" y="315" fill="#0e4a45">अतिरिक्त माग (Shortage: Qd &gt; Qs)</text>
  <text class="text-sub" x="300" y="280" fill="#0e4a45">मूल्य बढ्ने दबाब ↑</text>
</svg>"""


def generate_candy_equilibrium_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 480" width="100%" height="auto" role="img" aria-label="Candy Market Equilibrium Diagram">
  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .axis { stroke: #111111; stroke-width: 2; stroke-linecap: round; }
    .demand-line { fill: none; stroke: #146b63; stroke-width: 3.5; stroke-linecap: round; }
    .supply-line { fill: none; stroke: #b4872a; stroke-width: 3.5; stroke-linecap: round; }
    .guide-line { stroke: #8098ab; stroke-width: 1.2; stroke-dasharray: 4 4; }
    .point-dot { fill: #122a3a; stroke: #ffffff; stroke-width: 2.5; }
    .point-d { fill: #146b63; stroke: #ffffff; stroke-width: 2; }
    .point-s { fill: #b4872a; stroke: #ffffff; stroke-width: 2; }
    .zone-surplus { fill: rgba(180, 135, 42, 0.12); stroke: #b4872a; stroke-width: 1; stroke-dasharray: 3 3; }
    .zone-shortage { fill: rgba(20, 107, 99, 0.12); stroke: #146b63; stroke-width: 1; stroke-dasharray: 3 3; }
    .text-title { font-family: 'Fraunces', Georgia, serif; font-size: 16px; font-weight: 700; fill: #122a3a; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 12.5px; font-weight: 700; fill: #122a3a; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11px; font-weight: 600; fill: #47607a; }
    .point-label { font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 700; }
  </style>

  <rect class="bg" width="100%" height="100%" rx="10"/>
  <text class="text-title" x="40" y="34">चकलेटको बजार माग र आपूर्ति सन्तुलन (Market Equilibrium of Candy)</text>
  <text class="text-sub" x="40" y="52">समीकरण: Qd = 300 - 20P र Qs = 20P - 100 ⇒ सन्तुलन बिन्दु E (Pe = रु. १०, Qe = १०० चकलेट)</text>

  <!-- Axes: Origin O at (100, 400) -->
  <line class="axis" x1="100" y1="400" x2="100" y2="60"/>
  <line class="axis" x1="100" y1="400" x2="660" y2="400"/>
  <text class="text-label" x="35" y="70">मूल्य (रु.)</text>
  <text class="text-label" x="530" y="428">चकलेटको परिमाण (एकाइ)</text>
  <text class="text-label" x="82" y="416">O</text>

  <!-- Price Ticks on Y-axis (Y = 400 - P*18) -->
  <line class="axis" x1="95" y1="310" x2="100" y2="310"/>
  <text class="text-label" x="72" y="315">५</text>

  <line class="axis" x1="95" y1="256" x2="100" y2="256"/>
  <text class="text-label" x="72" y="261">८</text>

  <line class="axis" x1="95" y1="220" x2="100" y2="220"/>
  <text class="text-label" x="55" y="225" fill="#0e4a45">१० (Pe)</text>

  <line class="axis" x1="95" y1="184" x2="100" y2="184"/>
  <text class="text-label" x="70" y="189">१२</text>

  <line class="axis" x1="95" y1="130" x2="100" y2="130"/>
  <text class="text-label" x="70" y="135">१५</text>

  <!-- Quantity Ticks on X-axis (X = 100 + Q*2.2) -->
  <line class="axis" x1="232" y1="400" x2="232" y2="405"/>
  <text class="text-label" x="224" y="422">६०</text>

  <line class="axis" x1="320" y1="400" x2="320" y2="405"/>
  <text class="text-label" x="305" y="422" fill="#0e4a45">१०० (Qe)</text>

  <line class="axis" x1="408" y1="400" x2="408" y2="405"/>
  <text class="text-label" x="398" y="422">१४०</text>

  <line class="axis" x1="540" y1="400" x2="540" y2="405"/>
  <text class="text-label" x="530" y="422">२००</text>

  <!-- Demand Line DD: from (100, 130) to (584, 328) - DOES NOT TOUCH X-AXIS -->
  <line class="demand-line" x1="100" y1="130" x2="584" y2="328"/>
  <text class="text-title" x="595" y="334" fill="#146b63">DD (Qd = 300 - 20P)</text>

  <!-- Supply Line SS: from (100, 310) to (584, 112) -->
  <line class="supply-line" x1="100" y1="310" x2="584" y2="112"/>
  <text class="text-title" x="595" y="118" fill="#b4872a">SS (Qs = 20P - 100)</text>

  <!-- Surplus Shaded Polygon at P=12 (between Qd=60 and Qs=140 to Point E) -->
  <polygon points="232,184 408,184 320,220" class="zone-surplus"/>
  <text class="point-label" x="260" y="174" fill="#785206">अतिरिक्त आपूर्ति (Surplus = 80)</text>

  <!-- Shortage Shaded Polygon at P=8 (between Point E and Qs=60 to Qd=140) -->
  <polygon points="320,220 232,256 408,256" class="zone-shortage"/>
  <text class="point-label" x="262" y="274" fill="#0e4a45">अतिरिक्त माग (Shortage = 80)</text>

  <!-- Equilibrium Point E at (320, 220) => (Q=100, P=10) -->
  <line class="guide-line" x1="100" y1="220" x2="320" y2="220"/>
  <line class="guide-line" x1="320" y1="220" x2="320" y2="400"/>
  <circle class="point-dot" cx="320" cy="220" r="7"/>
  <text class="text-title" x="335" y="214" fill="#122a3a">E (100, 10)</text>
  <text class="text-sub" x="335" y="230" fill="#0e4a45">सन्तुलन बिन्दु</text>

  <!-- P = 12 Guide Lines: Qd=60 at (232, 184) and Qs=140 at (408, 184) -->
  <line class="guide-line" x1="100" y1="184" x2="408" y2="184"/>
  <line class="guide-line" x1="232" y1="184" x2="232" y2="400"/>
  <line class="guide-line" x1="408" y1="184" x2="408" y2="400"/>
  <circle class="point-d" cx="232" cy="184" r="5.5"/>
  <circle class="point-s" cx="408" cy="184" r="5.5"/>

  <!-- P = 8 Guide Lines: Qs=60 at (232, 256) and Qd=140 at (408, 256) -->
  <line class="guide-line" x1="100" y1="256" x2="408" y2="256"/>
  <line class="guide-line" x1="232" y1="256" x2="232" y2="400"/>
  <line class="guide-line" x1="408" y1="256" x2="408" y2="400"/>
  <circle class="point-s" cx="232" cy="256" r="5.5"/>
  <circle class="point-d" cx="408" cy="256" r="5.5"/>

  <!-- P = 15 Endpoints: Qd=0 at (100, 130), Qs=200 at (540, 130) -->
  <line class="guide-line" x1="100" y1="130" x2="540" y2="130"/>
  <line class="guide-line" x1="540" y1="130" x2="540" y2="400"/>
  <circle class="point-d" cx="100" cy="130" r="5.5"/>
  <circle class="point-s" cx="540" cy="130" r="5.5"/>

  <!-- P = 5 Endpoints: Qs=0 at (100, 310), Qd=200 at (540, 310) -->
  <line class="guide-line" x1="100" y1="310" x2="540" y2="310"/>
  <line class="guide-line" x1="540" y1="310" x2="540" y2="400"/>
  <circle class="point-s" cx="100" cy="310" r="5.5"/>
  <circle class="point-d" cx="540" cy="310" r="5.5"/>
</svg>"""


def generate_rubber_band_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 320" width="100%" height="auto" role="img" aria-label="Rubber Band Analogy for Elasticity">
  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .card-bg { fill: #f6f8f7; stroke: #dde5e2; stroke-width: 1.5; }
    .elastic-band { fill: none; stroke: #146b63; stroke-width: 8; stroke-linecap: round; }
    .inelastic-cord { fill: none; stroke: #b23a2b; stroke-width: 8; stroke-linecap: round; }
    .arrow { stroke: #122a3a; stroke-width: 2.5; fill: #122a3a; }
    .text-title { font-family: 'Fraunces', Georgia, serif; font-size: 16px; font-weight: 700; fill: #122a3a; }
    .text-card-title { font-family: 'Fraunces', Georgia, serif; font-size: 14.5px; font-weight: 700; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 12px; font-weight: 700; fill: #122a3a; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11px; font-weight: 600; fill: #47607a; }
    .tag { font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 700; }
  </style>

  <rect class="bg" width="100%" height="100%" rx="10"/>
  <text class="text-title" x="35" y="32">लोचको भौतिक दृष्टान्त: रबर ब्यान्डको उदाहरण (Rubber Band Analogy)</text>
  <text class="text-sub" x="35" y="50">लोच (Elasticity) भनेको बाह्य बल (मूल्य) ले पार्ने प्रभाव अनुसार वस्तुको परिमाणमा आउने तन्काइ वा लचकता हो।</text>

  <!-- Panel 1: Highly Elastic (Flexible Rubber) -->
  <g transform="translate(35, 68)">
    <rect class="card-bg" width="300" height="225" rx="8"/>
    <text class="text-card-title" x="20" y="28" fill="#146b63">१. लोचदार अवस्था (Elastic: Ep &gt; 1)</text>
    <text class="tag" x="20" y="46" fill="#0e4a45">नरम रबर ब्यान्ड (Highly Stretchable)</text>

    <!-- Normal Band State -->
    <text class="text-sub" x="20" y="80">सुरुको अवस्था (Initial):</text>
    <path d="M 120 76 Q 150 60 180 76 Q 150 92 120 76" class="elastic-band" opacity="0.4"/>

    <!-- Stretched Band State -->
    <text class="text-sub" x="20" y="130">मूल्य परिवर्तन हुँदा (Stretched):</text>
    <path d="M 60 135 Q 150 100 240 135 Q 150 170 60 135" class="elastic-band"/>

    <!-- Pull arrows -->
    <line x1="50" y1="135" x2="30" y2="135" class="arrow"/>
    <polygon points="25,135 35,130 35,140" fill="#122a3a"/>
    <line x1="250" y1="135" x2="270" y2="135" class="arrow"/>
    <polygon points="275,135 265,130 265,140" fill="#122a3a"/>

    <text class="text-label" x="20" y="195" fill="#146b63">सानो मूल्य परिवर्तन (ΔP) ⇒ धेरै ठूलो माग परिवर्तन (ΔQ)</text>
    <text class="text-sub" x="20" y="212">उदाहरण: विलासिताका सामान (कार, सुन, स्मार्टफोन)</text>
  </g>

  <!-- Panel 2: Highly Inelastic (Stiff / Rigid Cord) -->
  <g transform="translate(365, 68)">
    <rect class="card-bg" width="300" height="225" rx="8"/>
    <text class="text-card-title" x="20" y="28" fill="#b23a2b">२. बेलोचदार अवस्था (Inelastic: Ep &lt; 1)</text>
    <text class="tag" x="20" y="46" fill="#781d13">कडा डोरी (Rigid Cord / Stiff Band)</text>

    <!-- Normal Cord State -->
    <text class="text-sub" x="20" y="80">सुरुको अवस्था (Initial):</text>
    <path d="M 120 76 Q 150 60 180 76 Q 150 92 120 76" class="inelastic-cord" opacity="0.4"/>

    <!-- Stretched Cord State (Hardly Stretches) -->
    <text class="text-sub" x="20" y="130">मूल्य परिवर्तन हुँदा (Resists Stretch):</text>
    <path d="M 110 135 Q 150 115 190 135 Q 150 155 110 135" class="inelastic-cord"/>

    <!-- Pull arrows -->
    <line x1="100" y1="135" x2="70" y2="135" class="arrow"/>
    <polygon points="65,135 75,130 75,140" fill="#122a3a"/>
    <line x1="200" y1="135" x2="230" y2="135" class="arrow"/>
    <polygon points="235,135 225,130 225,140" fill="#122a3a"/>

    <text class="text-label" x="20" y="195" fill="#b23a2b">ठूलो मूल्य परिवर्तन (ΔP) ⇒ थोरै मात्र माग परिवर्तन (ΔQ)</text>
    <text class="text-sub" x="20" y="212">उदाहरण: अत्यावश्यक वस्तुहरू (नुन, खाद्यान्न, औषधि)</text>
  </g>
</svg>"""


def generate_consumer_producer_surplus_nepali_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 460" width="100%" height="auto" role="img" aria-label="Consumer Surplus and Producer Surplus in Market Equilibrium">
  <defs>
    <pattern id="pat-cs" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="8" stroke="#146b63" stroke-width="1.8" />
    </pattern>
    <pattern id="pat-ps" width="8" height="8" patternTransform="rotate(-45 0 0)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="8" stroke="#b4872a" stroke-width="1.8" />
    </pattern>
  </defs>

  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .axis { stroke: #111111; stroke-width: 2; stroke-linecap: round; }
    .demand-line { fill: none; stroke: #146b63; stroke-width: 3.5; stroke-linecap: round; }
    .supply-line { fill: none; stroke: #b4872a; stroke-width: 3.5; stroke-linecap: round; }
    .guide-line { stroke: #8098ab; stroke-width: 1.5; stroke-dasharray: 4 4; }
    .point-dot { fill: #122a3a; stroke: #ffffff; stroke-width: 2.5; }
    .zone-cs { fill: url(#pat-cs); opacity: 0.85; }
    .zone-ps { fill: url(#pat-ps); opacity: 0.85; }
    .text-title { font-family: 'Fraunces', Georgia, serif; font-size: 16px; font-weight: 700; fill: #122a3a; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 12.5px; font-weight: 700; fill: #122a3a; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11px; font-weight: 600; fill: #47607a; }
    .legend-box { fill: #f6f8f7; stroke: #dde5e2; stroke-width: 1.2; rx: 8; }
  </style>

  <rect class="bg" width="100%" height="100%" rx="10"/>
  <text class="text-title" x="40" y="34">बजार सन्तुलनमा उपभोक्ताको बचत र उत्पादकको बचत (CS &amp; PS in Equilibrium)</text>
  <text class="text-sub" x="40" y="52">कुल सामाजिक कल्याण (Total Social Welfare) = उपभोक्ताको बचत (CS) + उत्पादकको बचत (PS)</text>

  <!-- Axes: Origin at (90, 390) -->
  <line class="axis" x1="90" y1="390" x2="90" y2="70"/>
  <line class="axis" x1="90" y1="390" x2="640" y2="390"/>
  <text class="text-label" x="25" y="78">मूल्य (P)</text>
  <text class="text-label" x="510" y="415">माग र आपूर्ति परिमाण (Q)</text>
  <text class="text-label" x="72" y="405">O</text>

  <!-- Intercepts: Demand from (90, 90) to (530, 370), Supply from (90, 370) to (530, 90) -->
  <!-- Equilibrium Point E at (310, 230) -->

  <!-- Shaded Triangle 1: Consumer Surplus (90, 90) -> (310, 230) -> (90, 230) -->
  <polygon points="90,90 310,230 90,230" class="zone-cs"/>

  <!-- Shaded Triangle 2: Producer Surplus (90, 370) -> (310, 230) -> (90, 230) -->
  <polygon points="90,370 310,230 90,230" class="zone-ps"/>

  <!-- Demand Line DD -->
  <line class="demand-line" x1="90" y1="90" x2="520" y2="365"/>
  <text class="text-title" x="530" y="372" fill="#146b63">DD (माग रेखा)</text>
  <text class="text-label" x="65" y="95">A (P_max)</text>

  <!-- Supply Line SS -->
  <line class="supply-line" x1="90" y1="370" x2="520" y2="95"/>
  <text class="text-title" x="530" y="102" fill="#b4872a">SS (आपूर्ति रेखा)</text>
  <text class="text-label" x="65" y="375">B (P_min)</text>

  <!-- Equilibrium Guide Lines -->
  <line class="guide-line" x1="90" y1="230" x2="310" y2="230"/>
  <line class="guide-line" x1="310" y1="230" x2="310" y2="390"/>
  <circle class="point-dot" cx="310" cy="230" r="7"/>
  <text class="text-title" x="325" y="224" fill="#122a3a">E (सन्तुलन बिन्दु)</text>
  <text class="text-label" x="42" y="235">Pₑ (सन्तुलन मूल्य)</text>
  <text class="text-label" x="270" y="415">Qₑ (सन्तुलन परिमाण)</text>

  <!-- Legend Box -->
  <g transform="translate(390, 150)">
    <rect class="legend-box" width="280" height="145"/>
    <text class="text-label" x="18" y="24">कुल आर्थिक बचतको बाँडफाँट:</text>

    <!-- CS Legend -->
    <rect x="18" y="38" width="22" height="22" class="zone-cs" stroke="#146b63"/>
    <text class="text-label" x="48" y="48" fill="#0e4a45">१. उपभोक्ताको बचत (CS)</text>
    <text class="text-sub" x="48" y="62">क्षेत्रफल: त्रिभुज A-E-Pₑ (क्रेताको फाइदा)</text>

    <!-- PS Legend -->
    <rect x="18" y="80" width="22" height="22" class="zone-ps" stroke="#b4872a"/>
    <text class="text-label" x="48" y="90" fill="#785206">२. उत्पादकको बचत (PS)</text>
    <text class="text-sub" x="48" y="104">क्षेत्रफल: त्रिभुज Pₑ-E-B (बिक्रेताको फाइदा)</text>

    <!-- Total Welfare Line -->
    <text class="text-label" x="18" y="132" fill="#122a3a">कुल सामाजिक कल्याण = CS + PS (त्रिभुज A-E-B)</text>
  </g>
</svg>"""


def main():
    (OUTPUT_DIR / "supply-curve-schedule.svg").write_text(generate_supply_curve_schedule_svg(), encoding="utf-8")
    (OUTPUT_DIR / "supply-movement-along-curve.svg").write_text(generate_supply_movement_svg(), encoding="utf-8")
    (OUTPUT_DIR / "market-equilibrium-detailed.svg").write_text(generate_market_equilibrium_detailed_svg(), encoding="utf-8")
    (OUTPUT_DIR / "candy-market-equilibrium.svg").write_text(generate_candy_equilibrium_svg(), encoding="utf-8")
    (OUTPUT_DIR / "rubber-band-elasticity-analogy.svg").write_text(generate_rubber_band_svg(), encoding="utf-8")
    (OUTPUT_DIR / "consumer-producer-surplus-nepali.svg").write_text(generate_consumer_producer_surplus_nepali_svg(), encoding="utf-8")
    print("Generated unit 2.1, 2.2 and 2.3 detailed SVG diagrams successfully.")


if __name__ == "__main__":
    main()


