import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { term: '' };
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  handleTermChange(event) {
    this.setState({
      term: event.target.value
    });
  }

  search(event) {
    event.preventDefault();
    this.props.onSearch(this.state.term);
  }

  render() {
    return (
      <div className="SearchBar">
        <form onSubmit={this.search}>
          <input
            type="text"
            placeholder="Enter A Song, Album, or Artist"
            onChange={this.handleTermChange}
          />
        </form>
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
