import React, { useEffect, useState , useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
const MyEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { auth, logout } = useContext(AuthContext);  
    const handleLogout = () => {
      logout();  // Call the logout function from context
      navigate('/login');  // Redirect to login page after logout
    };

    useEffect(() => {
        const fetchUserEvents = async () => {
            try {
                const token = localStorage.getItem('token'); 
                const res = await axios.get('http://localhost:5000/api/events/user-events', {
                    headers: {
                        'Authorization': `Bearer ${token}` 
                    }
                });
                setEvents(res.data); 
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch user events');
                setLoading(false);
            }
        };

        fetchUserEvents();
    }, []);
    const handleDelete = async (eventId) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:5000/api/events/${eventId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setEvents(events.filter(event => event._id !== eventId));
                navigate('/my-event'); 
            } catch (err) {
                console.error('Failed to delete event:', err);
            }
        }
    };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    return (
        <>
            <div className="main-page-wrapper">
                <aside className="dash-aside-navbar">
                    <div className="position-relative">
                        <div className="logo d-md-block d-flex align-items-center justify-content-between plr bottom-line pb-30">
                            <Link to={"/"} className='m-auto'>
                                <img src="../images/logo/ae-logo-2022.svg" width={100} className='m-auto' />
                            </Link>
                            <button className="close-btn d-block d-md-none"><i className="fa-light fa-circle-xmark" /></button>
                        </div>
                        <nav className="dasboard-main-nav pt-30 pb-30 bottom-line">
                            <ul className="style-none">
                                <li><div className="nav-title">Listing</div></li>
                                <li className="plr"><a href="/my-event" className="d-flex w-100 align-items-center">
                                    <img src="images/icon/icon_6.svg" alt />
                                    <span>My Events</span>
                                </a></li>
                                <li className="plr"><a href="/create-event" className="d-flex w-100 align-items-center">
                                    <img src="images/icon/icon_7_active.svg" alt />
                                    <span>Add New Events</span>
                                </a></li>
                            </ul>
                        </nav>

                        <div className="plr mt-30">
                            <a className="d-flex w-100 align-items-center logout-btn" onClick={handleLogout}>
                                <div className="icon tran3s d-flex align-items-center justify-content-center rounded-circle"><img src="images/icon/icon_41.svg" alt /></div>
                                <span>Logout</span>
                            </a>
                        </div>
                    </div>
                </aside>
                <div className="dashboard-body">
                    <div className="position-relative">
                        <header className="dashboard-header">
                            <div className="d-flex align-items-center justify-content-end">
                                <h4 className="m0 d-none d-lg-block">My Events</h4>
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
                        <h2 className="main-title d-block d-lg-none">My Properties</h2>
                        <div className="bg-white card-box p0 border-20">
                            <div className="table-responsive pt-25 pb-25 pe-4 ps-4">
                                <table className="table property-list-table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Title, Location & Date</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Seats</th>
                                            <th scope="col">Event Type</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="border-0 ">
                                        {events.map((event, index) => (
                                            <tr key={index}>
                                                <td className='w-25'>
                                                    <div className="d-lg-flex align-items-center position-relative">
                                                        <img src={`http://localhost:5000/${event.image}`} alt="event" className="p-img" />
                                                        <div className="ps-lg-4 md-pt-10">
                                                            <a href="#" className="property-name tran3s color-dark fw-500 fs-20 stretched-link">{event.title}</a>
                                                            <div className="address">{event.location}</div>
                                                            <h6>{new Date(event.date).toLocaleDateString()}</h6>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className=' mytable'>{event.description}</td>
                                                <td>{event.maxAttendees}</td>
                                                <td><strong className="price color-dark">{event.eventType}</strong></td>
                                                <td>
                                                    <div className="action-dots float-end">
                                                        <button className="action-btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                            <span />
                                                        </button>
                                                        <ul className="dropdown-menu dropdown-menu-end">
                                                            <li>
                                                                <Link className="dropdown-item" to={`/edit-event/${event._id}`}>
                                                                    <img src="images/icon/icon_20.svg" alt="edit" />Edit
                                                                </Link>
                                                            </li>
                                                            <li><a className="dropdown-item" onClick={() => handleDelete(event._id)}><img src="images/icon/icon_21.svg" alt="delete" />Delete</a></li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {/* /.table property-list-table */}
                            </div>
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

export default MyEvents


