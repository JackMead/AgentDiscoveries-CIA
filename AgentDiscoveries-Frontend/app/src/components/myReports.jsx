import * as React from 'react';
import SearchResult from './search-forms/search-result';
import QueryString from 'query-string';
import {apiGet} from './utilities/request-helper';

export default class myReports extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            results: [],
            agentId: window.localStorage.getItem('AgentId')
            //callSign: "Test Fox"

        };
    }

    componentDidMount() {
        this.loadEntities();
    }

    render() {

        return (
            <SearchResult results={this.state.results} isPersonal={true}/>
        );

    }

    loadEntities(){

        const param = {
            agentId: this.state.agentId
            //callSign: this.state.callSign
        };

        const url = 'reports/locationstatuses?' + QueryString.stringify(param);

        apiGet(url)
            .then(results => this.setState({ results: results, message: {} }))
            .catch(error => this.setState({ message: { message: error.message, type: 'danger' } }));

    }

}

