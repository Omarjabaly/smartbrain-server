

const handleSignin = (req, res, db, bcrypt) => {

	const { email, password } = req.body;

	if (!email || !password) {

		return res.status(400).json('resp server: Please fill all fields');

	} else {

		db.select('email', 'hash').from('login').where('email', '=', email)
		.then(data => {
			const isValid = bcrypt.compareSync(password, data[0].hash);
			if (isValid) {
				return res.json('success')
			} else {
				res.json('wrong credentials')
			}
		})
		.catch(err => res.status(400).json('unable to signin'))

	}


}

module.exports = { handleSignin };