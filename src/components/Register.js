import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Register() {
    const [formData, setFormData] = useState({
        Name: '',
        email: '',
        password: '',
        role: '',
        specialty: '' // Added specialty field
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add form validation here if needed

        // Make an HTTP POST request to register the user
        axios.post('http://localhost:3001/register', formData)
            .then(res => {
                console.log('User registered successfully:', res.data);
                // Redirect the user to the login page or perform any other necessary actions
            })
            .catch(err => {
                console.error('Error registering user:', err);
                // Handle error, display error message, etc.
            });
    };

    return (
        <div className="card o-hidden border-2 shadow-lg" style={{margin:'80px', width: '80%',marginLeft:'150px'}} >
            <div className="card-body p-0">
                <div className="row">
                    <div className="col-lg-5  " style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/visit.jpg)` }}></div>
                    <div className="col-lg-7">
                        <div className="p-5">
                            <div className="text-center">
                              <img src={process.env.PUBLIC_URL + '/logo1.png'} alt="Your Logo" style={{ width: '150px', marginBottom:'20px'}} />
                                <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                            </div>
                            <form className="user" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    
                                        <input type="text" className="form-control form-control-user" style={{ borderRadius: '5px', marginBottom: '5px' }} name="Name" value={formData.firstName} onChange={handleChange} placeholder="Name" />
                                    
                                </div>
                                <div className="form-group ">
                                    <input type="email" className="form-control form-control-user" style={{ borderRadius: '5px', marginBottom: '5px' }} name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" />
                                </div>
                                <div className="form-group">
                                    
                                        <input type="password" className="form-control form-control-user" style={{ borderRadius: '5px', marginBottom: '5px' }} name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                                    
                                </div>
                                <div className="form-group" style={{ borderRadius: '15px', marginBottom: '15px' }}>
                                    <select className="form-control form-control-user" value={formData.role} onChange={handleChange} name="role">
                                        <option value="">Select Role</option>
                                        <option value="patient">Patient</option>
                                        <option value="doctor">Doctor</option>
                                    </select>
                                </div>
                                {formData.role === 'doctor' && (
                                    <div className="form-group">
                                        <input type="text" className="form-control form-control-user" style={{ borderRadius: '5px', marginBottom: '5px' }} name="specialty" value={formData.specialty} onChange={handleChange} placeholder="Specialty" />
                                    </div>
                                )}
                                <Link to="/dashboard" className="btn btn-primary btn-user btn-block " style={{borderRadius:'15px', width:'450px', marginLeft:'30px'}}>Register Account</Link>
                            </form>
                            <hr />
                            <div className="text-center">
                                <Link className="small" to="/forgot-password">Forgot Password?</Link>
                            </div>
                            <div className="text-center">
                                <Link className="small" to="/login">Already have an account? Login!</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
