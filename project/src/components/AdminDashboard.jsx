import { useState } from 'react'
import '../styles/Dashboard.css'
import { publicServices, infrastructure, amenities } from '../data/cityData'

const AdminDashboard = ({ user, onLogout, issues, feedback }) => {
  const [activeTab, setActiveTab] = useState('services')

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Smart City Admin Portal</h1>
          <div className="user-section">
            <span className="user-name">Admin: {user.username}</span>
            <button onClick={onLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <nav className="dashboard-nav">
          <button
            className={activeTab === 'services' ? 'active' : ''}
            onClick={() => setActiveTab('services')}
          >
            Public Services ({publicServices.length})
          </button>

          <button
            className={activeTab === 'infrastructure' ? 'active' : ''}
            onClick={() => setActiveTab('infrastructure')}
          >
            Infrastructure ({infrastructure.length})
          </button>

          <button
            className={activeTab === 'amenities' ? 'active' : ''}
            onClick={() => setActiveTab('amenities')}
          >
            Amenities ({amenities.length})
          </button>

          <button
            className={activeTab === 'issues' ? 'active' : ''}
            onClick={() => setActiveTab('issues')}
          >
            Issue Reports ({issues.length})
          </button>

          <button
            className={activeTab === 'feedback' ? 'active' : ''}
            onClick={() => setActiveTab('feedback')}
          >
            Feedback ({feedback.length})
          </button>
        </nav>

        <div className="dashboard-main">

          {/* ✅ PUBLIC SERVICES */}
          {activeTab === 'services' && (
            <div className="content-section">
              <h2>Public Services</h2>
              <div className="card-grid">
                {publicServices.map(service => (
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

          {/* ✅ INFRASTRUCTURE */}
          {activeTab === 'infrastructure' && (
            <div className="content-section">
              <h2>Infrastructure</h2>
              <div className="card-grid">
                {infrastructure.map(item => (
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
                      <p>{item.description}</p>
                      <div><strong>Type:</strong> {item.type}</div>
                      <div><strong>Capacity:</strong> {item.capacity}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ✅ AMENITIES */}
          {activeTab === 'amenities' && (
            <div className="content-section">
              <h2>Amenities</h2>
              <div className="card-grid">
                {amenities.map(amenity => (
                  <div key={amenity.id} className="info-card">
                    <div className="card-header">
                      <h3>{amenity.name}</h3>
                      <span className="badge">{amenity.type}</span>
                    </div>
                    <div className="card-body">
                      <p>{amenity.description}</p>
                      <div><strong>Location:</strong> {amenity.location}</div>
                      <div><strong>Features:</strong> {amenity.features}</div>
                      <div><strong>Hours:</strong> {amenity.hours}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ✅ ISSUES (LIVE DATA) */}
          {activeTab === 'issues' && (
            <div className="content-section">
              <h2>Issue Reports</h2>
              {issues.length === 0 ? (
                <div className="empty-state">
                  <p>No issues reported</p>
                </div>
              ) : (
                <div className="list-view">
                  {issues.map(issue => (
                    <div key={issue.id} className="list-item">
                      <h3>{issue.title}</h3>
                      <p>{issue.description}</p>
                      <span className="timestamp">{issue.date}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ✅ FEEDBACK (LIVE DATA) */}
          {activeTab === 'feedback' && (
            <div className="content-section">
              <h2>User Feedback</h2>
              {feedback.length === 0 ? (
                <div className="empty-state">
                  <p>No feedback received</p>
                </div>
              ) : (
                <div className="list-view">
                  {feedback.map(item => (
                    <div key={item.id} className="list-item">
                      <h3>{item.amenity}</h3>
                      <p>{item.comment}</p>
                      <div className="rating">
                        Rating: {item.rating}/5
                      </div>
                      <span className="timestamp">{item.date}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default AdminDashboard