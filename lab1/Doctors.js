
const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost:27017/DrAppointment')
  .then(()=>{
    console.log("mongodb connected")
  })
   .catch(()=>{
    console.log("failed")
   })

const DoctorSchema = new mongoose.Schema({
    name: String,
    specialist: String,
    bio: String,
    schedule: String,
    clinics: String,
    email: {
        type:  String,
        required: true
    },
    password: {
        type:  String,
        required: true
    }
})

const DoctorModel = mongoose.model("doctors", DoctorSchema);

module.exports = DoctorModel;
