import React from 'react';
import Webcam from "react-webcam";
import RESTService from "../middleware/api"
import Sound from 'react-sound';

class ImageViewer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			webcam: null,
			imageData: null,
			sleeping: false
		};
	}

	componentDidMount() {
		this.interval = setInterval(() => this.captureImage(), 2000);
	  }
	  componentWillUnmount() {
		clearInterval(this.interval);
	  }

	setRef = webcam => {
		this.setState({webcam});
	};

	captureImage() {
		const imageData = this.state.webcam.getScreenshot();
		this.setState({imageData});
		RESTService.uploadImage(imageData, this.updateStatus.bind(this));
	}

	updateStatus(sleeping) {
		console.log(sleeping);
		this.setState({sleeping});
	}

	getCurrentImage() {
		return this.state.imageData ?
		<img style={styles.imagePreview} src={this.state.imageData} alt="something went wrong"/> :
		<div style={{...styles.imagePreview, backgroundColor: 'black'}}></div>;
	}

	render() {
	  return(
		<div style = {styles.mainDiv}>
			{
				this.state.sleeping &&
				<Sound
					url='sound.mp3'
					playStatus={Sound.status.PLAYING}
				/>
			}
			<div style = {styles.appName}>Sleep Detector</div>
			<div style = {this.state.sleeping ? styles.statusTextDanger : styles.statusText}>{this.state.sleeping ? 'SLEEPING' : 'AWAKE'}</div>
			<div style = {styles.webCamDiv}>
				<div style = {styles.webCamLiveDiv}>
					<Webcam style = {styles.webCamView} width={'100%'} height={'100%'} ref={this.setRef} screenshotFormat="image/jpeg"/>
				</div>
				{
					this.getCurrentImage()
				}
			</div>
			<button onClick={this.captureImage.bind(this)} style = {styles.photoButton}>Capture photo</button>
		</div>
	  );
	}
}

const styles = {
	mainDiv: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		height: '100vh',
		alignItems: 'center',
		backgroundColor: '#DCDCDC'
	},
	appName: {
		fontSize: '26pt',
		fontWeight: '900',
		marginTop: '2em',
		fontFamily: 'fantasy'
	},
	statusText: {
		color: 'green',
		fontWeight: 'bold',
		margin: '2em',
		fontFamily: 'impact'
	},
	statusTextDanger: {
		color: 'red',
		fontWeight: 'bold',
		margin: '2em',
		fontFamily: 'impact'
	},
	webCamDiv: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
	},
	webCamLiveDiv: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		margin: '2em'
	},
	imagePreview: {
		width: '100%',
		margin: '2em'
	},
	photoButton: {
		width: '10em',
		margin: '0, auto'
	}
};

export default ImageViewer;
