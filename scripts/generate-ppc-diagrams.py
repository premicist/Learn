"""Generate detailed, accessible SVG diagrams for PPC Points, PPC Schedule, and PPC Shifts.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "public" / "images" / "uploads"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


def generate_ppc_from_schedule_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 540" width="100%" height="auto" role="img" aria-label="PPC curve derived from production schedule table">
  <defs>
    <marker id="arrow-sched" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#146b63"/>
    </marker>
    <filter id="sched-shadow" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="3" stdDeviation="4" flood-opacity="0.10"/>
    </filter>
  </defs>

  <style>
    .bg { fill: var(--paper-card, #ffffff); }
    .axis { stroke: var(--ink, #122a3a); stroke-width: 2.5; stroke-linecap: round; }
    .grid { stroke: var(--line, #dde5e2); stroke-width: 1; stroke-dasharray: 4 4; }
    .curve { fill: none; stroke: #146b63; stroke-width: 4; stroke-linecap: round; }
    .proj-line { stroke: #94a3b8; stroke-width: 1.5; stroke-dasharray: 4 4; }
    .title-text { font-family: 'Manrope', system-ui, sans-serif; font-size: 16px; font-weight: 800; fill: var(--ink, #122a3a); }
    .axis-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 14px; font-weight: 700; fill: var(--ink, #122a3a); }
    .tick-label { font-family: 'IBM Plex Mono', monospace; font-size: 12px; font-weight: 600; fill: var(--ink-soft, #47607a); }
    .point-tag { font-family: 'Manrope', system-ui, sans-serif; font-size: 13px; font-weight: 800; fill: #146b63; }
    .card-box { fill: var(--paper, #f8fafc); stroke: var(--line, #cbd5e1); stroke-width: 1.5; rx: 8; }
    .card-title { font-family: 'Manrope', system-ui, sans-serif; font-size: 13px; font-weight: 800; fill: #146b63; }
    .card-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11.5px; font-weight: 600; fill: var(--ink-soft, #47607a); }
    .point-dot { stroke-width: 3; stroke: #ffffff; fill: #146b63; }
  </style>

  <!-- Background Card -->
  <rect class="bg" width="100%" height="100%" rx="14"/>

  <!-- Graph Axes -->
  <!-- Y-Axis (Food in tonnes) -->
  <line class="axis" x1="110" y1="450" x2="110" y2="45" marker-end="url(#arrow-sched)"/>
  <!-- X-Axis (Clothing in '000 units) -->
  <line class="axis" x1="110" y1="450" x2="750" y2="450" marker-end="url(#arrow-sched)"/>

  <!-- Axis Titles -->
  <text class="axis-label" x="25" y="38" text-anchor="start">Food Production (Tonnes)</text>
  <text class="axis-label" x="750" y="480" text-anchor="end">Clothing Production ('000 Units)</text>
  <text class="tick-label" x="92" y="468">0</text>

  <!-- X-Axis Ticks &amp; Values -->
  <line class="axis" x1="218" y1="450" x2="218" y2="456"/>
  <text class="tick-label" x="218" y="474" text-anchor="middle">10</text>

  <line class="axis" x1="326" y1="450" x2="326" y2="456"/>
  <text class="tick-label" x="326" y="474" text-anchor="middle">20</text>

  <line class="axis" x1="434" y1="450" x2="434" y2="456"/>
  <text class="tick-label" x="434" y="474" text-anchor="middle">30</text>

  <line class="axis" x1="542" y1="450" x2="542" y2="456"/>
  <text class="tick-label" x="542" y="474" text-anchor="middle">40</text>

  <line class="axis" x1="650" y1="450" x2="650" y2="456"/>
  <text class="tick-label" x="650" y="474" text-anchor="middle">50</text>

  <!-- Y-Axis Ticks &amp; Values -->
  <line class="axis" x1="104" y1="342" x2="110" y2="342"/>
  <text class="tick-label" x="98" y="346" text-anchor="end">60</text>

  <line class="axis" x1="104" y1="252" x2="110" y2="252"/>
  <text class="tick-label" x="98" y="256" text-anchor="end">110</text>

  <line class="axis" x1="104" y1="180" x2="110" y2="180"/>
  <text class="tick-label" x="98" y="184" text-anchor="end">150</text>

  <line class="axis" x1="104" y1="126" x2="110" y2="126"/>
  <text class="tick-label" x="98" y="130" text-anchor="end">180</text>

  <line class="axis" x1="104" y1="90" x2="110" y2="90"/>
  <text class="tick-label" x="98" y="94" text-anchor="end">200</text>

  <!-- Projection Grid Lines for Points B, C, D, E -->
  <!-- Point B (10, 180) -> (218, 126) -->
  <line class="proj-line" x1="110" y1="126" x2="218" y2="126"/>
  <line class="proj-line" x1="218" y1="450" x2="218" y2="126"/>

  <!-- Point C (20, 150) -> (326, 180) -->
  <line class="proj-line" x1="110" y1="180" x2="326" y2="180"/>
  <line class="proj-line" x1="326" y1="450" x2="326" y2="180"/>

  <!-- Point D (30, 110) -> (434, 252) -->
  <line class="proj-line" x1="110" y1="252" x2="434" y2="252"/>
  <line class="proj-line" x1="434" y1="450" x2="434" y2="252"/>

  <!-- Point E (40, 60) -> (542, 342) -->
  <line class="proj-line" x1="110" y1="342" x2="542" y2="342"/>
  <line class="proj-line" x1="542" y1="450" x2="542" y2="342"/>

  <!-- PPC Smooth Curve through Points A(110,90) -> B(218,126) -> C(326,180) -> D(434,252) -> E(542,342) -> F(650,450) -->
  <path class="curve" d="M 110 90 C 240 100, 480 200, 650 450"/>

  <!-- Points and Badges -->
  <!-- Point A -->
  <circle class="point-dot" cx="110" cy="90" r="6"/>
  <text class="point-tag" x="122" y="86">A (0, 200)</text>

  <!-- Point B -->
  <circle class="point-dot" cx="218" cy="126" r="6"/>
  <text class="point-tag" x="230" y="122">B (10, 180)</text>

  <!-- Point C -->
  <circle class="point-dot" cx="326" cy="180" r="6"/>
  <text class="point-tag" x="338" y="176">C (20, 150)</text>

  <!-- Point D -->
  <circle class="point-dot" cx="434" cy="252" r="6"/>
  <text class="point-tag" x="446" y="248">D (30, 110)</text>

  <!-- Point E -->
  <circle class="point-dot" cx="542" cy="342" r="6"/>
  <text class="point-tag" x="554" y="338">E (40, 60)</text>

  <!-- Point F -->
  <circle class="point-dot" cx="650" cy="450" r="6"/>
  <text class="point-tag" x="656" y="440">F (50, 0)</text>

  <!-- Callout Legend Box -->
  <g filter="url(#sched-shadow)">
    <rect class="card-box" x="460" y="60" width="330" height="80"/>
    <circle cx="478" cy="82" r="5" fill="#146b63"/>
    <text class="card-title" x="492" y="86">Concave to Origin (Bowed-Out)</text>
    <text class="card-sub" x="492" y="106">Steeper slope = Increasing Opportunity Cost</text>
    <text class="card-sub" x="492" y="124">MRT increases as more clothing is produced</text>
  </g>
</svg>"""


