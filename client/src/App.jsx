import { useMemo, useState } from 'react'
import './App.css'

const quarters = ['Q1', 'Q2', 'Q3', 'Q4']
const statuses = ['Not Started', 'On Track', 'Completed']
const uoms = ['Min', 'Max', 'Timeline', 'Zero']

const people = [
  { id: 'e1', name: 'Aarav Mehta', role: 'Employee', department: 'Sales', managerId: 'm1' },
  { id: 'e2', name: 'Nisha Rao', role: 'Employee', department: 'Operations', managerId: 'm1' },
  { id: 'e3', name: 'Kabir Sen', role: 'Employee', department: 'Safety', managerId: 'm2' },
  { id: 'm1', name: 'Priya Iyer', role: 'Manager', department: 'Commercial' },
  { id: 'm2', name: 'Rahul Das', role: 'Manager', department: 'Plant' },
  { id: 'admin', name: 'Ananya Kapoor', role: 'Admin', department: 'HR' },
]

const schedule = [
  { period: 'Goal Setting', opens: '1 May', action: 'Create, submit, approve' },
  { period: 'Q1 Check-in', opens: 'July', action: 'Planned vs actual update' },
  { period: 'Q2 Check-in', opens: 'October', action: 'Planned vs actual update' },
  { period: 'Q3 Check-in', opens: 'January', action: 'Planned vs actual update' },
  { period: 'Q4 / Annual', opens: 'March / April', action: 'Final achievement capture' },
]

