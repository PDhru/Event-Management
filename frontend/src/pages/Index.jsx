

// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import Tooltip from '@mui/material/Tooltip';
// import { AuthContext } from '../context/AuthContext';

// const Index = () => {
//   const { auth } = useContext(AuthContext);
//   const [events, setEvents] = useState([]);
//   const [filteredEvents, setFilteredEvents] = useState([]); // State to hold filtered events
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [tooltipMessage, setTooltipMessage] = useState(null);
//   const [tooltipType, setTooltipType] = useState('');

//   // Filter state
//   const [eventType, setEventType] = useState('');
//   const [location, setLocation] = useState('');
//   const [date, setDate] = useState('');

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/events');
//         setEvents(res.data);
//         setFilteredEvents(res.data); 
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to load events');
//         setLoading(false);
//       }
//     };
//     fetchEvents();
//   }, []);

//   // Filter events based on filter state
//   useEffect(() => {
//     let filtered = events;

//     // Apply event type filter
//     if (eventType) {
//       filtered = filtered.filter((event) => event.eventType === eventType);
//     }

//     // Apply location filter
//     if (location && location !== 'Select Location') {
//       filtered = filtered.filter((event) => event.location === location);
//     }

//     // Apply date filter
//     if (date) {
//       filtered = filtered.filter((event) => new Date(event.date).toLocaleDateString() === new Date(date).toLocaleDateString());
//     }

//     setFilteredEvents(filtered); // Update the filtered events
//   }, [eventType, location, date, events]); // Run effect when any filter or events change

//   // Function to handle RSVP
//   const handleRSVP = async (eventId) => {
//     try {
//       const token = localStorage.getItem('token'); // Get the token from localStorage
//       const res = await axios.post(
//         `http://localhost:5000/api/events/${eventId}/rsvp`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setTooltipMessage(res.data.message); 
//       setTooltipType('success'); 
//       setTimeout(() => setTooltipMessage(null), 3000); 
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || 'Failed to RSVP';
//       setTooltipMessage(errorMessage); 
//       setTooltipType('error'); 
//       setTimeout(() => setTooltipMessage(null), 3000);
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <>
//       <div className="property-listing-six bg-pink-two pt-110 md-pt-80 pb-170 xl-pb-120 mt-150 xl-mt-120">
//         <div className="container">
//           <div className="search-wrapper-one layout-one bg position-relative mb-75 md-mb-50">
//             <div className="bg-wrapper border-layout">
//               <form>
//                 <div className="row gx-0 align-items-center">
//                   <div className=" col-lg-4">
//                     <div className="input-box-one border-left">
//                       <div className="label">I’m looking to...</div>
//                       <select className="nice-select border-0" value={eventType} onChange={(e) => setEventType(e.target.value)}>
//                         <option value="">Select Event Type</option>
//                         <option value="networking">Networking events</option>
//                         <option value="charity">Charity events</option>
//                         <option value="social">Social events</option>
//                         <option value="conference">Conference</option>
//                         <option value="workshop">Workshop</option>
//                         <option value="meetup">Meetup</option>
//                         <option value="seminar">Seminars</option>
//                       </select>
//                     </div>
//                   </div>
//                   <div className=" col-lg-4">
//                     <div className="input-box-one border-left">
//                       <div className="label">Location</div>
//                       <select className="nice-select location border-0" value={location} onChange={(e) => setLocation(e.target.value)}>
//                         <option>Select Location</option>
//                         <option value="ahemdabad">Ahemdabad</option>
//                         <option value="delhi">Delhi</option>
//                         <option value="mumbai">New Mumbai</option>
//                         <option value="karnataka">Karnataka</option>
//                         <option value="pune">Pune</option>
//                         <option value="patna">Patna</option>
//                         <option value="gandhinagar">Gandhinagar</option>
//                       </select>
//                     </div>
//                   </div>
//                   <div className=" col-lg-4">
//                     <div className="input-box-one border-left border-lg-0">
//                       <div className="label">On Date</div>
//                       <input type="date" className="border-0 text-center" value={date} onChange={(e) => setDate(e.target.value)} />
//                     </div>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//           <div className="listing-header-filter d-sm-flex justify-content-between align-items-center mb-40 lg-mb-30">
//             <div>Showing <span className="color-dark fw-500">{filteredEvents.length}</span> results</div>
//             <div className="d-flex align-items-center xs-mt-20">
//               <div className="short-filter d-flex align-items-center">
//                 <div className="fs-16 me-2">Sort by:</div>
//                 <select className="nice-select">
//                   <option value={0}>Newest</option>
//                   <option value={1}>Best Seller</option>
//                   <option value={2}>Best Match</option>
//                   <option value={3}>Price Low</option>
//                   <option value={4}>Price High</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           <div className="row gx-xxl-5">
//             {filteredEvents.map((event, index) => (
//               <div className="col-lg-4 col-md-6 d-flex mb-50" key={index}>
//                 <div className="listing-card-one border-25 h-100 w-100">
//                   <div className="img-gallery p-15">
//                     <div className="position-relative border-25 overflow-hidden">
//                       <div className="tag border-25">{event.eventType}</div>
//                       <div className="carousel slide">
//                         <div className="carousel-inner">
//                           <div className="carousel-item active">
//                             <a href="#" className="d-block">
//                               <img src={`http://localhost:5000/${event.image}`} className="w-100" alt={event.title} />
//                             </a>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="property-info p-25">
//                     <a href="#" className="title tran3s">{event.title}</a>
//                     <div className="address d-flex justify-content-between">
//                       <div className="location">{event.location}</div>
//                       <span className="current">Seats: {event.maxAttendees}</span>
//                     </div>

