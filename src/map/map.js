import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './map.scss';

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.loadJS = this.loadJS.bind(this);
        this.initMap = this.initMap.bind(this);
        this.state = {
            street: props.location.logradouro,
            neighborhood: props.location.bairro,
            city: props.location.localidade,
            state: props.location.uf,
            cep: props.location.cep
        }
    }

    loadJS(src) {
        let ref = window.document.getElementsByTagName("script")[0];
        let script = window.document.createElement("script");
        script.src = src;
        script.async = true;
        ref.parentNode.insertBefore(script, ref);
    }

    componentWillMount() {
        window.initMap = this.initMap;
        if(typeof window.google === 'object' && typeof window.google.maps === 'object') {
            this.initMap();
        } else {
            this.loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyAVUBIdIO76Cx8-B_oGf2cpYEiD3MmEHW8&callback=initMap');
        }
    }

    initMap() {
        let geocoder = new window.google.maps.Geocoder();

        geocoder.geocode({ 'address': `${this.props.location.logradouro}, ${this.props.location.localidade} - ${this.props.location.cep}` }, (results, status) => {
            if(status === window.google.maps.GeocoderStatus.OK) {
                let map = new window.google.maps.Map(document.querySelector('.map'), {
                    zoom: 15,
                    center: {
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng()
                    },
                    mapTypeId: window.google.maps.MapTypeId.ROADMAP,
                    mapTypeControl: false
                });

                new window.google.maps.Marker({
                    position: {
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng()
                    },
                    map: map
                });
            }
        });
    }
    
    render() {
        return (
            <div className="map-container">
                <h2 className="map-title">{this.state.street}</h2>
                <p>{this.state.neighborhood}</p>
                <p>{this.state.city} - {this.state.state}</p>
                <p>{this.state.cep}</p>
                <button className="map-close" type="button" onClick={this.props.closeMap}>X</button>
                <div className="map"></div>
            </div>
        )
    }
}