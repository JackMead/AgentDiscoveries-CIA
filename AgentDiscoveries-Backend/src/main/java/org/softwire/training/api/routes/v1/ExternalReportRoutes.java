package org.softwire.training.api.routes.v1;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import org.apache.commons.configuration2.Configuration;
import org.softwire.training.api.core.JsonRequestUtils;
import org.softwire.training.api.core.PermissionsVerifier;
import org.softwire.training.models.ExternalReport;
import spark.Request;
import spark.Response;

import javax.inject.Inject;

public class ExternalReportRoutes {

    private final Configuration configuration;
    private final PermissionsVerifier permissionsVerifier;

    @Inject
    public ExternalReportRoutes(Configuration configuration, PermissionsVerifier permissionsVerifier){
        this.configuration=configuration;
        this.permissionsVerifier=permissionsVerifier;
    }

    public String forwardReport(Request req, Response res) throws Exception {
        permissionsVerifier.verifyIsAgent(req);
        ExternalReport modelReport = JsonRequestUtils.readBodyAsType(req, ExternalReport.class);
        modelReport.setAgentId(req.attribute("user_id"));
        String jsonString = new ObjectMapper().writeValueAsString(modelReport);

        String externalAPIAddress = configuration.getString("external-api-address");
        HttpResponse<String> stringHttpResponse = Unirest.post(externalAPIAddress)
                .header("Accept", "application/json")
                .header("Content-Type", "application/json")
                .body(jsonString)
                .asString();
        res.status(stringHttpResponse.getStatus());
        return stringHttpResponse.getStatusText();
    }
}