/** @format */

// Do Not Remove this comment //
/* global google */

import { Component } from "react";
import { Map, Marker } from "google-maps-react";

import { getLocationByGeoCode } from "../../common/helpers/Utils";

import MarkerIcon from "../../assets/images/mapMarker-icon.png";

const LAT_LNG = {
   lat: 20.5937,
   lng: 78.9629,
};

// function showError(error, x){
//     switch(error.code){
//         case error.PERMISSION_DENIED:
//             x.innerHTML="User denied the request for Geolocation."
//         break;
//         case error.POSITION_UNAVAILABLE:
//             x.innerHTML="Location information is unavailable."
//         break;
//         case error.TIMEOUT:
//             x.innerHTML="The request to get user location timed out."
//         break;
//         case error.UNKNOWN_ERROR:
//             x.innerHTML="An unknown error occurred."
//         break;
//     }
// }

export class MapComponent extends Component {
   state = {
      showMap: false,
   };

   onMarkerDragEnd = async (coord, t, map) => {
      const { latLng } = coord;
      // const lat = latLng.lat();
      // const lng = latLng.lng();

      let results = await getLocationByGeoCode({ latLng });
      console.log("map component results:", results);
      this.props.onMarkerDragEnd && this.props.onMarkerDragEnd(results);
   };

   componentDidMount() {
      if (window.google && window) {
         this.setState((prevState) => ({
            showMap: true,
         }));
      }
   }

   render() {
      const LatLng =
         this.props.p_lat && this.props.p_lng
            ? { lat: this.props.p_lat, lng: this.props.p_lng }
            : LAT_LNG;
      const containerStyles = this.props.style || {
         width: "100%",
         height: "190px", // Default height
         display: "inline",
         borderRadius: "5px",
      };

      return (
         <>
            <div style={containerStyles}>
               {this.state.showMap && window && window.google ? (
                  <Map
                     google={google}
                     zoom={this.props.p_lat && this.props.p_lng ? 16 : 4}
                     // style={mapStyles}
                     initialCenter={LatLng}
                     defaultCenter={LatLng}
                     defaultZoom={16}
                     center={LatLng}
                  >
                     {LatLng ? (
                        <Marker
                           icon={MarkerIcon}
                           title={this.props.name}
                           name={this.props.name}
                           position={LatLng}
                           draggable={this.props.draggable}
                           onDragend={(t, map, coord) => this.onMarkerDragEnd(coord, t, map)}
                        />
                     ) : null}
                  </Map>
               ) : (
                  <div className="Small TaupeGrey smbold"> Map Loading... </div>
               )}
            </div>
         </>
      );
   }
}

export default MapComponent;
