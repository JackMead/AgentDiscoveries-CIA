import * as React from "react"
import { Table } from 'react-bootstrap'

import Entity from './entity'
import * as LocationActions from '../../actions/locationActions'
import * as RegionActions from '../../actions/regionActions'
import * as AgentActions from '../../actions/agentActions'
import * as UserActions from '../../actions/userActions'

import LocationStore from '../../stores/locationStore'
import RegionStore from '../../stores/regionStore'
import AgentStore from '../../stores/agentStore'
import UserStore from '../../stores/userStore'

export default class Entities extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            api: props.api,
            entities: {
                locations: LocationStore.getAll(),
                regions: RegionStore.getAll(),
                agents: AgentStore.getAll(),
                users: UserStore.getAll()
            },
        }

        this.submitForm = {}

        this.getTable = this.getTable.bind(this)
        this.getTableHeader = this.getTableHeader.bind(this)
        this.getTableBody = this.getTableBody.bind(this)

        this.updateStores = this.updateStores.bind(this)
        this.registerStoreListeners = this.registerStoreListeners.bind(this)
        this.deregisterStoreListeners = this.deregisterStoreListeners.bind(this)

        this.updateLocations = this.updateLocations.bind(this)
        this.updateRegions = this.updateRegions.bind(this)
        this.updateAgents = this.updateAgents.bind(this)
        this.updateUsers = this.updateUsers.bind(this)
    }

    componentWillMount() {
        this.updateStores()
        this.registerStoreListeners()
    }

    componentWillUnmount() {
        this.deregisterStoreListeners()
    }

    componentWillReceiveProps(props) {
        this.setState({
            api: props.api
        })
    }

    render() {
        return (
            <div className="col-md-8 col-md-offset-2">
                <h3>{this.state.api}</h3>
                {this.getTable()}
            </div>
        )
    }
    
    getTable() {
        if (this.state.entities[this.state.api].length > 0) {
            return (
                <Table striped condensed>
                    {this.getTableHeader()}
                    {this.getTableBody()}
                </Table>
            )
        } 
    }

    getTableHeader() {
        let entity = this.state.entities[this.state.api][0]
        return (
            <thead>
                <tr>
                    {Object.keys(entity).map(key => {
                        return <th key={key}>{key}</th>
                    })}
                </tr>
            </thead>
        )
    }

    getTableBody() {
        let entities = this.state.entities[this.state.api]
        return (
            <tbody>
                {Object.values(entities).map(val => {
                    return <Entity entity={val} />
                })}
            </tbody>
        )
    }

    updateStores() {
        LocationActions.updateLocations()
        RegionActions.updateRegions()
        AgentActions.updateAgents()
        UserActions.updateUsers()
    }

    registerStoreListeners() {
        LocationStore.on("change", this.updateLocations)
        RegionStore.on("change", this.updateRegions)
        AgentStore.on("change", this.updateAgents)
        UserStore.on("change", this.updateUsers)
    }

    deregisterStoreListeners() {
        LocationStore.removeListener("change", this.updateLocations)
        RegionStore.removeListener("change", this.updateRegions)
        AgentStore.removeListener("change", this.updateAgents)
        UserStore.removeListener("change", this.updateUsers)
    }

    updateLocations() {
        let entities = this.state.entities
        entities.locations = LocationStore.getAll()
        this.setState({
            entities: entities
        })
    }

    updateRegions() {
        let entities = this.state.entities
        entities.regions = RegionStore.getAll()
        this.setState({
            entities: entities
        })
    }

    updateAgents() {
        let entities = this.state.entities
        entities.agents = AgentStore.getAll()
        this.setState({
            entities: entities
        })
    }

    updateUsers() {
        let entities = this.state.entities
        entities.users = UserStore.getAll()
        this.setState({
            entities: entities
        })
    }
}
