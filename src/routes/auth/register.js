const { User } = require('../../models');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    //first check to make sure the password and confirm pass are the same
    if (req.body.password !== req.body.ConfirmPass){
        res.send({error: "passwords do not match"});
    }
    // get data from request body
    const { username, email, password } = req.body;
    // hash the passwprd before creating user
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: passwordHash });
    user.save();
    res.send(`New User Created - ${user.username}`);
}