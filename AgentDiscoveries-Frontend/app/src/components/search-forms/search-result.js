
import * as React from "react";

export default class SearchResult extends React.Component {
    render() {
        return (
            <div className="results">
                {this.renderResults(this.props.results)}
            </div>
        )
    }

    renderResults(results) {
        var resultsHTML = results.map((result, index) => {
            return (
                <div key={index} id={index}>
                    <h3 className="search-name">Result {index + 1}</h3>
                    {this.getItemHTML(result)}
                </div>
            )
        })

        return resultsHTML;
    }


    getItemHTML(result) {
        return Object.keys(result).map(key => {
            return <p key={key} id={key}>{key + ": " + result[key]}</p>
        })
    }
}