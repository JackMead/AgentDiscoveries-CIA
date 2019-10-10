import * as React from 'react';
import {Button, Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Entity from './entity';
import {apiGet} from '../utilities/request-helper';
import {errorLogAndRedirect} from '../error';

export default class Entities extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            entities: []
        };
    }

    componentDidMount() {
        this.loadEntities();
    }

    render() {
        return (
            <div className='col-md-8 col-md-offset-2'>
                <h3>{this.props.api}</h3>
                <Link to={`/admin/${this.props.api}/add`}>
                    <Button type='button'>
                        {`Add ${this.props.api}`}
                    </Button>
                </Link>
                {this.renderTable()}
            </div>
        );
    }

    renderTable () {
        if (this.state.entities.length > 0) {
            return (
                <Table key={this.props.api + '-table'} striped >
                    {this.renderTableHeader()}
                    {this.renderTableBody()}
                </Table>
            );
        }
    }

    renderTableHeader() {
        // Only rendering the table if there is an entity.
        // In this case, use the first to extract the header labels
        const entity = this.state.entities[0];



        return (
            <thead>
                <tr>
                    {Object.keys(entity).map(key => <th key={key}>{key}</th>)}
                </tr>
            </thead>
        );
    }

    renderTableBody() {
        return (
            <tbody>
                {this.state.entities.map(entity => {
                    // Assume the first property is the ID, or at least unique enough to use as a key.
                    const id = Object.values(entity)[0];
                    return <Entity key={id} entity={entity} type={this.props.api} />;
                })}
            </tbody>
        );
    }

    loadEntities() {
        apiGet(this.props.api)
            .then(results => this.setState({ entities: results }))
            .catch(errorLogAndRedirect);
    }
}
