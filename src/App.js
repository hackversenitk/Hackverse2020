import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import * as firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyBke7BqlyFa5PA8mIjG23JfHFmt-R0_jG8",
    authDomain: "hackverse-1579951297563.firebaseapp.com",
    databaseURL: "https://hackverse-1579951297563.firebaseio.com",
    projectId: "hackverse-1579951297563",
    storageBucket: "hackverse-1579951297563.appspot.com",
    messagingSenderId: "98768578088",
    appId: "1:98768578088:web:489508f4709fe575efb71d",
    measurementId: "G-PJ2JH3BBEP"
  };
firebase.initializeApp(firebaseConfig);
const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            location : {lat: 10.021184, lng:72.329720}
        };
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClick = this.onMapClick.bind(this);
    }
    componentDidMount() {
        let locationref = firebase.database().ref().child('location');
        locationref.on('value', snapshot => {
            const location_here = snapshot.val();
            this.setState({location:location_here});
        });
        console.log('DATA RETRIEVED Latitute',locationref);
    }
    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    onMapClick = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };
    render() {
    return (
        <Map
            google={this.props.google}
            zoom={20}
            style={mapStyles}
            center={this.state.location}>
            <Marker
                position = {this.state.location}
                onClick={this.onMarkerClick}
                name={'Current Location'}
            />
            <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                onClose={this.onMapClick}
            >
                <div>
                    <h4>{this.state.selectedPlace.name}</h4>
                </div>
            </InfoWindow>
        </Map>
    );
  }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBHd-Gbs49rEK_1mMloN24KGKabs3-vR9A'
})(MapContainer);