package org.softwire.training.api.core;

import com.google.gson.Gson;
import spark.Request;

public class JsonRequestUtils {

    private static Gson gson = CustomisedGsonBuilder.getGson();

    public static <T> T readBodyAsType(Request req, Class<T> classType) {
        String bodyString = req.body();
        return gson.fromJson(bodyString, classType);
    }

    public static String writeJsonString(Object object) {
        return gson.toJson(object);
    }
}