const seedGoals = [
  {
    id: 'g1',
    employeeId: 'e1',
    title: 'Grow enterprise revenue',
    description: 'Win expansion business in strategic accounts.',
    thrust: 'Revenue Growth',
    uom: 'Min',
    target: 12500000,
    targetLabel: 'INR 12.5M',
    weightage: 30,
    status: 'On Track',
    locked: true,
    approval: 'Approved',
    sharedGroupId: null,
    primaryOwnerId: null,
    actuals: { Q1: 3100000, Q2: 6500000, Q3: 9600000, Q4: 12500000 },
  },
  {
    id: 'g2',
    employeeId: 'e1',
    title: 'Improve qualified pipeline',
    description: 'Build reliable next-quarter coverage with named opportunities.',
    thrust: 'Market Development',
    uom: 'Min',
    target: 180,
    targetLabel: '180 qualified leads',
    weightage: 25,
    status: 'On Track',
    locked: true,
    approval: 'Approved',
    sharedGroupId: null,
    primaryOwnerId: null,
    actuals: { Q1: 52, Q2: 93, Q3: 141, Q4: 180 },
  },
  {
    id: 'g3',
    employeeId: 'e1',
    title: 'CRM hygiene compliance',
    description: 'Keep opportunity records current and review-ready.',
    thrust: 'Process Excellence',
    uom: 'Min',
    target: 95,
    targetLabel: '95%',
    weightage: 20,
    status: 'Completed',
    locked: true,
    approval: 'Approved',
    sharedGroupId: 'sg1',
    primaryOwnerId: 'e1',
    actuals: { Q1: 92, Q2: 96, Q3: 98, Q4: 99 },
  },
  {
    id: 'g4',
    employeeId: 'e1',
    title: 'Launch pricing playbook',
    description: 'Publish approved pricing guidance for sales teams.',
    thrust: 'Capability Building',
    uom: 'Timeline',
    target: '2026-03-31',
    targetLabel: '31 Mar 2026',
    weightage: 15,
    status: 'Completed',
    locked: true,
    approval: 'Approved',
    sharedGroupId: null,
    primaryOwnerId: null,
    actuals: { Q1: '', Q2: '', Q3: '2026-02-24', Q4: '2026-02-24' },
  },
  {
    id: 'g5',
    employeeId: 'e1',
    title: 'Reduce contract rework',
    description: 'Decrease legal rework caused by missing commercial terms.',
    thrust: 'Quality',
    uom: 'Max',
    target: 6,
    targetLabel: '<= 6 rework cases',
    weightage: 10,
    status: 'On Track',
    locked: true,
    approval: 'Approved',
    sharedGroupId: null,
    primaryOwnerId: null,
    actuals: { Q1: 8, Q2: 7, Q3: 5, Q4: 4 },
  },
  {
    id: 'g6',
    employeeId: 'e2',
    title: 'Reduce order TAT',
    description: 'Shorten cycle time from order receipt to dispatch clearance.',
    thrust: 'Operational Excellence',
    uom: 'Max',
    target: 36,
    targetLabel: '<= 36 hours',
    weightage: 30,
    status: 'On Track',
    locked: false,
    approval: 'Submitted',
    sharedGroupId: null,
    primaryOwnerId: null,
    actuals: { Q1: 41, Q2: 38, Q3: '', Q4: '' },
  },
  {
    id: 'g7',
    employeeId: 'e2',
    title: 'CRM hygiene compliance',
    description: 'Departmental KPI pushed by manager.',
    thrust: 'Process Excellence',
    uom: 'Min',
    target: 95,
    targetLabel: '95%',
    weightage: 25,
    status: 'Completed',
    locked: false,
    approval: 'Submitted',
    sharedGroupId: 'sg1',
    primaryOwnerId: 'e1',
    actuals: { Q1: 92, Q2: 96, Q3: 98, Q4: 99 },
  },
  {
    id: 'g8',
    employeeId: 'e2',
    title: 'Warehouse reconciliation',
    description: 'Close monthly stock reconciliation before cutoff.',
    thrust: 'Governance',
    uom: 'Timeline',
    target: '2026-04-05',
    targetLabel: '5 Apr 2026',
    weightage: 20,
    status: 'On Track',
    locked: false,
    approval: 'Submitted',
    sharedGroupId: null,
    primaryOwnerId: null,
    actuals: { Q1: '2026-07-03', Q2: '2026-10-04', Q3: '', Q4: '' },
  },
  {
    id: 'g9',
    employeeId: 'e2',
    title: 'Reduce invoice exceptions',
    description: 'Cut billing disputes through pre-dispatch validation.',
    thrust: 'Customer Experience',
    uom: 'Max',
    target: 12,
    targetLabel: '<= 12 exceptions',
    weightage: 25,
    status: 'Not Started',
    locked: false,
    approval: 'Submitted',
    sharedGroupId: null,
    primaryOwnerId: null,
    actuals: { Q1: 16, Q2: 13, Q3: '', Q4: '' },
  },
  {
    id: 'g10',
    employeeId: 'e3',
    title: 'Zero recordable incidents',
    description: 'Maintain a zero-harm shopfloor environment.',
    thrust: 'Safety',
    uom: 'Zero',
    target: 0,
    targetLabel: '0 incidents',
    weightage: 40,
    status: 'On Track',
    locked: true,
    approval: 'Approved',
    sharedGroupId: null,
    primaryOwnerId: null,
    actuals: { Q1: 0, Q2: 0, Q3: 1, Q4: 0 },
  },
  {
    id: 'g11',
    employeeId: 'e3',
    title: 'Complete safety audits',
    description: 'Finish planned zone audits with closure evidence.',
    thrust: 'Compliance',
    uom: 'Min',
    target: 24,
    targetLabel: '24 audits',
    weightage: 30,
    status: 'On Track',
    locked: true,
    approval: 'Approved',
    sharedGroupId: null,
    primaryOwnerId: null,
    actuals: { Q1: 6, Q2: 12, Q3: 18, Q4: 24 },
  },
  {
    id: 'g12',
    employeeId: 'e3',
    title: 'Close CAPA actions',
    description: 'Complete corrective actions before due date.',
    thrust: 'Risk Reduction',
    uom: 'Min',
    target: 90,
    targetLabel: '90%',
    weightage: 30,
    status: 'Completed',
    locked: true,
    approval: 'Approved',
    sharedGroupId: null,
    primaryOwnerId: null,
    actuals: { Q1: 82, Q2: 91, Q3: 94, Q4: 96 },
  },
]

