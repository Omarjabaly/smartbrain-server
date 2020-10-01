
const handleParams = (req, res, db) => {

	const { email, password } = req.body;
	db.select().from('users').where('email', '=', email)
	.then(user => {
		if (user[0].id) { return res.json(user[0]) }
		else { return res.json('wrong credentials')
		}
	})
	.catch(console.log)	

}

module.exports = { handleParams };
