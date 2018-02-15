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
/*
    @Test
    public void readAgentFailsIfAgentDoesNotExist() {
        // Given
        int randomId = 1553;
        String callSign = "aCallSign";
        when(Request.params("user_id")).thenReturn(randomId);

        when(agentsDao.getAgent(callSign)).thenReturn(Optional.empty());

        // When
        FailedRequestException exception = assertThrows(
                FailedRequestException.class,
                () -> agentsRoutes.readAgent(mock(Request.class), response, randomId));

        // Then
        assertEquals(ErrorCode.NOT_FOUND, exception.getErrorCode());
    }

    @Test
    public void readAgentReturnsAgentIfAgentExists() throws FailedRequestException {
        // Given
        String callSign = "aCallSign";
        Agent mockAgent = mock(Agent.class);
        when(agentsDao.getAgent(callSign)).thenReturn(Optional.of(mockAgent));

        // When
        Agent returnedAgent = agentsRoutes.readAgent(mock(Request.class), response, callSign);

        // Then
        assertEquals(mockAgent, returnedAgent);
    }
    */
}
