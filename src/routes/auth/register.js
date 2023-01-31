const { User } = require('../../models');

module.exports = ((req, res) => {
    console.log(req.body);
    //first check to make sure the password and confirm pass are the same
    if (req.body.password !== req.body.ConfirmPass){
        res.send({error: "passwords do not match"});
    }
    // get data from request body
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    user.save();
    res.send(`New User Created - ${user.username}`);
})