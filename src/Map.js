import { compose, withProps, withStateHandlers } from "recompose"
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import React from 'react'
import PlacesInfoComponent from './Places'
import SidebarComponent from './Sidebar'
import HeaderComponent from './Header'

//set up Map with React-Google-Maps npm package
export const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAN1YV5D2JI8euHNDkHk1YWsEIEXFDKCbQ",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100vh` }} />,
        mapElement: <div style={{ height: `100%` }} />,
        google: window.google,
    }),
    withStateHandlers(() => ({
        activeMarker: null,
        filteredMarkers: [
            {
                name: 'Oddfellows',
                position: {lat: 32.748817, lng: -96.827393},
            },
            {
                name: 'Pecan Lodge',
                position: {lat: 32.783638, lng: -96.783897},
            },
            {
                name: 'Velvet Taco',
                position: {lat: 32.821712, lng: -96.785355},
            },
            {
                name: 'Meso Maya',
                position: {lat: 32.787830, lng: -96.804909},
            },
            {
                name: 'Perrys Steakhouse and Grille',
                position: {lat: 32.791115, lng: -96.803215},
            }
        ],
        animations: [
            {'Oddfellows': null},
            {'Pecan Lodge': null},
            {'Velvet Taco': null},
            {'Meso Maya': null},
            {'Perrys Steakhouse and Gille': null},
        ],
        markerOpen: false,
        sidebarVisible: false,
        }), {
        onToggleOpen: ({ activeMarker }) => (marker, google) => {
            if (marker) {
                return {activeMarker: new google.maps.Marker({name: marker.name, position: marker.position})};
            } else {
                return {activeMarker: null};
            }
        },
        filterList: ({filteredMarkers, activeMarker}) => markers => ({
            filteredMarkers: markers,
            activeMarker: null,
        }),
        setMarkerOpen: ({markerOpen}) => () => ({
            markerOpen: !markerOpen
        }),
        setSidebar: ({sidebarVisible}) => () => ({
            sidebarVisible: !sidebarVisible,
        }),
        //add bounce effect when marker is clicked from map
        setAnimationInfowindow: ({animations, markerOpen}) => (marker, google) => {
            if(!markerOpen) {
                animations[`${marker.name}`] = google.maps.Animation.BOUNCE;
            }
            return {animations}
        },
        //add bounce effect when marker is clicked from list
        setAnimationClicklist: ({animations, markerOpen}) => (marker, google) => {
            animations[`${marker.name}`] = google.maps.Animation.BOUNCE;
            return {animations}
        },
        //remove bounce effect when marker is not selected
        removeAnimations: ({animations}) => () => ({
            animations: [
                {'Oddfellows': null},
                {'Pecan Lodge': null},
                {'Velvet Taco': null},
                {'Meso Maya': null},
                {'Perrys Steakhouse and Grille': null},
            ],
        }),
    }),
    withGoogleMap
)((props) => {
    const google = props.google;

    //select marker using list
    const clickList = marker => {
        if (props.markerOpen === false) {
            props.onToggleOpen(marker, google);
            props.setMarkerOpen();
            props.setAnimationClicklist(marker, google);
        } else {
            props.onToggleOpen(null);
            props.removeAnimations();
            props.setMarkerOpen();
        }
    }

    return (
        <div className="Map">
            <HeaderComponent
                callback={props.setSidebar}
            />
            {props.sidebarVisible && <SidebarComponent
                markers={props.filteredMarkers}
                callback={clickList}
                filter={props.filterList}
                markerOpen={props.markerOpen}
                setMarkerOpen={props.setMarkerOpen}
            />}
            <GoogleMap
                defaultZoom={14}
                defaultCenter={{
                    lat: 39.759,
                    lng: -104.983
                }}
            >
                {props.filteredMarkers.map(marker => (
                    <Marker
                        key={marker.name}
                        position={marker.position}
                        onClick={() => {
                            if(props.markerOpen === false) {
                                props.onToggleOpen(marker, google);
                                props.setAnimationInfowindow(marker, google);
                                props.setMarkerOpen();
                            }
                        }}
                        animation={props.animations[`${marker.name}`]}
                    ></Marker>
                ))}
                {props.activeMarker && <InfoWindow
                    position={props.activeMarker.position}
                    options={{pixelOffset: new google.maps.Size(0, -35)}}
                    onCloseClick={() => {
                        props.onToggleOpen(null);
                        props.removeAnimations();
                        props.setMarkerOpen();
                    }}
                >
                    <PlacesInfoComponent
                        activeMarker={props.activeMarker}
                        google={google}
                    />
                </InfoWindow>}
            </GoogleMap>
        </div>
    )
})
