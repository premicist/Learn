import { getCurriculumBySubject, type CurriculumResourceType } from '../data/curriculum'

export function getCurriculumTopic(subjectId: string, resourceType: CurriculumResourceType, resourceId: string) {
  const curriculum = getCurriculumBySubject(subjectId)
  return curriculum?.units.find((unit) => unit.lessons.some((lesson) => lesson.resourceType === resourceType && lesson.resourceId === resourceId))?.title
}

export function groupByTopic<T extends { id: string; subjectId: string }>(
  resources: T[],
  resourceType: CurriculumResourceType,
  getExplicitTopic: (resource: T) => string,
) {
  const groups = new Map<string, T[]>()
  resources.forEach((resource) => {
    const topic = getExplicitTopic(resource).trim() || getCurriculumTopic(resource.subjectId, resourceType, resource.id) || 'Other topics'
    groups.set(topic, [...(groups.get(topic) || []), resource])
  })
  return [...groups.entries()].map(([title, items]) => ({ title, items }))
}
