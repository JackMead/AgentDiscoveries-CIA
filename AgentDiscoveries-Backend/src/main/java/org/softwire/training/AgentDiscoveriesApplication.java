package org.softwire.training;

import com.google.common.collect.ImmutableList;
import dagger.ObjectGraph;
import org.apache.commons.configuration2.*;
import org.apache.commons.configuration2.builder.FileBasedConfigurationBuilder;
import org.apache.commons.configuration2.builder.fluent.Parameters;
import org.apache.commons.configuration2.convert.DefaultListDelimiterHandler;
import org.apache.commons.configuration2.ex.ConfigurationException;
import org.flywaydb.core.Flyway;
import org.softwire.training.api.core.ExceptionMapper;
import org.softwire.training.api.core.JsonResponseTransformer;
import org.softwire.training.api.models.ErrorCode;
import org.softwire.training.api.models.FailedRequestException;
import org.softwire.training.api.routes.v1.*;
import spark.Request;
import spark.Response;
import spark.ResponseTransformer;

import javax.inject.Inject;
import java.io.File;
import java.util.Timer;
import java.util.TimerTask;

import static spark.Spark.*;


public class AgentDiscoveriesApplication implements Runnable {

    private ResponseTransformer responseTransformer = new JsonResponseTransformer();

    @Inject Configuration config;
    @Inject Flyway flyway;

    @Inject TokenRoutes tokenRoutes;

    @Inject AgentsRoutes agentsRoutes;
    @Inject LocationsRoutes locationsRoutes;
    @Inject RegionsRoutes regionsRoutes;
    @Inject LocationStatusReportsRoutes locationStatusReportsRoutes;
    @Inject RegionSummaryReportsRoutes regionSummaryReportsRoutes;
    @Inject UsersRoutes usersRoutes;
    @Inject ExecutiveSummaryRoutes executiveSummaryRoutes;
    @Inject MessageProcessorRoutes messageProcessorRoutes;
    @Inject ExternalReportRoutes externalReportRoutes;
    @Inject PictureRoutes pictureRoutes;

    @Override
    public void run() {
        // First run any DB migrations as necessary
        flyway.migrate();

        // Configure Java Spark to run server on port 8080
        port(config.getInt("server.port"));

        // Serve the static assets from the frontend project
        staticFileLocation("/frontend");

        // Setup of all the routes
        path("/v1", () -> {
            // Endpoint used to get an authorisation token
            post("/token", tokenRoutes::createToken, responseTransformer);

            path("/api", () -> {
                before("/*", tokenRoutes::validateToken);

                path("/legacy", () -> {
                    before("/*", (request, response) -> response.type("text/plain"));
                    path("/executivesummary", this::executivesSummaryGroup);
                });

                path("/pictures", this::picturesRouteGroup);
                path("/agents", this::agentsRouteGroup);
                path("/regions", this::regionsRouteGroup);
                path("/reports/locationstatuses", () -> reportsRouteGroup(locationStatusReportsRoutes));
                path("/reports/regionsummaries", () -> reportsRouteGroup(regionSummaryReportsRoutes));
                path("/external", this::externalRouteGroup);

                setupBasicEntityCrudRoutes("/locations", locationsRoutes);
                get("/locations", locationsRoutes::readEntities, responseTransformer);
                setupBasicEntityCrudRoutes("/users", usersRoutes);

                post("/decodemessage", messageProcessorRoutes::decodeMessage, responseTransformer);
                post("/encodemessage", messageProcessorRoutes::encodeMessage, responseTransformer);

                // API endpoint to initiate shutdown
                put("/operations/shutdown", this::shutdown);
            });

            ExceptionMapper exceptionMapper = new ExceptionMapper();
            exception(FailedRequestException.class, exceptionMapper::handleInvalidRequestException);

            // Ensure response has appropriate content type
            notFound("{\"errorCode\": \"1005\", \"message\": \"Not found\"}");
            after("/*", (req, res) -> {
                if (res.status() != 204 && res.type() == null) {
                    // If content type not already set to be JSON
                    res.type("application/json;charset=utf-8");
                }
            });
        });

        get("/healthcheck", (req, res) -> "Server started okay!");
    }

    private void executivesSummaryGroup() {
        post("/generate", executiveSummaryRoutes::readExecutiveSummary);
    }

