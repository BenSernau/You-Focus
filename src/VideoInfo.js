import React from "react";

var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");
momentDurationFormatSetup(moment);
const API = 'USE YOUR OWN KEY';

class VideoInfo extends React.Component {
	constructor(props) {
		super();
		this.state = {
			channel: props.channel,
			duration: "",
			thumbnailImg: props.thumbnailImg,
			title: props.title,
			vidId: props.vidId,
			viewable: false
		}

		this.displayDuration = this.displayDuration.bind(this);
		this.content = this.content.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentWillReceiveProps(props) {
		this.setState({
			channel: props.channel,
			duration: "",
			thumbnailImg: props.thumbnailImg,
			title: props.title,
			vidId: props.vidId
		})

		this.componentWillMount();
	}

	componentWillMount() {
		var finalURL = `https://www.googleapis.com/youtube/v3/videos?id=${this.state.vidId}&key=${API}&part=contentDetails`
		fetch(finalURL)
			.then(response => response.json())
			.then(response => {
				this.setState({
					duration: this.displayDuration(response.items[0].contentDetails.duration)
				})
			})
	}

	componentDidMount() {
		this.setState({viewable: true});
	}

	content() {
		return(
			<div className = "vidInfContainer">
				<img className = "tNailImg" src = {this.state.thumbnailImg} alt = "error"/>
				<div className = "vidDetails">
					<h1 className = "vidTitle">{this.state.title}</h1>
					<h2 className = "chanTitle">{this.state.channel} - {this.state.duration}</h2>
				</div>
			</div>
		);
	}

	displayDuration(dur) {
		dur = moment.duration(dur).format('h:mm:ss').padStart(4, '0:0');
		return (dur === "0:00" ? "Live Feed" : dur);
	}

	handleClick() {
		this.props.vidDisplay(this.state.vidId);
	}

	render() {
		return (
			<div onClick = {this.handleClick}>
				{this.state.viewable ? this.content() : <div>loading...</div>}
			</div>
		)
	}
}

export default VideoInfo;
