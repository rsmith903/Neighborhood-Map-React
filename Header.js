import React, { Component } from 'react';
import './App.css';

class HeaderComponent extends Component {
  render() {
    return (
      <header className="Header">
        <button onClick={this.props.callback} aria-label="menu toggle"><i className="fas fa-bars"></i></button>
      </header>
    );
  }
}

export default HeaderComponent;
