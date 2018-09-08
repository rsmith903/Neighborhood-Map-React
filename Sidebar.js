import React, { Component } from 'react';
import './App.css';

class SidebarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: props.markers,
            filteredMarkers: props.markers
        }

        this.filterList = this.filterList.bind(this);
    }

    filterList(e) {
        let filteredMarkers = this.state.markers.filter(marker => 
            marker.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
        this.setState({
            filteredMarkers: filteredMarkers
        });
        this.props.filter(filteredMarkers);
    }

    handleKeyPress(marker, event) {
        if(event.key === 'Enter' || event.key === ' ') {
            this.props.callback(marker);
        }
    }

    render() {
        return (
        <div className="Sidebar">
            <input className="form-control" type="text" placeholder="Filter locations" onChange={this.filterList}/>
            <ul className="list-unstyled">
            {this.state.filteredMarkers.map(marker => (
                <li 
                key={marker.name}
                onClick={() => this.props.callback(marker)}
                onKeyPress={this.handleKeyPress.bind(this, marker)}
                tabIndex={0}
                role="button"
                >
                    {marker.name}
                </li>
            ))}
            </ul>
        </div>
        );
    }
}

export default SidebarComponent;
