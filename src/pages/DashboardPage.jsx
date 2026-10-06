import { useEffect, useMemo, useState } from 'react'
import './DashboardPage.css'
import { signOutFromFirebase } from '../firebase/firebase.js'
import { getStudentDashboard } from '../services/dashboardService.js'
import { getCurrentStudentProfile } from '../services/studentService.js'

const mainNav = [
  { label: 'Dashboard', icon: 'dashboard', active: true },
  { label: 'My Subjects', icon: 'subjects' },
  { label: 'Lessons', icon: 'lessons' },
  { label: 'Practice', icon: 'practice' },
  { label: 'Resources', icon: 'resources' },
  { label: 'My Progress', icon: 'progress' },
]

const secondaryNav = [
  { label: 'Settings', icon: 'settings' },
  { label: 'Help & Support', icon: 'support' },
]

const quickActions = [
  'Continue Learning',
  'Practice Questions',
  'Browse Resources',
  'View Progress',
]

function Icon({ type, className = '' }) {
  const classes = `dashboard-icon ${className}`.trim()

  const commonProps = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.8',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className: classes,
    'aria-hidden': 'true',
  }

  switch (type) {
    case 'dashboard':
      return (
        <svg {...commonProps}>
          <path d="M4 12.5V5.5A1.5 1.5 0 0 1 5.5 4H10v7.5H4Zm10 0V4h4.5A1.5 1.5 0 0 1 20 5.5v7Zm-10 6.5V13h6v7.5H5.5A1.5 1.5 0 0 1 4 19V19Zm10 0V13h6v6.5a1.5 1.5 0 0 1-1.5 1.5H14Z" />
        </svg>
      )
    case 'subjects':
      return (
        <svg {...commonProps}>
          <path d="M5 6.5A1.5 1.5 0 0 1 6.5 5h11A1.5 1.5 0 0 1 19 6.5v11A1.5 1.5 0 0 1 17.5 19h-11A1.5 1.5 0 0 1 5 17.5v-11Z" />
          <path d="M8 9.5h8M8 12h8M8 14.5h5" />
        </svg>
      )
    case 'lessons':
      return (
        <svg {...commonProps}>
          <path d="M7 5.5A2.5 2.5 0 0 1 9.5 3h8A2.5 2.5 0 0 1 20 5.5v11A2.5 2.5 0 0 1 17.5 19h-8A2.5 2.5 0 0 1 7 16.5v-11Z" />
          <path d="M7 8.5H4.5A1.5 1.5 0 0 0 3 10v9a2 2 0 0 0 2 2h8.5A2.5 2.5 0 0 1 11.5 19v-10.5H7Z" />
        </svg>
      )
    case 'practice':
      return (
        <svg {...commonProps}>
          <path d="M8 7.5h8M8 11.5h8M8 15.5h5" />
          <path d="M5 4.5h14a1.5 1.5 0 0 1 1.5 1.5v12A1.5 1.5 0 0 1 19 19.5H5A1.5 1.5 0 0 1 3.5 18V6A1.5 1.5 0 0 1 5 4.5Z" />
        </svg>
      )
    case 'resources':
      return (
        <svg {...commonProps}>
          <path d="M6 4.5A2.5 2.5 0 0 1 8.5 2h7A2.5 2.5 0 0 1 18 4.5v13A2.5 2.5 0 0 1 15.5 20h-7A2.5 2.5 0 0 1 6 17.5v-13Z" />
          <path d="M9 7.5h6M9 11h6M9 14.5h4" />
        </svg>
      )
    case 'progress':
      return (
        <svg {...commonProps}>
          <path d="M18.5 18.5V9.5M12.5 18.5V6.5M6.5 18.5v-8" />
          <path d="M4 20h16" />
        </svg>
      )
    case 'settings':
      return (
        <svg {...commonProps}>
          <path d="M12 8.5A3.5 3.5 0 1 1 12 15.5A3.5 3.5 0 0 1 12 8.5Z" />
          <path d="M19.5 12a7.7 7.7 0 0 0-.08-1l1.7-1.3-1.8-3.1-2.1.7a7.8 7.8 0 0 0-1.7-1l-.4-2.3h-3.6l-.4 2.3a7.8 7.8 0 0 0-1.7 1l-2.1-.7-1.8 3.1 1.7 1.3A7.7 7.7 0 0 0 4.5 12c0 .34.03.68.08 1L2.9 14.3l1.8 3.1 2.1-.7c.52.4 1.1.74 1.7 1l.4 2.3h3.6l.4-2.3c.6-.26 1.18-.6 1.7-1l2.1.7 1.8-3.1-1.7-1.3c.05-.32.08-.66.08-1Z" />
        </svg>
      )
    case 'support':
      return (
        <svg {...commonProps}>
          <path d="M6.5 13.5a5.5 5.5 0 0 1 11 0v2.5a2 2 0 0 1-2 2h-1.5v-5h3.5" />
          <path d="M6.5 13.5V9.5A5.5 5.5 0 0 1 12 4a5.5 5.5 0 0 1 5.5 5.5v4" />
          <path d="M6.5 18.5a2 2 0 0 0 2 2h6.5a2 2 0 0 0 2-2v-2H6.5v2Z" />
        </svg>
      )
    case 'search':
      return (
        <svg {...commonProps}>
          <circle cx="11" cy="11" r="5.5" />
          <path d="M16 16l4 4" />
        </svg>
      )
    case 'notification':
      return (
        <svg {...commonProps}>
          <path d="M14 18.5h-4M18 18.5H6l1.3-1.6V10a4.7 4.7 0 0 1 9.4 0v6.9L18 18.5Z" />
          <path d="M10.5 20.5a1.5 1.5 0 0 0 3 0" />
        </svg>
      )
    case 'arrow-right':
      return (
        <svg {...commonProps}>
          <path d="M5 12h12" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      )
    case 'spark':
      return (
        <svg {...commonProps}>
          <path d="m12 3 1.8 4.8L18.5 9l-4.7 1.2L12 15l-1.8-4.8L5.5 9l4.7-1.2L12 3Z" />
        </svg>
      )
    case 'calendar':
      return (
        <svg {...commonProps}>
          <rect x="3.5" y="5.5" width="17" height="15" rx="2" />
          <path d="M8 3.5v4M16 3.5v4M3.5 9.5h17" />
        </svg>
      )
    default:
      return null
  }
}

