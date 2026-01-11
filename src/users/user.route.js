const express = require('express')
const User = require('./user.model')
const jwt = require('jsonwebtoken')

const router = express.Router()

const JWT_SECRET = process.env.JWT_SECRET_KEY

router.post("/admin", async (req, res) => {
    const { username, password} = req.body;
    try {
       const admin = await User.findOne({username})
       if(!admin) {
         return res.status(404).send({message: "Admin not found!"})
       }

       if (admin.password !== password) {
         res.status(401).send({
    message: "invalid password" });
       }
       if(admin.password !== password) {
        res.status(401).send({message: "invalid password"})
       }
       const token = jwt.sign(
        {id: admin._id, username: admin.username, role: admin.role},
        JWT_SECRET,
        {expiresIn: "12h"}
       )

       return res.status(200).json({
        message: "Authentication successful",
        token: token,
        user: {
            username: admin.username,
            role: admin.role
        },
       })

    } catch (error) {
        console.error("failed to login as admin", error)
        return res.status(500).send({message: "failed to login as admin"})
    }
})

module.exports = router