const initialCheckins = [
  { id: 'c1', employeeId: 'e1', managerId: 'm1', quarter: 'Q2', comment: 'Strong progress, keep deal aging under review.', completed: true },
  { id: 'c2', employeeId: 'e3', managerId: 'm2', quarter: 'Q2', comment: 'Audit cadence is steady; focus on incident prevention.', completed: true },
]

const initialAudit = [
  { id: 'a1', actor: 'Priya Iyer', action: 'Approved goals', target: 'Aarav Mehta', time: '2026-05-11 10:30' },
  { id: 'a2', actor: 'Ananya Kapoor', action: 'Unlocked goal sheet', target: 'Aarav Mehta', time: '2026-05-13 16:20' },
  { id: 'a3', actor: 'Priya Iyer', action: 'Pushed shared KPI', target: 'CRM hygiene compliance', time: '2026-05-15 09:05' },
]

const blankGoal = (employeeId) => ({
  id: `g${Date.now()}`,
  employeeId,
  title: '',
  description: '',
  thrust: '',
  uom: 'Min',
  target: '',
  targetLabel: '',
  weightage: 10,
  status: 'Not Started',
  locked: false,
  approval: 'Draft',
  sharedGroupId: null,
  primaryOwnerId: null,
  actuals: { Q1: '', Q2: '', Q3: '', Q4: '' },
})

function personName(id) {
  return people.find((person) => person.id === id)?.name || 'Unknown'
}

function scoreForGoal(goal, quarter = 'Q2') {
  const actual = goal.actuals?.[quarter]
  if (actual === '' || actual === null || actual === undefined) return 0
  if (goal.uom === 'Timeline') {
    if (!actual || !goal.target) return 0
    return new Date(actual) <= new Date(goal.target) ? 100 : 0
  }
  if (goal.uom === 'Zero') return Number(actual) === 0 ? 100 : 0
  const target = Number(goal.target)
  const achieved = Number(actual)
  if (!target || !achieved) return 0
  const ratio = goal.uom === 'Max' ? target / achieved : achieved / target
  return Math.max(0, Math.min(100, Math.round(ratio * 100)))
}

function weightedScore(goals, quarter = 'Q2') {
  const total = goals.reduce((sum, goal) => sum + (scoreForGoal(goal, quarter) * Number(goal.weightage || 0)) / 100, 0)
  return Math.round(total)
}

function validateGoals(goals) {
  const totalWeight = goals.reduce((sum, goal) => sum + Number(goal.weightage || 0), 0)
  const errors = []
  if (goals.length > 8) errors.push('Maximum 8 goals are allowed.')
  if (goals.some((goal) => Number(goal.weightage || 0) < 10)) errors.push('Every goal must have at least 10% weightage.')
  if (totalWeight !== 100) errors.push(`Total weightage must equal 100%. Current total is ${totalWeight}%.`)
  if (goals.some((goal) => !goal.title || !goal.thrust || goal.target === '')) errors.push('Title, thrust area, and target are required for every goal.')
  return errors
}

function csvEscape(value) {
  return `"${String(value ?? '').replaceAll('"', '""')}"`
}

