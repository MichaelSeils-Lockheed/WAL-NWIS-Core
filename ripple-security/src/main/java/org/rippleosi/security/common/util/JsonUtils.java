package org.rippleosi.security.common.util;

import java.io.IOException;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public final class JsonUtils {

    private static final Logger LOGGER = LoggerFactory.getLogger(JsonUtils.class);

    private JsonUtils() {
        // prevent construction
    }

    public static JsonNode extractJsonFromString(final String rawJson) {
        final ObjectMapper mapper = new ObjectMapper();
        JsonNode rootNode = null;

        try {
            rootNode = mapper.readTree(rawJson);
        }
        catch (final IOException e) {
            LOGGER.warn("Failed to convert JSON string to a node for reuse.");
        }

        return rootNode;
    }
}