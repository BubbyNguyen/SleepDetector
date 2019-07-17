import axios from 'axios'

class RESTService {
	uploadImage(image_data, callback) {
		axios.post('http://localhost:3000/RecognizeImg', {image_data})
			.then(response => {
				callback(response.data.sleeping);
			})
	}
}

export default new RESTService();
