import { useState } from 'react'
import AdminDashboard from './components/AdminDashboard'
import UserDashboard from './components/UserDashboard'
import Login from './components/Login'

function App() {
  const [user, setUser] = useState(null)

  // ✅ Shared global state
  const [issues, setIssues] = useState([])
  const [feedback, setFeedback] = useState([])

  const handleLogout = () => setUser(null)

  if (!user) {
    return <Login onLogin={setUser} />
  }

  return (
    <>
      {user.role === 'admin' ? (
        <AdminDashboard
          user={user}
          onLogout={handleLogout}
          issues={issues}
          feedback={feedback}
        />
      ) : (
        <UserDashboard
          user={user}
          onLogout={handleLogout}
          issues={issues}
          setIssues={setIssues}
          feedback={feedback}
          setFeedback={setFeedback}
        />
      )}
    </>
  )
}

export default App