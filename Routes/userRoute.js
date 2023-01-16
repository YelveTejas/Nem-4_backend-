const express = require('express')
const UserRoute = express.Router()
const { Usermodel } = require('../modules/usermodel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

UserRoute.post('/register', async (req, res) => {
    const { name, email, pass, gender } = req.body
    try {
        bcrypt.hash(pass, 5, async (err, hash_password) => {
            if (err) {
                console.log(err)
            }
            else {
                const user = new Usermodel({ name, email, pass: hash_password, gender })
                await user.save()
                res.send('Registered')

            }
        })
    } catch (err) {
        console.log(err)
        res.send('Error while Registering')
    }
})


UserRoute.post('/login', async (req, res) => {
    const { email, pass } = req.body
    try {
        const user = await Usermodel.find({ email })
        console.log(user)
        if (user.length > 0) {
            bcrypt.compare(pass, user[0].pass, (err, result) => {
                if (result) {
                    var token = jwt.sign({ userID:user[0]._id}, 'masai');
                    res.send({ "msg": "Login Successful", "token": token })
                }
                else {
                    res.send('Wrong Credentials')
                }
            })
        }
        else {
            res.send('Login Fail')
        }
    } catch (err) {
        console.log(err)
    }
})




module.exports = {
    UserRoute
}