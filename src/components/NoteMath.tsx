import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'

type NoteMathProps = {
  expression: string
  display?: boolean
  className?: string
}

function NoteMath({ expression, display = false, className = '' }: NoteMathProps) {
  const source = display ? `$$\n${expression.trim()}\n$$` : `$${expression.trim()}$`

  return (
    <div className={`note-math ${display ? 'note-math--display' : 'note-math--inline'} ${className}`.trim()}>
      <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
        {source}
      </ReactMarkdown>
    </div>
  )
}

export default NoteMath
