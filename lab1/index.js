const express = require('express')
const mongoose = require('mongoose')
const PatientModel = require('./Patients')
var cors = require('cors')

const app = express()
const port = 3001
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/DrAppointment', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
.then(db => console.log('DB is connected'))
.catch(err => console.log(err));

app.get('/', (req, res) => {
  PatientModel.find()
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

app.get('/get/:id', (req, res) => {
  const id = req.params.id
  PatientModel.findById({_id : id})
    .then (post => res.json(post))
    .catch (err => console.log(err))
})

app.post('/create', (req, res) => {
  PatientModel.create(req.body)
  .then(user => res.json(user))
  .catch(err => res.json(err))
})

app.put('/update/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = {
    patientname: req.body.patientname,
    age: req.body.age,
    gender: req.body.gender,
    contactnum: req.body.contactnum,
    email: req.body.email,
    preferred_clinic: req.body.preferred_clinic,
    appointment_date: req.body.appointment_date,
    appointment_time: req.body.appointment_time,
    reason: req.body.reason,
    status: req.body.status,
    note: req.body.note
  };

  PatientModel.findByIdAndUpdate(id, updatedData, { new: true })
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

app.delete('/deleteuser/:id', (req, res) => {
  const id = req.params.id;

  PatientModel.findByIdAndDelete({_id : id})
    .then (response => res.json(response))
    .catch(err => res.json(err))

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


