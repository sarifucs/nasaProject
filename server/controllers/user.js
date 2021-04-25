const User = require('../models/User');
const { encoded } = require('../middlewares/checkPermissions');

const createUser = async (req, res) => {
    try {
        let userFromBody= {
            userName: req.body.userName,
            password: req.body.password,
            email: req.body.email
        }
        console.log('-----createUser')
        let user = await User.findOne(userFromBody).populate('nasaImages');;
        console.log(user);
        if (user != null) {
            res.status(200).send(false);
        } else {
            const user = await new User(req.body);
            await user.save();
            let user2 = await User.findOne(userFromBody);
            let encodeId = await encoded(user2._id);
            let newUser = { _id: encodeId, userName: user.userName, password: user.password, email: user.email, nasaImages: user.nasaImages };
            res.status(200).send(newUser);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}
const loginUser = async (req, res) => {
    try {
        console.log("-------loginUser")
        console.log(req.body);
        if (req.body != {}) {
            let user = await User.findOne({
                userName: req.body.userName,
                password: req.body.password,
                email: req.body.email
            }).populate('nasaImages');
            console.log(user)
            if (user == null) {
                res.status(200).send(false);
            } else {
                let encodeId = await encoded(user._id);
                let newUser = { _id: encodeId, userName: user.userName, password: user.password, email: user.email, nasaImages: user.nasaImages };
                res.status(200).send(newUser);
            }
        } else {
            res.status(200).send(false);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}
module.exports = { createUser, loginUser };