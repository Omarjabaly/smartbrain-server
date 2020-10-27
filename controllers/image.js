
import Clarifai from 'clarifai';

export const handleImage = (req, res, db) => {

	const { id } = req.body;
	db('users')
	.where('id', '=', id)
	.increment('count', 1)
	.returning('*')
	.then(data => res.json(data[0]))
	.catch(console.log)
}

export const handleImageUrl = (req, res) => {

	const { inputUrl } = req.body;
	const api = new Clarifai.App({ apiKey: '82fd10651ee34bc88e9953b18595fe19' });
	api.models.predict('e15d0f873e66047e579f90cf82c9882z', inputUrl)
	.then(data => res.json(data))

}

// Updating to ES6 using "import" instead of "require" 
// module.exports = { 
// 	handleImage: handleImage,
// 	handleImageUrl: handleImageUrl 
// };
