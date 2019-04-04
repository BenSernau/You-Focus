import React from "react";



class DurationDisplay extends React.Component {
	constructor(props) {
		super();
		this.state = {
			result: "",
			vidId: props.vidId,
			hours: 0,
			minutes: 0,
			seconds: 0
		}
	}

	render() {
		const API = 'AIzaSyDcTKyHqq5v4gCE4YsMCCdj0NPfaRpVT7g';
		var finalURL = `https://www.googleapis.com/youtube/v3/videos?id=${this.state.vidId}&key=${API}&part=contentDetails`
		fetch(finalURL)
			.then(response => response.json())
			.then(response => {
				var result = response.items[0].contentDetails.duration;
				var hourVal;
				//P3W3DT20H

				this.setState({
					result: result,
					hours: 25,
					minutes: 15,
					seconds: 15
				})

				console.log(result);
			})
		return(
			<div>
				{this.state.result}
			</div>
		)
	}
}

export default DurationDisplay;