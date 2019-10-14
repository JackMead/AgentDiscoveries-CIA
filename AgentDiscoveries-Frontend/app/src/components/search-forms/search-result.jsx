import * as React from 'react';
import {Panel} from 'react-bootstrap';
import moment from 'moment-timezone';

export default class SearchResult extends React.Component {
    render() {
        return (
            <div className='results'>
                {this.getResultsHeader(this.props.results)}
                {this.renderResults(this.props.results)}
            </div>
        );
    }

    renderResults(results) {
        return results.map((result, index) => {
            return (
                <Panel key={index}>
                    <Panel.Heading>Result</Panel.Heading>
                    <Panel.Body>{this.renderResultBody(result)}</Panel.Body>
                </Panel>
            );
        });
    }

    renderResultBody(result) {
        return Object.keys(result).map(key => {
            if(this.isADate(result[key])){
                const time = moment(result[key]).format();

                return (
                        <div>
                        <p key ={key} id={key}>{`${key}: ${result[key]}`}</p>
                        <p key={key}> timeInSubmittersTimeZone: {time} </p>
                        </div>
                );

            }
            return <p key={key} id={key}>{`${key}: ${result[key]}`}</p>;
        });
    }

    isADate(date){
        date = moment(date)
        return (date.isValid() && (date.year() !== 1970))
    }

    getResultsHeader(results) {
        return results.length > 0
            ? (results.length === 1
                ? <h3>{`${results.length} result`}</h3>
                : <h3>{`${results.length} results`}</h3>)
            : '';
    }
}
