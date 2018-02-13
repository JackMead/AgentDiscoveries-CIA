package org.softwire.training.api.testutils;

import com.google.gson.Gson;
import org.softwire.training.api.core.CustomisedGsonBuilder;
import spark.Request;

import java.nio.charset.Charset;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class RequestGenerationHelper {

    private static Charset REQUEST_CHARSET = Charset.forName("ISO-8859-1");
    private static final Gson GSON = CustomisedGsonBuilder.getGson();

    public static Request makeRequestWithJSONBodyForObject(Object object) {
        Request request = mock(Request.class);

        when(request.bodyAsBytes()).thenReturn(GSON.toJson(object).getBytes(REQUEST_CHARSET));
        when(request.body()).thenReturn(GSON.toJson(object));

        return request;
    }
}
