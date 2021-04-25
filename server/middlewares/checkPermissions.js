const jwt = require('jsonwebtoken');
const User = require('../models/User');

const encoded = async (_id) => {
    console.log(_id)
    let encodeId = await jwt.sign(_id.toString(), "1234");
    console.log(encodeId)
    console.log(jwt.verify(encodeId,"1234"))
    return encodeId;
}

const decoded = async(req, res, next)=>{
    console.log("decoded")
    console.log(req.body);
    console.log(req.headers)
    let encodedId = req.headers.authorization;
    let userId = await jwt.verify(encodedId, "1234");
    let user = await User.findById(userId);
    console.log(user);
    if (user != null) {
        req.params.userId= user._id;
        next();
    } else {
        res.send("user not found");;
    }
}

// const decoded = async (req, res, next) => {
//     // console.log("decoded")
//     // console.log(req.body);
//     // console.log(req.headers)
//     const token = req.headers.authorization.split(' ')[1];
//     if (token == null)
//         return res.status(401).json({ auth: false, message: 'No token provided' });
//     let userId = await jwt.verify(token, "1234", (err) => {
//         console.log(err)
//         if (err)
//             return res.status(403).json({ auth: false, message: 'failed to authenticate token' });
//     });
//     let user = await User.findById(userId);
//     // console.log(user);
//     if (user != null) {
//         req.params.userId = user._id;
//         next();
//     } else {
//         res.send("user not found");;
//     }
// }

module.exports = { encoded, decoded };