function App() {
  const [activeRole, setActiveRole] = useState('Employee')
  const [activeEmployeeId, setActiveEmployeeId] = useState('e1')
  const [goals, setGoals] = useState(seedGoals)
  const [checkins, setCheckins] = useState(initialCheckins)
  const [audit, setAudit] = useState(initialAudit)
  const [selectedQuarter, setSelectedQuarter] = useState('Q2')
  const [managerId, setManagerId] = useState('m1')
  const [comment, setComment] = useState('')
  const [toast, setToast] = useState('Demo data loaded. Switch roles to walk each journey.')

  const currentEmployee = people.find((person) => person.id === activeEmployeeId)
  const employeeGoals = goals.filter((goal) => goal.employeeId === activeEmployeeId)
  const managerTeam = people.filter((person) => person.managerId === managerId)
  const submittedTeam = goals.filter((goal) => managerTeam.some((person) => person.id === goal.employeeId) && goal.approval === 'Submitted')
  const validationErrors = validateGoals(employeeGoals)

  const metrics = useMemo(() => {
    const approved = goals.filter((goal) => goal.approval === 'Approved')
    const submittedEmployees = new Set(goals.filter((goal) => goal.approval !== 'Draft').map((goal) => goal.employeeId)).size
    return {
      employees: people.filter((person) => person.role === 'Employee').length,
      approvedSheets: new Set(approved.map((goal) => goal.employeeId)).size,
      submittedEmployees,
      avgScore: weightedScore(goals.filter((goal) => goal.approval === 'Approved'), selectedQuarter),
      checkinRate: Math.round((checkins.filter((item) => item.quarter === selectedQuarter && item.completed).length / managerTeam.length) * 100) || 0,
    }
  }, [checkins, goals, managerTeam.length, selectedQuarter])

  function log(action, target, actor = personName(activeRole === 'Admin' ? 'admin' : activeRole === 'Manager' ? managerId : activeEmployeeId)) {
    setAudit((items) => [
      { id: `a${Date.now()}`, actor, action, target, time: new Date().toLocaleString('en-IN', { hour12: false }) },
      ...items,
    ])
  }

  function updateGoal(goalId, field, value) {
    const goal = goals.find((item) => item.id === goalId)
    if (goal?.locked && activeRole === 'Employee') {
      setToast('This goal sheet is locked after approval. Ask HR/Admin to unlock it.')
      return
    }
    setGoals((items) =>
      items.map((item) => {
        if (item.id !== goalId) return item
        if (item.sharedGroupId && item.primaryOwnerId !== item.employeeId && ['title', 'target', 'targetLabel'].includes(field)) return item
        return { ...item, [field]: field === 'weightage' ? Number(value) : value }
      }),
    )
    if (goal?.locked) log(`Edited locked goal field "${field}"`, goal.title || 'Untitled goal')
  }

  function updateActual(goalId, quarter, value) {
    const sourceGoal = goals.find((goal) => goal.id === goalId)
    setGoals((items) =>
      items.map((goal) => {
        const isSameGoal = goal.id === goalId
        const isLinkedSharedGoal = sourceGoal?.sharedGroupId && goal.sharedGroupId === sourceGoal.sharedGroupId
        if (!isSameGoal && !isLinkedSharedGoal) return goal
        return { ...goal, actuals: { ...goal.actuals, [quarter]: value } }
      }),
    )
    if (sourceGoal?.sharedGroupId) setToast('Shared goal achievement synced across linked goal sheets.')
  }

  function addGoal() {
    if (employeeGoals.length >= 8) {
      setToast('Cannot add more than 8 goals.')
      return
    }
    setGoals((items) => [...items, blankGoal(activeEmployeeId)])
  }

  function submitGoals() {
    if (validationErrors.length) {
      setToast(validationErrors[0])
      return
    }
    setGoals((items) => items.map((goal) => (goal.employeeId === activeEmployeeId ? { ...goal, approval: 'Submitted' } : goal)))
    log('Submitted goal sheet', currentEmployee.name, currentEmployee.name)
    setToast('Goal sheet submitted to L1 manager.')
  }

  function approveEmployee(employeeId) {
    setGoals((items) => items.map((goal) => (goal.employeeId === employeeId ? { ...goal, approval: 'Approved', locked: true } : goal)))
    log('Approved and locked goals', personName(employeeId), personName(managerId))
    setToast(`${personName(employeeId)}'s goals are approved and locked.`)
  }

  function returnForRework(employeeId) {
    setGoals((items) => items.map((goal) => (goal.employeeId === employeeId ? { ...goal, approval: 'Returned', locked: false } : goal)))
    log('Returned goals for rework', personName(employeeId), personName(managerId))
    setToast('Goal sheet returned for employee rework.')
  }

  function unlockEmployee(employeeId) {
    setGoals((items) => items.map((goal) => (goal.employeeId === employeeId ? { ...goal, locked: false, approval: 'Returned' } : goal)))
    log('Unlocked approved goal sheet', personName(employeeId), personName('admin'))
    setToast('Admin exception logged. Employee can edit the returned sheet.')
  }

  function pushSharedGoal() {
    const groupId = `sg${Date.now()}`
    const newGoals = managerTeam.map((employee, index) => ({
      ...blankGoal(employee.id),
      id: `g${Date.now()}${index}`,
      title: 'Department cost optimization',
      description: 'Shared departmental KPI pushed by manager.',
      thrust: 'Cost Optimisation',
      uom: 'Max',
      target: 100,
      targetLabel: '<= 100 cost index',
      weightage: 10,
      approval: 'Draft',
      sharedGroupId: groupId,
      primaryOwnerId: managerTeam[0].id,
    }))
    setGoals((items) => [...items, ...newGoals])
    log('Pushed shared goal', 'Department cost optimization', personName(managerId))
    setToast('Shared KPI pushed to the selected manager team.')
  }

  function saveCheckin(employeeId) {
    const text = comment.trim()
    if (!text) {
      setToast('Add a structured check-in comment before completing.')
      return
    }
    setCheckins((items) => [
      ...items.filter((item) => !(item.employeeId === employeeId && item.quarter === selectedQuarter)),
      { id: `c${Date.now()}`, employeeId, managerId, quarter: selectedQuarter, comment: text, completed: true },
    ])
    log(`Completed ${selectedQuarter} check-in`, personName(employeeId), personName(managerId))
    setComment('')
    setToast('Manager check-in completed with feedback log.')
  }

  function exportCsv() {
    const header = ['Employee', 'Manager', 'Department', 'Goal', 'UoM', 'Target', 'Weightage', 'Quarter', 'Actual', 'Status', 'Score']
    const rows = goals.map((goal) => {
      const employee = people.find((person) => person.id === goal.employeeId)
      return [
        employee?.name,
        personName(employee?.managerId),
        employee?.department,
        goal.title,
        goal.uom,
        goal.targetLabel || goal.target,
        goal.weightage,
        selectedQuarter,
        goal.actuals[selectedQuarter],
        goal.status,
        `${scoreForGoal(goal, selectedQuarter)}%`,
      ]
    })
    const csv = [header, ...rows].map((row) => row.map(csvEscape).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `achievement-report-${selectedQuarter}.csv`
    link.click()
    URL.revokeObjectURL(url)
    setToast('Achievement report exported as CSV.')
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">AtomQuest 1.0</p>
          <h1>GoalTrack Portal</h1>
        </div>
        <div className="role-tabs" aria-label="Role switcher">
          {['Employee', 'Manager', 'Admin'].map((role) => (
            <button key={role} className={activeRole === role ? 'active' : ''} onClick={() => setActiveRole(role)}>
              {role}
            </button>
          ))}
        </div>
        <div className="side-panel">
          <span>Demo credentials</span>
          <strong>Use the role switcher</strong>
          <small>Employee: Aarav / Nisha / Kabir<br />Manager: Priya / Rahul<br />Admin: Ananya HR</small>
        </div>
        <nav>
          <a href="#workspace">Workspace</a>
          <a href="#governance">Governance</a>
          <a href="#reports">Reports</a>
        </nav>
      </aside>

      <section className="workspace" id="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">Current cycle 2026</p>
            <h2>{activeRole} Workspace</h2>
          </div>
          <div className="toolbar">
            <select value={selectedQuarter} onChange={(event) => setSelectedQuarter(event.target.value)} aria-label="Quarter">
              {quarters.map((quarter) => <option key={quarter}>{quarter}</option>)}
            </select>
            <button onClick={exportCsv}>Export CSV</button>
          </div>
        </header>

        <section className="metric-grid">
          <Metric label="Employees" value={metrics.employees} />
          <Metric label="Submitted" value={metrics.submittedEmployees} />
          <Metric label="Approved sheets" value={metrics.approvedSheets} />
          <Metric label={`${selectedQuarter} avg score`} value={`${metrics.avgScore}%`} />
        </section>

        {activeRole === 'Employee' && (
          <EmployeeView
            currentEmployee={currentEmployee}
            employeeGoals={employeeGoals}
            validationErrors={validationErrors}
            selectedQuarter={selectedQuarter}
            setActiveEmployeeId={setActiveEmployeeId}
            updateGoal={updateGoal}
            updateActual={updateActual}
            addGoal={addGoal}
            submitGoals={submitGoals}
          />
        )}

        {activeRole === 'Manager' && (
          <ManagerView
            managerId={managerId}
            setManagerId={setManagerId}
            managerTeam={managerTeam}
            goals={goals}
            submittedTeam={submittedTeam}
            selectedQuarter={selectedQuarter}
            comment={comment}
            setComment={setComment}
            approveEmployee={approveEmployee}
            returnForRework={returnForRework}
            updateGoal={updateGoal}
            saveCheckin={saveCheckin}
            pushSharedGoal={pushSharedGoal}
            checkins={checkins}
          />
        )}

        {activeRole === 'Admin' && (
          <AdminView
            goals={goals}
            audit={audit}
            selectedQuarter={selectedQuarter}
            unlockEmployee={unlockEmployee}
            checkins={checkins}
          />
        )}

        <section id="governance" className="two-column">
          <div className="panel">
            <div className="panel-head">
              <p className="eyebrow">Quarterly windows</p>
              <h3>Check-in Schedule</h3>
            </div>
            <div className="schedule-list">
              {schedule.map((item) => (
                <div key={item.period} className="schedule-row">
                  <strong>{item.period}</strong>
                  <span>{item.opens}</span>
                  <small>{item.action}</small>
                </div>
              ))}
            </div>
          </div>
          <div className="panel">
            <div className="panel-head">
              <p className="eyebrow">Architecture</p>
              <h3>Cost-aware demo design</h3>
            </div>
            <div className="architecture">
              <span>React UI</span>
              <b>localStorage-ready state layer</b>
              <span>API service boundary</span>
              <b>Future DB + Entra ID</b>
            </div>
            <p className="muted">The demo runs fully in-browser for hackathon speed. The state actions mirror API boundaries so a Node or serverless backend can replace local state with minimal UI changes.</p>
          </div>
        </section>

        <section id="reports" className="panel">
          <div className="panel-head row">
            <div>
              <p className="eyebrow">Live feedback</p>
              <h3>System Message</h3>
            </div>
            <span className="pill">{selectedQuarter}</span>
          </div>
          <p className="toast">{toast}</p>
        </section>
      </section>
    </main>
  )
}

function Metric({ label, value }) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function EmployeeView({ currentEmployee, employeeGoals, validationErrors, selectedQuarter, setActiveEmployeeId, updateGoal, updateActual, addGoal, submitGoals }) {
  const totalWeight = employeeGoals.reduce((sum, goal) => sum + Number(goal.weightage || 0), 0)
  return (
    <section className="panel">
      <div className="panel-head row">
        <div>
          <p className="eyebrow">Goal creation and quarterly actuals</p>
          <h3>{currentEmployee.name}</h3>
        </div>
        <div className="toolbar">
          <select value={currentEmployee.id} onChange={(event) => setActiveEmployeeId(event.target.value)} aria-label="Employee">
            {people.filter((person) => person.role === 'Employee').map((person) => <option key={person.id} value={person.id}>{person.name}</option>)}
          </select>
          <button onClick={addGoal}>Add goal</button>
          <button className="primary" onClick={submitGoals}>Submit</button>
        </div>
      </div>
      <div className={`validation ${validationErrors.length ? 'warn' : 'ok'}`}>
        <strong>{totalWeight}% total weightage</strong>
        <span>{validationErrors.length ? validationErrors.join(' ') : 'Ready for submission: 100% total, max 8 goals, minimum 10% each.'}</span>
      </div>
      <GoalTable goals={employeeGoals} selectedQuarter={selectedQuarter} editable updateGoal={updateGoal} updateActual={updateActual} />
    </section>
  )
}

function ManagerView({ managerId, setManagerId, managerTeam, goals, submittedTeam, selectedQuarter, comment, setComment, approveEmployee, returnForRework, updateGoal, saveCheckin, pushSharedGoal, checkins }) {
  return (
    <>
      <section className="panel">
        <div className="panel-head row">
          <div>
            <p className="eyebrow">L1 manager approval workflow</p>
            <h3>Team Dashboard</h3>
          </div>
          <div className="toolbar">
            <select value={managerId} onChange={(event) => setManagerId(event.target.value)} aria-label="Manager">
              {people.filter((person) => person.role === 'Manager').map((person) => <option key={person.id} value={person.id}>{person.name}</option>)}
            </select>
            <button onClick={pushSharedGoal}>Push shared KPI</button>
          </div>
        </div>
        {submittedTeam.length === 0 && <p className="empty">No submitted goal sheets are waiting for approval.</p>}
        {managerTeam.map((employee) => {
          const teamGoals = goals.filter((goal) => goal.employeeId === employee.id)
          const errors = validateGoals(teamGoals)
          return (
            <div className="review-block" key={employee.id}>
              <div className="review-head">
                <div>
                  <strong>{employee.name}</strong>
                  <span>{teamGoals[0]?.approval || 'Draft'} | weighted score {weightedScore(teamGoals, selectedQuarter)}%</span>
                </div>
                <div className="toolbar">
                  <button onClick={() => returnForRework(employee.id)}>Return</button>
                  <button className="primary" disabled={errors.length > 0} onClick={() => approveEmployee(employee.id)}>Approve</button>
                </div>
              </div>
              <GoalTable goals={teamGoals} selectedQuarter={selectedQuarter} managerEdit updateGoal={updateGoal} />
            </div>
          )
        })}
      </section>
      <section className="panel">
        <div className="panel-head">
          <p className="eyebrow">Manager check-ins</p>
          <h3>Planned vs Achievement</h3>
        </div>
        <div className="checkin-grid">
          {managerTeam.map((employee) => {
            const done = checkins.find((item) => item.employeeId === employee.id && item.quarter === selectedQuarter)
            const teamGoals = goals.filter((goal) => goal.employeeId === employee.id)
            return (
              <div className="checkin-card" key={employee.id}>
                <div className="row">
                  <strong>{employee.name}</strong>
                  <span className={done ? 'pill success' : 'pill'}>{done ? 'Completed' : 'Pending'}</span>
                </div>
                <p>{selectedQuarter} weighted progress: <b>{weightedScore(teamGoals, selectedQuarter)}%</b></p>
                <textarea value={comment} onChange={(event) => setComment(event.target.value)} placeholder={`Structured ${selectedQuarter} comment for ${employee.name}`} />
                <button className="primary" onClick={() => saveCheckin(employee.id)}>Complete check-in</button>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

function AdminView({ goals, audit, selectedQuarter, unlockEmployee, checkins }) {
  const employees = people.filter((person) => person.role === 'Employee')
  return (
    <>
      <section className="two-column">
        <div className="panel">
          <div className="panel-head">
            <p className="eyebrow">Completion dashboard</p>
            <h3>Cycle Oversight</h3>
          </div>
          <div className="admin-list">
            {employees.map((employee) => {
              const sheetGoals = goals.filter((goal) => goal.employeeId === employee.id)
              const approved = sheetGoals.every((goal) => goal.approval === 'Approved')
              const checkinDone = checkins.some((item) => item.employeeId === employee.id && item.quarter === selectedQuarter)
              return (
                <div className="admin-row" key={employee.id}>
                  <div>
                    <strong>{employee.name}</strong>
                    <span>{employee.department} | Manager: {personName(employee.managerId)}</span>
                  </div>
                  <span className={approved ? 'pill success' : 'pill'}>{approved ? 'Approved' : 'Open'}</span>
                  <span className={checkinDone ? 'pill success' : 'pill'}>{checkinDone ? `${selectedQuarter} done` : `${selectedQuarter} pending`}</span>
                  <button onClick={() => unlockEmployee(employee.id)}>Unlock</button>
                </div>
              )
            })}
          </div>
        </div>
        <div className="panel">
          <div className="panel-head">
            <p className="eyebrow">Analytics bonus</p>
            <h3>Goal Distribution</h3>
          </div>
          <Distribution goals={goals} />
        </div>
      </section>
      <section className="panel">
        <div className="panel-head">
          <p className="eyebrow">Audit ready</p>
          <h3>Change Log</h3>
        </div>
        <div className="audit-list">
          {audit.map((item) => (
            <div className="audit-row" key={item.id}>
              <strong>{item.action}</strong>
              <span>{item.target}</span>
              <small>{item.actor} | {item.time}</small>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

function Distribution({ goals }) {
  const byThrust = goals.reduce((map, goal) => ({ ...map, [goal.thrust]: (map[goal.thrust] || 0) + 1 }), {})
  const max = Math.max(...Object.values(byThrust), 1)
  return (
    <div className="bars">
      {Object.entries(byThrust).map(([label, count]) => (
        <div className="bar-row" key={label}>
          <span>{label || 'Unassigned'}</span>
          <div><i style={{ width: `${(count / max) * 100}%` }} /></div>
          <b>{count}</b>
        </div>
      ))}
    </div>
  )
}

function GoalTable({ goals, selectedQuarter, editable = false, managerEdit = false, updateGoal, updateActual }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Goal</th>
            <th>Thrust</th>
            <th>UoM</th>
            <th>Target</th>
            <th>Weight</th>
            <th>Status</th>
            <th>{selectedQuarter} Actual</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {goals.map((goal) => {
            const sharedLocked = goal.sharedGroupId && goal.primaryOwnerId !== goal.employeeId
            const canEditStructure = editable && !goal.locked
            const canManagerEdit = managerEdit && goal.approval === 'Submitted'
            return (
              <tr key={goal.id}>
                <td>
                  {canEditStructure && !sharedLocked ? (
                    <>
                      <input value={goal.title} onChange={(event) => updateGoal(goal.id, 'title', event.target.value)} placeholder="Goal title" />
                      <input value={goal.description} onChange={(event) => updateGoal(goal.id, 'description', event.target.value)} placeholder="Description" />
                    </>
                  ) : (
                    <>
                      <strong>{goal.title || 'Untitled goal'}</strong>
                      <small>{goal.description}</small>
                      {goal.sharedGroupId && <span className="tag">Shared</span>}
                    </>
                  )}
                </td>
                <td>{canEditStructure ? <input value={goal.thrust} onChange={(event) => updateGoal(goal.id, 'thrust', event.target.value)} /> : goal.thrust}</td>
                <td>{canEditStructure ? <select value={goal.uom} onChange={(event) => updateGoal(goal.id, 'uom', event.target.value)}>{uoms.map((uom) => <option key={uom}>{uom}</option>)}</select> : goal.uom}</td>
                <td>{canEditStructure && !sharedLocked ? <input value={goal.target} onChange={(event) => updateGoal(goal.id, 'target', event.target.value)} /> : goal.targetLabel || goal.target}</td>
                <td>
                  {(canEditStructure || canManagerEdit) ? <input type="number" min="10" value={goal.weightage} onChange={(event) => updateGoal(goal.id, 'weightage', event.target.value)} /> : `${goal.weightage}%`}
                </td>
                <td>
                  {editable ? (
                    <select value={goal.status} onChange={(event) => updateGoal(goal.id, 'status', event.target.value)}>
                      {statuses.map((status) => <option key={status}>{status}</option>)}
                    </select>
                  ) : goal.status}
                </td>
                <td>
                  {editable ? (
                    <input
                      type={goal.uom === 'Timeline' ? 'date' : 'text'}
                      value={goal.actuals[selectedQuarter] ?? ''}
                      onChange={(event) => updateActual(goal.id, selectedQuarter, event.target.value)}
                    />
                  ) : goal.actuals[selectedQuarter] || 'Pending'}
                </td>
                <td><span className="score">{scoreForGoal(goal, selectedQuarter)}%</span></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default App
