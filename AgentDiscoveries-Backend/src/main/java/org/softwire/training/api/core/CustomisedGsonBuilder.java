package org.softwire.training.api.core;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonSyntaxException;
import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonToken;
import com.google.gson.stream.JsonWriter;

import java.io.IOException;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class CustomisedGsonBuilder {

    public static Gson getGson() {
        return new GsonBuilder()
                .registerTypeAdapter(LocalDate.class, new LocalDateAdapter())
                .registerTypeAdapter(ZonedDateTime.class, new ZonedDateTimeAdapter())
                .create();
    }

    /**
     * Gson does not have an adapter for LocalDate so expands into an object with day, month, year fields.
     * This adapter allows serializing and derserializing the value as yyyy-mm-dd the ISO standard.
     */
    private static class LocalDateAdapter extends TypeAdapter<LocalDate> {

        @Override
        public void write(JsonWriter jsonWriter, LocalDate localDate) throws IOException {
            jsonWriter.value(localDate.format(DateTimeFormatter.ISO_LOCAL_DATE));
        }

        @Override
        public LocalDate read(JsonReader jsonReader) throws IOException {
            if (jsonReader.peek() == JsonToken.NULL) {
                jsonReader.nextNull();
                return null;
            } else {
                try {
                    return LocalDate.parse(jsonReader.nextString(), DateTimeFormatter.ISO_LOCAL_DATE);
                } catch (DateTimeParseException dateParseException) {
                    throw new JsonSyntaxException(dateParseException);
                }
            }
        }
    }

    /**
     * Gson does not have an adapter for LocalDateTime so expands into an object with day, month, year fields.
     * This adapter allows serializing and derserializing the value as yyyy-mm-ddThh:mm:ss+offset the ISO standard.
     */
    private static class ZonedDateTimeAdapter extends TypeAdapter<ZonedDateTime> {

        @Override
        public void write(JsonWriter jsonWriter, ZonedDateTime localDateTime) throws IOException {
            jsonWriter.value(localDateTime.format(DateTimeFormatter.ISO_OFFSET_DATE_TIME));
        }

        @Override
        public ZonedDateTime read(JsonReader jsonReader) throws IOException {
            if (jsonReader.peek() == JsonToken.NULL) {
                jsonReader.nextNull();
                return null;
            } else {
                try {
                    return ZonedDateTime.parse(jsonReader.nextString(), DateTimeFormatter.ISO_OFFSET_DATE_TIME);
                } catch (DateTimeParseException dateParseException) {
                    throw new JsonSyntaxException(dateParseException);
                }
            }
        }
    }
}
