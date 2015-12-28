## react-native-progressbar

A solution to interface with `seekToTime` for [react-native-video](https://github.com/brentvatne/react-native-video)

Requires are same as `react-native-video`

### Add it to your project

Directly download the zip and put the `ProgressBar.js` anyway you prefer in your project

## Usage

```javascript
// Assuming you have put ProgressBar.js in the same folder as
// your other component

var ProgressBar = require('./ProgressBar');

// Within your render function, assuming you have <Video> View 
// You can include following code into <Video>

<ProgressBar
	currentTime = {this.state.currentTime}	// Required! Pass current time of video
	duration = {this.state.duration}	// Required! pass duration
	startSeekVideo = {this.startSeekVideo}	// Required! Callback when start to seek video
	endSeekVideo = {this.endSeekVideo}	// Required! Callback when end to seek video
	styles = {													// Optional! Set style of progress bar	
        full_progress_bg: 'Your_Color',	// default is "lightblue"
        active_progress_bg: 'Your_Color',	// default is "red"
        bar_width: Your_Width, 	// default is window width
        bar_height: Your_Height,	// default is 50
  }
/>

// Later you have to implement your startSeekVideo 
// and endSeekVideo function in the react native class

startSeekVideo() {

	// doing something when you start seeking video
	// recommend to pause video by calling this.setState({paused: true})

	...

}

endSeekVideo(time) {

	// doing something once you select a new time on progress bar
	// now you can resume video if you have paused video before
	
	...

	// this line is required as it's the way to interface with
	// seek function of react-native-video

	this.refs.myVideo.seek(time);

}


```