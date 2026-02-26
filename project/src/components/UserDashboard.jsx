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
          <button className={activeTab === 'services' ? 'active' : ''} onClick={() => setActiveTab('services')}>
            Public Services
          </button>
          <button className={activeTab === 'infrastructure' ? 'active' : ''} onClick={() => setActiveTab('infrastructure')}>
            Infrastructure
          </button>
          <button className={activeTab === 'amenities' ? 'active' : ''} onClick={() => setActiveTab('amenities')}>
            Amenities
          </button>
          <button className={activeTab === 'report' ? 'active' : ''} onClick={() => setActiveTab('report')}>
            Report Issue
          </button>
          <button className={activeTab === 'feedback' ? 'active' : ''} onClick={() => setActiveTab('feedback')}>
            Give Feedback
          </button>
        </nav>

        <div className="dashboard-main">

          {/* PUBLIC SERVICES */}
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
                      <p className="description">{service.description}</p>
                      <div className="info-row"><strong>Address:</strong> {service.address}</div>
                      <div className="info-row"><strong>Phone:</strong> {service.phone}</div>
                      <div className="info-row"><strong>Hours:</strong> {service.hours}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* INFRASTRUCTURE */}
          {activeTab === 'infrastructure' && (
            <div className="content-section">
              <div className="section-header">
                <h2>Infrastructure</h2>
                <input
                  type="text"
                  placeholder="Search infrastructure..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>

              <div className="card-grid">
                {filteredInfra.map(item => (
                  <div key={item.id} className="info-card">
                    <div className="card-header">
                      <h3>{item.name}</h3>
                      <span className={`badge ${
                        item.status === 'Operational'
                          ? 'badge-success'
                          : 'badge-warning'
                      }`}>
                        {item.status}
                      </span>
                    </div>

                    <div className="card-body">
                      <p className="description">{item.description}</p>
                      <div className="info-row"><strong>Type:</strong> {item.type}</div>
                      <div className="info-row"><strong>Capacity:</strong> {item.capacity}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AMENITIES */}
          {activeTab === 'amenities' && (
            <div className="content-section">
              <div className="section-header">
                <h2>Amenities</h2>
                <input
                  type="text"
                  placeholder="Search amenities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>

              <div className="card-grid">
                {filteredAmenities.map(amenity => (
                  <div key={amenity.id} className="info-card">
                    <div className="card-header">
                      <h3>{amenity.name}</h3>
                      <span className="badge">{amenity.type}</span>
                    </div>

                    <div className="card-body">
                      <p className="description">{amenity.description}</p>
                      <div className="info-row"><strong>Location:</strong> {amenity.location}</div>
                      <div className="info-row"><strong>Features:</strong> {amenity.features}</div>
                      <div className="info-row"><strong>Hours:</strong> {amenity.hours}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* REPORT ISSUE */}
          {activeTab === 'report' && (
            <div className="content-section">
              <div className="section-header">
                <h2>Report an Issue</h2>
              </div>

              <div className="form-container">
                <form onSubmit={handleReportIssue} className="report-form">
                  <div className="form-group">
                    <label>Issue Title</label>
                    <input
                      value={issueTitle}
                      onChange={(e) => setIssueTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={issueDescription}
                      onChange={(e) => setIssueDescription(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="submit-button">
                    Submit Report
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* FEEDBACK */}
          {activeTab === 'feedback' && (
            <div className="content-section">
              <div className="section-header">
                <h2>Provide Feedback</h2>
              </div>

              <div className="form-container">
                <form onSubmit={handleSubmitFeedback} className="report-form">
                  <div className="form-group">
                    <label>Amenity/Service</label>
                    <input
                      value={feedbackAmenity}
                      onChange={(e) => setFeedbackAmenity(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Rating</label>
                    <select
                      value={feedbackRating}
                      onChange={(e) => setFeedbackRating(Number(e.target.value))}
                    >
                      <option value={5}>5 - Excellent</option>
                      <option value={4}>4 - Good</option>
                      <option value={3}>3 - Average</option>
                      <option value={2}>2 - Poor</option>
                      <option value={1}>1 - Very Poor</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Comments</label>
                    <textarea
                      value={feedbackComment}
                      onChange={(e) => setFeedbackComment(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="submit-button">
                    Submit Feedback
                  </button>
                </form>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default UserDashboard