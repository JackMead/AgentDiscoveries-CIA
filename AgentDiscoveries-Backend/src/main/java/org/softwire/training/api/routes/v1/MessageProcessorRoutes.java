package org.softwire.training.api.routes.v1;

import org.softwire.training.api.core.JsonRequestUtils;
import org.softwire.training.api.core.MessageProcessor;
import org.softwire.training.models.Message;
import spark.Request;
import spark.Response;

import javax.inject.Inject;

public class MessageProcessorRoutes {
    private Request req;
    private Response res;
    private MessageProcessor messageProcessor;

    @Inject
    public MessageProcessorRoutes( ) {
        this.messageProcessor = new MessageProcessor();
    }

    public Message EncryptMessage(Request req, Response res) {
        Message message = JsonRequestUtils.readBodyAsType(req, Message.class);
        messageProcessor.encrypt(message);
        return message;
    }

    public Message DecryptMessage(Request req, Response res) {
        Message message = JsonRequestUtils.readBodyAsType(req, Message.class);
        messageProcessor.decrypt(message);
        return message;
    }
}
