import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
}

search(searchTerm) {
  Spotify.search(searchTerm).then(searchTracks => {
    this.setState({
      searchResults: searchTracks
    });
  });
}

savePlaylist() {
  const playlistUris = this.state.playlistTracks.map(track => track.id);
  Spotify.savePlaylist(this.state.playlistName, playlistUris).then(
    response => {
      if (response) {
        this.setState({
          playlistName: 'New Playlist'
        });
        this.setState({
          playlistTracks: []
        });
      }
    }
  );
}

updatePlaylistName(name) {
  this.setState({
    playlistName: name
  });
}

addTrack(track) {
  let tracks = this.state.playlistTracks;
  if (tracks.find(savedTrack => savedTrack.uri === track.uri)) {
    return alert('This is already in Playlist');
  } else {
    tracks.push(track);
    this.setState({
      playlistTracks: tracks
    });
  }
}

removeTrack(track) {
  let tracks = this.state.playlistTracks;
  tracks = this.state.playlistTracks.filter(
    current => current.id !== track.id
  );
  this.setState({
    playlistTracks: tracks
  });
}

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults}
            onAdd={this.addTrack} />
          <Playlist playlistName={this.state.playlistName}
            playlistTracks={this.state.playlistTracks}
            onRemove={this.removeTrack}
            onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
