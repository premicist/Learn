import { useState, useId, useMemo } from 'react'

type MarketScenario = 'normal' | 'high_demand' | 'low_demand' | 'high_supply' | 'supply_shock'

function InteractiveMarketCurve() {
  const [demandShift, setDemandShift] = useState(0) // -40 to +40
  const [supplyShift, setSupplyShift] = useState(0) // -40 to +40
  const [activeScenario, setActiveScenario] = useState<MarketScenario>('normal')
  const gridPatternId = useId()

  const setScenario = (scenario: MarketScenario) => {
    setActiveScenario(scenario)
    if (scenario === 'normal') {
      setDemandShift(0)
      setSupplyShift(0)
    } else if (scenario === 'high_demand') {
      setDemandShift(35)
      setSupplyShift(0)
    } else if (scenario === 'low_demand') {
      setDemandShift(-35)
      setSupplyShift(0)
    } else if (scenario === 'high_supply') {
      setDemandShift(0)
      setSupplyShift(35)
    } else if (scenario === 'supply_shock') {
      setDemandShift(0)
      setSupplyShift(-35)
    }
  }

  // Supply Curve Baseline: (60, 210) to (340, 50)
  // Positive supply shift shifts curve right/down (lower price for same Q)
  const sY1 = 210 + supplyShift * 0.85
  const sY2 = 50 + supplyShift * 0.85

  // Demand Curve Baseline: (60, 50) to (340, 210)
  // Positive demand shift shifts curve up/right (higher price for same Q)
  const dY1 = 50 - demandShift * 0.85
  const dY2 = 210 - demandShift * 0.85

  // Calculate Equilibrium intersection
  // Line S: y - sY1 = ((sY2 - sY1) / 280) * (x - 60) => slope_s = -160/280 = -4/7
  // Line D: y - dY1 = ((dY2 - dY1) / 280) * (x - 60) => slope_d = 160/280 = 4/7
  // x* = 200 + (demandShift + supplyShift) * 0.74
  // y* = 130 - (demandShift - supplyShift) * 0.42
  const eqX = Math.round(200 + (demandShift + supplyShift) * 0.78)
  const eqY = Math.round(130 - (demandShift - supplyShift) * 0.425)

  // Derived economic metric values for student feedback
  const priceValue = Math.max(10, Math.round(40 + (130 - eqY) * 0.45))
  const quantityValue = Math.max(10, Math.round(50 + (eqX - 200) * 0.4))

  const insight = useMemo(() => {
    if (demandShift === 0 && supplyShift === 0) {
      return 'Market in equilibrium: Quantity supplied equals quantity demanded.'
    }
    if (demandShift > 0 && supplyShift === 0) {
      return 'Demand surge: Buyers bid prices up (P↑) and firms expand output (Q↑).'
    }
    if (demandShift < 0 && supplyShift === 0) {
      return 'Demand contraction: Lower consumer spending depresses price (P↓) and output (Q↓).'
    }
    if (supplyShift > 0 && demandShift === 0) {
      return 'Supply expansion: Improved productivity lowers price (P↓) and raises output (Q↑).'
    }
    if (supplyShift < 0 && demandShift === 0) {
      return 'Supply shock: Higher input costs or scarcity drive price up (P↑) while output falls (Q↓).'
    }
    return `Simulated equilibrium: Price ${priceValue}, Quantity ${quantityValue}.`
  }, [demandShift, supplyShift, priceValue, quantityValue])

  return (
    <div className="market-simulator" aria-label="Interactive Market Equilibrium Simulator">
      <div className="market-simulator__header">
        <div className="market-simulator__title-wrap">
          <span className="market-simulator__badge">Interactive</span>
          <span className="market-simulator__title">Market Equilibrium</span>
        </div>
        <div className="market-simulator__kpis">
          <span className="market-kpi market-kpi--price" title="Equilibrium Price">
            P*: <strong>${priceValue}</strong>
          </span>
          <span className="market-kpi market-kpi--qty" title="Equilibrium Quantity">
            Q*: <strong>{quantityValue}u</strong>
          </span>
        </div>
      </div>

      <div className="market-simulator__canvas-wrap">
        <svg
          viewBox="0 0 400 270"
          className="market-simulator__svg"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={`Supply and demand graph at equilibrium price ${priceValue} and quantity ${quantityValue}`}
        >
          <defs>
            {/* Graph Paper Grid */}
            <pattern id={gridPatternId} width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--ink-faint)" strokeWidth="0.5" strokeOpacity="0.35" />
            </pattern>
          </defs>

          {/* Grid Background */}
          <rect x="40" y="20" width="330" height="210" fill={`url(#${gridPatternId})`} />

          {/* Axes */}
          <line x1="40" y1="20" x2="40" y2="230" stroke="var(--ink-faint)" strokeWidth="1.5" />
          <line x1="40" y1="230" x2="370" y2="230" stroke="var(--ink-faint)" strokeWidth="1.5" />

          {/* Axis Labels */}
          <text x="46" y="24" className="curve-label" fontWeight="700">
            Price (P)
          </text>
          <text x="310" y="246" className="curve-label" fontWeight="700">
            Quantity (Q)
          </text>

          {/* Faint Baseline Reference Curves (Shown when shifted) */}
          {(demandShift !== 0 || supplyShift !== 0) && (
            <>
              {demandShift !== 0 && (
                <line
                  x1="60"
                  y1="50"
                  x2="340"
                  y2="210"
                  stroke="var(--teal)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  strokeOpacity="0.4"
                />
              )}
              {supplyShift !== 0 && (
                <line
                  x1="60"
                  y1="210"
                  x2="340"
                  y2="50"
                  stroke="var(--gold)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  strokeOpacity="0.4"
                />
              )}
            </>
          )}

          {/* Active Demand Curve */}
          <line
            x1="60"
            y1={dY1}
            x2="340"
            y2={dY2}
            className="market-curve market-curve--demand"
          />
          <text x="346" y={dY2 + 4} className="curve-label curve-label--demand" fontWeight="700">
            {demandShift === 0 ? 'D' : "D'"}
          </text>

          {/* Active Supply Curve */}
          <line
            x1="60"
            y1={sY1}
            x2="340"
            y2={sY2}
            className="market-curve market-curve--supply"
          />
          <text x="346" y={sY2 + 4} className="curve-label curve-label--supply" fontWeight="700">
            {supplyShift === 0 ? 'S' : "S'"}
          </text>

          {/* Dotted Equilibrium Projection Lines */}
          <line
            x1={eqX}
            y1={eqY}
            x2={eqX}
            y2="230"
            stroke="var(--ink-faint)"
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />
          <line
            x1="40"
            y1={eqY}
            x2={eqX}
            y2={eqY}
            stroke="var(--ink-faint)"
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />

          {/* Equilibrium Point E */}
          <circle
            cx={eqX}
            cy={eqY}
            r="5.5"
            className="market-equilibrium-point"
          />
          <circle
            cx={eqX}
            cy={eqY}
            r="10"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="1"
            strokeOpacity="0.3"
            className="market-equilibrium-pulse"
          />
          <text x={eqX + 7} y={eqY - 7} className="curve-label" fontWeight="800" fill="var(--ink)">
            E
          </text>

          {/* Axis readout tags */}
          <rect
            x="8"
            y={eqY - 8}
            width="30"
            height="16"
            rx="4"
            fill="var(--paper-card)"
            stroke="var(--teal)"
            strokeWidth="1"
          />
          <text x="23" y={eqY + 3.5} textAnchor="middle" className="curve-tag-text" fill="var(--teal)">
            ${priceValue}
          </text>

          <rect
            x={eqX - 14}
            y="233"
            width="28"
            height="15"
            rx="4"
            fill="var(--paper-card)"
            stroke="var(--gold)"
            strokeWidth="1"
          />
          <text x={eqX} y="244" textAnchor="middle" className="curve-tag-text" fill="var(--gold)">
            {quantityValue}
          </text>
        </svg>
      </div>

      {/* Dynamic Scenario Insight */}
      <div className="market-simulator__insight" role="status" aria-live="polite">
        <span className="market-simulator__insight-icon">💡</span>
        <p>{insight}</p>
      </div>

      {/* Preset Scenarios Buttons */}
      <div className="market-scenarios" aria-label="Quick market shift scenarios">
        <button
          type="button"
          onClick={() => setScenario('normal')}
          className={`market-scenario-btn ${activeScenario === 'normal' ? 'is-active' : ''}`}
        >
          Reset (E₀)
        </button>
        <button
          type="button"
          onClick={() => setScenario('high_demand')}
          className={`market-scenario-btn ${activeScenario === 'high_demand' ? 'is-active' : ''}`}
        >
          Demand Surge (+D)
        </button>
        <button
          type="button"
          onClick={() => setScenario('supply_shock')}
          className={`market-scenario-btn ${activeScenario === 'supply_shock' ? 'is-active' : ''}`}
        >
          Supply Shock (-S)
        </button>
        <button
          type="button"
          onClick={() => setScenario('high_supply')}
          className={`market-scenario-btn ${activeScenario === 'high_supply' ? 'is-active' : ''}`}
        >
          Supply Boom (+S)
        </button>
      </div>

      {/* Interactive Micro-Sliders */}
      <div className="market-sliders">
        <div className="market-slider-group">
          <div className="market-slider-label">
            <span className="market-slider-name market-slider-name--demand">Demand Shift</span>
            <span className="market-slider-val">{demandShift > 0 ? `+${demandShift}` : demandShift}</span>
          </div>
          <input
            type="range"
            min="-35"
            max="35"
            step="5"
            value={demandShift}
            onChange={(e) => {
              setDemandShift(Number(e.target.value))
              setActiveScenario('normal')
            }}
            aria-label="Adjust market demand shift"
            className="market-slider-input market-slider-input--demand"
          />
        </div>

        <div className="market-slider-group">
          <div className="market-slider-label">
            <span className="market-slider-name market-slider-name--supply">Supply Shift</span>
            <span className="market-slider-val">{supplyShift > 0 ? `+${supplyShift}` : supplyShift}</span>
          </div>
          <input
            type="range"
            min="-35"
            max="35"
            step="5"
            value={supplyShift}
            onChange={(e) => {
              setSupplyShift(Number(e.target.value))
              setActiveScenario('normal')
            }}
            aria-label="Adjust market supply shift"
            className="market-slider-input market-slider-input--supply"
          />
        </div>
      </div>
    </div>
  )
}

export default InteractiveMarketCurve

