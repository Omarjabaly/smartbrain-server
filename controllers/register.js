
const handleRegister = (req, res, db, bcrypt) => {

		const { name, email, password } = req.body;
		const hash = bcrypt.hashSync(password, 1);

		if (!name || !email || !password) {
			
			return res.status(400).json('resp server: Please fill all fields')
		
		} else {

			db.transaction(trx => {
			trx.insert({
				email: email,
				hash: hash
			})
			.into('login')
			.returning('email')
			.then(loginEmail => {
				return trx.insert({
					name: name,
					email: loginEmail[0],
					joined: new Date()
				})
				.into('users')
				.returning('*')
				.then(data => res.json(data[0]))
				.catch(err => res.status(400).json('unable to register'))
			})
			.then(trx.commit)
			.catch(trx.rollback)
			})
			.catch(err => res.status(400).json('unable to register'))	

		}

}

module.exports = { handleRegister };