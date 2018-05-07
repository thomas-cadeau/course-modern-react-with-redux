import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY_YOUTUBE = 'AIzaSyC93_J29gZGbh4fjbPIxRxNxtWYdWcoRIE';


// create a new component. This component should produce HTML
class App extends Component {

    constructor(props) {
        super(props);

        this.state = {videos: [], selectedVideo: null};
        this.videoSearch('surfboards');

    }

    videoSearch(term) {
        YTSearch({key: API_KEY_YOUTUBE, term}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            }); // = this.setState({ videos: videos });
        });
    }

    render() {
        const videoSearch = _.debounce(term => { this.videoSearch(term)}, 300);
        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos}/>
            </div>
        );
    }

};

//take this component's generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App/>, document.querySelector('.container'));