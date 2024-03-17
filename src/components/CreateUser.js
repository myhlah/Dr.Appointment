import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateUser(){

    const [patientname, setPatientname] = useState()
    const [preferred_clinic, setPreferred_clinic] = useState()
    const [appointment_date, setAppointment_date]= useState()
    const [appointment_time, setAppointment_time] = useState()
    const [status, setStatus] = useState()
    const [note, setNote] = useState()
    const [errorMessage, setErrorMessage] = useState("")

    
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!patientname || !preferred_clinic || !appointment_date || !appointment_time || !status || !note) {
          setErrorMessage("Please fill in all required fields.");
          return;
        }

        setErrorMessage("");
   
        axios
          .post("http://localhost:3001/create", { patientname, preferred_clinic, appointment_date, appointment_time, status, note})
          .then((res) => {
            console.log(res);
            navigate("/");
          })
          .catch((err) => console.log(err));
      };

    return (
        <div className="d-flex vh-100  justify-content-center align-items-center" style={{backgroundColor:'rgb(199, 225, 234)'}}>
            <div className="w-50 bg-white  p-4 bordered-container1 ">
                <form onSubmit={handleSubmit} style={{margin:'5px'}}>
                    <h2 className="centered-label">Add Appointment</h2>
                    <div className="mb-2">
                        <label htmlFor= "">Patient Name</label>
                        <input
                            type="text"
                            placeholder="Enter Patient Name"
                            className="form-control"
                            onChange={(e) => setPatientname(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                    <label htmlFor= "">Clinic</label>
                    <input
                        type="text"
                        placeholder="Enter Clinic"
                        className="form-control"
                        onChange={(e) => setPreferred_clinic(e.target.value)}
                    />
                    </div>
                    <div className="mb-2">
                    <label htmlFor= "">Appointment Date</label>
                    <input
                        type="text"
                        placeholder="Enter Date"
                        className="form-control"
                        onChange={(e) => setAppointment_date(e.target.value)}
                    />
                    </div>
                    <div className="mb-2">
                        <label htmlFor= "">Appointment Time</label>
                        <input
                            type="text"
                            placeholder="Enter Time"
                            className="form-control"
                            onChange={(e) => setAppointment_time(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                    <label htmlFor= "">Status</label>
                    <input
                        type="text"
                        placeholder="Enter Status"
                        className="form-control"
                        onChange={(e) => setStatus(e.target.value)}
                    />
                   </div>
                   <div className="mb-2">
                    <label htmlFor= "">Note</label>
                    <input
                        type="text"
                        placeholder="Enter Note"
                        className="form-control"
                        onChange={(e) => setNote(e.target.value)}
                    />
                   </div><br></br>
                    {errorMessage && <div className="text-danger mb-2">{errorMessage}</div>}
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-success me-2" style={{ width: "100px", height: "30px", fontSize: "12px" }} onClick={handleSubmit}>
                            Submit
                        </button>
                        <button className="btn btn-secondary me-2" style={{ width: "100px", height: "30px", fontSize: "12px" }} onClick={() => navigate("/dashboard")}>
                            Back
                        </button>
                    </div>
                </form>
             </div>
        </div>
    )
}

export default CreateUser;