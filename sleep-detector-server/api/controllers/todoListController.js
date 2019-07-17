const VisualRecognitionV3 = require("watson-developer-cloud/visual-recognition/v3");
const THRESHOLD = 0.85;

const visualRecognition = new VisualRecognitionV3({
	version: "2019-07-01",
	iam_apikey: "qfrTPbYV4DPKzhdsRm6cUnAYq-HnMDZrVYBnel_qzSST"
});

exports.get_image = function (req, res) {
	const imageData = req.body.image_data;
	const base64Data = imageData.replace("data:image/jpeg;base64,", "") + "=";
	const params = {
		images_file: new Buffer.from(base64Data, 'base64'),
		classifier_ids: ["IBMImagesModel_185462427"]
	};

	visualRecognition.classify(params, function (err, response) {
		if (err) {
			console.log(err);
			process.exit();
		}

		let result;
		if (response.images[0].classifiers[0].classes.length > 0) {
			result = response.images[0].classifiers[0].classes[0].score;
		} else {
			result = 0;
		}
		if (result > THRESHOLD) {
			res.json({sleeping: true});
			console.log(result.toFixed(2) + " - CLOSED");
		} else {
			res.json({sleeping: false});
			console.log(result.toFixed(2) + " - OPEN");
		}
	});
};
