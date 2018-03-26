import React from 'react';
import ReactDOM from 'react-dom';
import Map from './map';
import Adapter from 'enzyme-adapter-react-15';

it('renders without crashing', () => {
    const location = {
        street: "Rua Miguel Mentem",
        neighborhood: "Vila Guilherme",
        city: "São Paulo",
        state: "SP",
        cep: "02050-010"
    }
    const close = () => {}

    const div = window.document.createElement("div");

    const script = window.document.createElement("script");

    div.innerHTML += script;

    ReactDOM.render(<Map location={location} closeMap={close} />, div);
    ReactDOM.unmountComponentAtNode(div);
});