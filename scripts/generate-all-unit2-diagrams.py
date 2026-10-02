"""Generate publication-ready clean SVG diagrams for Unit 1 and Unit 2 lessons.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "public" / "images" / "uploads"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


def generate_demand_movement_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 440" width="100%" height="auto" role="img" aria-label="Movement along Demand Curve">
  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .axis { stroke: #111111; stroke-width: 2.2; stroke-linecap: round; }
    .demand-line { fill: none; stroke: #146b63; stroke-width: 3.5; stroke-linecap: round; }
    .guide-line { stroke: #8098ab; stroke-width: 1.2; stroke-dasharray: 4 4; }
    .point-dot { fill: #146b63; stroke: #ffffff; stroke-width: 2; }
    .text-title { font-family: 'Fraunces', Georgia, serif; font-size: 16px; font-weight: 700; fill: #122a3a; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 12.5px; font-weight: 700; fill: #122a3a; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11px; font-weight: 600; fill: #47607a; }
    .badge { font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 700; }
  </style>

  <rect class="bg" width="100%" height="100%" rx="10"/>
  <text class="text-title" x="40" y="34">माग रेखामा हुने चाल (Movement Along Demand Curve)</text>
  <text class="text-sub" x="40" y="52">मूल्य परिवर्तन हुँदा एउटै माग रेखामा हुने विस्तार (Extension) र सङ्कुचन (Contraction)</text>

  <!-- Axes: Origin at (100, 370) -->
  <line class="axis" x1="100" y1="370" x2="100" y2="70"/>
  <line class="axis" x1="100" y1="370" x2="630" y2="370"/>
  <text class="text-label" x="35" y="78">मूल्य (P)</text>
  <text class="text-label" x="530" y="398">माग परिमाण (Q)</text>
  <text class="text-label" x="80" y="388">O</text>

  <!-- Demand Line DD -->
  <line class="demand-line" x1="140" y1="100" x2="560" y2="330"/>
  <text class="text-title" x="570" y="336" fill="#146b63">DD</text>

  <!-- Initial Point A (P0, Q0) at (350, 215) -->
  <line class="guide-line" x1="100" y1="215" x2="350" y2="215"/>
  <line class="guide-line" x1="350" y1="215" x2="350" y2="370"/>
  <circle class="point-dot" cx="350" cy="215" r="6"/>
  <text class="text-label" x="65" y="220">P₀</text>
  <text class="text-label" x="342" y="390">Q₀</text>
  <text class="text-label" x="365" y="210">A (प्रारम्भिक बिन्दु)</text>

  <!-- Point B: Extension of Demand (P1, Q1) at (475, 283) -->
  <line class="guide-line" x1="100" y1="283" x2="475" y2="283"/>
  <line class="guide-line" x1="475" y1="283" x2="475" y2="370"/>
  <circle class="point-dot" cx="475" cy="283" r="6"/>
  <text class="text-label" x="65" y="288">P₁</text>
  <text class="text-label" x="468" y="390">Q₁</text>
  <text class="badge" x="490" y="280" fill="#146b63">B (मागको विस्तार)</text>

  <!-- Point C: Contraction of Demand (P2, Q2) at (225, 147) -->
  <line class="guide-line" x1="100" y1="147" x2="225" y2="147"/>
  <line class="guide-line" x1="225" y1="147" x2="225" y2="370"/>
  <circle class="point-dot" cx="225" cy="147" r="6"/>
  <text class="text-label" x="65" y="152">P₂</text>
  <text class="text-label" x="218" y="390">Q₂</text>
  <text class="badge" x="240" y="142" fill="#b23a2b">C (मागको सङ्कुचन)</text>

  <!-- Movement Arrows -->
  <!-- A to B (Downward - Extension) -->
  <line x1="375" y1="235" x2="445" y2="272" stroke="#146b63" stroke-width="2.5"/>
  <polygon points="455,277 442,274 448,263" fill="#146b63"/>
  <text class="text-sub" x="400" y="252" fill="#146b63">विस्तार (P↓ ⇒ Q↑)</text>

  <!-- A to C (Upward - Contraction) -->
  <line x1="325" y1="195" x2="255" y2="158" stroke="#b23a2b" stroke-width="2.5"/>
  <polygon points="245,153 258,156 252,167" fill="#b23a2b"/>
  <text class="text-sub" x="200" y="185" fill="#b23a2b">सङ्कुचन (P↑ ⇒ Q↓)</text>
</svg>"""


