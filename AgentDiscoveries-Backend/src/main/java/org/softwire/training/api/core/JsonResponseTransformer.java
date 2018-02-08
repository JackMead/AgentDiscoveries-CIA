package org.softwire.training.api.core;

        import com.google.gson.Gson;
        import spark.ResponseTransformer;

public class JsonResponseTransformer implements ResponseTransformer {

    private Gson gson = CustomisedGsonBuilder.getGson();

    @Override
    public String render(Object o) {
        return gson.toJson(o);
    }
}
