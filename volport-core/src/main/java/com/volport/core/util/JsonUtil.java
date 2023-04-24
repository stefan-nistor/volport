package com.volport.core.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class JsonUtil {

    /**
     * Converts an object to a JSON String
     *
     * @param input {@link Object} any kind of Object
     * @return {@link String} representing JSON of given input
     */

    private static final Logger LOGGER = LoggerFactory.getLogger(JsonUtil.class);

    public static String objectToJsonString(Object input) {
        ObjectMapper mapper = new ObjectMapper();
        String json = "";
        try {
            mapper.findAndRegisterModules();
            json = mapper.writeValueAsString(input);
        } catch (JsonProcessingException e) {
            LOGGER.error("Error processing input {}", e.getMessage());
        }
        return json;
    }
}