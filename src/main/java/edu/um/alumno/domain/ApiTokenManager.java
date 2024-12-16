package edu.um.alumno.domain;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Optional;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;
import org.springframework.stereotype.Component;

@Component
public class ApiTokenManager {

    private static final String TOKEN_FILE = "apitoken.json"; // Ruta donde se guardará el token
    private final ObjectMapper objectMapper;

    public ApiTokenManager(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public Optional<ApiToken> loadToken() {
        try (FileReader reader = new FileReader(TOKEN_FILE)) {
            JSONObject jsonObject = new JSONObject(new JSONTokener(reader));
            String token = jsonObject.getString("token");
            ApiToken apiToken = new ApiToken();
            apiToken.setToken(token);
            return Optional.of(apiToken);
        } catch (IOException | JSONException e) {
            return Optional.empty();
        }
    }

    public void saveToken(ApiToken apiToken) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("token", apiToken.getToken());

        try (FileWriter file = new FileWriter(TOKEN_FILE)) {
            file.write(jsonObject.toString());
        } catch (IOException e) {
            throw new RuntimeException("Failed to save token", e);
        }
    }
}
