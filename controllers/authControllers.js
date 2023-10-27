const Users = require("../models/Users")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;


module.exports = {
    register: async (req, res) => {
        try {
            const {
                username,
                email,
                password,
                roles
            } = req.body
                if(password) var hashedpass = await bcrypt.hash(password, 10);
                const user =  new Users({
                    username: username,
                    email: email,
                    password: hashedpass,
                    roles: roles
                })
                await user.save();
                res.status(200).json("Successfully inserted")
            }

         catch (e) {
            res.status(500).json(e.message)
        }
    },
    login: async (req, res) => {
        try {
            const {
                username,
                password
            } = req.body;
            if(!username) return res.status(401).json("Username's required");
            if(!password) return res.status(401).json("Password's required");
            const user = await Users.findOne({ username: username })
            if (username !== user?.username) return res.status(401).json("Username's invalid")
            const isPassword = await bcrypt.compare(password, user.password)
            if (!isPassword) return res.status(401).json("Password's invalid")
            const token = jwt.sign({ id: user.id }, secret, { expiresIn: "30s" })
            res.status(200).json({ message: "Successfully logged", token })
        } catch (e) {
            res.status(500).json(e)
        }
    }
}