import { useEffect, useState } from 'react'
import {
  getPublishedSubject,
  getPublishedSubjects,
  getPublishedTopics,
  getStudentSubjectProgress,
} from '../services/subjectService.js'
import './SubjectsPage.css'

async function readWithLogging(label, request) {
  try {
    return await request
  } catch (error) {
    console.error(`Failed to read ${label} — code: ${error?.code ?? "unknown"}; message: ${error?.message ?? "unknown"}; name: ${error?.name ?? "unknown"}`)
    throw error
  }
}

function getProgress(progressBySubject, subjectId) {
  const entry = progressBySubject[subjectId]
  const value = Number(entry?.percentage ?? entry?.progress)
  const percentage = Number.isFinite(value) ? Math.max(0, Math.min(100, Math.round(value))) : 0
  const status = entry?.status || (percentage > 0 ? 'In progress' : 'Not started')
  return { percentage, status }
}

function SubjectCard({ subject, progressBySubject }) {
  const progress = getProgress(progressBySubject, subject.id)

  return (
    <article className="learning-subject-card">
      <div className="learning-subject-card__top">
        <span className="learning-subject-card__number">{String(subject.order || '').padStart(2, '0')}</span>
        <span className="learning-subject-card__papers">{(subject.papers || []).join(' + ')}</span>
      </div>
      <h2>{subject.name}</h2>
      <p className="learning-subject-card__description">{subject.description}</p>
      <div className="learning-subject-card__progress-label">
        <span>{progress.status}</span>
        <strong>{progress.percentage}%</strong>
      </div>
      <div
        className="learning-subject-card__progress-track"
        role="progressbar"
        aria-label={`${subject.name} progress`}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={progress.percentage}
      >
        <span style={{ width: `${progress.percentage}%` }} />
      </div>
      <a className="learning-subject-card__button" href={`/dashboard/subjects/${subject.id}`}>
        Open Subject <span aria-hidden="true">→</span>
      </a>
    </article>
  )
}

export default function SubjectsPage({ subjectId = '' }) {
  const [state, setState] = useState({ loading: true, error: '', subjects: [], progress: {}, subject: null, topics: [] })
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let active = true

    async function loadSubjects() {
      try {
        if (subjectId) {
          const [subject, topics] = await Promise.all([
            readWithLogging('subject document', getPublishedSubject(subjectId)),
            readWithLogging('subject topics', getPublishedTopics(subjectId)),
          ])
          if (active) setState({ loading: true, error: '', subjects: [], progress: {}, subject, topics })
          return
        }

        const subjects = await readWithLogging('subjects collection', getPublishedSubjects())
        let progress = {}

        try {
          progress = await readWithLogging('student progress', getStudentSubjectProgress())
        } catch {
          progress = {}
        }

        if (active) setState({ loading: true, error: '', subjects, progress, subject: null, topics: [] })
      } catch (error) {
        console.error('Firestore error:', {
          code: error?.code,
          message: error?.message,
          name: error?.name,
        })
        if (active) setState({ loading: true, error: 'Subjects could not be loaded. Check your connection and try again.', subjects: [], progress: {}, subject: null, topics: [] })
      } finally {
        if (active) setState((current) => ({ ...current, loading: false }))
      }
    }

    loadSubjects()
    return () => { active = false }
  }, [subjectId, reloadKey])

  if (state.loading) {
    return <div className="learning-subjects-state" role="status">Loading subjects...</div>
  }

  if (state.error) {
    return (
      <div className="learning-subjects-state learning-subjects-state--error" role="alert">
        <p>{state.error}</p>
        <button type="button" onClick={() => {
          setState((current) => ({ ...current, loading: true, error: '' }))
          setReloadKey((key) => key + 1)
        }}>
          Reload page
        </button>
      </div>
    )
  }

  if (subjectId) {
    if (!state.subject) {
      return (
        <section className="learning-subject-detail">
          <a className="learning-subject-detail__back" href="/dashboard/subjects">← All subjects</a>
          <div className="learning-subjects-state">This subject is unavailable or has not been published.</div>
        </section>
      )
    }

    return (
      <section className="learning-subject-detail">
        <a className="learning-subject-detail__back" href="/dashboard/subjects">← All subjects</a>
        <header className="learning-subject-detail__header">
          <p className="dashboard-kicker">Subject overview</p>
          <h2>{state.subject.name}</h2>
          <p>{state.subject.description}</p>
          <div className="learning-subject-detail__papers">
            {(state.subject.papers || []).map((paper) => <span key={paper}>{paper}</span>)}
          </div>
        </header>
        <section className="learning-topics" aria-labelledby="learning-topics-heading">
          <div className="learning-topics__heading">
            <div>
              <p className="dashboard-kicker">Learning pathway</p>
              <h3 id="learning-topics-heading">Topics</h3>
            </div>
          </div>
          {state.topics.length ? (
            <ol className="learning-topics__list">
              {state.topics.map((topic) => <li key={topic.id}>{topic.name}</li>)}
            </ol>
          ) : (
            <p className="learning-topics__empty">No topics available yet.</p>
          )}
        </section>
      </section>
    )
  }

  return (
    <section className="learning-subjects" aria-labelledby="learning-subjects-heading">
      <header className="learning-subjects__header">
        <div>
          <p className="dashboard-kicker">Your learning pathway</p>
          <h2 id="learning-subjects-heading">My Subjects</h2>
          <p>Choose a subject to explore its learning pathway.</p>
        </div>
        <span className="learning-subjects__count">{state.subjects.length} subjects</span>
      </header>
      {state.subjects.length ? (
        <div className="learning-subjects__grid">
          {state.subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} progressBySubject={state.progress} />
          ))}
        </div>
      ) : (
        <div className="learning-subjects-state">
          No published subjects are available yet. Please check back soon.
        </div>
      )}
    </section>
  )
}