/** @format */

// Do Not Remove this comment //
/* global google */

import React, { useEffect } from 'react';
import { geocodeByPlaceId, getLatLng } from 'react-google-places-autocomplete';
import Form from 'react-bootstrap/Form';

/**
 * Name:AutoCompleteInput
 * Desc: Render Google's Autocomplete input
 * @param {string} label
 * @param {string} id
 * @param {string} placeholder
 * @param {string} defaultValue
 *  @param {string} customValue
 * @param {string} predictionType  > types = ["region", "business", "city", "address"]
 * @param {object || {lat:float, lng:float}} center
 * @param {number} radius
 * @param {func} onInputChange
 * @param {func} onSelecOption
 * @param {object} autocompletionRequest
 * @param {object} rest  // optional additional data as per api
 */

const defaultID = 'input_location_autofill' + Math.random();

const AutoCompleteInput = (props) => {
  // Props data
  let {
    customValue,
    autocompletionRequest,
    label,
    id,
    placeholder,
    defaultValue,
    predictionType,
    center,
    radius,
    onInputChange,
    onBlurInput,
    onSelectOption,
    ...rest
  } = props;

  // Input Element props
  label = label || 'Location';
  id = id || defaultID;
  placeholder = placeholder || 'Enter Location';

  let options = {
    componentRestrictions: { country: 'IN' },
    strictBounds: true,
  };

  if (radius) {
    options = { ...options, radius };
  }

  switch (predictionType) {
    case 'city':
      // options = { ...options, types: [ '(cities)' ] };
      options = { ...options, types: [ '(cities)' ] };
      break;

    case 'region':
      options = { ...options, types: [ '(regions)' ] };
      break;

    case 'address':
      options = { ...options, types: [ 'address' ] };
      break;

    case 'business':
      options = { ...options, types: [ 'establishment' ] };
      break;

    default:
      options = { ...options };
  }

  function addDomListner(listener) {
    new google.maps.event.addDomListener(listener, 'keydown', function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
      }
    });
  }

  /* --------------------Remove Listner------------------------------*/
  const _addremoveListner = () => {
    (function(ac) {
      google.maps.places.Autocomplete = function(node, opts) {
        const clone = node.cloneNode(true);
        const pac = new ac(node, opts);
        google.maps.event.addListener(pac, 'remove', function(restore) {
          google.maps.event.clearInstanceListeners(pac);
          google.maps.event.trigger(node, 'blur');
          google.maps.event.clearInstanceListeners(node);
          if (restore === true) {
            node.parentNode.replaceChild(clone, node);
          } else {
            node.parentNode.removeChild(node);
          }
        });
        return pac;
      };
    })(google.maps.places.Autocomplete);
  };
  /* ---------------------------------------------------------------*/

  function loadLocationListner() {
    let input = document.getElementById(id);
    const instance = new google.maps.places.Autocomplete(input, options);
    new google.maps.event.addListener(instance, 'place_changed', function() {
      try {
        if (instance) handlePlaceChanged(instance);
      } catch (e) {
        /* Error */
      }
    });

    if (center && typeof center === 'object' && center !== null) {
      if (center.lat && center.lng) {
        // var defaultBounds = {
        //   north: center.lat + 0.1,
        //   south: center.lat - 0.1,
        //   east:  center.lng + 0.1,
        //   west:  center.lng - 0.1,
        // };

        google.maps.event.trigger(instance, 'remove', true);

        input = document.getElementById(id);
        const autoComplete = new google.maps.places.Autocomplete(input, options);
        const circle = new google.maps.Circle({
          center: new google.maps.LatLng(center.lat, center.lng),
          radius: 15000,
        });
        autoComplete.setBounds(circle.getBounds());

        new google.maps.event.addListener(autoComplete, 'place_changed', function() {
          try {
            if (autoComplete) handlePlaceChanged(autoComplete);
          } catch (e) {
            /* Error */
          }
        });
      }
    }

    addDomListner(input);
  }

  function loadCityListner(autoComplete) {
    const input = document.getElementById(id);
    autoComplete = new google.maps.places.Autocomplete(input, options);

    new google.maps.event.addListener(autoComplete, 'place_changed', function() {
      try {
        if (autoComplete) handlePlaceChanged(autoComplete);
      } catch (e) {
        /* Error */
      }
    });
    addDomListner(input);
  }

  useEffect(() => {
    const resultValue = defaultValue ? defaultValue.replace(/[^a-z]/gi, '') : '';
    document.getElementById(id).value = resultValue || '';
    // document.getElementById(id).value = defaultValue || '';
  }, [ defaultValue, id ]);

  useEffect(() => {
    try {
      _addremoveListner();
      if (predictionType === 'city' && window && window.google ) {
        loadCityListner();
      }
    } catch (e) {
      /* Error */
    }

    // eslint-disable-next-line
   }, []);

  useEffect(() => {
    try {
      if (predictionType !== 'city' && window && window.google) {
        loadLocationListner();
      }
    } catch (e) {
      /* Error */
    }

    // eslint-disable-next-line
   }, [center]);

  // To get City
  const _getCity = async ({ place_id }) => {
    try {
      const results = await geocodeByPlaceId(place_id);
      const selectedCityName =
            results[ 0 ].address_components[ 0 ].long_name ||
            results[ 0 ].address_components[ 0 ].short_name;
      if(selectedCityName.length) props.changeCityState();
      return selectedCityName || '';
    } catch (e) {
      /* Error*/
    }
  };

  // To get Longitude/Latitude
  const _getLatLng = async ({ place_id }) => {
    try {
      const results = await geocodeByPlaceId(place_id);
      const data = await getLatLng(results[ 0 ]);
      return data || {};
    } catch (e) {
      /* Error */
    }
  };

  // To get full location
  const _getLocation = ({ formatted_address, name }) => {
    if (formatted_address?.includes(name)) {
      // if(props.changeLocationState === 'function') {
        // props.changeLocationState();
        // props.changeCityState();
      // }
      return formatted_address;
    }  
    else return `${ name || '' }, ${ formatted_address || '' }`;
  };

  // To get full location
  // const _getLocation = ({ formatted_address, name }) => {
  //   if (formatted_address.includes(name)) return formatted_address;
  //   else return `${ name || '' }, ${ formatted_address || '' }`;
  // };

  // Call On Select Location/Place.
  const handlePlaceChanged = async (event) => {
      
    const place = event.getPlace();
    const city = await _getCity(place);
    const latlng = await _getLatLng(place);
    const location = await _getLocation(place);

    if (onSelectOption) { 
      // let results = await getLocationByGeoCode({ place });
      // console.log("map component results:", results);
      await onSelectOption({ city, latlng, location, data: place });
    }
  };

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="text"
        id={ id }
        autoComplete="off"
        autoFill="off"
        placeholder={ placeholder }
        value={ customValue }
        onKeyPress={(e)=>{
          if (/[0-9]/.test(e.key)) {
            e.preventDefault()
          }
        }}
        onBlur={()=>{
          if(onBlurInput)
          onBlurInput()
        }}
        onChange={ (e) => {
          const result = e.target.value.replace(/[^a-z]/gi, '');                               
          onInputChange(result)
        }}
        onInput={(e) => {
          loadLocationListner()
        }}
        { ...rest }
      />
    </Form.Group>
  );
};

export default AutoCompleteInput;