def generate_ppc_efficiency_points_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="auto" role="img" aria-label="Production Possibility Curve showing points P1, G, and H">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#146b63"/>
    </marker>
    <marker id="arrow-gray" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#64748b"/>
    </marker>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="3" stdDeviation="4" flood-opacity="0.12"/>
    </filter>
  </defs>

  <style>
    .bg { fill: var(--paper-card, #ffffff); }
    .axis { stroke: var(--ink, #122a3a); stroke-width: 2.5; stroke-linecap: round; }
    .grid { stroke: var(--line, #dde5e2); stroke-width: 1; stroke-dasharray: 4 4; }
    .curve { fill: none; stroke: #146b63; stroke-width: 4; stroke-linecap: round; }
    .point-line { stroke: #94a3b8; stroke-width: 1.5; stroke-dasharray: 4 4; }
    .callout-box { fill: var(--paper, #f8fafc); stroke: var(--line, #cbd5e1); stroke-width: 1.5; rx: 8; }
    .title-text { font-family: 'Manrope', system-ui, sans-serif; font-size: 17px; font-weight: 800; fill: var(--ink, #122a3a); }
    .axis-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 14px; font-weight: 700; fill: var(--ink, #122a3a); }
    .badge-title { font-family: 'Manrope', system-ui, sans-serif; font-size: 13px; font-weight: 800; }
    .badge-desc { font-family: 'Manrope', system-ui, sans-serif; font-size: 11.5px; font-weight: 600; fill: var(--ink-soft, #47607a); }
    .point-dot { stroke-width: 3; stroke: #ffffff; }
  </style>

  <!-- Background Card -->
  <rect class="bg" width="100%" height="100%" rx="14"/>

  <!-- Graph Axes -->
  <!-- Y-Axis (Capital Goods) -->
  <line class="axis" x1="100" y1="420" x2="100" y2="50" marker-end="url(#arrow)"/>
  <!-- X-Axis (Consumer Goods) -->
  <line class="axis" x1="100" y1="420" x2="720" y2="420" marker-end="url(#arrow)"/>

  <!-- Axis Labels -->
  <text class="axis-label" x="25" y="42" text-anchor="start">Capital Goods (Y)</text>
  <text class="axis-label" x="720" y="445" text-anchor="end">Consumer Goods (X)</text>
  <text class="axis-label" x="85" y="438">O</text>

  <!-- Production Possibility Curve (Quarter ellipse/concave arc) -->
  <!-- Intercepts: (100, 90) on Y-axis down to (620, 420) on X-axis -->
  <path class="curve" d="M 100 90 Q 320 110 500 240 T 620 420"/>

  <!-- Intercept Points -->
  <circle cx="100" cy="90" r="5" fill="#146b63"/>
  <text x="75" y="95" class="axis-label">A</text>
  <circle cx="620" cy="420" r="5" fill="#146b63"/>
  <text x="620" y="445" class="axis-label">B</text>

  <!-- Point 1: P1 (ON the Curve) -->
  <!-- Coordinate approx: (380, 160) -->
  <line class="point-line" x1="380" y1="420" x2="380" y2="160"/>
  <line class="point-line" x1="100" y1="160" x2="380" y2="160"/>
  <circle class="point-dot" cx="380" cy="160" r="8" fill="#146b63"/>

  <!-- Point 2: G (INSIDE the Curve - Inefficient) -->
  <!-- Coordinate approx: (250, 290) -->
  <line class="point-line" x1="250" y1="420" x2="250" y2="290"/>
  <line class="point-line" x1="100" y1="290" x2="250" y2="290"/>
  <circle class="point-dot" cx="250" cy="290" r="8" fill="#dc2626"/>

  <!-- Point 3: H (OUTSIDE the Curve - Unattainable) -->
  <!-- Coordinate approx: (530, 130) -->
  <line class="point-line" x1="530" y1="420" x2="530" y2="130"/>
  <line class="point-line" x1="100" y1="130" x2="530" y2="130"/>
  <circle class="point-dot" cx="530" cy="130" r="8" fill="#7c3aed"/>

  <!-- Point Labels and Callout Cards -->
  <!-- Callout for P1 -->
  <g filter="url(#shadow)">
    <rect class="callout-box" x="250" y="30" width="310" height="52"/>
    <circle cx="268" cy="56" r="6" fill="#146b63"/>
    <text x="282" y="49" class="badge-title" fill="#146b63">P₁ : Point ON the Curve</text>
    <text x="282" y="68" class="badge-desc">Full Efficiency &amp; Maximum Output</text>
  </g>
  <!-- Connector line to P1 -->
  <line x1="380" y1="84" x2="380" y2="148" stroke="#146b63" stroke-width="1.8" stroke-dasharray="3 3" marker-end="url(#arrow)"/>

  <!-- Callout for G (Inside) -->
  <g filter="url(#shadow)">
    <rect class="callout-box" x="140" y="325" width="280" height="52"/>
    <circle cx="158" cy="351" r="6" fill="#dc2626"/>
    <text x="172" y="344" class="badge-title" fill="#dc2626">G : Point INSIDE the Curve</text>
    <text x="172" y="363" class="badge-desc">Inefficiency &amp; Unemployed Resources</text>
  </g>
  <!-- Connector line to G -->
  <line x1="250" y1="323" x2="250" y2="302" stroke="#dc2626" stroke-width="1.8" marker-end="url(#arrow)"/>

  <!-- Callout for H (Outside) -->
  <g filter="url(#shadow)">
    <rect class="callout-box" x="480" y="45" width="300" height="52"/>
    <circle cx="498" cy="71" r="6" fill="#7c3aed"/>
    <text x="512" y="64" class="badge-title" fill="#7c3aed">H : Point OUTSIDE the Curve</text>
    <text x="512" y="83" class="badge-desc">Unattainable with Current Resources</text>
  </g>
  <!-- Connector line to H -->
  <line x1="570" y1="99" x2="540" y2="122" stroke="#7c3aed" stroke-width="1.8" marker-end="url(#arrow)"/>

  <!-- Curve Label -->
  <text x="540" y="330" class="title-text" fill="#146b63" font-size="15">PPC Frontier</text>
</svg>"""


def generate_ppc_shifts_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="auto" role="img" aria-label="Shifts in the Production Possibility Curve showing Outward and Inward shifts">
  <defs>
    <marker id="arrow-axis" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#122a3a"/>
    </marker>
    <marker id="shift-right" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#16a34a"/>
    </marker>
    <marker id="shift-left" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#dc2626"/>
    </marker>
    <filter id="card-shadow" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="3" stdDeviation="4" flood-opacity="0.12"/>
    </filter>
  </defs>

  <style>
    .bg { fill: var(--paper-card, #ffffff); }
    .axis { stroke: var(--ink, #122a3a); stroke-width: 2.5; stroke-linecap: round; }
    .curve-base { fill: none; stroke: #146b63; stroke-width: 3.5; stroke-linecap: round; }
    .curve-outward { fill: none; stroke: #16a34a; stroke-width: 3.5; stroke-linecap: round; }
    .curve-inward { fill: none; stroke: #dc2626; stroke-width: 3.5; stroke-dasharray: 6 5; stroke-linecap: round; }
    .shift-arrow-right { stroke: #16a34a; stroke-width: 2.2; }
    .shift-arrow-left { stroke: #dc2626; stroke-width: 2.2; }
    .title-text { font-family: 'Manrope', system-ui, sans-serif; font-size: 16px; font-weight: 800; }
    .axis-label { font-family: 'Manrope', system-ui, sans-serif; font-size: 14px; font-weight: 700; fill: var(--ink, #122a3a); }
    .legend-box { fill: var(--paper, #f8fafc); stroke: var(--line, #cbd5e1); stroke-width: 1.5; rx: 8; }
    .legend-title { font-family: 'Manrope', system-ui, sans-serif; font-size: 12.5px; font-weight: 800; }
    .legend-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11px; font-weight: 600; fill: var(--ink-soft, #47607a); }
  </style>

  <!-- Background Card -->
  <rect class="bg" width="100%" height="100%" rx="14"/>

  <!-- Graph Axes -->
  <line class="axis" x1="100" y1="420" x2="100" y2="50" marker-end="url(#arrow-axis)"/>
  <line class="axis" x1="100" y1="420" x2="720" y2="420" marker-end="url(#arrow-axis)"/>

  <!-- Axis Labels -->
  <text class="axis-label" x="25" y="42" text-anchor="start">Capital Goods (Y)</text>
  <text class="axis-label" x="720" y="445" text-anchor="end">Consumer Goods (X)</text>
  <text class="axis-label" x="85" y="438">O</text>

  <!-- 1. Leftward / Inward Shift (PPC3 - Economic Contraction) -->
  <path class="curve-inward" d="M 100 160 Q 250 180 370 280 T 470 420"/>
  <text x="475" y="415" class="title-text" fill="#dc2626">PPC₃</text>

  <!-- 2. Baseline Curve (PPC1 - Initial Equilibrium) -->
  <path class="curve-base" d="M 100 100 Q 320 120 480 240 T 590 420"/>
  <text x="595" y="415" class="title-text" fill="#146b63">PPC₁</text>

  <!-- 3. Rightward / Outward Shift (PPC2 - Economic Growth) -->
  <path class="curve-outward" d="M 100 50 Q 380 70 570 210 T 700 420"/>
  <text x="705" y="415" class="title-text" fill="#16a34a">PPC₂</text>

  <!-- Directional Shift Arrows -->
  <!-- Outward shift arrows -->
  <line class="shift-arrow-right" x1="330" y1="175" x2="385" y2="135" marker-end="url(#shift-right)"/>
  <line class="shift-arrow-right" x1="450" y1="280" x2="510" y2="245" marker-end="url(#shift-right)"/>

  <!-- Inward shift arrows -->
  <line class="shift-arrow-left" x1="310" y1="190" x2="255" y2="225" marker-end="url(#shift-left)"/>
  <line class="shift-arrow-left" x1="430" y1="300" x2="370" y2="335" marker-end="url(#shift-left)"/>

  <!-- Legend Cards -->
  <!-- PPC2: Outward Shift Card -->
  <g filter="url(#card-shadow)">
    <rect class="legend-box" x="430" y="30" width="340" height="52"/>
    <circle cx="448" cy="56" r="6" fill="#16a34a"/>
    <text x="462" y="49" class="legend-title" fill="#16a34a">PPC₂ : Rightward / Outward Shift</text>
    <text x="462" y="68" class="legend-sub">Economic Growth, Tech Advances &amp; More Resources</text>
  </g>

  <!-- PPC1: Baseline Card -->
  <g filter="url(#card-shadow)">
    <rect class="legend-box" x="430" y="90" width="340" height="46"/>
    <circle cx="448" cy="113" r="6" fill="#146b63"/>
    <text x="462" y="109" class="legend-title" fill="#146b63">PPC₁ : Initial Frontier (Base Level)</text>
    <text x="462" y="125" class="legend-sub">Existing Resources &amp; Current Technology</text>
  </g>

  <!-- PPC3: Inward Shift Card -->
  <g filter="url(#card-shadow)">
    <rect class="legend-box" x="430" y="144" width="340" height="52"/>
    <circle cx="448" cy="170" r="6" fill="#dc2626"/>
    <text x="462" y="163" class="legend-title" fill="#dc2626">PPC₃ : Leftward / Inward Shift</text>
    <text x="462" y="182" class="legend-sub">Resource Depletion, Natural Disasters &amp; War</text>
  </g>
</svg>"""


def generate_ppc_linear_opportunity_cost_svg() -> str:
    """PPC Diagram comparing Constant Opportunity Cost (Linear) vs Increasing Opportunity Cost (Concave)."""
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 880 500" width="100%" height="auto" role="img" aria-label="Comparison between Linear PPC (Constant Opportunity Cost) and Concave PPC (Increasing Opportunity Cost)">
  <defs>
    <marker id="arrow-lin" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#122a3a"/>
    </marker>
    <filter id="panel-shadow" x="-4%" y="-4%" width="108%" height="112%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.08"/>
    </filter>
  </defs>

  <style>
    .bg { fill: var(--paper-card, #ffffff); }
    .axis { stroke: var(--ink, #122a3a); stroke-width: 2.2; stroke-linecap: round; }
    .linear-curve { stroke: #0284c7; stroke-width: 3.5; stroke-linecap: round; }
    .concave-curve { stroke: #146b63; stroke-width: 3.5; stroke-linecap: round; }
    .slope-tri { fill: #e0f2fe; stroke: #0284c7; stroke-width: 1.5; }
    .slope-tri-conc { fill: #ccfbf1; stroke: #146b63; stroke-width: 1.5; }
    .panel-box { fill: var(--paper, #f8fafc); stroke: var(--line, #cbd5e1); stroke-width: 1.2; rx: 10; }
    .panel-header { font-family: 'Manrope', system-ui, sans-serif; font-size: 15px; font-weight: 800; }
    .axis-txt { font-family: 'Manrope', system-ui, sans-serif; font-size: 12.5px; font-weight: 700; fill: var(--ink, #122a3a); }
    .math-txt { font-family: 'IBM Plex Mono', monospace; font-size: 11.5px; font-weight: 600; fill: var(--ink-soft, #47607a); }
    .note-txt { font-family: 'Manrope', system-ui, sans-serif; font-size: 11.5px; font-weight: 600; fill: var(--ink-soft, #47607a); }
    .dot-node { stroke-width: 2.5; stroke: #ffffff; }
  </style>

  <!-- Background Card -->
  <rect class="bg" width="100%" height="100%" rx="14"/>

  <!-- ==================== PANEL 1: LINEAR PPC (CONSTANT OPPORTUNITY COST) ==================== -->
  <g transform="translate(20, 20)">
    <!-- Panel Container -->
    <rect class="panel-box" width="405" height="460" filter="url(#panel-shadow)"/>
    <text class="panel-header" x="20" y="32" fill="#0284c7">Case 1: Linear PPC (Straight Line)</text>
    <text class="note-txt" x="20" y="52">Constant Opportunity Cost (MRT = Constant)</text>

    <!-- Axes -->
    <line class="axis" x1="60" y1="360" x2="60" y2="80" marker-end="url(#arrow-lin)"/>
    <line class="axis" x1="60" y1="360" x2="370" y2="360" marker-end="url(#arrow-lin)"/>
    <text class="axis-txt" x="15" y="75">Good Y</text>
    <text class="axis-txt" x="370" y="385" text-anchor="end">Good X</text>
    <text class="axis-txt" x="48" y="375">0</text>

    <!-- Linear Downward Straight Line: (60, 110) to (330, 360) -->
    <line class="linear-curve" x1="60" y1="110" x2="330" y2="360"/>

    <!-- Step Slope Triangles (Showing equal sacrifice: ΔY/ΔX = Constant) -->
    <!-- Triangle 1 -->
    <polygon class="slope-tri" points="120,165 180,165 180,220"/>
    <text class="math-txt" x="186" y="196">ΔY₁</text>
    <text class="math-txt" x="140" y="156">ΔX₁</text>

    <!-- Triangle 2 -->
    <polygon class="slope-tri" points="210,248 270,248 270,303"/>
    <text class="math-txt" x="276" y="278">ΔY₂</text>
    <text class="math-txt" x="230" y="240">ΔX₂</text>

    <!-- Points -->
    <circle class="dot-node" cx="60" cy="110" r="5" fill="#0284c7"/>
    <text class="axis-txt" x="42" y="115">A</text>
    <circle class="dot-node" cx="330" cy="360" r="5" fill="#0284c7"/>
    <text class="axis-txt" x="332" y="380">B</text>

    <!-- Explanation Box at Bottom -->
    <rect x="20" y="395" width="365" height="52" rx="6" fill="var(--paper-card, #ffffff)" stroke="var(--line, #cbd5e1)"/>
    <text class="note-txt" x="30" y="416">• Resources are <tspan font-weight="800" fill="#0284c7">perfect substitutes</tspan> between goods</text>
    <text class="math-txt" x="30" y="435">• MRT = ΔY / ΔX = constant slope everywhere</text>
  </g>

  <!-- ==================== PANEL 2: CONCAVE PPC (INCREASING OPPORTUNITY COST) ==================== -->
  <g transform="translate(455, 20)">
    <!-- Panel Container -->
    <rect class="panel-box" width="405" height="460" filter="url(#panel-shadow)"/>
    <text class="panel-header" x="20" y="32" fill="#146b63">Case 2: Concave PPC (Bowed-Out)</text>
    <text class="note-txt" x="20" y="52">Increasing Opportunity Cost (MRT Rises)</text>

    <!-- Axes -->
    <line class="axis" x1="60" y1="360" x2="60" y2="80" marker-end="url(#arrow-lin)"/>
    <line class="axis" x1="60" y1="360" x2="370" y2="360" marker-end="url(#arrow-lin)"/>
    <text class="axis-txt" x="15" y="75">Good Y</text>
    <text class="axis-txt" x="370" y="385" text-anchor="end">Good X</text>
    <text class="axis-txt" x="48" y="375">0</text>

    <!-- Concave Curve: (60, 100) to (330, 360) -->
    <path class="concave-curve" d="M 60 100 Q 180 115 260 210 T 330 360"/>

    <!-- Step Triangles Showing Increasing Sacrifice -->
    <!-- Triangle 1 (Flatter, smaller ΔY) -->
    <polygon class="slope-tri-conc" points="110,110 160,110 160,135"/>
    <text class="math-txt" x="166" y="125">ΔY₁ (small)</text>
    <text class="math-txt" x="125" y="103">ΔX</text>

    <!-- Triangle 2 (Much Steeper, larger ΔY) -->
    <polygon class="slope-tri-conc" points="230,195 280,195 280,265"/>
    <text class="math-txt" x="286" y="235">ΔY₂ (larger)</text>
    <text class="math-txt" x="245" y="188">ΔX</text>

    <!-- Points -->
    <circle class="dot-node" cx="60" cy="100" r="5" fill="#146b63"/>
    <text class="axis-txt" x="42" y="105">A</text>
    <circle class="dot-node" cx="330" cy="360" r="5" fill="#146b63"/>
    <text class="axis-txt" x="332" y="380">B</text>

    <!-- Explanation Box at Bottom -->
    <rect x="20" y="395" width="365" height="52" rx="6" fill="var(--paper-card, #ffffff)" stroke="var(--line, #cbd5e1)"/>
    <text class="note-txt" x="30" y="416">• Resources are <tspan font-weight="800" fill="#146b63">specialized</tspan> (imperfect substitutes)</text>
    <text class="math-txt" x="30" y="435">• MRT = ΔY / ΔX increases as more X is produced</text>
  </g>
</svg>"""


def generate_ppc_movements_and_shifts_svg() -> str:
    """Comprehensive diagram displaying Movement Along PPC vs Parallel Shifts vs Unilateral Rotations."""
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 480" width="100%" height="auto" role="img" aria-label="PPC Analysis: Movements along curve vs Shifts in curve vs Rotations of curve">
  <defs>
    <marker id="arrow-base" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#122a3a"/>
    </marker>
    <marker id="arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#16a34a"/>
    </marker>
    <marker id="arrow-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#dc2626"/>
    </marker>
    <filter id="m-shadow" x="-4%" y="-4%" width="108%" height="112%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.08"/>
    </filter>
  </defs>

  <style>
    .bg { fill: var(--paper-card, #ffffff); }
    .axis { stroke: var(--ink, #122a3a); stroke-width: 2; stroke-linecap: round; }
    .p-card { fill: var(--paper, #f8fafc); stroke: var(--line, #cbd5e1); stroke-width: 1.2; rx: 10; }
    .p-title { font-family: 'Manrope', system-ui, sans-serif; font-size: 13.5px; font-weight: 800; }
    .p-sub { font-family: 'Manrope', system-ui, sans-serif; font-size: 11px; font-weight: 600; fill: var(--ink-soft, #47607a); }
    .c-base { fill: none; stroke: #146b63; stroke-width: 3; stroke-linecap: round; }
    .c-out { fill: none; stroke: #16a34a; stroke-width: 3; stroke-linecap: round; }
    .c-in { fill: none; stroke: #dc2626; stroke-width: 2.8; stroke-dasharray: 5 4; stroke-linecap: round; }
    .c-rot { fill: none; stroke: #7c3aed; stroke-width: 3; stroke-linecap: round; }
    .axis-lbl { font-family: 'Manrope', system-ui, sans-serif; font-size: 11.5px; font-weight: 700; fill: var(--ink, #122a3a); }
    .node-txt { font-family: 'Manrope', system-ui, sans-serif; font-size: 11.5px; font-weight: 800; }
    .dot-pt { stroke-width: 2.5; stroke: #ffffff; }
  </style>

  <!-- Background -->
  <rect class="bg" width="100%" height="100%" rx="14"/>

  <!-- ==================== PANEL 1: MOVEMENT ALONG PPC ==================== -->
  <g transform="translate(15, 15)">
    <rect class="p-card" width="295" height="450" filter="url(#m-shadow)"/>
    <text class="p-title" x="16" y="28" fill="#146b63">1. Movement Along Curve</text>
    <text class="p-sub" x="16" y="46">Reallocation of Existing Resources</text>

    <!-- Axes -->
    <line class="axis" x1="45" y1="320" x2="45" y2="75" marker-end="url(#arrow-base)"/>
    <line class="axis" x1="45" y1="320" x2="265" y2="320" marker-end="url(#arrow-base)"/>
    <text class="axis-lbl" x="10" y="70">Good Y</text>
    <text class="axis-lbl" x="265" y="340" text-anchor="end">Good X</text>

    <!-- PPC Curve -->
    <path class="c-base" d="M 45 100 Q 130 115 190 200 T 240 320"/>

    <!-- Point A & Point B -->
    <circle class="dot-pt" cx="110" cy="120" r="5.5" fill="#146b63"/>
    <text class="node-txt" x="118" y="116" fill="#146b63">A</text>

    <circle class="dot-pt" cx="190" cy="200" r="5.5" fill="#146b63"/>
    <text class="node-txt" x="198" y="196" fill="#146b63">B</text>

    <!-- Movement Arrow along curve -->
    <path d="M 125 130 Q 155 155 175 185" fill="none" stroke="#b4872a" stroke-width="2" stroke-dasharray="3 3" marker-end="url(#arrow-base)"/>

    <!-- Description -->
    <rect x="14" y="355" width="267" height="80" rx="6" fill="var(--paper-card, #ffffff)" stroke="var(--line, #cbd5e1)"/>
    <text class="p-sub" x="22" y="375">• Shift from point A to B</text>
    <text class="p-sub" x="22" y="395">• More Good X produced, less Good Y</text>
    <text class="p-sub" x="22" y="415" font-weight="700" fill="#146b63">• Total productive capacity is UNCHANGED</text>
  </g>

  <!-- ==================== PANEL 2: SHIFT IN PPC ==================== -->
  <g transform="translate(330, 15)">
    <rect class="p-card" width="295" height="450" filter="url(#m-shadow)"/>
    <text class="p-title" x="16" y="28" fill="#16a34a">2. Parallel Shifts in PPC</text>
    <text class="p-sub" x="16" y="46">Change Affecting Both Goods</text>

    <!-- Axes -->
    <line class="axis" x1="45" y1="320" x2="45" y2="75" marker-end="url(#arrow-base)"/>
    <line class="axis" x1="45" y1="320" x2="265" y2="320" marker-end="url(#arrow-base)"/>
    <text class="axis-lbl" x="10" y="70">Good Y</text>
    <text class="axis-lbl" x="265" y="340" text-anchor="end">Good X</text>

    <!-- Inward Shift (PPC3) -->
    <path class="c-in" d="M 45 140 Q 105 155 155 220 T 195 320"/>
    <text class="node-txt" x="200" y="315" fill="#dc2626" font-size="10">PPC₃</text>

    <!-- Base PPC (PPC1) -->
    <path class="c-base" d="M 45 105 Q 125 120 185 205 T 235 320"/>
    <text class="node-txt" x="240" y="315" fill="#146b63" font-size="10">PPC₁</text>

    <!-- Outward Shift (PPC2) -->
    <path class="c-out" d="M 45 75 Q 145 90 215 190 T 270 320"/>
    <text class="node-txt" x="265" y="310" fill="#16a34a" font-size="10">PPC₂</text>

    <!-- Shift Direction Arrows -->
    <line x1="150" y1="170" x2="180" y2="145" stroke="#16a34a" stroke-width="1.8" marker-end="url(#arrow-green)"/>
    <line x1="135" y1="185" x2="105" y2="210" stroke="#dc2626" stroke-width="1.8" marker-end="url(#arrow-red)"/>

    <!-- Description -->
    <rect x="14" y="355" width="267" height="80" rx="6" fill="var(--paper-card, #ffffff)" stroke="var(--line, #cbd5e1)"/>
    <text class="p-sub" x="22" y="375"><tspan fill="#16a34a" font-weight="700">Right Shift (PPC₂):</tspan> Growth / More Resources</text>
    <text class="p-sub" x="22" y="395"><tspan fill="#dc2626" font-weight="700">Left Shift (PPC₃):</tspan> Disaster / War / Depletion</text>
    <text class="p-sub" x="22" y="415">• Affects production of <tspan font-weight="800">BOTH goods</tspan></text>
  </g>

  <!-- ==================== PANEL 3: ROTATION OF PPC ==================== -->
  <g transform="translate(645, 15)">
    <rect class="p-card" width="295" height="450" filter="url(#m-shadow)"/>
    <text class="p-title" x="16" y="28" fill="#7c3aed">3. Rotations of PPC</text>
    <text class="p-sub" x="16" y="46">Tech Change in ONLY ONE Good</text>

    <!-- Axes -->
    <line class="axis" x1="45" y1="320" x2="45" y2="75" marker-end="url(#arrow-base)"/>
    <line class="axis" x1="45" y1="320" x2="265" y2="320" marker-end="url(#arrow-base)"/>
    <text class="axis-lbl" x="10" y="70">Good Y</text>
    <text class="axis-lbl" x="265" y="340" text-anchor="end">Good X</text>

    <!-- Base PPC: from A(45, 100) to B(210, 320) -->
    <path class="c-base" d="M 45 100 Q 120 120 170 210 T 210 320"/>
    <circle class="dot-pt" cx="45" cy="100" r="4.5" fill="#146b63"/>
    <text class="node-txt" x="30" y="105" fill="#146b63">A</text>
    <text class="node-txt" x="210" y="338" fill="#146b63" font-size="10.5">B</text>

    <!-- Rotated PPC on X-axis: A(45, 100) to B'(265, 320) -->
    <path class="c-rot" d="M 45 100 Q 140 120 210 210 T 265 320"/>
    <text class="node-txt" x="265" y="338" fill="#7c3aed" font-size="10.5">B'</text>

    <!-- Rotation Arrow on X-Axis -->
    <path d="M 215 305 Q 235 305 255 310" fill="none" stroke="#7c3aed" stroke-width="1.8" marker-end="url(#arrow-base)"/>

    <!-- Description -->
    <rect x="14" y="355" width="267" height="80" rx="6" fill="var(--paper-card, #ffffff)" stroke="var(--line, #cbd5e1)"/>
    <text class="p-sub" x="22" y="375">• <tspan fill="#7c3aed" font-weight="700">Rotation on X-axis (AB → AB'):</tspan></text>
    <text class="p-sub" x="22" y="395">  Tech progress in <tspan font-weight="800">Good X only</tspan></text>
    <text class="p-sub" x="22" y="415">• Y-axis maximum remains fixed at point A</text>
  </g>
</svg>"""


def main():
    (OUTPUT_DIR / "ppc-from-schedule.svg").write_text(generate_ppc_from_schedule_svg(), encoding="utf-8")
    (OUTPUT_DIR / "ppc-efficiency-points.svg").write_text(generate_ppc_efficiency_points_svg(), encoding="utf-8")
    (OUTPUT_DIR / "ppc-shifts.svg").write_text(generate_ppc_shifts_svg(), encoding="utf-8")
    (OUTPUT_DIR / "ppc-linear-opportunity-cost.svg").write_text(generate_ppc_linear_opportunity_cost_svg(), encoding="utf-8")
    (OUTPUT_DIR / "ppc-movements-and-shifts.svg").write_text(generate_ppc_movements_and_shifts_svg(), encoding="utf-8")
    print("Generated all PPC diagrams successfully in public/images/uploads/")


if __name__ == "__main__":
    main()

