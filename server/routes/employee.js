const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const couch = require('../config/dbConnection/couch');

const router = express.Router();

router.use(express.urlencoded({extended: false}));

if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        let image_name = Date.now() + '-' + file.originalname;
        cb(null,image_name);
    }
});

const upload = multer({storage});

//route for inserting employee
router.post('/createEmployee', upload.single('file'), (req, res) => {
    const {first_name, last_name, middle_name, email, phone} = req.body;
    const toCreate = {
        firstName: first_name,
        lastName: last_name,
        middleName: middle_name,
        email: email,
        phoneNumber: phone,
        image: req.file,
    }
    console.log(toCreate)
    try{
        const db = couch.use('employees');
        const response = db.insert(toCreate);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.get('/sample',(req,res)=>{
    res.json({message:'working'});
});

module.exports = router;