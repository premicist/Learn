import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router'
import Seo from '../components/Seo'
import {
  fetchTeacherSubmissions,
  supabaseEnabled,
  type TeacherSubmissionRow,
  type WritingAnswerData,
} from '../lib/supabase'

const DEMO_SUBMISSIONS: TeacherSubmissionRow[] = [
  {
    id: 'demo-1',
    practice_set_id: 'class11-demand-elasticity-practice',
    subject_id: 'class-11',
    student_name: 'Aayush Sharma',
    class: '11',
    section: 'A',
    roll_no: '12',
    answers: {
      'q1': 1.5,
      'q2': 0.8,
      'q3': { text: 'Demand is price elastic (Ed = 1.5) because percentage change in quantity demanded exceeds percentage change in price.' },
    },
    numerical_score: 18,
    numerical_total: 20,
    submitted_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'demo-2',
    practice_set_id: 'class11-demand-elasticity-practice',
    subject_id: 'class-11',
    student_name: 'Pratima Thapa',
    class: '11',
    section: 'A',
    roll_no: '04',
    answers: {
      'q1': 1.5,
      'q2': 0.8,
      'q3': { text: 'Inelastic demand because cross price elasticity is positive for substitute goods.' },
    },
    numerical_score: 20,
    numerical_total: 20,
    submitted_at: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'demo-3',
    practice_set_id: 'class12-cost-numericals',
    subject_id: 'class-12',
    student_name: 'Bibek Karki',
    class: '12',
    section: 'B',
    roll_no: '21',
    answers: {
      'q1': 45.2,
      'q2': 120,
      'q3': { text: 'Marginal cost curve cuts average cost curve at its minimum point.' },
    },
    numerical_score: 14,
    numerical_total: 20,
    submitted_at: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
]

export default function TeacherDashboard() {
  const [accessKey, setAccessKey] = useState(() => {
    return sessionStorage.getItem('learn:teacher-key') || ''
  })
  const [keyInput, setKeyInput] = useState(accessKey)
  const [submissions, setSubmissions] = useState<TeacherSubmissionRow[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [isDemoMode, setIsDemoMode] = useState(false)

  // Filters
  const [filterPracticeSet, setFilterPracticeSet] = useState('all')
  const [filterClass, setFilterClass] = useState('all')
  const [filterSection, setFilterSection] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const loadSubmissions = async (key: string) => {
    if (!key.trim()) return
    setLoading(true)
    setError(null)
    setIsDemoMode(false)

    try {
      const res = await fetchTeacherSubmissions(key.trim())
      if (res.ok) {
        setSubmissions(res.rows)
        sessionStorage.setItem('learn:teacher-key', key.trim())
        setAccessKey(key.trim())
      } else {
        setError(res.error || 'Failed to authenticate. Check your access PIN.')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (accessKey) {
      void loadSubmissions(accessKey)
    }
  }, [])

  const handleKeySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (keyInput.trim()) {
      void loadSubmissions(keyInput)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('learn:teacher-key')
    setAccessKey('')
    setKeyInput('')
    setSubmissions([])
    setIsDemoMode(false)
    setError(null)
  }

  const handleLoadDemo = () => {
    setSubmissions(DEMO_SUBMISSIONS)
    setIsDemoMode(true)
    setError(null)
    setAccessKey('demo')
  }

  // Derive filter choices
  const practiceSetOptions = useMemo(() => {
    const set = new Set<string>()
    submissions.forEach((s) => s.practice_set_id && set.add(s.practice_set_id))
    return Array.from(set).sort()
  }, [submissions])

  const classOptions = useMemo(() => {
    const set = new Set<string>()
    submissions.forEach((s) => s.class && set.add(s.class.trim()))
    return Array.from(set).sort()
  }, [submissions])

  const sectionOptions = useMemo(() => {
    const set = new Set<string>()
    submissions.forEach((s) => s.section && set.add(s.section.trim()))
    return Array.from(set).sort()
  }, [submissions])

  // Filtered rows
  const filteredRows = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return submissions.filter((row) => {
      if (filterPracticeSet !== 'all' && row.practice_set_id !== filterPracticeSet) return false
      if (filterClass !== 'all' && row.class.trim() !== filterClass) return false
      if (filterSection !== 'all' && row.section.trim() !== filterSection) return false
      if (query) {
        const matchesName = row.student_name.toLowerCase().includes(query)
        const matchesRoll = row.roll_no.toLowerCase().includes(query)
        if (!matchesName && !matchesRoll) return false
      }
      return true
    })
  }, [submissions, filterPracticeSet, filterClass, filterSection, searchQuery])

  // Metrics
  const stats = useMemo(() => {
    const total = filteredRows.length
    if (total === 0) return { total: 0, avgScore: 0, highScorers: 0 }
    let scoreSum = 0
    let scoreCount = 0
    let high = 0
    filteredRows.forEach((r) => {
      if (typeof r.numerical_score === 'number' && typeof r.numerical_total === 'number' && r.numerical_total > 0) {
        const pct = (r.numerical_score / r.numerical_total) * 100
        scoreSum += pct
        scoreCount++
        if (pct >= 75) high++
      }
    })
    return {
      total,
      avgScore: scoreCount > 0 ? Math.round(scoreSum / scoreCount) : 0,
      highScorers: high,
    }
  }, [filteredRows])

  // Export to CSV
  const handleExportCsv = () => {
    if (filteredRows.length === 0) return
    const headers = [
      'Student Name',
      'Class',
      'Section',
      'Roll No',
      'Practice Set ID',
      'Numerical Score',
      'Numerical Total',
      'Percentage (%)',
      'Submitted At',
      'Writing Responses',
    ]

    const escapeCsv = (val: unknown) => {
      const str = String(val ?? '')
      return `"${str.replace(/"/g, '""')}"`
    }

    const rows = filteredRows.map((row) => {
      const pct =
        typeof row.numerical_score === 'number' && typeof row.numerical_total === 'number' && row.numerical_total > 0
          ? Math.round((row.numerical_score / row.numerical_total) * 100)
          : ''
      const writingNotes = Object.entries(row.answers || {})
        .map(([k, v]) => {
          if (v && typeof v === 'object' && 'text' in (v as WritingAnswerData)) {
            return `${k}: ${(v as WritingAnswerData).text || ''}`
          }
          return null
        })
        .filter(Boolean)
        .join(' | ')

      return [
        escapeCsv(row.student_name),
        escapeCsv(row.class),
        escapeCsv(row.section),
        escapeCsv(row.roll_no),
        escapeCsv(row.practice_set_id),
        row.numerical_score ?? '',
        row.numerical_total ?? '',
        pct,
        escapeCsv(row.submitted_at),
        escapeCsv(writingNotes),
      ].join(',')
    })

    const csvContent = [headers.join(','), ...rows].join('\r\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `practice_submissions_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="teacher-dashboard-page">
      <Seo
        title="Teacher Dashboard Lite — Prem Pokhrel ECON"
        description="Filter and export student practice set submissions and scores for classroom evaluation."
      />

      <div className="teacher-dashboard-container">
        <header className="teacher-dashboard-header">
          <div>
            <nav className="teacher-breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link> / <span>Teacher Dashboard</span>
            </nav>
            <h1>Classroom Practice Submissions</h1>
            <p className="teacher-subtitle">
              Review, filter, and export student submissions for homework grading and classroom records.
            </p>
          </div>

          {accessKey && (
            <div className="teacher-auth-status">
              {isDemoMode ? (
                <span className="teacher-badge teacher-badge--demo">Demo Data Active</span>
              ) : (
                <span className="teacher-badge teacher-badge--connected">Connected to Supabase</span>
              )}
              <button type="button" className="teacher-btn-secondary" onClick={handleLogout}>
                Sign Out
              </button>
            </div>
          )}
        </header>

        {/* Access PIN Form */}
        {!accessKey && (
          <div className="teacher-auth-card">
            <div className="teacher-auth-icon" aria-hidden="true">🔒</div>
            <h2>Teacher Authentication</h2>
            <p>
              Enter the teacher access key configured in your Supabase database to unlock classroom submissions.
            </p>
            <form onSubmit={handleKeySubmit} className="teacher-auth-form">
              <input
                type="password"
                placeholder="Enter Teacher Access Key (e.g. econ2026)"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button type="submit" disabled={loading} className="teacher-btn-primary">
                {loading ? 'Verifying…' : 'Access Submissions'}
              </button>
            </form>

            {error && <p className="teacher-error-banner" role="alert">{error}</p>}

            {!supabaseEnabled && (
              <p className="teacher-setup-note">
                💡 Supabase is not connected in this environment. You can test the dashboard by clicking below:
              </p>
            )}

            <div className="teacher-demo-action">
              <button type="button" className="teacher-btn-outline" onClick={handleLoadDemo}>
                📂 Preview with Sample Classroom Data
              </button>
            </div>
          </div>
        )}

        {/* Dashboard Content */}
        {accessKey && (
          <>
            {/* KPI Cards */}
            <div className="teacher-kpi-grid">
              <div className="teacher-kpi-card">
                <span className="teacher-kpi-label">Filtered Submissions</span>
                <strong className="teacher-kpi-val">{stats.total}</strong>
              </div>
              <div className="teacher-kpi-card">
                <span className="teacher-kpi-label">Class Average Score</span>
                <strong className="teacher-kpi-val">{stats.avgScore}%</strong>
              </div>
              <div className="teacher-kpi-card">
                <span className="teacher-kpi-label">Scoring ≥ 75%</span>
                <strong className="teacher-kpi-val">{stats.highScorers}</strong>
              </div>
            </div>

            {/* Filter Bar & Export */}
            <div className="teacher-filter-bar">
              <div className="teacher-filter-inputs">
                {/* Search */}
                <input
                  type="search"
                  placeholder="Search student or roll no…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="teacher-filter-search"
                />

                {/* Practice Set */}
                <select
                  value={filterPracticeSet}
                  onChange={(e) => setFilterPracticeSet(e.target.value)}
                  aria-label="Filter by practice set"
                >
                  <option value="all">All Practice Sets ({practiceSetOptions.length})</option>
                  {practiceSetOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>

                {/* Class */}
                <select
                  value={filterClass}
                  onChange={(e) => setFilterClass(e.target.value)}
                  aria-label="Filter by class"
                >
                  <option value="all">All Classes</option>
                  {classOptions.map((c) => (
                    <option key={c} value={c}>
                      Class {c}
                    </option>
                  ))}
                </select>

                {/* Section */}
                <select
                  value={filterSection}
                  onChange={(e) => setFilterSection(e.target.value)}
                  aria-label="Filter by section"
                >
                  <option value="all">All Sections</option>
                  {sectionOptions.map((s) => (
                    <option key={s} value={s}>
                      Section {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="teacher-export-wrap">
                <button
                  type="button"
                  className="teacher-btn-export"
                  onClick={handleExportCsv}
                  disabled={filteredRows.length === 0}
                  title="Export filtered records to an Excel-compatible CSV file"
                >
                  📥 Export to CSV ({filteredRows.length})
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="teacher-table-wrap">
              {filteredRows.length > 0 ? (
                <table className="teacher-table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Class & Section</th>
                      <th>Roll No</th>
                      <th>Practice Set</th>
                      <th>Score</th>
                      <th>Submitted Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRows.map((row) => {
                      const pct =
                        typeof row.numerical_score === 'number' &&
                        typeof row.numerical_total === 'number' &&
                        row.numerical_total > 0
                          ? Math.round((row.numerical_score / row.numerical_total) * 100)
                          : null
                      const isExpanded = expandedId === row.id

                      return (
                        <tr key={row.id}>
                          <td>
                            <strong>{row.student_name}</strong>
                          </td>
                          <td>
                            Class {row.class} - {row.section}
                          </td>
                          <td>{row.roll_no}</td>
                          <td>
                            <code>{row.practice_set_id}</code>
                          </td>
                          <td>
                            {pct !== null ? (
                              <span
                                className={`teacher-score-badge ${
                                  pct >= 75
                                    ? 'score-high'
                                    : pct >= 50
                                      ? 'score-med'
                                      : 'score-low'
                                }`}
                              >
                                {row.numerical_score}/{row.numerical_total} ({pct}%)
                              </span>
                            ) : (
                              <span className="teacher-score-badge score-na">N/A</span>
                            )}
                          </td>
                          <td>
                            <small>
                              {new Date(row.submitted_at).toLocaleDateString(undefined, {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </small>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="teacher-btn-expand"
                              onClick={() => setExpandedId(isExpanded ? null : row.id)}
                            >
                              {isExpanded ? 'Hide' : 'Review Work'}
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              ) : (
                <div className="teacher-empty-state">
                  <p>No student submissions match the selected filters.</p>
                </div>
              )}
            </div>

            {/* Expanded Submission Detail Drawer / Box */}
            {expandedId && (
              <div className="teacher-detail-box">
                {(() => {
                  const targetRow = submissions.find((s) => s.id === expandedId)
                  if (!targetRow) return null
                  return (
                    <div>
                      <div className="teacher-detail-header">
                        <h3>
                          Reviewing: {targetRow.student_name} (Roll {targetRow.roll_no}, Class{' '}
                          {targetRow.class}-{targetRow.section})
                        </h3>
                        <button
                          type="button"
                          className="teacher-btn-secondary"
                          onClick={() => setExpandedId(null)}
                        >
                          ✕ Close Review
                        </button>
                      </div>

                      <div className="teacher-answers-list">
                        {Object.entries(targetRow.answers || {}).map(([key, value]) => (
                          <div key={key} className="teacher-answer-card">
                            <span className="teacher-answer-key">Question {key}:</span>
                            {value && typeof value === 'object' ? (
                              <div className="teacher-writing-answer">
                                {'text' in (value as WritingAnswerData) && (
                                  <p>{(value as WritingAnswerData).text || '(No text answer entered)'}</p>
                                )}
                                {'image_url' in (value as WritingAnswerData) && (
                                  <div className="teacher-image-attachment">
                                    <small>Handwritten Submission:</small>
                                    <br />
                                    <a
                                      href={(value as WritingAnswerData).image_url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      📎 View Full Attachment
                                    </a>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <strong>{String(value)}</strong>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })()}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

