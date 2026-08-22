import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const CHART_COLORS = ['#146b63', '#b4872a', '#b23a2b', '#47607a', '#0e4a45']

function NoteChart({ json }: { json: string }) {
  let parsed: { xKey: string; series: string[]; data: Record<string, number>[] } | null = null
  try {
    parsed = JSON.parse(json)
  } catch {
    parsed = null
  }

  if (!parsed || !parsed.xKey || !Array.isArray(parsed.series) || !Array.isArray(parsed.data)) {
    return <p className="note-chart-error">(Chart data couldn't be read.)</p>
  }

  return (
    <div className="note-chart">
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={parsed.data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="var(--line)" strokeDasharray="4 4" />
          <XAxis
            dataKey={parsed.xKey}
            stroke="var(--ink-soft)"
            tick={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}
          />
          <YAxis stroke="var(--ink-soft)" tick={{ fontFamily: 'var(--font-mono)', fontSize: 11 }} />
          <Tooltip contentStyle={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem' }} />
          <Legend wrapperStyle={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }} />
          {parsed.series.map((key, i) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={CHART_COLORS[i % CHART_COLORS.length]}
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

function NoteMarkdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code(props) {
          const { className, children, ...rest } = props
          if (className === 'language-chart') {
            return <NoteChart json={String(children).trim()} />
          }
          return (
            <code className={className} {...rest}>
              {children}
            </code>
          )
        },
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

export default NoteMarkdown