def generate_demand_shifts_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 440" width="100%" height="auto" role="img" aria-label="Shift in Demand Curve">
  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .axis { stroke: #111111; stroke-width: 2.2; stroke-linecap: round; }
    .d0-line { fill: none; stroke: #122a3a; stroke-width: 3.5; stroke-linecap: round; }
    .d1-line { fill: none; stroke: #146b63; stroke-width: 3.5; stroke-linecap: round; stroke-dasharray: 6 3; }
    .d2-line { fill: none; stroke: #b23a2b; stroke-width: 3.5; stroke-linecap: round; stroke-dasharray: 6 3; }
    .guide-line { stroke: #8098ab; stroke-width: 1.2; stroke-dasharray: 4 4; }
    .point-dot { stroke: #ffffff; stroke-width: 2; }
    .text-title { font-family: 'Fraunces', Georgia, serif; font-size: 16px; font-weight: 700; fill: #122a3a; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 12.5px; font-weight: 700; fill: #122a3a; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11px; font-weight: 600; fill: #47607a; }
  </style>

  <rect class="bg" width="100%" height="100%" rx="10"/>
  <text class="text-title" x="40" y="34">माग रेखाको स्थानान्तरण (Shift in Demand Curve)</text>
  <text class="text-sub" x="40" y="52">मूल्य स्थिर (P₀) रही अन्य तत्वहरू (आम्दानी, रुचि) मा परिवर्तन हुँदा हुने वृद्धि र कमी</text>

  <!-- Axes -->
  <line class="axis" x1="100" y1="370" x2="100" y2="70"/>
  <line class="axis" x1="100" y1="370" x2="640" y2="370"/>
  <text class="text-label" x="35" y="78">मूल्य (P)</text>
  <text class="text-label" x="530" y="398">माग परिमाण (Q)</text>
  <text class="text-label" x="80" y="388">O</text>

  <!-- Constant Price Line P0 at Y=220 -->
  <line stroke="#b4872a" stroke-width="2.2" stroke-dasharray="5 5" x1="100" y1="220" x2="580" y2="220"/>
  <text class="text-label" x="45" y="225" fill="#b4872a">P₀ (स्थिर)</text>

  <!-- D2 (Decrease - Leftward Shift) -->
  <line class="d2-line" x1="100" y1="150" x2="380" y2="340"/>
  <text class="text-title" x="390" y="346" fill="#b23a2b">D₂D₂</text>
  <circle class="point-dot" fill="#b23a2b" cx="220" cy="220" r="6"/>
  <line class="guide-line" x1="220" y1="220" x2="220" y2="370"/>
  <text class="text-label" x="212" y="390" fill="#b23a2b">Q₂</text>

  <!-- D0 (Initial Demand Curve) -->
  <line class="d0-line" x1="180" y1="100" x2="500" y2="340"/>
  <text class="text-title" x="510" y="346" fill="#122a3a">D₀D₀</text>
  <circle class="point-dot" fill="#122a3a" cx="340" cy="220" r="6"/>
  <line class="guide-line" x1="340" y1="220" x2="340" y2="370"/>
  <text class="text-label" x="332" y="390">Q₀</text>

  <!-- D1 (Increase - Rightward Shift) -->
  <line class="d1-line" x1="260" y1="100" x2="580" y2="340"/>
  <text class="text-title" x="590" y="346" fill="#146b63">D₁D₁</text>
  <circle class="point-dot" fill="#146b63" cx="460" cy="220" r="6"/>
  <line class="guide-line" x1="460" y1="220" x2="460" y2="370"/>
  <text class="text-label" x="452" y="390" fill="#146b63">Q₁</text>

  <!-- Shift Arrows -->
  <!-- Right shift arrow -->
  <line x1="365" y1="160" x2="435" y2="160" stroke="#146b63" stroke-width="2.5"/>
  <polygon points="445,160 432,154 432,166" fill="#146b63"/>
  <text class="text-sub" x="445" y="164" fill="#146b63">मागमा वृद्धि (दायाँतर्फ)</text>

  <!-- Left shift arrow -->
  <line x1="315" y1="285" x2="245" y2="285" stroke="#b23a2b" stroke-width="2.5"/>
  <polygon points="235,285 248,279 248,291" fill="#b23a2b"/>
  <text class="text-sub" x="120" y="289" fill="#b23a2b">मागमा कमी (बायाँतर्फ)</text>
</svg>"""


def generate_five_degrees_price_elasticity_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 950 260" width="100%" height="auto" role="img" aria-label="Five Degrees of Price Elasticity of Demand">
  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .card { fill: #fafafa; stroke: #dde5e2; stroke-width: 1.2; rx: 8; }
    .axis { stroke: #111111; stroke-width: 1.8; stroke-linecap: round; }
    .line { fill: none; stroke: #146b63; stroke-width: 3; stroke-linecap: round; }
    .text-title { font-family: 'Fraunces', Georgia, serif; font-size: 13px; font-weight: 700; fill: #122a3a; text-anchor: middle; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 11px; font-weight: 700; fill: #122a3a; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 10px; font-weight: 600; fill: #47607a; text-anchor: middle; }
    .tag { font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 700; fill: #0e4a45; text-anchor: middle; }
  </style>

  <rect class="bg" width="100%" height="100%" rx="10"/>

  <!-- Panel 1: Ep = 0 -->
  <g transform="translate(15, 12)">
    <rect class="card" width="170" height="235"/>
    <text class="text-title" x="85" y="24">१. पूर्ण बेलोचदार</text>
    <text class="tag" x="85" y="40">Ep = 0 (ठाडो रेखा)</text>
    <line class="axis" x1="30" y1="195" x2="30" y2="60"/>
    <line class="axis" x1="30" y1="195" x2="155" y2="195"/>
    <text class="text-label" x="15" y="65">P</text>
    <text class="text-label" x="150" y="210">Q</text>
    <!-- Vertical line at X=90 -->
    <line class="line" x1="90" y1="70" x2="90" y2="195"/>
    <text class="text-sub" x="85" y="222">माग स्थिर (नुन, औषधि)</text>
  </g>

  <!-- Panel 2: Ep < 1 -->
  <g transform="translate(200, 12)">
    <rect class="card" width="170" height="235"/>
    <text class="text-title" x="85" y="24">२. सापेक्षिक बेलोचदार</text>
    <text class="tag" x="85" y="40">Ep &lt; 1 (बढी ठाडो)</text>
    <line class="axis" x1="30" y1="195" x2="30" y2="60"/>
    <line class="axis" x1="30" y1="195" x2="155" y2="195"/>
    <text class="text-label" x="15" y="65">P</text>
    <text class="text-label" x="150" y="210">Q</text>
    <!-- Steep line from (60,70) to (125,195) -->
    <line class="line" x1="60" y1="70" x2="125" y2="195"/>
    <text class="text-sub" x="85" y="222">%ΔQ &lt; %ΔP (खाद्यान्न)</text>
  </g>

  <!-- Panel 3: Ep = 1 -->
  <g transform="translate(385, 12)">
    <rect class="card" width="170" height="235"/>
    <text class="text-title" x="85" y="24">३. एकाइ लोचदार</text>
    <text class="tag" x="85" y="40">Ep = 1 (अतिपरवलय)</text>
    <line class="axis" x1="30" y1="195" x2="30" y2="60"/>
    <line class="axis" x1="30" y1="195" x2="155" y2="195"/>
    <text class="text-label" x="15" y="65">P</text>
    <text class="text-label" x="150" y="210">Q</text>
    <!-- Rectangular hyperbola path -->
    <path class="line" d="M 50 75 Q 85 115 145 180"/>
    <text class="text-sub" x="85" y="222">%ΔQ = %ΔP (खर्च स्थिर)</text>
  </g>

  <!-- Panel 4: Ep > 1 -->
  <g transform="translate(570, 12)">
    <rect class="card" width="170" height="235"/>
    <text class="text-title" x="85" y="24">४. सापेक्षिक लोचदार</text>
    <text class="tag" x="85" y="40">Ep &gt; 1 (कम ठाडो/चेप्टो)</text>
    <line class="axis" x1="30" y1="195" x2="30" y2="60"/>
    <line class="axis" x1="30" y1="195" x2="155" y2="195"/>
    <text class="text-label" x="15" y="65">P</text>
    <text class="text-label" x="150" y="210">Q</text>
    <!-- Flatter line from (45,100) to (145,165) -->
    <line class="line" x1="45" y1="100" x2="145" y2="165"/>
    <text class="text-sub" x="85" y="222">%ΔQ &gt; %ΔP (विलासी वस्तु)</text>
  </g>

  <!-- Panel 5: Ep = infinity -->
  <g transform="translate(755, 12)">
    <rect class="card" width="170" height="235"/>
    <text class="text-title" x="85" y="24">५. पूर्ण लोचदार</text>
    <text class="tag" x="85" y="40">Ep = ∞ (तेर्सो रेखा)</text>
    <line class="axis" x1="30" y1="195" x2="30" y2="60"/>
    <line class="axis" x1="30" y1="195" x2="155" y2="195"/>
    <text class="text-label" x="15" y="65">P</text>
    <text class="text-label" x="150" y="210">Q</text>
    <!-- Horizontal line at Y=125 -->
    <line class="line" x1="30" y1="125" x2="155" y2="125"/>
    <text class="text-sub" x="85" y="222">अनन्त माग (प्रतिस्पर्धा)</text>
  </g>
</svg>"""


def generate_five_degrees_supply_elasticity_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 950 260" width="100%" height="auto" role="img" aria-label="Five Degrees of Price Elasticity of Supply">
  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .card { fill: #fafafa; stroke: #dde5e2; stroke-width: 1.2; rx: 8; }
    .axis { stroke: #111111; stroke-width: 1.8; stroke-linecap: round; }
    .line { fill: none; stroke: #b4872a; stroke-width: 3; stroke-linecap: round; }
    .text-title { font-family: 'Fraunces', Georgia, serif; font-size: 13px; font-weight: 700; fill: #122a3a; text-anchor: middle; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 11px; font-weight: 700; fill: #122a3a; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 10px; font-weight: 600; fill: #47607a; text-anchor: middle; }
    .tag { font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 700; fill: #785206; text-anchor: middle; }
  </style>

  <rect class="bg" width="100%" height="100%" rx="10"/>

  <!-- Panel 1: Es = 0 -->
  <g transform="translate(15, 12)">
    <rect class="card" width="170" height="235"/>
    <text class="text-title" x="85" y="24">१. पूर्ण बेलोचदार</text>
    <text class="tag" x="85" y="40">Es = 0 (ठाडो रेखा)</text>
    <line class="axis" x1="30" y1="195" x2="30" y2="60"/>
    <line class="axis" x1="30" y1="195" x2="155" y2="195"/>
    <text class="text-label" x="15" y="65">P</text>
    <text class="text-label" x="150" y="210">Q</text>
    <!-- Vertical line at X=90 -->
    <line class="line" x1="90" y1="70" x2="90" y2="195"/>
    <text class="text-sub" x="85" y="222">आपूर्ति स्थिर (दुर्लभ वस्तु)</text>
  </g>

  <!-- Panel 2: Es < 1 -->
  <g transform="translate(200, 12)">
    <rect class="card" width="170" height="235"/>
    <text class="text-title" x="85" y="24">२. सापेक्षिक बेलोचदार</text>
    <text class="tag" x="85" y="40">Es &lt; 1 (X-अक्षबाट सुरु)</text>
    <line class="axis" x1="30" y1="195" x2="30" y2="60"/>
    <line class="axis" x1="30" y1="195" x2="155" y2="195"/>
    <text class="text-label" x="15" y="65">P</text>
    <text class="text-label" x="150" y="210">Q</text>
    <!-- Line intersecting X-axis at (65,195) to (140,80) -->
    <line class="line" x1="65" y1="195" x2="140" y2="80"/>
    <text class="text-sub" x="85" y="222">%ΔQs &lt; %ΔP (कृषि उपज)</text>
  </g>

  <!-- Panel 3: Es = 1 -->
  <g transform="translate(385, 12)">
    <rect class="card" width="170" height="235"/>
    <text class="text-title" x="85" y="24">३. एकाइ लोचदार</text>
    <text class="tag" x="85" y="40">Es = 1 (उद्गम बिन्दु O)</text>
    <line class="axis" x1="30" y1="195" x2="30" y2="60"/>
    <line class="axis" x1="30" y1="195" x2="155" y2="195"/>
    <text class="text-label" x="15" y="65">P</text>
    <text class="text-label" x="150" y="210">Q</text>
    <!-- Line from origin (30,195) to (140,85) 45 deg -->
    <line class="line" x1="30" y1="195" x2="140" y2="85"/>
    <text class="text-sub" x="85" y="222">%ΔQs = %ΔP (४५° रेखा)</text>
  </g>

  <!-- Panel 4: Es > 1 -->
  <g transform="translate(570, 12)">
    <rect class="card" width="170" height="235"/>
    <text class="text-title" x="85" y="24">४. सापेक्षिक लोचदार</text>
    <text class="tag" x="85" y="40">Es &gt; 1 (Y-अक्षबाट सुरु)</text>
    <line class="axis" x1="30" y1="195" x2="30" y2="60"/>
    <line class="axis" x1="30" y1="195" x2="155" y2="195"/>
    <text class="text-label" x="15" y="65">P</text>
    <text class="text-label" x="150" y="210">Q</text>
    <!-- Line intersecting Y-axis at (30,150) to (145,85) -->
    <line class="line" x1="30" y1="150" x2="145" y2="85"/>
    <text class="text-sub" x="85" y="222">%ΔQs &gt; %ΔP (कारखाना उत्पादन)</text>
  </g>

  <!-- Panel 5: Es = infinity -->
  <g transform="translate(755, 12)">
    <rect class="card" width="170" height="235"/>
    <text class="text-title" x="85" y="24">५. पूर्ण लोचदार</text>
    <text class="tag" x="85" y="40">Es = ∞ (तेर्सो रेखा)</text>
    <line class="axis" x1="30" y1="195" x2="30" y2="60"/>
    <line class="axis" x1="30" y1="195" x2="155" y2="195"/>
    <text class="text-label" x="15" y="65">P</text>
    <text class="text-label" x="150" y="210">Q</text>
    <!-- Horizontal line at Y=125 -->
    <line class="line" x1="30" y1="125" x2="155" y2="125"/>
    <text class="text-sub" x="85" y="222">अनन्त आपूर्ति</text>
  </g>
</svg>"""


def generate_income_elasticity_types_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 740 450" width="100%" height="auto" role="img" aria-label="Types of Income Elasticity of Demand">
  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .axis { stroke: #111111; stroke-width: 2.2; stroke-linecap: round; }
    .curve-lux { fill: none; stroke: #146b63; stroke-width: 3.5; stroke-linecap: round; }
    .curve-norm { fill: none; stroke: #122a3a; stroke-width: 3; stroke-linecap: round; stroke-dasharray: 6 3; }
    .curve-nec { fill: none; stroke: #b4872a; stroke-width: 3.5; stroke-linecap: round; }
    .curve-zero { fill: none; stroke: #8098ab; stroke-width: 3; stroke-linecap: round; }
    .curve-inf { fill: none; stroke: #b23a2b; stroke-width: 3.5; stroke-linecap: round; }
    .text-title { font-family: 'Fraunces', Georgia, serif; font-size: 16px; font-weight: 700; fill: #122a3a; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 12.5px; font-weight: 700; fill: #122a3a; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11px; font-weight: 600; fill: #47607a; }
    .tag { font-family: 'IBM Plex Mono', monospace; font-size: 11.5px; font-weight: 700; }
  </style>

  <rect class="bg" width="100%" height="100%" rx="10"/>
  <text class="text-title" x="40" y="34">मागको आय लोचका प्रकारहरू: एन्जेल वक्ररेखाहरू (Income Elasticity / Engel Curves)</text>
  <text class="text-sub" x="40" y="52">आम्दानी (Y) परिवर्तन हुँदा विभिन्न वस्तुहरूको माग परिमाण (Q) मा आउने परिवर्तन</text>

  <!-- Axes: Origin at (90, 390) -->
  <line class="axis" x1="90" y1="390" x2="90" y2="70"/>
  <line class="axis" x1="90" y1="390" x2="650" y2="390"/>
  <text class="text-label" x="30" y="78">आम्दानी (Y)</text>
  <text class="text-label" x="530" y="415">माग परिमाण (Q)</text>
  <text class="text-label" x="72" y="405">O</text>

  <!-- 1. Luxury Good: Ey > 1 (Steep / Upward, expanding fast) -->
  <path d="M 90 390 Q 220 340 500 130" class="curve-lux"/>
  <text class="tag" x="510" y="132" fill="#146b63">Ey &gt; 1 (विलासिता: कार, सुन)</text>

  <!-- 2. Unitary Normal: Ey = 1 (Linear 45 deg) -->
  <line x1="90" y1="390" x2="480" y2="180" class="curve-norm"/>
  <text class="tag" x="490" y="184" fill="#122a3a">Ey = 1 (सामान्य वस्तु)</text>

  <!-- 3. Necessity Good: 0 < Ey < 1 (Flattening) -->
  <path d="M 90 390 Q 320 280 430 100" class="curve-nec"/>
  <text class="tag" x="435" y="98" fill="#b4872a">0 &lt; Ey &lt; 1 (अत्यावश्यक: खाद्यान्न)</text>

  <!-- 4. Neutral Good: Ey = 0 (Vertical line) -->
  <line x1="260" y1="390" x2="260" y2="100" class="curve-zero"/>
  <text class="tag" x="200" y="90" fill="#47607a">Ey = 0 (तटस्थ: नुन)</text>

  <!-- 5. Inferior / Giffen Good: Ey < 0 (Backward Bending) -->
  <path d="M 90 390 Q 220 300 210 210 Q 200 160 140 100" class="curve-inf"/>
  <text class="tag" x="120" y="90" fill="#b23a2b">Ey &lt; 0 (निम्नस्तर: कोदो)</text>
</svg>"""


def generate_cross_elasticity_types_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 300" width="100%" height="auto" role="img" aria-label="Types of Cross Elasticity of Demand">
  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .card { fill: #fafafa; stroke: #dde5e2; stroke-width: 1.2; rx: 8; }
    .axis { stroke: #111111; stroke-width: 2; stroke-linecap: round; }
    .line-sub { fill: none; stroke: #146b63; stroke-width: 3.5; stroke-linecap: round; }
    .line-comp { fill: none; stroke: #b23a2b; stroke-width: 3.5; stroke-linecap: round; }
    .line-unrel { fill: none; stroke: #47607a; stroke-width: 3.5; stroke-linecap: round; }
    .text-title { font-family: 'Fraunces', Georgia, serif; font-size: 14.5px; font-weight: 700; fill: #122a3a; text-anchor: middle; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 11.5px; font-weight: 700; fill: #122a3a; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 10.5px; font-weight: 600; fill: #47607a; text-anchor: middle; }
    .tag { font-family: 'IBM Plex Mono', monospace; font-size: 12px; font-weight: 700; text-anchor: middle; }
  </style>

  <rect class="bg" width="100%" height="100%" rx="10"/>

  <!-- Panel 1: Substitutes (Exy > 0) -->
  <g transform="translate(20, 15)">
    <rect class="card" width="250" height="270"/>
    <text class="text-title" x="125" y="28">१. प्रतिस्थापक वस्तुहरू (Substitutes)</text>
    <text class="tag" x="125" y="48" fill="#146b63">Exy &gt; 0 (धनात्मक / Upward)</text>
    <line class="axis" x1="45" y1="220" x2="45" y2="70"/>
    <line class="axis" x1="45" y1="220" x2="225" y2="220"/>
    <text class="text-label" x="15" y="75">Py (चिया)</text>
    <text class="text-label" x="175" y="240">Qx (कफी)</text>
    <text class="text-label" x="30" y="235">O</text>
    <!-- Upward line from (65,195) to (205,95) -->
    <line class="line-sub" x1="65" y1="195" x2="205" y2="95"/>
    <text class="text-sub" x="125" y="255">Py बढ्दा Qx बढ्छ (चिया महँगो ⇒ कफीको माग ↑)</text>
  </g>

  <!-- Panel 2: Complements (Exy < 0) -->
  <g transform="translate(300, 15)">
    <rect class="card" width="250" height="270"/>
    <text class="text-title" x="125" y="28">२. पूरक वस्तुहरू (Complements)</text>
    <text class="tag" x="125" y="48" fill="#b23a2b">Exy &lt; 0 (ऋणात्मक / Downward)</text>
    <line class="axis" x1="45" y1="220" x2="45" y2="70"/>
    <line class="axis" x1="45" y1="220" x2="225" y2="220"/>
    <text class="text-label" x="12" y="75">Py (पेट्रोल)</text>
    <text class="text-label" x="170" y="240">Qx (गाडी)</text>
    <text class="text-label" x="30" y="235">O</text>
    <!-- Downward line from (65,95) to (205,195) -->
    <line class="line-comp" x1="65" y1="95" x2="205" y2="195"/>
    <text class="text-sub" x="125" y="255">Py बढ्दा Qx घट्छ (पेट्रोल महँगो ⇒ गाडीको माग ↓)</text>
  </g>

  <!-- Panel 3: Unrelated Goods (Exy = 0) -->
  <g transform="translate(580, 15)">
    <rect class="card" width="250" height="270"/>
    <text class="text-title" x="125" y="28">३. असम्बन्धित वस्तुहरू (Unrelated)</text>
    <text class="tag" x="125" y="48" fill="#47607a">Exy = 0 (ठाडो रेखा / Vertical)</text>
    <line class="axis" x1="45" y1="220" x2="45" y2="70"/>
    <line class="axis" x1="45" y1="220" x2="225" y2="220"/>
    <text class="text-label" x="15" y="75">Py (चिया)</text>
    <text class="text-label" x="175" y="240">Qx (जुत्ता)</text>
    <text class="text-label" x="30" y="235">O</text>
    <!-- Vertical line at X=135 -->
    <line class="line-unrel" x1="135" y1="80" x2="135" y2="220"/>
    <text class="text-sub" x="125" y="255">Py ले Qx मा कुनै असर गर्दैन (Exy = 0)</text>
  </g>
</svg>"""


def generate_dmu_tu_mu_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 740 520" width="100%" height="auto" role="img" aria-label="Law of Diminishing Marginal Utility showing Total Utility and Marginal Utility">
  <style>
    .bg { fill: #ffffff; stroke: #111111; stroke-width: 1.5; }
    .axis { stroke: #111111; stroke-width: 2.2; stroke-linecap: round; }
    .tu-line { fill: none; stroke: #146b63; stroke-width: 3.5; stroke-linecap: round; }
    .mu-line { fill: none; stroke: #b23a2b; stroke-width: 3.5; stroke-linecap: round; }
    .guide-line { stroke: #8098ab; stroke-width: 1.5; stroke-dasharray: 4 4; }
    .point-dot { fill: #122a3a; stroke: #ffffff; stroke-width: 2.5; }
    .text-title { font-family: 'Fraunces', Georgia, serif; font-size: 15px; font-weight: 700; fill: #122a3a; }
    .text-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 12px; font-weight: 700; fill: #122a3a; }
    .text-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11px; font-weight: 600; fill: #47607a; }
    .point-label { font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 700; }
  </style>

  <rect class="bg" width="100%" height="100%" rx="10"/>

  <!-- ================= TOP PANEL: TOTAL UTILITY (TU) ================= -->
  <g transform="translate(0, 0)">
    <text class="text-title" x="40" y="26">प्यानल (क): कुल उपयोगिता वक्ररेखा (Total Utility - TU Curve)</text>

    <!-- Axes: Origin at (90, 220) -->
    <line class="axis" x1="90" y1="220" x2="90" y2="40"/>
    <line class="axis" x1="90" y1="220" x2="680" y2="220"/>
    <text class="text-label" x="25" y="45">TU (Utils)</text>
    <text class="text-label" x="72" y="235">O</text>

    <!-- Quantity ticks on top panel: Q=1(170), Q=2(250), Q=3(330), Q=4(410), Q=5(490), Q=6(570), Q=7(650) -->
    <!-- TU Curve: (90,220) -> (170,140) -> (250,85) -> (330,55) -> (410,40) -> (490,35 Peak) -> (570,45) -> (650,80) -->
    <path d="M 90 220 Q 230 65 410 40 T 490 35 Q 550 40 650 90" class="tu-line"/>
    <text class="text-title" x="660" y="95" fill="#146b63">TU</text>

    <!-- Maximum TU at Q=5 (490, 35) -->
    <circle class="point-dot" cx="490" cy="35" r="6"/>
    <line class="guide-line" x1="90" y1="35" x2="490" y2="35"/>
    <line class="guide-line" x1="490" y1="35" x2="490" y2="220"/>
    <text class="text-label" x="50" y="40">TU_max</text>
    <text class="point-label" x="430" y="24" fill="#0e4a45">अधिकतम TU (Peak Point)</text>

    <!-- Quantity Ticks -->
    <text class="text-label" x="165" y="238">१</text>
    <text class="text-label" x="245" y="238">२</text>
    <text class="text-label" x="325" y="238">३</text>
    <text class="text-label" x="405" y="238">४</text>
    <text class="text-label" x="485" y="238" fill="#0e4a45">५</text>
    <text class="text-label" x="565" y="238">६</text>
    <text class="text-label" x="645" y="238">७</text>
  </g>

  <!-- ================= BOTTOM PANEL: MARGINAL UTILITY (MU) ================= -->
  <g transform="translate(0, 250)">
    <text class="text-title" x="40" y="26">प्यानल (ख): सीमान्त उपयोगिता वक्ररेखा (Marginal Utility - MU Curve)</text>

    <!-- Axes: X-axis at Y=160 (Zero line), Y-axis from (90, 40) down to (90, 230) -->
    <line class="axis" x1="90" y1="230" x2="90" y2="40"/>
    <line class="axis" x1="90" y1="160" x2="680" y2="160"/>
    <text class="text-label" x="25" y="45">MU (Utils)</text>
    <text class="text-label" x="600" y="152">उपभोग एकाइ (Q)</text>
    <text class="text-label" x="72" y="175">O</text>

    <!-- MU Curve: Line from (130, 60) down to (490, 160) and continuing to (650, 210) -->
    <line class="mu-line" x1="130" y1="60" x2="650" y2="210"/>
    <text class="text-title" x="660" y="215" fill="#b23a2b">MU</text>

    <!-- Satiety Point Alignment at Q=5 (490, 160) -->
    <!-- Vertical guide line connecting from top panel through to bottom axis -->
    <line class="guide-line" x1="490" y1="-30" x2="490" y2="160"/>
    <circle class="point-dot" cx="490" cy="160" r="6"/>
    <text class="point-label" x="445" y="148" fill="#b23a2b">MU = 0 (पूर्ण सन्तुष्टि बिन्दु)</text>

    <!-- Negative Disutility Zone -->
    <text class="text-sub" x="550" y="200" fill="#b23a2b">ऋणात्मक क्षेत्र (Disutility: MU &lt; 0)</text>

    <!-- Quantity Ticks on bottom axis -->
    <text class="text-label" x="165" y="178">१</text>
    <text class="text-label" x="245" y="178">२</text>
    <text class="text-label" x="325" y="178">३</text>
    <text class="text-label" x="405" y="178">४</text>
    <text class="text-label" x="485" y="178" fill="#b23a2b">५</text>
    <text class="text-label" x="565" y="178">६</text>
    <text class="text-label" x="645" y="178">७</text>
  </g>
</svg>"""


def main():
    (OUTPUT_DIR / "demand-movement-along-curve.svg").write_text(generate_demand_movement_svg(), encoding="utf-8")
    (OUTPUT_DIR / "demand-shifts.svg").write_text(generate_demand_shifts_svg(), encoding="utf-8")
    (OUTPUT_DIR / "five-degrees-price-elasticity.svg").write_text(generate_five_degrees_price_elasticity_svg(), encoding="utf-8")
    (OUTPUT_DIR / "five-degrees-supply-elasticity.svg").write_text(generate_five_degrees_supply_elasticity_svg(), encoding="utf-8")
    (OUTPUT_DIR / "income-elasticity-types.svg").write_text(generate_income_elasticity_types_svg(), encoding="utf-8")
    (OUTPUT_DIR / "cross-elasticity-types.svg").write_text(generate_cross_elasticity_types_svg(), encoding="utf-8")
    (OUTPUT_DIR / "law-of-dmu-tu-mu.svg").write_text(generate_dmu_tu_mu_svg(), encoding="utf-8")
    print("Generated and improved all Unit 2 SVG diagrams successfully.")


if __name__ == "__main__":
    main()
