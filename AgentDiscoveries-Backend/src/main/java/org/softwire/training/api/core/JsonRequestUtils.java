package org.softwire.training.api.core;

import com.google.gson.Gson;
import spark.Request;
import spark.utils.StringUtils;

public class JsonRequestUtils {

    private static Gson gson = CustomisedGsonBuilder.getGson();

    public static <T> T readBodyAsType(Request req, Class<T> classType) {
        String bodyString = req.body();
        return gson.fromJson(bodyString, classType);
    }
}
