
const axios = require('axios');

module.exports = async (req, res) => {
    //first check to make sure the password and confirm pass are the same
    if (req.body.password !== req.body.ConfirmPass){
        res.send({error: "passwords do not match"});
    } else {
        // get the data from the request body
        try{
            const mutation = `
            mutation ($email: String!, $username: String!, $password: String!){
                register(email: $email, username: $username, password: $password)
            }
            `

            const { data } = await axios.post(process.env.GRAPQL_ENDPOINT, 
                    {
                        query: mutations,
                        variables: {
                            email: req.body.email,
                            username: req.body.username,
                            password: req.body.password,
                        }
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                )

            const jwtToken = data.data.register

            res.redirect('/')

            } catch(err) {
                res.redirect('/auth/register');
            }
        }
}
