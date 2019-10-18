package org.softwire.training.api.models;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class MostWantedWrapper {
    public MostWantedApiModel[] items;
}
