import { existsSync, readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import yaml from 'js-yaml'
import { normalizeVisualBlocks } from './normalize-visual-blocks.mjs'

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
  const curriculumPath = path.join(contentDir, 'curriculum.yml')
  const curriculumTaxonomy = existsSync(curriculumPath) ? yaml.load(readFileSync(curriculumPath, 'utf8')) || {} : {}
  const curricula = Array.isArray(curriculumTaxonomy.curricula) ? curriculumTaxonomy.curricula : []

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

  const curriculumIds = new Set()
  for (const curriculum of curricula) {
    const label = `curriculum/${curriculum.id || 'unknown'}`
    if (!curriculum.id || !curriculum.subjectId || !curriculum.title || !curriculum.description) {
      errors.push(`${label} needs an id, subjectId, title, and description`)
    }
    if (curriculumIds.has(curriculum.id)) errors.push(`Duplicate curriculum ID: ${curriculum.id}`)
    curriculumIds.add(curriculum.id)
    if (curriculum.subjectId && !subjectIds.has(curriculum.subjectId)) {
      errors.push(`${label} references missing subject: ${curriculum.subjectId}`)
    }
    if (!curriculum.syllabusNote) errors.push(`${label} is missing syllabusNote`)
    if (!Array.isArray(curriculum.units) || curriculum.units.length === 0) {
      errors.push(`${label} must contain at least one unit`)
      continue
    }
    const unitIds = new Set()
    curriculum.units.forEach((unit, unitIndex) => {
      const unitLabel = `${label} unit ${unitIndex + 1}`
      if (!unit.id || !unit.title || !unit.summary) errors.push(`${unitLabel} needs an id, title, and summary`)
      if (unitIds.has(unit.id)) errors.push(`Duplicate unit ID in ${label}: ${unit.id}`)
      unitIds.add(unit.id)
      if (!Number.isInteger(unit.order) || unit.order < 1) errors.push(`${unitLabel} needs a positive integer order`)
      if (!Number.isInteger(unit.estimatedMinutes) || unit.estimatedMinutes < 1) errors.push(`${unitLabel} needs a positive estimatedMinutes value`)
      if (!Array.isArray(unit.outcomes) || unit.outcomes.length === 0) errors.push(`${unitLabel} needs at least one outcome`)
      if (!Array.isArray(unit.lessons) || unit.lessons.length === 0) {
        errors.push(`${unitLabel} must contain at least one lesson`)
        return
      }
      const lessonIds = new Set()
      unit.lessons.forEach((lesson, lessonIndex) => {
        const lessonLabel = `${unitLabel} lesson ${lessonIndex + 1}`
        if (!lesson.id || !lesson.title || !lesson.resourceType || !lesson.resourceId || !lesson.description) {
          errors.push(`${lessonLabel} needs id, title, resourceType, resourceId, and description`)
        }
        if (lessonIds.has(lesson.id)) errors.push(`Duplicate lesson ID in ${unitLabel}: ${lesson.id}`)
        lessonIds.add(lesson.id)
        const collection = featuredTypeToCollection[lesson.resourceType]
        if (!collection) errors.push(`${lessonLabel} has unsupported resourceType: ${lesson.resourceType}`)
        else if (!resourceIds[collection].has(lesson.resourceId)) errors.push(`${lessonLabel} references missing resource: ${lesson.resourceType}/${lesson.resourceId}`)
        if (!Number.isInteger(lesson.estimatedMinutes) || lesson.estimatedMinutes < 1) errors.push(`${lessonLabel} needs a positive estimatedMinutes value`)
      })
    })
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
        if (data.slidesEnabled !== undefined && typeof data.slidesEnabled !== 'boolean') {
          errors.push(`${label} slidesEnabled must be a boolean`)
        }
        if (data.slideControls !== undefined) {
          const controls = data.slideControls
          if (!controls || typeof controls !== 'object' || Array.isArray(controls)) {
            errors.push(`${label} slideControls must be an object`)
          } else {
            if (controls.mode !== undefined && !['auto', 'text', 'bullets', 'recap'].includes(controls.mode)) {
              errors.push(`${label} slideControls.mode must be auto, text, bullets, or recap`)
            }
            if (controls.maxPoints !== undefined && (!Number.isInteger(controls.maxPoints) || controls.maxPoints < 1 || controls.maxPoints > 6)) {
              errors.push(`${label} slideControls.maxPoints must be an integer from 1 to 6`)
            }
            if (controls.includeQuickCheck !== undefined && typeof controls.includeQuickCheck !== 'boolean') {
              errors.push(`${label} slideControls.includeQuickCheck must be a boolean`)
            }
            if (controls.sections !== undefined && (!Array.isArray(controls.sections) || controls.sections.some((section) => typeof section !== 'string'))) {
              errors.push(`${label} slideControls.sections must be a list of strings`)
            }
            if (controls.title !== undefined && typeof controls.title !== 'string') {
              errors.push(`${label} slideControls.title must be a string`)
            }
          }
        }
        if (data.visualBlocks !== undefined) {
          const visualBlocks = normalizeVisualBlocks(data.visualBlocks)
          if (!Array.isArray(visualBlocks)) {
            errors.push(`${label} visualBlocks must be a list`)
          } else {
            const visualTypes = new Set(['formula', 'table', 'graph'])
            visualBlocks.forEach((block, blockIndex) => {
              const blockLabel = `${label} visualBlocks item ${blockIndex + 1}`
              if (!block || typeof block !== 'object' || Array.isArray(block)) {
                errors.push(`${blockLabel} must be an object`)
                return
              }
              if (!visualTypes.has(block.type)) errors.push(`${blockLabel} has unsupported type: ${block.type}`)
              if (typeof block.title !== 'string' || !block.title.trim()) errors.push(`${blockLabel} needs a title`)
              if (block.type === 'formula' && (typeof block.expression !== 'string' || !block.expression.trim())) {
                errors.push(`${blockLabel} formula needs an expression`)
              }
              if (block.type === 'table') {
                if (!Array.isArray(block.columns) || block.columns.length === 0 || block.columns.some((column) => typeof column !== 'string')) {
                  errors.push(`${blockLabel} table needs a non-empty list of string columns`)
                }
                if (!Array.isArray(block.rows) || block.rows.length === 0) {
                  errors.push(`${blockLabel} table needs a non-empty list of rows`)
                } else if (Array.isArray(block.columns)) {
                  block.rows.forEach((row, rowIndex) => {
                    if (!Array.isArray(row) || row.length !== block.columns.length) errors.push(`${blockLabel} row ${rowIndex + 1} must match the column count`)
                  })
                }
              }
              if (block.type === 'graph') {
                if (typeof block.asset !== 'string' || !block.asset.startsWith('/generated/visuals/') || !block.asset.endsWith('.svg')) {
                  errors.push(`${blockLabel} graph asset must be a generated SVG path`)
                }
                if (!Array.isArray(block.points) || block.points.length < 2 || block.points.some((point) => !Array.isArray(point) || point.length !== 2 || point.some((value) => typeof value !== 'number' || !Number.isFinite(value)))) {
                  errors.push(`${blockLabel} graph needs at least two numeric [x, y] points`)
                }
                if (typeof block.xLabel !== 'string' || typeof block.yLabel !== 'string') errors.push(`${blockLabel} graph needs xLabel and yLabel`)
              }
            })
          }
        }
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
