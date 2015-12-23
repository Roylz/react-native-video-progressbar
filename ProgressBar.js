'use strict';

const React = require('react-native');
const Dimensions = require('Dimensions');

const {
  PanResponder,
  StyleSheet,
  View,
} = React;

const {
  width,
  height,
} = Dimensions.get('window');

const ProgressBar = React.createClass({

  _panResponder: {},
  _background: 'red',
  _processStyle: {},
  progress: (null : ?{ setNativeProps(props: Object): void }),

  propTypes: {
    currentTime: React.PropTypes.number.isRequired,
    duration: React.PropTypes.number.isRequired,
    startSeekVideo: React.PropTypes.func.isRequired,
    endSeekVideo: React.PropTypes.func.isRequired,
  },

  getDefaultProps(){

    return {
      currentTime: -0.01,
      duration: 0.0,
      startSeekVideo: () => {

        // callback for video to do something while users start seeking video;
        // suggest to pause video; 
        // e.g. setState({paused: true}) in callback function of video component

      },
      endSeekVideo: (time) =>{

        // callback for video to do something when users finish seeking video;
        // seek(time) function is required;
        // if users paused video at startSeekVidoe, this is the place to resume video
        
      },
      styles: {
        full_progress_bg: 'lightblue',
        active_progress_bg: 'red',
        bar_width: width, 
        bar_height: 50,
      }
    }

  },

  componentWillMount() {

    // init panResponder

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderTerminate,
    });

    this._processStyle = {
      style: {
        width: 0,
      }
    }
  },

  componentWillReceiveProps(nextProps) {

    this._processStyle.style.width = width * this._getProgressPercentage(nextProps.currentTime, nextProps.duration)    
    
    //update only if user select new time point

    if(nextProps.currentTime !== this.props.currentTime){
      this._updateProgress();
    }

  },

  componentDidMount() {

    this._updateProgress();

  },

  render() {

    return (
      <View style = {styles.container }>

        <View
          style = {[ 
            styles.progressContainer, 
            { 
              'width': this.props.styles.barWidth,
              'height': this.props.styles.bar_height,
              'backgroundColor': this.props.styles.full_progress_bg
            }
          ]}
          {...this._panResponder.panHandlers}>

          <View
            ref = { (progress) => {
              this.progress = progress;
            } }
            style = {[ 
              styles.rect, 
              { 
                'backgroundColor': this.props.styles.active_progress_bg,
                'height': this.props.styles.bar_height,
              } 
            ]}
            {...this._panResponder.panHandlers}>
          </View>

        </View>

      </View>
    );

  },

  _updateProgress() {

    //update progress bar position

    this.progress && this.progress.setNativeProps(this._processStyle);

  },

  _handleStartShouldSetPanResponder(e: Object, gestureState: Object): boolean {
    // set true become active when users press down on the processbar.
    // set false to disable

    return true;

  },

  _handleMoveShouldSetPanResponder(e: Object, gestureState: Object): boolean {
    // set true become active when users move a touch over the processbar.
    // set false to disable

    return true;

  },

  _handlePanResponderGrant(e: Object, gestureState: Object) {

    //users first press down on the processbar

    //this.props.startSeekVideo();
    this._processStyle.style.width = gestureState.x0;
    this._updateProgress();
  },

  _handlePanResponderMove(e: Object, gestureState: Object) {

    //users move over the process bar without release the press.

    this._processStyle.style.width = gestureState.moveX;
    this._updateProgress();
  },

  _handlePanResponderEnd(e: Object, gestureState: Object) {

    //users release the press from the actived progress bar

    var time = this._getProgressPercentage(this._processStyle.style.width, width) * this.props.duration;
    //this.props.endSeekVideo(time);
  },

  _handlePanResponderTerminate(e: Object, gestureState: Object) {

    //users release the press from other place instead of the actived progress bar

  },

  _getProgressPercentage(current, total){

    if(current > 0){
      return parseFloat(current) / parseFloat(total);
    } else {
      return 0;
    }

  },

})

const styles = StyleSheet.create({
  container: {
    top: 100,
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  rect: {
    borderWidth: 1,
    borderColor: 'black',
    position: 'absolute',
  },
  rect1: {
    height: 15,
    position: 'absolute',
  },
  progressContainer: {
    borderColor: 'green',
    borderWidth: 1,
  },
  time: {
    position: 'absolute',
    fontSize: 10,
    right: 0,
  }
});

module.exports = ProgressBar;