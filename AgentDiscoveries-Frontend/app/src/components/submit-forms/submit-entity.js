import * as React from "react"
import {
    Form,
    FormGroup,
    FormControl,
    Button,
    ControlLabel
} from "react-bootstrap"
import { handleEntitySubmit } from "./submit-utilities"
import { Message } from "../message"
import { CreateLocation } from "./location-form"
import { CreateRegion } from "./region-form"
import { CreateAgent } from "./agent-form"
import { CreateUser } from "./user-form"

import * as LocationActions from '../../actions/locationActions'
import * as RegionActions from '../../actions/regionActions'
import * as AgentActions from '../../actions/agentActions'
import * as UserActions from '../../actions/userActions'

import LocationStore from '../../stores/locationStore'
import RegionStore from '../../stores/regionStore'
import AgentStore from '../../stores/agentStore'
import UserStore from '../../stores/userStore'

export default class EntitySubmit extends React.Component {

    constructor() {
        super()

        this.state = {
            api: "locations",
            entities: {
                locations: [],
                regions: [],
                agents: [],
                users: []
            },
            message: { "message": "", "type": "danger" },
        }
        this.submitForm = {}
        this.apiForms = []

        this.onSubmit = this.onSubmit.bind(this)
        this.onSelectApi = this.onSelectApi.bind(this)

        this.setUpEntityForms = this.setUpEntityForms.bind(this)
        this.updateStores = this.updateStores.bind(this)
        this.registerStoreListeners = this.registerStoreListeners.bind(this)
        this.deregisterStoreListeners = this.deregisterStoreListeners.bind(this)

        this.updateLocations = this.updateLocations.bind(this)
        this.updateRegions = this.updateRegions.bind(this)
        this.updateAgents = this.updateAgents.bind(this)
        this.updateUsers = this.updateUsers.bind(this)
    }
    
    componentWillMount() {
        this.setUpEntityForms()
        this.updateStores()
        this.registerStoreListeners()
    }

    componentWillUnmount() {
        this.deregisterStoreListeners
    }

    render() {
        return (
            <div className="col-md-8 col-md-offset-2">
            
                <Message message={this.state.message} />

                <Form onChange={this.onSelectApi}>
                    <FormGroup>
                        <ControlLabel>Api</ControlLabel>
                        <FormControl componentClass="select"
                            placeholder="select"
                            inputRef={api => this.state.api = api}>
                            {this.getFormApiOptions()}
                        </FormControl>
                    </FormGroup>
                </Form>

                {this.state.form}
            </div>
        )
    }

    getFormApiOptions() {
        return Object.keys(this.apiForms).map(key => {
            return <option key={key} value={key}>{key}</option>
        })
    }

    onSelectApi(e) {
        e.preventDefault()
        this.setState({
            form: this.apiForms[this.state.api.value],
            message: { message: "", type: "danger" }
        })
    }

    onSubmit(e) {
        e.preventDefault()
        handleEntitySubmit(`/v1/api/${this.state.api.value}`, this.submitForm)
            .then(response => this.setState({ message: { message: "Entity created successfully", type: "info" } }))
            .catch(error => this.setState({ message: { message: error, type: "danger" } }))
    }

    setUpEntityForms() {
        this.apiForms = {
            locations: <CreateLocation submitForm={this.submitForm} onSubmit={this.onSubmit} />,
            regions: <CreateRegion submitForm={this.submitForm} onSubmit={this.onSubmit} />,
            users: <CreateUser submitForm={this.submitForm} onSubmit={this.onSubmit} />,
            agents: <CreateAgent submitForm={this.submitForm} onSubmit={this.onSubmit} entities={this.state.entities}/>
        }
        this.setState({ form: this.apiForms[this.state.api] })
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