function SubjectGlyph({ type }) {
  const commonProps = {
    viewBox: '0 0 48 48',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.8',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true',
  }

  switch (type) {
    case 'physics':
      return (
        <svg {...commonProps}>
          <ellipse cx="24" cy="24" rx="14" ry="6" />
          <ellipse cx="24" cy="24" rx="14" ry="6" transform="rotate(60 24 24)" />
          <ellipse cx="24" cy="24" rx="14" ry="6" transform="rotate(120 24 24)" />
          <circle cx="24" cy="24" r="2" />
        </svg>
      )
    case 'chemistry':
      return (
        <svg {...commonProps}>
          <path d="M18 8h12M21 8v13L11 36a2 2 0 0 0 1.8 3h22.4A2 2 0 0 0 37 36L27 21V8" />
          <path d="M16 31h16M19 25h10" />
        </svg>
      )
    case 'mathematics':
      return (
        <svg {...commonProps}>
          <path d="M11 37l12-26 12 26M15 29h18M30 15h9M34 11v9" />
        </svg>
      )
    case 'biology':
      return (
        <svg {...commonProps}>
          <path d="M39 10c-12 0-20 4-23 12-3 6 0 12 7 12 10 0 18-10 22-24Z" />
          <path d="M8 39c6-10 14-16 24-22M17 30l2 7M26 23l7 1" />
        </svg>
      )
    case 'submath':
      return (
        <svg {...commonProps}>
          <path d="M12 15h24M12 24h24M12 33h24" />
          <circle cx="18" cy="15" r="2" />
          <circle cx="30" cy="24" r="2" />
          <circle cx="21" cy="33" r="2" />
        </svg>
      )
    case 'ict':
      return (
        <svg {...commonProps}>
          <rect x="9" y="10" width="30" height="22" rx="2" />
          <path d="M20 38h8M24 32v6M15 16h18M14 20h10" />
        </svg>
      )
    case 'agriculture':
      return (
        <svg {...commonProps}>
          <path d="M24 39V20M24 28c-9 0-14-5-14-13 9 0 14 5 14 13Zm0-5c0-8 5-13 14-13 0 8-5 13-14 13ZM15 39h18" />
        </svg>
      )
    default:
      return null
  }
}

