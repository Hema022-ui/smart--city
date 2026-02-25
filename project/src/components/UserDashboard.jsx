import { useState } from 'react'
import '../styles/Dashboard.css'
import { publicServices, infrastructure, amenities } from '../data/cityData'

const UserDashboard = ({
  user,
  onLogout,
  issues,
  setIssues,
  feedback,
  setFeedback
}) => {
  const [activeTab, setActiveTab] = useState('services')
  const [searchTerm, setSearchTerm] = useState('')
  const [issueTitle, setIssueTitle] = useState('')
  const [issueDescription, setIssueDescription] = useState('')
  const [feedbackAmenity, setFeedbackAmenity] = useState('')
  const [feedbackRating, setFeedbackRating] = useState(5)
  const [feedbackComment, setFeedbackComment] = useState('')

  const filteredServices = publicServices.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredInfra = infrastructure.filter(i =>
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredAmenities = amenities.filter(a =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleReportIssue = (e) => {
    e.preventDefault()

    const newIssue = {
      id: Date.now(),
      title: issueTitle,
      description: issueDescription,
      date: new Date().toLocaleString()
    }

    setIssues([...issues, newIssue])
    setIssueTitle('')
    setIssueDescription('')
    alert('Issue reported successfully!')
  }

  const handleSubmitFeedback = (e) => {
    e.preventDefault()

    const newFeedback = {
      id: Date.now(),
      amenity: feedbackAmenity,
      rating: feedbackRating,
      comment: feedbackComment,
      date: new Date().toLocaleString()
    }

    setFeedback([...feedback, newFeedback])
    setFeedbackAmenity('')
    setFeedbackRating(5)
    setFeedbackComment('')
    alert('Feedback submitted successfully!')
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Smart City Portal</h1>
          <div className="user-section">
            <span className="user-name">User: {user.username}</span>
            <button onClick={onLogout} className="logout-button">Logout</button>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <nav className="dashboard-nav">
          <button className={activeTab === 'services' ? 'active' : ''} onClick={() => setActiveTab('services')}>Public Services</button>
          <button className={activeTab === 'infrastructure' ? 'active' : ''} onClick={() => setActiveTab('infrastructure')}>Infrastructure</button>
          <button className={activeTab === 'amenities' ? 'active' : ''} onClick={() => setActiveTab('amenities')}>Amenities</button>
          <button className={activeTab === 'report' ? 'active' : ''} onClick={() => setActiveTab('report')}>Report Issue</button>
          <button className={activeTab === 'feedback' ? 'active' : ''} onClick={() => setActiveTab('feedback')}>Give Feedback</button>
        </nav>

        <div className="dashboard-main">

          {activeTab === 'services' && (
            <div className="content-section">
              <div className="section-header">
                <h2>Public Services</h2>
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              <div className="card-grid">
                {filteredServices.map(service => (
                  <div key={service.id} className="info-card">
                    <div className="card-header">
                      <h3>{service.name}</h3>
                      <span className="badge">{service.category}</span>
                    </div>
                    <div className="card-body">
                      <p>{service.description}</p>
                      <div><strong>Address:</strong> {service.address}</div>
                      <div><strong>Phone:</strong> {service.phone}</div>
                      <div><strong>Hours:</strong> {service.hours}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'report' && (
            <div className="content-section">
              <h2>Report an Issue</h2>
              <form onSubmit={handleReportIssue} className="report-form">
                <input value={issueTitle} onChange={(e) => setIssueTitle(e.target.value)} placeholder="Issue Title" required />
                <textarea value={issueDescription} onChange={(e) => setIssueDescription(e.target.value)} placeholder="Issue Description" required />
                <button type="submit">Submit Report</button>
              </form>
            </div>
          )}

          {activeTab === 'feedback' && (
            <div className="content-section">
              <h2>Provide Feedback</h2>
              <form onSubmit={handleSubmitFeedback} className="report-form">
                <input value={feedbackAmenity} onChange={(e) => setFeedbackAmenity(e.target.value)} placeholder="Amenity/Service" required />
                <select value={feedbackRating} onChange={(e) => setFeedbackRating(Number(e.target.value))}>
                  <option value={5}>5 - Excellent</option>
                  <option value={4}>4 - Good</option>
                  <option value={3}>3 - Average</option>
                  <option value={2}>2 - Poor</option>
                  <option value={1}>1 - Very Poor</option>
                </select>
                <textarea value={feedbackComment} onChange={(e) => setFeedbackComment(e.target.value)} placeholder="Comments" required />
                <button type="submit">Submit Feedback</button>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default UserDashboard