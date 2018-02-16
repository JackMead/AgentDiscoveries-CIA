package org.softwire.training.api.routes.v1;

import org.softwire.training.api.core.JsonRequestUtils;
import org.softwire.training.models.Message;
import spark.Request;
import spark.Response;

import javax.inject.Inject;

public class MessageProcessorRoutes {
    private Request req;
    private Response res;

    @Inject
    public MessageProcessorRoutes( ) {
    }

    public Message EncryptMessage(Request req, Response res) {
        System.out.print(req.body());
        Message message = JsonRequestUtils.readBodyAsType(req, Message.class);
        return message;
    }

    public Message DecryptMessage(Request req, Response res) {
        Message message = JsonRequestUtils.readBodyAsType(req, Message.class);
        return message;
    }
}
