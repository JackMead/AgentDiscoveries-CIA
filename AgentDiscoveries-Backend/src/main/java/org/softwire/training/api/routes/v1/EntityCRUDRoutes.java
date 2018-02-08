package org.softwire.training.api.routes.v1;

        import spark.Request;
        import spark.Response;

public interface EntityCRUDRoutes {

    Object createEntity(Request req, Response res) throws Exception;
    Object readEntity(Request req, Response res, int id) throws Exception;
    Object updateEntity(Request req, Response res, int id) throws Exception;
    Object deleteEntity(Request req, Response res, int id) throws Exception;
}
