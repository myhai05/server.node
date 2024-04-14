const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;//pour controller si les id sont reconnus par la BD

module.exports.getAllUsers = async (req, res) => {//exporter les users
    const users = await UserModel.find().select("-password");//find - touver la table et tout selectionner -password - pour ne jamais renvoyer le password
    res.status(200).json(users);
};

module.exports.userInfo = (req, res) => { //lors de la connexion de l'utilisateur
    console.log(req.params);
    if (!ObjectID.isValid(req.params.id))//va tester si l'id est connu dans la bd
        return res.status(400).send("ID unknown : " + req.params.id);//si cela ne marche pas

    UserModel.findById(req.params.id)//selectioner un user par id
        .select("-password")
        .then(docs => {
            if (docs) {
                res.send(docs); // If the document is found, send it as a response
            } else {
                console.log("ID unknown"); // If the document is not found, log an error
                res.status(404).send("ID unknown");
            }
        })
        .catch(err => {
            console.log("Error: " + err); // Log any errors
            res.status(500).send("Error retrieving user data");
        });
};

module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        // If the ID passed as a parameter is not valid, send a 400 status code with an error message
        return res.status(400).send("ID unknown : " + req.params.id);
    }

    try {
        // Use await to wait for the findOneAndUpdate operation to complete
        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { firstName: req.body.firstName } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        if (!updatedUser) {
            // If no user is found, send a 404 status code with an error message
            return res.status(404).send("User not found");
        }

        // If the user is successfully updated, send the updated user as a response
        res.send(updatedUser);
    } catch (err) {
        // If any error occurs during the operation, send a 500 status code with the error message
        return res.status(500).json({ message: err.message });
    }
};

module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        // If the ID passed as a parameter is not valid, send a 400 status code with an error message
        return res.status(400).send("ID unknown : " + req.params.id);
    }

    try {
        // Use await to wait for the deleteOne operation to complete
        const result = await UserModel.deleteOne({ _id: req.params.id });

        if (result.deletedCount === 0) {
            // If no user is deleted (deletedCount === 0), send a 404 status code with an error message
            return res.status(404).send("User not found");
        }

        // If the user is successfully deleted, send a 200 status code with a success message
        res.status(200).json({ message: "Successfully deleted." });
    } catch (err) {
        // If any error occurs during the operation, send a 500 status code with the error message
        return res.status(500).json({ message: err.message });
    }
};

