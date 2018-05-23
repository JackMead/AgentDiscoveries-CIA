package org.softwire.training.api.routes.v1;

import org.softwire.training.api.core.JsonRequestUtils;
import org.softwire.training.api.core.MessageProcessor;
import org.softwire.training.models.Message;
import spark.Request;
import spark.Response;

import javax.inject.Inject;

public class MessageProcessorRoutes {

    private MessageProcessor messageProcessor;

    @Inject
    public MessageProcessorRoutes(MessageProcessor messageProcessor) {
        this.messageProcessor = messageProcessor;
    }

    public Message encodeMessage(Request req, Response res) {
        Message message = JsonRequestUtils.readBodyAsType(req, Message.class);
        String encoded = messageProcessor.encode(message.getMessage());
        return new Message(encoded);
    }

    public Message decodeMessage(Request req, Response res) {
        Message message = JsonRequestUtils.readBodyAsType(req, Message.class);
        String decoded = messageProcessor.decode(message.getMessage());
        return new Message(decoded);
    }
}
