import * as React from 'react';
import {apiGet} from './utilities/request-helper';
import {errorLogAndRedirect} from './error';

import {Table} from 'react-bootstrap';

export default class MostWanted extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mostwanted: []
        };
    }

    getMostWanted() {
        apiGet('mostwanted')
            .then(mostwanted => {
                this.setState({ mostwanted: mostwanted });
            })
            .catch(errorLogAndRedirect);
    }

    componentWillMount() {
        this.getMostWanted();
    }

    render() {
        if(this.state.mostwanted.length === 0){
        return <div></div>;
        }

        return (
            <div  className = "mostwantedtable">
                {
                    this.state.mostwanted.map(wantedIndividual => {
                        return  (
                           <div key={wantedIndividual.title} className = "mostwantedportrait">
                               <h3 className = "mostwanted-title" >{wantedIndividual.title}</h3>
                               <img  className = "mostwanted-image" src = {wantedIndividual.images[0].original}/>
                               <h4 className = "mostwanted-description">{wantedIndividual.description}</h4>
                           </div>
                       );
                    })
                }
            </div>
        );
    }
}
