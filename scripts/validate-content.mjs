import { existsSync, readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import yaml from 'js-yaml'

const MARKDOWN_COLLECTIONS = ['notes', 'blogs', 'quizzes', 'videos']

function fail(errors) {
  if (errors.length === 0) return
  throw new Error(`Content validation failed:\n- ${errors.join('\n- ')}`)
}

function readMarkdownCollection(contentDir, collection) {
  const directory = path.join(contentDir, collection)
  if (!existsSync(directory)) return []
  return readdirSync(directory)
    .filter((file) => file.endsWith('.md'))
    .sort()
    .map((file) => {
      const filePath = path.join(directory, file)
      const parsed = matter(readFileSync(filePath, 'utf8'))
      return { file, filePath, data: parsed.data, body: parsed.content.trim() }
    })
}

function validateIsoDate(value, label, errors) {
  if (value === undefined || value === null || value === '') return
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) errors.push(`${label} has an invalid date: ${value}`)
}

export function validateContent(root = path.resolve(import.meta.dirname, '..')) {
  const contentDir = path.join(root, 'content')
  const errors = []
  const subjectsPath = path.join(contentDir, 'subjects.yml')

  if (!existsSync(subjectsPath)) {
    errors.push('content/subjects.yml is missing')
    fail(errors)
    return
  }

  const taxonomy = yaml.load(readFileSync(subjectsPath, 'utf8')) || {}
  const levels = Array.isArray(taxonomy.levels) ? taxonomy.levels : []
  const subjects = Array.isArray(taxonomy.subjects) ? taxonomy.subjects : []
  const levelIds = new Set()
  const subjectIds = new Set()
  const resourceIds = Object.fromEntries(MARKDOWN_COLLECTIONS.map((collection) => [collection, new Set(readMarkdownCollection(contentDir, collection).map((item) => item.file.replace(/\.md$/, '')))]))
  const featuredTypeToCollection = { note: 'notes', blog: 'blogs', quiz: 'quizzes', video: 'videos' }

  if (levels.length === 0) errors.push('content/subjects.yml must define at least one level')
  if (subjects.length === 0) errors.push('content/subjects.yml must define at least one subject')

  for (const level of levels) {
    if (!level.id || !level.title) errors.push('Every level needs an id and title')
    if (levelIds.has(level.id)) errors.push(`Duplicate level ID: ${level.id}`)
    levelIds.add(level.id)
  }

  for (const subject of subjects) {
    if (!subject.id || !subject.title || !subject.levelId) {
      errors.push('Every subject needs an id, title, and levelId')
    }
    if (subject.id && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(subject.id)) {
      errors.push(`Subject ID must be lowercase kebab-case: ${subject.id}`)
    }
    if (subjectIds.has(subject.id)) errors.push(`Duplicate subject ID: ${subject.id}`)
    if (subject.levelId && !levelIds.has(subject.levelId)) {
      errors.push(`Subject ${subject.id} references missing level: ${subject.levelId}`)
    }
    if (subject.featured !== undefined && !Array.isArray(subject.featured)) {
      errors.push(`Subject ${subject.id} featured must be a list`)
    }
    for (const [index, featured] of (Array.isArray(subject.featured) ? subject.featured.entries() : [])) {
      const label = `Subject ${subject.id} featured item ${index + 1}`
      if (!featured || !featured.type || !featured.id) {
        errors.push(`${label} needs a type and id`)
        continue
      }
      const collection = featuredTypeToCollection[featured.type]
      if (!collection) errors.push(`${label} has unsupported type: ${featured.type}`)
      else if (!resourceIds[collection].has(featured.id)) errors.push(`${label} references missing resource: ${featured.type}/${featured.id}`)
    }
    subjectIds.add(subject.id)
  }

  for (const collection of MARKDOWN_COLLECTIONS) {
    for (const item of readMarkdownCollection(contentDir, collection)) {
      const label = `${collection}/${item.file}`
      const { data, body } = item
      if (!data.subjectId) errors.push(`${label} is missing subjectId`)
      else if (!subjectIds.has(data.subjectId)) errors.push(`${label} references missing subject: ${data.subjectId}`)
      if (!data.title) errors.push(`${label} is missing title`)
      if (collection === 'notes') {
        if (!data.summary) errors.push(`${label} is missing summary`)
        if (!body) errors.push(`${label} is missing a Markdown body`)
        if (data.image && !String(data.image).startsWith('/images/')) {
          errors.push(`${label} image must use a /images/ path`)
        }
        validateIsoDate(data.date, `${label} date`, errors)
      }
      if (collection === 'blogs') {
        if (!data.excerpt) errors.push(`${label} is missing excerpt`)
        if (!body) errors.push(`${label} is missing a Markdown body`)
        validateIsoDate(data.date, `${label} date`, errors)
      }
      if (collection === 'quizzes') {
        if (!Array.isArray(data.questions) || data.questions.length === 0) {
          errors.push(`${label} must contain at least one question`)
        } else {
          data.questions.forEach((question, index) => {
            const questionLabel = `${label} question ${index + 1}`
            if (!question.question) errors.push(`${questionLabel} is missing question text`)
            if (!Array.isArray(question.options) || question.options.length < 2) {
              errors.push(`${questionLabel} needs at least two options`)
            }
            if (!Number.isInteger(question.answerIndex) || question.answerIndex < 0 || question.answerIndex >= (question.options?.length || 0)) {
              errors.push(`${questionLabel} has an invalid answerIndex`)
            }
            if (!question.explanation) errors.push(`${questionLabel} is missing an explanation`)
          })
        }
      }
      if (collection === 'videos' && data.youtubeId && !/^[A-Za-z0-9_-]{6,}$/.test(data.youtubeId)) {
        errors.push(`${label} has an invalid YouTube ID`)
      }
    }
  }

  fail(errors)
  return { levels, subjects }
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(import.meta.url.replace('file://', ''))) {
  validateContent()
  console.log('Content validation passed.')
}
