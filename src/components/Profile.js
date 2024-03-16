import {Link, useParams} from "react-router-dom";
import React, {useState, useEffect} from 'react'
import axios from "axios";
import Chart from 'chart.js/auto';
import '../index.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'





function Profile() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [activeNavItem, setActiveNavItem] = useState(null);
    const chartRef = React.createRef();
    const [date, setDate] = useState(new Date());
    const [currentTime, setCurrentTime] = useState('');
    const handleDateChange = (date) => {
        setDate(date);
    };

    const handleNavItemClick = (navItem) => {
        setActiveNavItem(navItem);
      };

      useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            createChart();
        }
    }, [data]);

    useEffect(() => {
        const interval = setInterval(() => {
            const date = new Date();
            const formattedDate = formatDate(date);
            setCurrentTime(formattedDate);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatDate = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };
    
    const fetchData = () => {
        axios.get('http://localhost:3001/')
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
            .catch(err => console.log(err));
    };

    const createChart = () => {
        const ctx = chartRef.current.getContext('2d');
        if (window.myChart !== undefined) {
            window.myChart.destroy();
        }
        
        const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat','Sun'];
        const appointmentCounts = [9, 5, 12, 11, 12, 0, 0]; 
        
        // Count the number of appointments for each day
        data.forEach(appointment => {
            const appointmentDate = new Date(appointment.date);
            const dayOfWeek = appointmentDate.getDay();
            appointmentCounts[dayOfWeek]++;
        });
        
        window.myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: daysOfWeek,
                datasets: [{
                    label: 'Appointments',
                    data: appointmentCounts,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        stepSize: 1 // Ensure that y-axis increments by 1
                    }
                }
            }
        });
    };
    

    return (
        <div style={{ display: 'flex', height: '850px'}}>
        {/* Left column (Menu) */}
        <div className="flex-column" style={{ width: '130px', backgroundColor: '#2F539B', paddingRight: '10px', paddingLeft: '15px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)' , height: 'auto'}}  >
            {/* Navigation Menu */}
            <div className={`${activeNavItem === 'dashboard' ? 'active' : ''}`} onClick={() => handleNavItemClick('dashboard')} style={{ color:'white', fontWeight:'bolder', marginTop:'50px', cursor: 'pointer'}}>
            <Link to="/dashboard" className="btn btn-primary btn-sm" style={{ width: '120px', height: '30px', fontSize: '12px', marginLeft: '-18px' }}>Dashboard</Link>
            </div>
            <div className={`${activeNavItem === 'appointments' ? 'active' : ''}`} onClick={() => handleNavItemClick('appointments')} style={{ color:'white', fontWeight:'bolder', marginTop:'50px', cursor: 'pointer'}}>
            <Link to="/appointments" className="btn btn-primary btn-sm" style={{ width: '120px', height: '30px', fontSize: '12px', marginLeft: '-18px', marginTop: '-80px' }}>Appointments</Link>
            </div>
            {/*<div className={` ${activeNavItem === 'patients' ? 'active' : ''}`} onClick={() => handleNavItemClick('patients')} style={{ color:'white', fontWeight:'bolder', marginTop:'50px', cursor: 'pointer'}}>
            <Link to="/patients" className="btn btn-primary btn-sm" style={{ width: '120%', height: '30px', fontSize: '12px', marginLeft: '-18px', marginTop: '-140px' }}>Patients</Link>
            </div>
             <div class="p-2" style={{ color:'white', fontWeight:'bolder', cursor: 'pointer'}}>Messages</div>
            <div class="p-2" style={{ color:'white', fontWeight:'bolder', cursor: 'pointer'}}>Medications</div> */}
            <div className={`${activeNavItem === 'profile' ? 'active' : ''}`} onClick={() => handleNavItemClick('profile')} style={{ color:'white', fontWeight:'bolder', marginTop:'50px', cursor: 'pointer'}}>
            <Link to="/profile" className="btn btn-primary btn-sm" style={{ width: '120px', height: '30px', fontSize: '12px', marginLeft: '-18px', marginTop: '-140px' }}>My Profile</Link>
            </div>
            <div className={`${activeNavItem === 'login' ? 'active' : ''}`} onClick={() => handleNavItemClick('login')} style={{ color:'white', fontWeight:'bolder', marginTop:'50px', cursor: 'pointer'}}>
                <Link to="/login" className="btn btn-primary btn-sm" style={{ width: '120px', height: '30px', fontSize: '12px', marginLeft: '-18px', marginTop: '-80px' }}>Logout</Link>
            </div>

        </div>

    <div>
         {/* Middle column (Main content) */}
        <div className="boxe justify-content-center align-items-cente" style={{ width: '90%', height: 'auto', marginTop:'10px'}} > 
            <div className=" box1 " style={{ backgroundColor: '#f0f0f0',marginLeft:'15px', marginRight:'15px', height:'815px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)'}}  >
                <div style={{marginBottom:'20px', marginTop:'-15px', alignItems:'center', marginLeft:'40px'}}>
                    {/* Logo */}
                        <img src={process.env.PUBLIC_URL + '/logo1.png'} alt="Your Logo" style={{ width: '150px'}} />
                    {/* User Name */}
                    <span style={{fontWeight: 'bold', marginLeft:'50%', marginRight:'15px', fontSize:'15px' }}><Link to="/profile" style={{textDecoration:'none'}} >Dr. John Doe</Link></span>
                    {/* Notification Bell */}
                        <img src={process.env.PUBLIC_URL + '/bell.png'} alt="Your Logo" style={{ width: '30px', height: '30px' }} />
                    
                </div>
                <div style={{ position: 'relative', height: '230px', display: 'flex', flexDirection: 'column'}}>
                        <img src={process.env.PUBLIC_URL + '/doc.jpg'} alt="Doctor's Profile" style={{ width: '200px', marginLeft:'270px', height: '200px', marginBottom: '10px', borderRadius: '10px', marginTop: '20px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)' }} />
                        <h3 className="text-primary" style={{ marginBottom: '-3px',marginLeft:'290px' }}>Dr. John Doe</h3>
                        <p style={{  marginBottom: '-3px', marginLeft:'270px' }}>Internal Medicine and Neurology</p>
                        <p style={{ marginBottom: '30px', marginLeft:'310px' }}>johndoe@gmail.com</p>
                        <div>
                            <p style={{ marginBottom: '5px',marginLeft:'30px' }}><b>Professional Info: </b><br></br>Dr. John Doe is in the field of Internal Medicine and Neurology. Treats patients at Mercy Hospital and Sanitarium Hospital.</p>
                            <div style={{ borderBottom: '2px solid #2F539B', opacity:'0.45', width:'630px', marginLeft:'30px', marginBottom:'20px' }}></div>
                            <p style={{ marginBottom: '-3px',marginLeft:'30px' }}><b>Clinics:</b> 
                            <ul style={{marginBottom:'2px'}}>Mercy Hospital</ul>
                            <ul>Sanitarium Hospital</ul>
                            </p>
                        </div>
                </div>         
            </div>
        </div>
    </div>
    <div style={{ flex: '0 0 250px',marginLeft:'-80px',marginBottom:'20px', backgroundColor: '#f0f0f0', paddingTop: '10px', paddingLeft:'-10px',paddingRight:'-10px', marginTop: '15px', height: '220px', display: 'flex', flexDirection: 'column', alignItems: 'center' , borderRadius: '20px',boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)'}}>
        <h5 style={{ borderBottom: '2px solid black', marginBottom:'2px', width:'350px', marginTop: '3px' }}>Schedule</h5>
        <div style={{ borderBottom: '2px solid black', marginBottom:'2px' }}></div>
        <table style={{ width: '360px', fontSize:'12px'}}>
            
                <tr style={{ width: '300px', fontSize:'12px'}}> 
                    <td></td>
                    <td><h6>Mercy</h6></td>
                    <td><h6>Sanitarium</h6></td>
                </tr>
                <tr>Monday
                    <td>10:00 AM - 12:00 PM </td>
                    <td>10:00 AM - 12:00 PM </td>
                </tr>
                <tr>Tuesday
                    <td>10:00 AM - 12:00 PM </td>
                    <td>10:00 AM - 12:00 PM </td>
                </tr>
                <tr>Wednesday
                    <td>10:00 AM - 12:00 PM </td>
                    <td>10:00 AM - 12:00 PM </td>
                </tr>
                <tr>Thrursday
                    <td>10:00 AM - 12:00 PM </td>
                    <td>No Schedule </td>
                </tr>
                <tr>Friday
                    <td>10:00 AM - 12:00 PM</td>
                    <td>No Schedule </td>
                </tr>
                <tr>Saturday
                    <td>No Schedule </td>
                    <td>No Schedule </td>
                </tr>
                <tr>Sunday
                        <td>No Schedule </td>
                        <td>No Schedule </td>
                </tr>        
        </table>
        <div class="card mb-4"  style={{padding:'20px', marginBottom: '10px', marginTop:'30px',width:'400px', borderRadius: '20px',boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)' }}>
            <div className="calendar-container">
                <h5 style={{ marginTop:'-5px'}}>Calendar</h5>
                <Calendar
                    onChange={handleDateChange}
                    value={date}
                    className="custom-calendar"
                />
            </div>
        </div>
        <div class="card mb-4"  style={{ marginBottom: '10px', marginTop:'-10px',width:'400px', borderRadius: '20px',boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)' }}>
            <div class="card-body"><canvas ref={chartRef}></canvas></div>
            <div class="card-footer small text-muted">Updated {currentTime}</div>
        </div>
        
            

    </div>
</div>
        
);
}

export default Profile;