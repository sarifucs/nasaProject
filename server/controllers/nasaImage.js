const NasaImage = require('../models/NasaImage');
const User = require('../models/User');

const getAllNasaImagesByUserId = async (req, res, _id) => {
    try {
        let nasaImages = await NasaImage.find({ userId: _id });
        res.status(200).json({ nasaImages: nasaImages });
    } catch (error) {
        res.status(500).send(error);
    }
}
const postNasaImageByUserId = async (req, res) => {
    try {
        console.log(req.params.userId)
        let nasaImage = await NasaImage.findOne({url: req.body.url});
        let user = await User.findById(req.params.userId);
        if (nasaImage == null) {//image not exist
            nasaImage = await new NasaImage(req.body);
            await nasaImage.save();
            await NasaImage.findByIdAndUpdate(nasaImage._id, { $push: { userId: req.params.userId } });
            await User.findByIdAndUpdate(user._id, { $push: { nasaImages: nasaImage._id } });
            res.status(200).send(true);
        } else {
            let help = true;
            console.log("else")
            let nasaImagesForUser = user.nasaImages;
            // if (nasaImagesForUser != [])
            nasaImagesForUser.forEach(imageId => {
                if (imageId == (nasaImage._id).toString()) {//user not have the image
                    console.log("if")
                    res.status(200).send(true);
                    help = false;
                }
            });
            if (help) {
                await NasaImage.findByIdAndUpdate(nasaImage._id, { $push: { userId: req.params.userId } });
                await User.findByIdAndUpdate(user._id, { $push: { nasaImages: nasaImage._id } });
                res.status(200).send(true);
            }
        }
    } catch (error) {
        res.status(500).send(error._message);
    }
}
const deleteNasaImageByUserId = async (req, res) => {
    try {
        console.log("-----------delete")
        let nasaImage = await NasaImage.findOne({ url: req.body.url });
        console.log(nasaImage)
        let user = await User.findById(req.params.userId);
        console.log(user)
        console.log(await NasaImage.findByIdAndUpdate(nasaImage._id));
        await NasaImage.findByIdAndUpdate(nasaImage._id, { $pull: { userId: req.params.userId } });
        // await NasaImage.save();
        await User.findByIdAndUpdate(user._id, { $pull: { nasaImages: nasaImage._id } });
        // await User.save();
        res.status(200).send(true)
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = { getAllNasaImagesByUserId, postNasaImageByUserId, deleteNasaImageByUserId };