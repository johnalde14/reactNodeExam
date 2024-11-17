// employeeController
const couch = require('../config/dbConnection/couch');

exports.createEmployee = (req, res) => {
    const {first_name, last_name, middle_name, email, phone, file} = req.body;
    console.log(file)
    const toCreate = {
        firstName: first_name,
        lastName: last_name,
        middleName: middle_name,
        email: email,
        phoneNumber: phone,
        image: file,
    }
    console.log(toCreate)
    try{
        const db = couch.use('employees');
        const response = db.insert(toCreate);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

exports.sample = (req, res) => {
    console.log('this route is working');
    res.send('this route is working');
}