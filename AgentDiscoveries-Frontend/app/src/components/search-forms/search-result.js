
import * as React from "react";

export default class SearchResult extends React.Component {
    render() {
        return (
            <div className="results">
                {this.getResultsHeader(this.props.results)}
                {this.renderResults(this.props.results)}
            </div>
        )
    }

    renderResults(results) {
        var resultsHTML = results.map((result, index) => {
            return (
                <div key={index} id={index} className="col-md-12">
                    <h3 className="search-name">Result {index + 1}</h3>
                    {this.getItemHTML(result)}
                </div>
            )
        })

        return resultsHTML;
    }


    getItemHTML(result) {
        return Object.keys(result).map(key => {
            return <p key={key} id={key}>{`${key}: ${result[key]}`}</p>
        })
    }

    getResultsHeader(results) {
        return results.length > 0 ? (results.length === 1 ? <h3>{`${results.length} result`}</h3> : <h3>{`${results.length} results`}</h3>) : "";
    }
}
