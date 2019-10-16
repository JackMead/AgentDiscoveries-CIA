import * as React from 'react';
import {Panel} from 'react-bootstrap';
import moment from 'moment-timezone';
import {Button} from 'react-bootstrap';
import Link from 'react-router-dom/Link';

export default class SearchResult extends React.Component {

    //constructor




    render() {

        return (
            <div className='results'>
                {this.getResultsHeader(this.props.results)}
                {this.renderResults(this.props.results)}
                {this.renderEditButton()}
            </div>
        );
    }

    renderResults(results) {

        console.log("results")
        console.log(results)



        return results.map((result, index) => {

                const url = '/submit/location/edit/' + results[index].reportId
                console.log("url")
                console.log(url)

                console.log("index")
                console.log(index)

                if (this.props.isPersonal){
                    return (
                    <Panel key={index}>
                        <Panel.Heading>Result</Panel.Heading>
                        <Panel.Body>{this.renderResultBody(result)}</Panel.Body>
                        <Panel.Body>
                                   <Link to={url}>
                                       <Button type='button'>Edit</Button>
                                   </Link>
                        </Panel.Body>
                    </Panel>
                    );
                } else {
                    return (
                    <Panel key={index}>
                        <Panel.Heading>Result</Panel.Heading>
                        <Panel.Body>{this.renderResultBody(result)}</Panel.Body>
                    </Panel>
                    );
                }
        });
    }

    renderResultBody(result) {
        return Object.keys(result).map((key) => {

            if(this.isADate(result[key])){
                const time = moment(result[key]).format('H:mm:ss');

                return (
                    <div key={key}>
                        <p id={key}>{`${key}: ${result[key]}`}</p>
                        <p id={key}> Reporter's Local Time: {time} </p>
                    </div>
                );
            }

            return <p key={key} id={key}>{`${key}: ${result[key]}`}</p>;
        });
    }

    isADate(date){
        date = moment(date);
        return (date.isValid() && (date.year() !== 1970));
    }

    getResultsHeader(results) {
        return results.length > 0
            ? (results.length === 1
                ? <h3>{`${results.length} result`}</h3>
                : <h3>{`${results.length} results`}</h3>)
            : '';
    }

    renderEditButton() {
    }
}
