import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate, useParams } from 'react-router-dom';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    maxAttendees: '',
    eventType: '',
    image: null 
  });
  const [existingImage, setExistingImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { eventId } = useParams(); 
  const navigate = useNavigate();
  const { auth, logout } = useContext(AuthContext);  
    const handleLogout = () => {
      logout();  // Call the logout function from context
      navigate('/login');  // Redirect to login page after logout
    };
  useEffect(() => {
    if (eventId) {
      const fetchEvent = async () => {
        try {
          const token = localStorage.getItem('token');
          const res = await axios.get(`http://localhost:5000/api/events/${eventId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const event = res.data;
          setFormData({
            title: event.title,
            description: event.description,
            date: new Date(event.date).toISOString().split('T')[0],
            location: event.location,
            maxAttendees: event.maxAttendees,
            eventType: event.eventType,
            image: null 
          });
          setExistingImage(event.image); 
        } catch (err) {
          setError('Failed to load event data');
        }
      };

      fetchEvent();
    }
  }, [eventId]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.type === 'file' ? e.target.files[0] : e.target.value
    });
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  const form = new FormData();
  Object.keys(formData).forEach(key => {
      if (key === "image" && !formData[key]) {
          return;
      }
      form.append(key, formData[key]);
  });

  setLoading(true);
  try {
      if (eventId) {
          await axios.put(`http://localhost:5000/api/events/${eventId}`, form, {
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'multipart/form-data'
              }
          });
          navigate('/my-event');
      } else {
          await axios.post('http://localhost:5000/api/events/create', form, {
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'multipart/form-data'
              }
          });
          navigate('/'); // Redirect to My Events after successful creation
      }
  } catch (err) {
      setError('Failed to save event');
  } finally {
      setLoading(false);
  }
};

  return (
    <>
      <div className="main-page-wrapper">
        <aside className="dash-aside-navbar">
          <div className="position-relative">
            <div className="logo  plr bottom-line pb-30">
              <Link to={"/"} className='m-auto'>
                <img src="../images/logo/ae-logo-2022.svg" width={100} className='m-auto' />
              </Link>
              <button className="close-btn d-block d-md-none"><i className="fa-light fa-circle-xmark" /></button>
            </div>
            <nav className="dasboard-main-nav pt-30 pb-30 bottom-line">
              <ul className="style-none">
                <li><div className="nav-title">Listing</div></li>
                <li className="plr"><a href="/my-event" className="d-flex w-100 align-items-center">
                  <img src="../images/icon/icon_6.svg" alt />
                  <span>My Events</span>
                </a></li>
                <li className="plr"><a href="/create-event" className="d-flex w-100 align-items-center ">
                  <img src="../images/icon/icon_7_active.svg" alt />
                  <span>Add New Events</span>
                </a></li>
              </ul>
            </nav>

            <div className="plr mt-30">
              <a  className="d-flex w-100 align-items-center logout-btn" onClick={handleLogout}>
                <div className="icon tran3s d-flex align-items-center justify-content-center rounded-circle"><img src="images/icon/icon_41.svg" alt /></div>
                <span>Logout</span>
              </a>
            </div>
          </div>
        </aside>

        <div className="dashboard-body">
          <div className="position-relative">
            {/* ************************ Header **************************** */}
            <header className="dashboard-header">
              <div className="d-flex align-items-center justify-content-end">
                <h4 className="m0 d-none d-lg-block">{eventId ? 'Edit Event' : 'Add New Event'}</h4>
                {error && <p>{error}</p>}
                <button className="dash-mobile-nav-toggler d-block d-md-none me-auto">
                  <span />
                </button>
                <form action="#" className="search-form ms-auto">
                  <input type="text" placeholder="Search here.." />
                </form>
              </div>
            </header>
            {/* End Header */}
            <h2 className="main-title d-block d-lg-none">Add New Property</h2>
            <div className="bg-white card-box border-20">
              <h4 className="dash-title-three">Overview</h4>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="dash-input-wrapper mb-30">
                  <label htmlFor>Event Title*</label>
                  <input type="text" name="title" placeholder="Event Title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="dash-input-wrapper mb-30" >
                  <label htmlFor>Description*</label>
                  <textarea className="size-lg" name="description" placeholder="Event Description" value={formData.description} onChange={handleChange} required />
                </div>

                <div className="row align-items-end">
                  <div className="col-md-6">
                    <div className="dash-input-wrapper mb-30">
                      <label >Event Type*</label>
                      <select className="nice-select" name="eventType" value={formData.eventType} onChange={handleChange} required>
                        <option value="">Select Event Type</option>
                        <option value="conference">Networking events</option>
                        <option value="conference">Charity events</option>
                        <option value="conference">Social events</option>
                        <option value="conference">Conference</option>
                        <option value="workshop">Workshop</option>
                        <option value="meetup">Meetup</option>
                        <option value="meetup">Seminars</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="dash-input-wrapper mb-30">
                      <label htmlFor>Event Date*</label>
                      <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="dash-input-wrapper mb-30">
                      <label htmlFor>Event Location*</label>
                      <input type="text" name="location" placeholder="Event Location" value={formData.location} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="dash-input-wrapper mb-30">
                      <label htmlFor>Max Attendees*</label>
                      <input type="number" name="maxAttendees" placeholder="Max Attendees" value={formData.maxAttendees} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="dash-input-wrapper mb-30">
                      {existingImage && (
                        <div>
                          <p>Current Image:</p>
                          <img src={`http://localhost:5000/${existingImage}`}  alt="Current Event" style={{ width: '200px' }} />
                        </div>
                      )}
                      <label htmlFor>Upload Event Image*</label>
                      <div className="dash-btn-one d-inline-block position-relative me-3">
                        <i className="bi bi-plus" />Upload File
                        <input type="file" name="image" onChange={handleChange}  accept="image/*" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex h-100 mb-auto mt-auto align-items-top">
                    <div className="button-group  d-inline-flex align-items-center mb-auto">
                      <button type='submit' className="dash-btn-two tran3s me-3" disabled={loading}>  {loading ? 'Saving...' : eventId ? 'Update Event' : 'Create Event'}</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <button className="scroll-top">
          <i className="bi bi-arrow-up-short" />
        </button>
      </div>


    </>
  )
}

export default CreateEvent  