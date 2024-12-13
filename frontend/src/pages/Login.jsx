// import React, { useState, useContext } from 'react';
// import axios from 'axios';
// import { AuthContext } from '../context/AuthContext'; // Import AuthContext
// import { useNavigate } from 'react-router-dom'; // Import useNavigate

// const Login = () => {
//     const [loginForm, setLoginForm] = useState({ email: '', password: '' });
//     const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '' });
//     const { login } = useContext(AuthContext); // Use login from AuthContext
//     const navigate = useNavigate(); // Initialize useNavigate


//     // Handle Login Form Change
//     const handleLoginChange = (e) => {
//         setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
//     };

//     // Handle Register Form Change
//     const handleRegisterChange = (e) => {
//         setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
//     };

//     // Login Function
//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post('http://localhost:5000/api/auth/login', loginForm); // API call to login
//             login(res.data.token); // Set token in context and localStorage
//             navigate('/'); // Redirect to home page after successful login
//         } catch (error) {
//             console.error('Login error:', error.response.data.msg || error.message);
//         }
//     };
//     // Register function
//     const handleRegister = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post('http://localhost:5000/api/auth/register', registerForm); // Correct API URL
//             localStorage.setItem('token', res.data.token);
//             console.log('Registration successful');
//         } catch (error) {
//             console.error('Registration error:', error.response.data.msg || error.message);
//         }
//     };

//     return (
//         <div className="container">
//             <div className="user-data-form ">
//                 <div className="form-wrapper m-auto">
//                     <ul className="nav nav-tabs w-100" role="tablist">
//                         <li className="nav-item" role="presentation">
//                             <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#fc1" role="tab" aria-selected="true">Login</button>
//                         </li>
//                         <li className="nav-item" role="presentation">
//                             <button className="nav-link" data-bs-toggle="tab" data-bs-target="#fc2" role="tab" aria-selected="false" tabIndex={-1}>Signup</button>
//                         </li>   
//                     </ul>
//                     <div className="tab-content mt-30">
//                         <div className="tab-pane show active" role="tabpanel" id="fc1">
//                             <div className="text-center mb-20">
//                                 <h2>Welcome Back!</h2>
//                                 <p className="fs-20 color-dark">Still don't have an account? <a href="#">Sign up</a></p>
//                             </div>
//                             <form onSubmit={handleLogin}>
//                                 <div className="row">
//                                     <div className="col-12">
//                                         <div className="input-group-meta position-relative mb-25">
//                                             <label>Email*</label>
//                                             <input type="email" name='email' onChange={handleLoginChange} placeholder="Youremail@gmail.com" required />
//                                         </div>
//                                     </div>
//                                     <div className="col-12">
//                                         <div className="input-group-meta position-relative mb-20">
//                                             <label>Password*</label>
//                                             <input type="password" name='password' onChange={handleLoginChange} placeholder="Enter Password" className="pass_log_id" required />
//                                             <span className="placeholder_icon"><span className="passVicon"><img src="images/icon/icon_68.svg" alt /></span></span>
//                                         </div>
//                                     </div>
//                                     <div className="col-12">
//                                         <button type='submit' className="btn-two w-100 text-uppercase d-block mt-20">Login</button>
//                                     </div>
//                                 </div>
//                             </form>
//                         </div>
//                         {/* /.tab-pane */}
//                         <div className="tab-pane" role="tabpanel" id="fc2">
//                             <div className="text-center mb-20">
//                                 <h2>Register</h2>
//                                 <p className="fs-20 color-dark">Already have an account? <a href="#">Login</a></p>
//                             </div>
//                             <form onSubmit={handleRegister}>
//                                 <div className="row">
//                                     <div className="col-12">
//                                         <div className="input-group-meta position-relative mb-25">
//                                             <label>Name*</label>
//                                             <input type="text" name='name' onChange={handleRegisterChange} required placeholder="Zubayer Hasan" />
//                                         </div>
//                                     </div>
//                                     <div className="col-12">
//                                         <div className="input-group-meta position-relative mb-25">
//                                             <label>Email*</label>
//                                             <input type="email" name='email' onChange={handleRegisterChange} required placeholder="zubayerhasan@gmail.com" />
//                                         </div>
//                                     </div>
//                                     <div className="col-12">
//                                         <div className="input-group-meta position-relative mb-20">
//                                             <label>Password*</label>
//                                             <input type="password" name='password' onChange={handleRegisterChange} required placeholder="Enter Password" className="pass_log_id" />
//                                             <span className="placeholder_icon"><span className="passVicon"><img src="images/icon/icon_68.svg" alt /></span></span>
//                                         </div>
//                                     </div>
//                                     <div className="col-12">
//                                         <button type='submit' className="btn-two w-100 text-uppercase d-block mt-20">Sign Up</button>
//                                     </div>
//                                 </div>
//                             </form>
//                         </div>
//                         {/* /.tab-pane */}
//                     </div>
//                     <div className="d-flex align-items-center mt-30 mb-10">
//                         <div className="line" />
//                         <span className="pe-3 ps-3 fs-6">OR</span>
//                         <div className="line" />
//                     </div>
//                     <div className="row">
//                         <div className="col-sm-6">
//                             <a href="#" className="social-use-btn d-flex align-items-center justify-content-center tran3s w-100 mt-10">
//                                 <img src="images/icon/google.png" alt />
//                                 <span className="ps-3">Signup with Google</span>
//                             </a>
//                         </div>
//                         <div className="col-sm-6">
//                             <a href="#" className="social-use-btn d-flex align-items-center justify-content-center tran3s w-100 mt-10">
//                                 <img src="images/icon/facebook.png" alt />
//                                 <span className="ps-3">Signup with Facebook</span>
//                             </a>
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default Login;


