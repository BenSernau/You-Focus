import React from "react";
import VideoInfo from "./VideoInfo";
import youtube_social_icon_red from "./youtube_social_icon_red.png";

const APIKey = 'YOUR KEY HERE';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			resultYt: [],
			query: "",
			selectionsLoaded: false,
			shouldSubmit: true,
			vidToDisplay: ""
		}

		this.createHeader = this.createHeader.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleVid = this.handleVid.bind(this);
	}

	createHeader() {
		return(
			<header>
				<div className = "logo">
					<img className = "logoImg" src = {youtube_social_icon_red} alt = "error; no pic found"/>
					<h1 className = "youFocusLogo">
						YouFocus
					</h1>
				</div>
				<form onSubmit = {this.state.shouldSubmit ? this.handleClick : e => e.preventDefault()}>
					<input 
						className = "searchBar" 
						placeholder = "Search..." 
						type = "text" 
						value = {this.state.query} 
						onChange = {this.handleChange}
					/>
					<button 
						type = "button" 
						onClick = {this.state.shouldSubmit ? this.handleClick : null} 
						className = "searchButton"
					>
						<span role = "img" aria-label = "Search">
							&#x1F50E;
						</span>
					</button>
				</form>
				<a className = "youTubeLink" href = "https://youtube.com">
					<h1 className = "youFocusLogo">
						YouTube
					</h1>
				</a>
			</header>
		);
	}

	handleChange(event) {
		this.setState({
			query: event.target.value,
			shouldSubmit: true
		});
	}

	handleClick(event) {
		this.setState({vidToDisplay: ""});
		event.preventDefault();
		const finalURL = `https://www.googleapis.com/youtube/v3/search?key=${APIKey}&q=${this.state.query}&order=relevance&type=video&part=snippet&maxResults=50`;
		fetch(finalURL)
			.then(response => response.json())
			.then(response => {
				const resultYt = response.items.map((obj, i) => 
					<VideoInfo 
						key = {i} 
						channel = {obj.snippet.channelTitle} 
						thumbnailImg = {obj.snippet.thumbnails.medium.url} 
						title = {obj.snippet.title.replace(/&#39;/g, "'").replace(/&amp;/g, "&").replace(/&quot;/g, "\"")} 
						vidId = {obj.id.videoId} 
						vidDisplay = {this.handleVid}
					/>
				);
				this.setState({
					resultYt: resultYt
				});
			})
			.then(this.setState({
				selectionsLoaded: true,
				shouldSubmit: false
			})
		)
	}

	handleVid(vid) {
		this.setState({
			vidToDisplay: vid,
			selectionsLoaded: false,
			shouldSubmit: true
		});
	}

	render() {
		if (this.state.resultYt.length === 0 && this.state.selectionsLoaded) {
			return (
				<div>
					{this.createHeader()}
					<div className = "searchResults">
						No Results (Yet)
					</div>
				</div>
			);
		}

		else if (this.state.vidToDisplay === "") {

			if (this.state.resultYt.length === 0) {
				return (
					<div>
						{this.createHeader()}
						<div className = "searchResults">
							{this.state.selectionsLoaded ? this.state.resultYt : null}
						</div>
					</div>
				);				
			}

			else {
				return (
					<div>
						{this.createHeader()}
						<div className = "searchResults">
							{this.state.selectionsLoaded ? this.state.resultYt : null}
							<div className = "endResults">
								End of results. Refine your search!
							</div>
						</div>
					</div>
				);	
			}

		}
		
		else {
			return(
				<div>
					{this.createHeader()}
					<iframe 
						src= {"https://www.youtube.com/embed/" + this.state.vidToDisplay} 
						frameBorder="0" 
						allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
						allowFullScreen = {true}
						title = {this.state.vidToDisplay}>
					</iframe>
				</div>
			);
		}
	}
}

export default App;
