package org.softwire.training.api.routes.v1;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.request.HttpRequestWithBody;
import org.apache.http.HttpRequest;
import org.softwire.training.api.core.JsonRequestUtils;
import org.softwire.training.models.LocationStatusReport;
import spark.Request;
import spark.Response;


import javax.inject.Inject;

public class ExternalReportRoutes {

    private final String externalAPIAddress = "http://35.177.80.2/reports";

    private Request req;
    private Response res;

    @Inject
    ExternalReportRoutes() {

    }

    public String forwardReport(Request req, Response res) throws Exception {
        LocationStatusReport locationStatusReport = JsonRequestUtils.readBodyAsType(req, LocationStatusReport.class);
        HttpResponse<String> stringHttpResponse = Unirest.post(externalAPIAddress)
                .header("Accept", "application/json")
                .header("ContentType", "application/json")
                .field("agentId", locationStatusReport.getCallSign())
                .field("reportBody", locationStatusReport.getReportBody())
                .asString();
        res.body(stringHttpResponse.getBody());
        res.status(stringHttpResponse.getStatus());
        return stringHttpResponse.getStatusText();
    }
}
