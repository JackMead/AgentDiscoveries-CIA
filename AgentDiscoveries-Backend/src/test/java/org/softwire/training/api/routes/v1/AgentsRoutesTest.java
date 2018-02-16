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
    public void readAgentFailsIfAgentDoesNotExist() {
        // Given
        int userId = 15;
        when(agentsDao.getAgentByUserId(userId)).thenReturn(Optional.empty());
        Request mockRequest = mock(Request.class);
        when(mockRequest.attribute("user_id")).thenReturn(userId);

        // When
        FailedRequestException exception = assertThrows(
                FailedRequestException.class,
                () -> agentsRoutes.readAgent(mockRequest, response, userId));

        // Then
        assertEquals(ErrorCode.NOT_FOUND, exception.getErrorCode());
    }

    @Test
    public void readAgentReturnsAgentIfAgentExists() throws FailedRequestException {
        // Given
        int userId = 15;
        Agent mockAgent = mock(Agent.class);
        when(agentsDao.getAgentByUserId(userId)).thenReturn(Optional.of(mockAgent));

        Request mockRequest = mock(Request.class);
        when(mockRequest.attribute("user_id")).thenReturn(userId);

        // When
        Agent returnedAgent = agentsRoutes.readAgent(mockRequest, response, userId);

        // Then
        assertEquals(mockAgent, returnedAgent);
    }
}