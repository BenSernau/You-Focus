import React from "react";

var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");
momentDurationFormatSetup(moment);
const APIKey = 'YOUR KEY HERE';

class VideoInfo extends React.Component {
	constructor(props) {
		super();
		this.state = {
			channel: props.channel,
			duration: "",
			thumbnailImg: props.thumbnailImg,
			title: props.title,
			vidId: props.vidId
		}

		this.displayDuration = this.displayDuration.bind(this);
		this.content = this.content.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentWillReceiveProps(props) {
		var finalURL = `https://www.googleapis.com/youtube/v3/videos?id=${props.vidId}&key=${APIKey}&part=contentDetails`
		fetch(finalURL)
			.then(response => response.json())
			.then(response => {
				this.setState({
					duration: this.displayDuration(response.items[0].contentDetails.duration),
					channel: props.channel,
					thumbnailImg: props.thumbnailImg,
					title: props.title,
					vidId: props.vidId
				})
			})
	}

	componentWillMount() {
		var finalURL = `https://www.googleapis.com/youtube/v3/videos?id=${this.state.vidId}&key=${APIKey}&part=contentDetails`
		fetch(finalURL)
			.then(response => response.json())
			.then(response => {
				this.setState({
					duration: this.displayDuration(response.items[0].contentDetails.duration)
				})
			})
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
				{this.content()}
			</div>
		)
	}
}

export default VideoInfo;
