import React, { Component } from 'react';
import axios from 'axios';
import Map from '../map/map';
import Error from '../error/error';
import './search.scss';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cep: '',
            location: undefined,
            error: { status: false, message: '' }
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.resetSearch = this.resetSearch.bind(this);
    }

    getUrl(cep) {
        return `https://viacep.com.br/ws/${cep}/json/`;
    }

    handleSearch() {
        let error = { ...this.state.error };
        if(!this.state.cep || this.state.cep === '') {
            error.status = true;
            error.message = 'Insira um cep';
        } else {
            axios.get(this.getUrl(this.state.cep)).then(res => {
                this.resetSearch();
                if(res.data && res.data.erro) {
                    error.status = true;
                    error.message = 'Ocorreu um erro, por favor tente novamente';
                    this.setState({ ...this.state, cep: '', location: undefined, error });
                } else {
                    error.status = false;
                    error.message = '';
                    this.setState({ ...this.state, cep: '', location: res.data, error });
                }
            }, e => {
                error.status = true;
                error.message = 'Ocorreu um erro, por favor tente novamente';
                this.setState({ ...this.state, cep: '', location: undefined, error });
            });
        }
    }
    
    handleChange(e) {
        this.setState({ ...this.state, cep: this.maskCep(e.target.value) });
    }
    
    maskCep(cep) {
        cep = cep.replace(/\D/g,"");
        cep = cep.replace(/^(\d{5})(\d)/, "$1-$2");
        return cep;
    }

    resetSearch() {
        this.setState({ ...this.state, cep: '', location: '' });
    }

    keyHandler = (e) => {
		if(e.key === 'Enter') {
			this.handleSearch();
		}
	}
    
    render() {
        return (
            <div className="search-container">
                <div className="search">
                    <strong className="search-title">Consultar</strong>
                    <label className="search-label">CEP: </label>
                    <input className="search-field" type="tel" placeholder="00000-000" maxLength="9" value={this.state.cep} onKeyUp={this.keyHandler} onChange={this.handleChange} />
                    <button className="search-btn" type="button" onClick={this.handleSearch}>Buscar</button>
                </div>
                { this.state.location ? <Map location={this.state.location} closeMap={this.resetSearch} /> : null }
                { this.state.error.status ? <Error message={this.state.error.message} /> : null }
            </div>
        )
    }
}