//                     <div className="description">
//                       <p>{event.description}</p>
//                     </div>
//                     <div className="pl-footer top-border d-flex align-items-center justify-content-between">
//                       <strong className="fs-6 fw-500 color-dark">On: {new Date(event.date).toLocaleDateString()}</strong>

//                       {event.rsvpList && auth && event.rsvpList.includes(auth._id) ? (
//                         <Tooltip title="You have RSVP'd for this event" arrow>
//                           <button className="btn btn-disabled" disabled>RSVP'd</button>
//                         </Tooltip>
//                       ) : event.rsvpList && event.rsvpList.length >= event.maxAttendees ? (
//                         <Tooltip title="RSVP Full" arrow>
//                           <button className="btn btn-disabled" disabled>RSVP Full</button>
//                         </Tooltip>
//                       ) : (
//                         <Tooltip title="Click to RSVP" placement="top" arrow>
//                           <button className="btn-10 rounded-0" onClick={() => handleRSVP(event._id)}>RSVP</button>
//                         </Tooltip>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Index;
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { AuthContext } from '../context/AuthContext';

const Index = () => {
  const { auth } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState(null); // Store the toast message
  const [toastSeverity, setToastSeverity] = useState(''); // Store the severity of the toast (success/error)

  // Filter state
  const [eventType, setEventType] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/events');
        setEvents(res.data);
        setFilteredEvents(res.data); 
        setLoading(false);
      } catch (err) {
        setError('Failed to load events');
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Filter events based on filter state
  useEffect(() => {
    let filtered = events;

    if (eventType) {
      filtered = filtered.filter((event) => event.eventType === eventType);
    }

    if (location && location !== 'Select Location') {
      filtered = filtered.filter((event) => event.location === location);
    }

    if (date) {
      filtered = filtered.filter((event) => new Date(event.date).toLocaleDateString() === new Date(date).toLocaleDateString());
    }

    setFilteredEvents(filtered);
  }, [eventType, location, date, events]);

  // Function to handle RSVP
  const handleRSVP = async (eventId) => {
    try {
      const token = localStorage.getItem('token'); 
      const res = await axios.post(
        `http://localhost:5000/api/events/${eventId}/rsvp`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setToastMessage(res.data.message); 
      setToastSeverity('success'); 
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to RSVP';
      setToastMessage(errorMessage); 
      setToastSeverity('error'); 
    }
  };

  const handleCloseToast = () => {
    setToastMessage(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="property-listing-six bg-pink-two pt-110 md-pt-80 pb-170 xl-pb-120 mt-150 xl-mt-120">
        <div className="container">
          <div className="search-wrapper-one layout-one bg position-relative mb-75 md-mb-50">
            <div className="bg-wrapper border-layout">
              <form>
                <div className="row gx-0 align-items-center">
                  <div className="col-lg-4">
                    <div className="input-box-one border-left">
                      <div className="label">I’m looking to...</div>
                      <select className="nice-select border-0" value={eventType} onChange={(e) => setEventType(e.target.value)}>
                        <option value="">Select Event Type</option>
                        <option value="networking">Networking events</option>
                        <option value="charity">Charity events</option>
                        <option value="social">Social events</option>
                        <option value="conference">Conference</option>
                        <option value="workshop">Workshop</option>
                        <option value="meetup">Meetup</option>
                        <option value="seminar">Seminars</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="input-box-one border-left">
                      <div className="label">Location</div>
                      <select className="nice-select location border-0" value={location} onChange={(e) => setLocation(e.target.value)}>
                        <option>Select Location</option>
                        <option value="ahemdabad">Ahemdabad</option>
                        <option value="delhi">Delhi</option>
                        <option value="mumbai">New Mumbai</option>
                        <option value="karnataka">Karnataka</option>
                        <option value="pune">Pune</option>
                        <option value="patna">Patna</option>
                        <option value="gandhinagar">Gandhinagar</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="input-box-one border-left border-lg-0">
                      <div className="label">On Date</div>
                      <input type="date" className="border-0 text-center" value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="listing-header-filter d-sm-flex justify-content-between align-items-center mb-40 lg-mb-30">
            <div>Showing <span className="color-dark fw-500">{filteredEvents.length}</span> results</div>
            <div className="d-flex align-items-center xs-mt-20">
              <div className="short-filter d-flex align-items-center">
                <div className="fs-16 me-2">Sort by:</div>
                <select className="nice-select">
                  <option value={0}>Newest</option>
                  <option value={1}>Best Seller</option>
                  <option value={2}>Best Match</option>
                  <option value={3}>Price Low</option>
                  <option value={4}>Price High</option>
                </select>
              </div>
            </div>
          </div>

          <div className="row gx-xxl-5">
            {filteredEvents.map((event, index) => (
              <div className="col-lg-4 col-md-6 d-flex mb-50" key={index}>
                <div className="listing-card-one border-25 h-100 w-100">
                  <div className="img-gallery p-15">
                    <div className="position-relative border-25 overflow-hidden">
                      <div className="tag border-25">{event.eventType}</div>
                      <div className="carousel slide">
                        <div className="carousel-inner">
                          <div className="carousel-item active">
                            <a href="#" className="d-block">
                              <img src={`http://localhost:5000/${event.image}`} className="w-100" alt={event.title} />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="property-info p-25">
                    <a href="#" className="title tran3s">{event.title}</a>
                    <div className="address d-flex justify-content-between">
                      <div className="location">{event.location}</div>
                      <span className="current">Seats: {event.maxAttendees}</span>
                    </div>

                    <div className="description">
                      <p>{event.description}</p>
                    </div>
                    <div className="pl-footer top-border d-flex align-items-center justify-content-between">
                      <strong className="fs-6 fw-500 color-dark">On: {new Date(event.date).toLocaleDateString()}</strong>

                      {event.rsvpList && auth && event.rsvpList.includes(auth._id) ? (
                        <button className="btn btn-disabled" disabled>RSVP'd</button>
                      ) : event.rsvpList && event.rsvpList.length >= event.maxAttendees ? (
                        <button className="btn btn-disabled" disabled>RSVP Full</button>
                      ) : (
                        <button className="btn-10 rounded-0" onClick={() => handleRSVP(event._id)}>RSVP</button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Snackbar for Toast Message */}
      <Snackbar
        open={toastMessage !== null}
        autoHideDuration={3000}
        onClose={handleCloseToast}
      >
        <Alert onClose={handleCloseToast} severity={toastSeverity} sx={{ width: '100%' }}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Index;
