import * as React from 'react';
import {apiGet} from './utilities/request-helper';
import {errorLogAndRedirect} from './error';
import logo from '../../static/wanted.png';
import {Link} from 'react-router-dom';
import mead from '../../static/Jack.jpg';
import bond from '../../static/bond.mp3';

export default class MostWanted extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mostwanted: [],
            showCustom: false
        };
        this.loadCustomWantedPosters = this.loadCustomWantedPosters.bind(this);
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

    loadCustomWantedPosters() {

        this.setState( {
            showCustom: true,
            mostwanted: [
                {
                    title: 'The Smoker',
                    images: [ {original: dan}],
                    description: 'Being good at Frontend programming, vapes huge clouds'
                },
                {
                    title: 'The Ball Kicker',
                    images: [ {original: luan} ],
                    description: 'Known for foosball enthusiasm'
                },
                {
                    title: 'Mdoggy-Dog',
                    images: [ {original: mdog} ],
                    description: 'Last seen putting Rich in his car...'
                },
                {
                    title: 'The Heartbreaker',
                    images: [ {original: mike} ],
                    description: 'Recently known as "The Heartbroken"'
                },
                {
                    title: 'Known alias "Can of Coke, Thor, Viking"',
                    images: [ {original: sandris} ],
                    description: 'Proud of his Li... Lat... heritage'
                },
                {
                    title: 'The Duck',
                    images: [ {original: henry} ],
                    description: 'Using ducks in criminal activity'
                },
                {
                    title: 'The Lint Master',
                    images: [ {original: mead} ],
                    description: 'Ring leader !!  '
                },
            ],
        });
    }


    render() {
        if(this.state.mostwanted.length === 0){
            return <div></div>;
        }

        return (
            <div>
                <img className = 'wantedlogo' src = {logo} onClick = {this.loadCustomWantedPosters}></img>
                <div className = {this.state.showCustom ? 'customtable' :  'mostwantedtable'}>
                    {
                        this.state.mostwanted.map(wantedIndividual => {
                            return  (
                                <div key={wantedIndividual.title} className = {this.state.showCustom ? 'mostwantedportrait customWanted' : 'mostwantedportrait standardWanted'}>
                                    <Link to='/submit/location' target='_blank'>
                                        <h3 className = 'mostwanted-title' >{wantedIndividual.title}</h3>
                                        <img  className = 'mostwanted-image' src = {wantedIndividual.images[0].original}/>
                                        <h4 className = 'mostwanted-description'>{wantedIndividual.description}</h4>
                                    </Link>
                                </div>
                            );
                        })
                    }
                </div>
                {this.state.showCustom ?
                    <audio className = {'audio'} controls autoPlay>
                        <source src={bond} type='audio/mpeg'></source>
                    </audio> : null}
            </div>
        );
    }
}