import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Login = () => {
    const [loginForm, setLoginForm] = useState({ email: '', password: '' });
    const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '' });
    const { login } = useContext(AuthContext); // Use login from AuthContext
    const navigate = useNavigate(); // Initialize useNavigate

    // Toast state
    const [toastMessage, setToastMessage] = useState(null);
    const [toastSeverity, setToastSeverity] = useState(''); // success or error

    // Handle Login Form Change
    const handleLoginChange = (e) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    };

    // Handle Register Form Change
    const handleRegisterChange = (e) => {
        setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
    };

    // Login Function
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', loginForm); // API call to login
            login(res.data.token); // Set token in context and localStorage
            setToastMessage('Login successful!');
            setToastSeverity('success');
            navigate('/'); // Redirect to home page after successful login
        } catch (error) {
            setToastMessage(error.response?.data?.msg || 'Login failed');
            setToastSeverity('error');
        }
    };

    // Register function
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', registerForm); // Correct API URL
            localStorage.setItem('token', res.data.token);
            setToastMessage('Registration successful!');
            setToastSeverity('success');
        } catch (error) {
            setToastMessage(error.response?.data?.msg || 'Registration failed');
            setToastSeverity('error');
        }
    };

    // Close Toast
    const handleCloseToast = () => {
        setToastMessage(null);
    };

    return (
        <>
        <div className="container">
            <div className="user-data-form ">
                <div className="form-wrapper m-auto">
                    <ul className="nav nav-tabs w-100" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#fc1" role="tab" aria-selected="true">Login</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#fc2" role="tab" aria-selected="false" tabIndex={-1}>Signup</button>
                        </li>   
                    </ul>
                    <div className="tab-content mt-30">
                        <div className="tab-pane show active" role="tabpanel" id="fc1">
                            <div className="text-center mb-20">
                                <h2>Welcome Back!</h2>
                                <p className="fs-20 color-dark">Still don't have an account? <a href="#">Sign up</a></p>
                            </div>
                            <form onSubmit={handleLogin}>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="input-group-meta position-relative mb-25">
                                            <label>Email*</label>
                                            <input type="email" name='email' onChange={handleLoginChange} placeholder="Youremail@gmail.com" required />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="input-group-meta position-relative mb-20">
                                            <label>Password*</label>
                                            <input type="password" name='password' onChange={handleLoginChange} placeholder="Enter Password" className="pass_log_id" required />
                                            <span className="placeholder_icon"><span className="passVicon"><img src="images/icon/icon_68.svg" alt /></span></span>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button type='submit' className="btn-two w-100 text-uppercase d-block mt-20">Login</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {/* /.tab-pane */}
                        <div className="tab-pane" role="tabpanel" id="fc2">
                            <div className="text-center mb-20">
                                <h2>Register</h2>
                                <p className="fs-20 color-dark">Already have an account? <a href="#">Login</a></p>
                            </div>
                            <form onSubmit={handleRegister}>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="input-group-meta position-relative mb-25">
                                            <label>Name*</label>
                                            <input type="text" name='name' onChange={handleRegisterChange} required placeholder="Zubayer Hasan" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="input-group-meta position-relative mb-25">
                                            <label>Email*</label>
                                            <input type="email" name='email' onChange={handleRegisterChange} required placeholder="zubayerhasan@gmail.com" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="input-group-meta position-relative mb-20">
                                            <label>Password*</label>
                                            <input type="password" name='password' onChange={handleRegisterChange} required placeholder="Enter Password" className="pass_log_id" />
                                            <span className="placeholder_icon"><span className="passVicon"><img src="images/icon/icon_68.svg" alt /></span></span>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button type='submit' className="btn-two w-100 text-uppercase d-block mt-20">Sign Up</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {/* /.tab-pane */}
                    </div>
                    <div className="d-flex align-items-center mt-30 mb-10">
                        <div className="line" />
                        <span className="pe-3 ps-3 fs-6">OR</span>
                        <div className="line" />
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <a href="#" className="social-use-btn d-flex align-items-center justify-content-center tran3s w-100 mt-10">
                                <img src="images/icon/google.png" alt />
                                <span className="ps-3">Signup with Google</span>
                            </a>
                        </div>
                        <div className="col-sm-6">
                            <a href="#" className="social-use-btn d-flex align-items-center justify-content-center tran3s w-100 mt-10">
                                <img src="images/icon/facebook.png" alt />
                                <span className="ps-3">Signup with Facebook</span>
                            </a>
                        </div>
                    </div>
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

export default Login;



