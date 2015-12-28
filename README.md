## react-native-progressbar

A solution to interface with `seekToTime` for [react-native-video](https://github.com/brentvatne/react-native-video)

Requires are same as `react-native-video`

### Add it to your project

directly download the zip and put the `ProgressBar.js` anyway you prefer in your project

## Usage

```javascript
// Assuming you have put ProgressBar.js in the same folder as
// your other component

var ProgressBar = require('./ProgressBar');

// Within your render function, assuming you have <Video> View 
// You can include following code into <Video>

<ProgressBar
	currentTime = {this.state.currentTime}	
	duration = {this.state.duration}
	startSeekVideo = {this.startSeekVideo}
	endSeekVideo = {this.endSeekVideo}
	styles = {
        full_progress_bg: 'Your_Color',
        active_progress_bg: 'Your_Color',
        bar_width: Your_Width, 
        bar_height: Your_Height,
  }
/>

// Later you have to implement your startSeekVideo 
// and endSeekVideo function in the react native class

startSeekVideo() {
	// doing something when you start seeking video
	// recommend to pause video by calling this.setState({paused: true})
	...
}

endSeekVideo() {
	// doing something once you select a new time on progress bar
	// now you can resume video if you have paused video before
	
}






```

