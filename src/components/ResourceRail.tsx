import { Link } from 'react-router'
import ResourceCard, { type Resource, type ResourceKind } from './ResourceCard'
import type { Subject } from '../data/levels'

type ResourceRailProps = {
  title: string
  kind: ResourceKind
  resources: Resource[]
  subject: Subject
  viewAllHref: string
  viewAllLabel: string
  emptyMessage?: string
}

function ResourceRail({ title, kind, resources, subject, viewAllHref, viewAllLabel, emptyMessage }: ResourceRailProps) {
  if (resources.length === 0) {
    return (
      <section className="subject-rail subject-rail--empty" aria-labelledby={`${kind}-heading`}>
        <div className="subject-rail__header">
          <div>
            <h2 id={`${kind}-heading`}>{title}</h2>
            <p className="subject-rail__hint">More resources will appear here over time</p>
          </div>
          <Link to={viewAllHref} className="subject-rail__view-all">{viewAllLabel} →</Link>
        </div>
        <p className="empty-state">{emptyMessage || `No ${title.toLowerCase()} available yet.`}</p>
      </section>
    )
  }

  return (
    <section className="subject-rail" aria-labelledby={`${kind}-heading`}>
      <div className="subject-rail__header">
        <div>
          <h2 id={`${kind}-heading`}>{title}</h2>
          <p className="subject-rail__hint">Swipe to explore</p>
        </div>
        <Link to={viewAllHref} className="subject-rail__view-all">{viewAllLabel} →</Link>
      </div>
      <div className="resource-rail" tabIndex={0} aria-label={`${title} for ${subject.title}`}>
        {resources.slice(0, 4).map((resource) => (
          <ResourceCard key={resource.id} resource={resource} kind={kind} subject={subject} />
        ))}
      </div>
    </section>
  )
}

export default ResourceRail