function StatCard({ item }) {
  const iconMap = {
    progress: 'progress',
    subjects: 'subjects',
    lessons: 'lessons',
    score: 'spark',
  }

  return (
    <article className="dashboard-stat-card" aria-label={`${item.label} ${item.value}`}>
      <div className="dashboard-stat-card__icon">
        <Icon type={iconMap[item.icon]} />
      </div>
      <div className="dashboard-stat-card__content">
        <strong>{item.value}</strong>
        <span>{item.label}</span>
      </div>
      <small>{item.detail}</small>
    </article>
  )
}

function ProgressBar({ value }) {
  return (
    <div className="dashboard-progress-bar" aria-label={`${value}% complete`}>
      <span style={{ width: `${value}%` }} />
    </div>
  )
}

function getStudentInitials(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  return parts.length > 1
    ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
    : parts[0]?.slice(0, 2).toUpperCase() || 'S'
}

function withRequestDeadline(request, message) {
  const signal = AbortSignal.timeout(15000)

  return new Promise((resolve, reject) => {
    const onDeadline = () => reject(new Error(message))

    if (signal.aborted) {
      onDeadline()
      return
    }

    signal.addEventListener('abort', onDeadline, { once: true })
    Promise.resolve(request).then(
      (result) => {
        signal.removeEventListener('abort', onDeadline)
        resolve(result)
      },
      (error) => {
        signal.removeEventListener('abort', onDeadline)
        reject(error)
      },
    )
  })
}

