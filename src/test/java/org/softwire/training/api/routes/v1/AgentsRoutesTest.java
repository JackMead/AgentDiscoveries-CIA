package org.softwire.training.api.routes.v1;

import org.junit.jupiter.api.Test;
import org.softwire.training.api.models.ErrorCode;
import org.softwire.training.api.models.FailedRequestException;
import org.softwire.training.api.testutils.RequestGenerationHelper;
import org.softwire.training.db.daos.AgentsDao;
import org.softwire.training.models.Agent;
import spark.Request;
import spark.Response;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class AgentsRoutesTest {

    private AgentsDao agentsDao = mock(AgentsDao.class);
    private AgentsRoutes agentsRoutes = new AgentsRoutes(agentsDao);
    private Response response = mock(Response.class);

    @Test
    public void createAgentFailsIfAgentIdSpecifiedOnRequest() {
        // Given
        Agent agent = new Agent();
        agent.setAgentId(50);
        agent.setDateOfBirth(LocalDate.now());

        Request request = RequestGenerationHelper.makeRequestWithJSONBodyForObject(agent);

        // When
        FailedRequestException exception = assertThrows(
                FailedRequestException.class,
                () -> agentsRoutes.createAgent(request, response));

        // Then
        assertEquals(ErrorCode.INVALID_INPUT, exception.getErrorCode());
    }

    @Test
    public void createAgentReturnsAgentWithIdOnSuccess() throws FailedRequestException {
        // Given
        int newAgentId = 20;
        Agent agent = new Agent();
        agent.setFirstName("bob");
        agent.setDateOfBirth(LocalDate.now());

        Request request = RequestGenerationHelper.makeRequestWithJSONBodyForObject(agent);
        when(agentsDao.addAgent(any())).thenReturn(newAgentId);

        // When
        Agent returnedAgent = agentsRoutes.createAgent(request, response);

        // Then
        assertEquals(newAgentId, returnedAgent.getAgentId());
        assertEquals(agent.getFirstName(), returnedAgent.getFirstName());
        assertEquals(agent.getDateOfBirth(), returnedAgent.getDateOfBirth());
        verify(response).status(201);
    }

    @Test
    public void readAgentFailsIfAgentDoesNotExist() {
        // Given
        int agentId = 15;
        when(agentsDao.getAgent(agentId)).thenReturn(Optional.empty());

        // When
        FailedRequestException exception = assertThrows(
                FailedRequestException.class,
                () -> agentsRoutes.readAgent(mock(Request.class), response, agentId));

        // Then
        assertEquals(ErrorCode.NOT_FOUND, exception.getErrorCode());
    }

    @Test
    public void readAgentReturnsAgentIfAgentExists() throws FailedRequestException {
        // Given
        int agentId = 15;
        Agent mockAgent = mock(Agent.class);
        when(agentsDao.getAgent(agentId)).thenReturn(Optional.of(mockAgent));

        // When
        Agent returnedAgent = agentsRoutes.readAgent(mock(Request.class), response, agentId);

        // Then
        assertEquals(mockAgent, returnedAgent);
    }
}