    private void picturesRouteGroup() {
        get("/:id", (req, res) -> pictureRoutes.readProfilePicture(req, res, idParamAsInt(req)));
        put("/:id", (req, res) -> pictureRoutes.updatePicture(req, res, idParamAsInt(req)), responseTransformer);
        delete("/:id", (req, res) -> pictureRoutes.deletePicture(req, res, idParamAsInt(req)), responseTransformer );
    }

    private void agentsRouteGroup() {
        post("", (req, res) -> agentsRoutes.createAgent(req, res), responseTransformer);
        get("/:id", (req, res) -> agentsRoutes.readAgent(req, res, idParamAsInt(req)), responseTransformer);
        put("/:id", (req, res) -> agentsRoutes.updateAgent(req, res, idParamAsInt(req)), responseTransformer);
        delete("/:id", (req, res) -> agentsRoutes.deleteAgent(req, res, idParamAsInt(req)), responseTransformer);
        get("", (req, res) -> agentsRoutes.readAgents(req, res), responseTransformer);
    }

    private void regionsRouteGroup() {
        post("", regionsRoutes::createRegion, responseTransformer);
        get("/:id", (req, res) -> regionsRoutes.readRegion(req, res, idParamAsInt(req)), responseTransformer);
        put("/:id", (req, res) -> regionsRoutes.updateRegion(req, res, idParamAsInt(req)), responseTransformer);
        delete("/:id", (req, res) -> regionsRoutes.deleteRegion(req, res, idParamAsInt(req)), responseTransformer);
        get("", (req, res) -> regionsRoutes.readRegions(req, res), responseTransformer);
    }

    private void reportsRouteGroup(ReportsRoutesBase<?, ?> reportsRoutes) {
        post("", reportsRoutes::createReport, responseTransformer);
        get("/:id", (req, res) -> reportsRoutes.readReport(req, res, idParamAsInt(req)), responseTransformer);
        delete("/:id", (req, res) -> reportsRoutes.deleteReport(req, res, idParamAsInt(req)), responseTransformer);
        get("", reportsRoutes::searchReports, responseTransformer);
    }

    private void externalRouteGroup(){
        post("/reports", externalReportRoutes::forwardReport, responseTransformer);
    }

    private void setupBasicEntityCrudRoutes(String path, EntityCRUDRoutes entityCRUDRoutes) {
        path(path, () -> {
            post("", entityCRUDRoutes::createEntity, responseTransformer);
            get("/:id", (req, res) -> entityCRUDRoutes.readEntity(req, res, idParamAsInt(req)), responseTransformer);
            put("/:id", (req, res) -> entityCRUDRoutes.updateEntity(req, res, idParamAsInt(req)), responseTransformer);
            delete("/:id", (req, res) -> entityCRUDRoutes.deleteEntity(req, res, idParamAsInt(req)), responseTransformer);
            get("", entityCRUDRoutes::readEntities, responseTransformer);
        });
    }

    private int idParamAsInt(Request request) {
        try {
            return Integer.parseInt(request.params("id"));
        } catch (NumberFormatException exception) {
            throw new FailedRequestException(ErrorCode.INVALID_INPUT, "Entity ID was not an integer");
        }
    }

    private String shutdown(Request req, Response res) {
        Timer timer = new Timer();
        TimerTask task = new TimerTask() {
            @Override
            public void run() {
                stop();
            }
        };
        timer.schedule(task, 2000);

        res.status(204);
        return "";
    }

    public static void main(String[] args) {
        // For running the application normally use just the config.properties file
        runAppWithConfiguration(getConfiguration(new File("config.properties")));
    }

    private static void runAppWithConfiguration(Configuration config) {
        // Bootstrap the Dagger object graph and create the application
        ObjectGraph objectGraph = ObjectGraph.create(new AgentDiscoveriesModule(config));
        AgentDiscoveriesApplication app = objectGraph.get(AgentDiscoveriesApplication.class);
        app.run();
    }

    private static Configuration getConfiguration(File configFile) {
        try {
            FileBasedConfigurationBuilder<PropertiesConfiguration> builder = new FileBasedConfigurationBuilder<>(PropertiesConfiguration.class)
                    .configure(new Parameters().properties()
                    .setFile(configFile)
                    .setListDelimiterHandler(new DefaultListDelimiterHandler(',')));

            // Use a composite configuration which checks system properties before using the config file
            // This allows us to override properties by setting properties like '-Dserver.port=5678'
            return new CompositeConfiguration(
                    ImmutableList.of(new SystemConfiguration(), builder.getConfiguration()));
        } catch (ConfigurationException exception) {
            throw new RuntimeException("Invalid configuration", exception);
        }
    }
}
