import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:3001/login', {
                email,
                password,
                role
            });
            console.log(response.data);
            if (role === 'doctor') {
                window.location.href = '/dashboard'; 
            } else if (role === 'patient') {
                window.location.href = '/dashpatient'; 
            }
        } catch (error) {
            setError('Invalid email or password');
        }
    };
    const getLoginLink = () => {
        if (role === 'doctor') {
            return '/dashboard';
        } else if (role === 'patient') {
            return '/dashpatient';
        }
        return '';
    };
    return (
        <div className="container " >
            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-2 shadow-lg my-5 ">
                        <div className="card-body p-0">
                            <div className="row">
                            <div className="col-lg-6 d-none d-lg-block bg-login-image" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/visit.jpg)` }}></div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                        <img src={process.env.PUBLIC_URL + '/logo1.png'} alt="Your Logo" style={{ width: '150px', marginBottom:'20px'}} />
                                            <h1 className="h4 text-gray-900 mb-4"  style={{fontFamily:'cursive', fontWeight:'bolder'}}>Welcome!</h1>
                                            <p className="text-gray-900 mb-4"  style={{fontSize:'15px'}}>Login to your account</p>
                                        </div>
                                        <form action="POST" onSubmit={handleLogin} className="user">
                                            <div className="form-group" style={{borderRadius:'20px', marginBottom:'15px', marginTop:'-15px'}}>
                                                <input 
                                                    type="email" 
                                                    className="form-control form-control-user" 
                                                    placeholder="Email Address..." 
                                                    onChange={(e) => {setEmail(e.target.value)}} 
                                                    id="" 
                                                    name=""
                                                />
                                            </div>
                                            <div className="form-group" style={{borderRadius:'20px', marginBottom:'15px'}}>
                                            <input 
                                                    type="password" 
                                                    className="form-control form-control-user" 
                                                    placeholder="Password..." 
                                                    onChange={(e) => {setPassword(e.target.value)}} 
                                                    id="" 
                                                    name=""
                                                />
                                            </div>
                                            <div className="form-group" style={{ borderRadius: '20px', marginBottom: '15px' }}>
                                                <select className="form-control form-control-user" value={role} onChange={(e) => setRole(e.target.value)}>
                                                    <option value="">Select Role</option>
                                                    <option value="patient">Patient</option>
                                                    <option value="doctor">Doctor</option>
                                                </select>
                                            </div>

                                            <Link to={getLoginLink()} className="btn btn-primary btn-user btn-block" style={{borderRadius:'15px', width:'290px', marginLeft:'35px'}}>Login</Link>
                                        </form>
                                        <hr />
                                        <div className="text-center">
                                            <a className="small" href="forgot.js">Forgot Password?</a>
                                        </div>
                                        <div className="text-center">
                                            <a className="small" href="/register">Create an Account!</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