export default function DashboardPage({ authUser }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [profileState, setProfileState] = useState({ loading: true, error: '', student: null })
  const [dashboardState, setDashboardState] = useState({
    loading: true,
    error: '',
    student: null,
    stats: [],
    subjects: [],
    lessons: [],
    practice: [],
    resources: [],
    weeklyProgress: [],
    recentActivity: [],
    continueLearning: null,
    notConfigured: false,
  })

  useEffect(() => {
    let isMounted = true

    const loadProfile = async () => {
      try {
        const student = await withRequestDeadline(
          getCurrentStudentProfile(),
          'Your student profile could not be loaded. Showing your Firebase account details instead.',
        )
        if (isMounted) setProfileState({ loading: false, error: '', student })
      } catch (error) {
        console.warn('Unable to load student profile.', error)
        if (isMounted) {
          setProfileState({
            loading: false,
            error: 'Unable to load your student profile. Showing your Firebase account details instead.',
            student: null,
          })
        }
      } finally {
        if (isMounted) setProfileState((current) => ({ ...current, loading: false }))
      }
    }

    const loadDashboard = async () => {
      try {
        const dashboardData = await withRequestDeadline(
          getStudentDashboard(),
          'Your learning data could not be loaded right now. Your dashboard is still available.',
        )

        if (isMounted) {
          setDashboardState({
            ...dashboardData,
            loading: false,
          })
        }
      } catch (error) {
        console.warn('Unable to load dashboard data.', error)

        if (isMounted) {
          setDashboardState((current) => ({
            ...current,
            loading: false,
            error: 'Unable to load your learning data right now. Your dashboard is still available.',
          }))
        }
      } finally {
        if (isMounted) setDashboardState((current) => ({ ...current, loading: false }))
      }
    }

    loadProfile()
    loadDashboard()

    return () => {
      isMounted = false
    }
  }, [authUser?.uid])

  const handleLogout = async () => {
    try {
      await signOutFromFirebase()
      window.location.href = '/login'
    } catch (error) {
      console.warn('Logout failed.', error)
    }
  }

  const todayLabel = useMemo(() => {
    const now = new Date()
    return now.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
  }, [])

  const studentName = profileState.student?.name?.trim() || authUser?.displayName?.trim() || ''
  const studentEmail = profileState.student?.email?.trim() || authUser?.email || ''
  const studentInitials = getStudentInitials(studentName)
  const currentLesson = dashboardState.continueLearning
  const stats = dashboardState.stats.length > 0 ? dashboardState.stats : []
  const subjects = dashboardState.subjects.length > 0 ? dashboardState.subjects : []
  const lessons = dashboardState.lessons.length > 0 ? dashboardState.lessons : []
  const practice = dashboardState.practice.length > 0 ? dashboardState.practice : []
  const resourceCards = dashboardState.resources.length > 0 ? dashboardState.resources : []
  const recentActivity = dashboardState.recentActivity.length > 0 ? dashboardState.recentActivity : []
  const weeklyProgress = dashboardState.weeklyProgress.length > 0 ? dashboardState.weeklyProgress : []

  return (
    <div className="dashboard-page">
      <div className={`dashboard-shell ${mobileNavOpen ? 'mobile-nav-open' : ''}`}>
        <button
          type="button"
          className="dashboard-mobile-toggle"
          aria-label="Toggle navigation"
          aria-expanded={mobileNavOpen}
          onClick={() => setMobileNavOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <div
          className="dashboard-backdrop"
          aria-hidden="true"
          onClick={() => setMobileNavOpen(false)}
        />

        <aside className={`dashboard-sidebar ${mobileNavOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          <div className="dashboard-sidebar__brand" aria-label="Science Scholar Academy logo">
            <div className="dashboard-brand-mark">SSA</div>
            <div>
              <span className="dashboard-brand-label">Science Scholar</span>
              <strong>Academy</strong>
            </div>
          </div>

          <nav className="dashboard-sidebar__nav" aria-label="Dashboard sections">
            <ul>
              {mainNav.map(({ label, icon, active }) => (
                <li key={label}>
                  <button type="button" className={active ? 'is-active' : ''}>
                    <Icon type={icon} />
                    <span>{label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="dashboard-sidebar__secondary">
            <ul>
              {secondaryNav.map(({ label, icon }) => (
                <li key={label}>
                  <button type="button">
                    <Icon type={icon} />
                    <span>{label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="dashboard-sidebar__profile">
            <div className="dashboard-profile-avatar">{studentInitials}</div>
            <div className="dashboard-sidebar__profile-details">
              <strong>{studentName || 'Student'}</strong>
              <span className="dashboard-sidebar__profile-email">{studentEmail}</span>
              <span>Student</span>
            </div>
            <button type="button" className="dashboard-profile-menu" onClick={handleLogout} aria-label="Log out">
              <Icon type='settings' />
            </button>
          </div>
        </aside>

        <div className="dashboard-main">
          <header className="dashboard-header">
            <div className="dashboard-header__title-wrap">
              <div className="dashboard-header__badge">Student Area</div>
              <h1>Dashboard</h1>
            </div>

            <div className="dashboard-header__actions">
              <label className="dashboard-search" aria-label="Search lessons and resources">
                <Icon type="search" />
                <input type="search" placeholder="Search lessons, topics..." />
              </label>

              <button type="button" className="dashboard-icon-button" aria-label="View notifications">
                <Icon type="notification" />
                <span className="dashboard-indicator" aria-hidden="true" />
              </button>

              <button type="button" className="dashboard-profile-pill" aria-label="Open student profile">
                <span className="dashboard-profile-avatar dashboard-profile-avatar--small">{studentInitials}</span>
                <span className="dashboard-profile-token">{studentName || 'Student'}</span>
              </button>
            </div>
          </header>

          <main className="dashboard-content">
            {(profileState.error || dashboardState.error) && (
              <div role="status" style={{ marginBottom: '16px', padding: '12px 14px', border: '1px solid #dfeaf1', borderRadius: '12px', background: '#fff', color: '#5f7286' }}>
                {profileState.error || dashboardState.error}
              </div>
            )}

            <section className="dashboard-welcome" aria-labelledby="welcome-headline">
              <div>
                <p className="dashboard-kicker">Student dashboard</p>
                <h2 id="welcome-headline">{studentName ? `Welcome back, ${studentName}` : 'Welcome back'}</h2>
                <p>Ready to continue learning and make progress today?</p>
              </div>
              <div className="dashboard-status-pill">
                <Icon type="calendar" />
                <span>{todayLabel}</span>
              </div>
            </section>

            <section className="dashboard-stats" aria-label="Student statistics overview">
              {stats.length > 0 ? stats.map((item) => <StatCard key={item.id} item={item} />) : (
                <div className="dashboard-stat-card" style={{ gridColumn: '1 / -1' }}>
                  <p style={{ margin: 0, color: '#5f7286' }}>{dashboardState.loading ? 'Loading your learning data...' : 'No student data is available yet.'}</p>
                </div>
              )}
            </section>

            <section className="dashboard-continue" aria-labelledby="continue-learning-title">
              <div className="dashboard-section-head">
                <div>
                  <p className="dashboard-kicker">Continue learning</p>
                  <h3 id="continue-learning-title">{currentLesson ? `${currentLesson.subject} — ${currentLesson.paper}` : 'Start your first lesson'}</h3>
                </div>
                <button type="button" className="dashboard-text-button">
                  View all lessons
                </button>
              </div>

              {currentLesson ? (
                <>
                  <div className="dashboard-continue__body">
                    <div className="dashboard-continue__subject">
                      <div className="dashboard-subject-icon dashboard-subject-icon--physics">
                        <SubjectGlyph type={currentLesson.subject?.toLowerCase().includes('physics') ? 'physics' : currentLesson.subject?.toLowerCase().includes('chemistry') ? 'chemistry' : currentLesson.subject?.toLowerCase().includes('biology') ? 'biology' : currentLesson.subject?.toLowerCase().includes('math') ? 'mathematics' : 'submath'} />
                      </div>
                      <div>
                        <span className="dashboard-subject-label">Topic</span>
                        <strong>{currentLesson.title}</strong>
                      </div>
                    </div>

                    <div className="dashboard-continue__meta">
                      <div>
                        <span>Progress</span>
                        <strong>{currentLesson.progress || 0}%</strong>
                      </div>
                      <button type="button" className="dashboard-primary-button">
                        Continue Learning
                        <Icon type="arrow-right" />
                      </button>
                    </div>
                  </div>

                  <ProgressBar value={currentLesson.progress || 0} />
                </>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', marginTop: '18px' }}>
                  <p style={{ margin: 0, color: '#5f7286' }}>Choose a subject and begin learning at your own pace.</p>
                  <a href="/courses/" className="dashboard-primary-button" style={{ textDecoration: 'none' }}>
                    Explore subjects
                    <Icon type="arrow-right" />
                  </a>
                </div>
              )}
            </section>

            <div className="dashboard-two-column">
              <section className="dashboard-subjects-section" aria-labelledby="subjects-heading">
                <div className="dashboard-section-head">
                  <div>
                    <p className="dashboard-kicker">My subjects</p>
                    <h3 id="subjects-heading">Learning pathway</h3>
                  </div>
                </div>

                <div className="dashboard-subject-grid">
                  {subjects.length > 0 ? subjects.map((subject) => (
                    <article key={subject.id} className="dashboard-subject-card">
                      <div className="dashboard-subject-card__top">
                        <div className={`dashboard-subject-icon dashboard-subject-icon--${subject.icon || 'subjects'}`}>
                          <SubjectGlyph type={subject.icon || 'submath'} />
                        </div>
                        <span className="dashboard-subject-card__paper">{subject.paper || 'Course'}</span>
                      </div>

                      <h4>{subject.name}</h4>
                      <p>{subject.status || 'Not started'}</p>

                      <div className="dashboard-subject-card__footer">
                        <span>{subject.progress > 0 ? `${subject.progress}%` : 'Not started'}</span>
                        <button type="button" disabled={subject.progress <= 0}>{subject.progress > 0 ? 'Continue' : 'Start'}</button>
                      </div>

                      <ProgressBar value={subject.progress || 0} />
                    </article>
                  )) : (
                    <div className="dashboard-subject-card" style={{ gridColumn: '1 / -1' }}>
                      <p style={{ margin: 0, color: '#5f7286' }}>No subjects enrolled yet.</p>
                    </div>
                  )}
                </div>
              </section>

              <div className="dashboard-side-stack">
                <section className="dashboard-lessons" aria-labelledby="recent-lessons-title">
                  <div className="dashboard-section-head">
                    <div>
                      <p className="dashboard-kicker">Recent lessons</p>
                      <h3 id="recent-lessons-title">Latest study activity</h3>
                    </div>
                  </div>

                  <ul className="dashboard-lesson-list">
                    {lessons.length > 0 ? lessons.map((lesson) => (
                      <li key={lesson.id} className="dashboard-lesson-item">
                        <div className={`dashboard-subject-icon dashboard-subject-icon--${lesson.icon || 'submath'}`}>
                          <SubjectGlyph type={lesson.icon || 'submath'} />
                        </div>
                        <div className="dashboard-lesson-item__content">
                          <strong>{lesson.subject || 'Subject'}</strong>
                          <span>{lesson.title}</span>
                          <small>{lesson.lastOpened || lesson.updatedAt || 'Recently accessed'}</small>
                        </div>
                        <span className="dashboard-lesson-item__progress">{lesson.progress || 0}%</span>
                      </li>
                    )) : (
                      <li className="dashboard-lesson-item" style={{ display: 'block', borderBottom: 0 }}>
                        <p style={{ margin: 0, color: '#5f7286' }}>No lesson activity yet.</p>
                      </li>
                    )}
                  </ul>
                </section>

                <section className="dashboard-resources" aria-labelledby="resources-title">
                  <div className="dashboard-section-head">
                    <div>
                      <p className="dashboard-kicker">Resources</p>
                      <h3 id="resources-title">Useful tools</h3>
                    </div>
                    <button type="button" className="dashboard-text-button">View all</button>
                  </div>

                  <div className="dashboard-resource-grid">
                    {resourceCards.length > 0 ? resourceCards.map((resource) => (
                      <article key={resource.id || resource.title} className="dashboard-resource-card">
                        <div className="dashboard-resource-card__icon">
                          <Icon type={resource.icon === 'notes' ? 'resources' : resource.icon === 'papers' ? 'lessons' : resource.icon === 'revision' ? 'spark' : 'subjects'} />
                        </div>
                        <h4>{resource.title}</h4>
                        <p>{resource.description}</p>
                      </article>
                    )) : (
                      <div className="dashboard-resource-card" style={{ gridColumn: '1 / -1' }}>
                        <p style={{ margin: 0, color: '#5f7286' }}>No resources assigned yet.</p>
                      </div>
                    )}
                  </div>
                </section>
              </div>
            </div>

            <div className="dashboard-lower-grid">
              <section className="dashboard-practice" aria-labelledby="practice-title">
                <div className="dashboard-section-head">
                  <div>
                    <p className="dashboard-kicker">Practice &amp; exams</p>
                    <h3 id="practice-title">Assess your understanding</h3>
                  </div>
                </div>

                <div className="dashboard-practice-grid">
                  {practice.length > 0 ? practice.map((card) => (
                    <article key={card.id} className="dashboard-practice-card dashboard-practice-card--cyan">
                      <div className="dashboard-practice-card__top">
                        <div className="dashboard-practice-card__badge">{card.totalQuestions || '0'}</div>
                        <span>{card.duration || 'Pending'}</span>
                      </div>
                      <h4>{card.subjectName || 'Practice session'}</h4>
                      <p>{card.title || 'No title provided'}</p>
                      <div className="dashboard-practice-card__footer">
                        <strong>{card.percentage ? `${Math.round(card.percentage)}%` : '0%'}</strong>
                        <button type="button">Open</button>
                      </div>
                    </article>
                  )) : (
                    <div className="dashboard-practice-card" style={{ gridColumn: '1 / -1' }}>
                      <p style={{ margin: 0, color: '#5f7286' }}>No practice attempts yet.</p>
                    </div>
                  )}
                </div>
              </section>

              <section className="dashboard-chart-panel" aria-labelledby="weekly-progress-title">
                <div className="dashboard-section-head">
                  <div>
                    <p className="dashboard-kicker">Weekly progress</p>
                    <h3 id="weekly-progress-title">Study activity</h3>
                  </div>
                </div>

                {weeklyProgress.length > 0 ? (
                  <div className="dashboard-chart" aria-label="Weekly study activity chart">
                    {weeklyProgress.map(({ day, lessons, practice: practiceValue }) => (
                      <div key={day} className="dashboard-chart__column">
                        <div className="dashboard-chart__bars">
                          <span className="dashboard-chart__bar dashboard-chart__bar--lessons" style={{ height: `${lessons}%` }} />
                          <span className="dashboard-chart__bar dashboard-chart__bar--practice" style={{ height: `${practiceValue}%` }} />
                        </div>
                        <small>{day}</small>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ margin: '24px 0 0', color: '#5f7286' }}>Not enough learning activity to generate a chart yet.</p>
                )}
              </section>
            </div>

            <section className="dashboard-motivation" aria-labelledby="motivation-heading">
              <div>
                <p className="dashboard-kicker">Keep going</p>
                <h3 id="motivation-heading">{recentActivity.length > 0 ? 'You’re making progress.' : 'Your learning starts here.'}</h3>
                <p>{recentActivity.length > 0 ? `${recentActivity.length} recent learning updates.` : 'No recent activity yet.'}</p>
              </div>
              {recentActivity.length > 0 && (
                <div className="dashboard-motivation__tag">
                  <span className="dashboard-motivation__dot" aria-hidden="true" />
                  Active
                </div>
              )}
            </section>

            <section className="dashboard-quick-actions" aria-label="Quick actions">
              <button type="button" className="dashboard-quick-action">Continue Learning</button>
              <button type="button" className="dashboard-quick-action">Practice Questions</button>
              <button type="button" className="dashboard-quick-action">Browse Resources</button>
              <button type="button" className="dashboard-quick-action">View Progress</button>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
