import { EventEmitter } from 'events';
import { searchAPI } from '../components/crud'
import dispatcher from '../dispatcher'

class AgentStore extends EventEmitter {
    constructor() {
        super()
        this.agents = []
    }

    getAll() {
        console.log(this.agents)
        return this.agents;
    }

    addAgent(agent) {
        this.agents.push(agent)
        this.emit("change")
    }

    updateAllAgents() {
        searchAPI("v1/api/agents", "")
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw "Could not retrieve the Agents"
                }
            })
            .then(response => {
                this.agents = response
                this.emit("change");
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleActions(action) {
        switch (action.type) {
            case "UPDATE_AGENTS": {
                this.updateAllAgents()
            }
        }
    }
}

const agentStore = new AgentStore

export default agentStore
dispatcher.register(agentStore.handleActions.bind(agentStore))