import React, { Component } from 'react';
import '../TrackList/TrackList.css';
import Track from '../Track/Track';

class TrackList extends Component {
  render() {
    return (
      <div className="TrackList">
      {
        this.props.tracks.map(track => {
          return (
          <Track
            key={track.uri}
            track={track}
            onAdd={this.props.onAdd}
            isRemoval={this.props.isRemoval}
            onRemove={this.props.onRemove} />
          );
        })}    
      </div>
    );
  }
}

export default TrackList;
