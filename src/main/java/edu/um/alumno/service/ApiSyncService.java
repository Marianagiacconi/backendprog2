package edu.um.alumno.service;

import edu.um.alumno.domain.ApiToken;
import edu.um.alumno.domain.ApiTokenManager;
import edu.um.alumno.domain.AuthResponse;
import edu.um.alumno.service.dto.DispositivoDTO;
import java.io.FileWriter;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Service
public class ApiSyncService {

    private static final Logger LOG = LoggerFactory.getLogger(AdicionalService.class);

    private final ApiTokenManager apiTokenManager;
    private final RestTemplate restTemplate;

    @Value("${professor.api.url}")
    private String PROFESSOR_API_URL;

    @Value("${professor.api.username}")
    private String USERNAME;

    @Value("${professor.api.password}")
    private String PASSWORD;

    private String AUTH_URL;
    private String DEVICES_URL;

    @Autowired
    DispositivoService dispositivoService;

    @Autowired
    public ApiSyncService(ApiTokenManager apiTokenManager, RestTemplate restTemplate) {
        this.apiTokenManager = apiTokenManager;
        this.restTemplate = restTemplate;
    }

    // Evento que se ejecuta cuando la aplicación está lista, inicializa las URLs y arranca la sincronización.
    @EventListener(ApplicationReadyEvent.class)
    public void initialize() {
        this.AUTH_URL = PROFESSOR_API_URL + "/authenticate";
        this.DEVICES_URL = PROFESSOR_API_URL + "/catedra/dispositivos";
        LOG.info("Inicializando ApiSyncService");
        syncDataWithRetry(); // Sincronización de datos con reintentos.
        startScheduledSync(); // Comienza la sincronización programada.
    }

    // Método que maneja la sincronización de datos con reintentos en caso de fallo.
    void syncDataWithRetry() {
        LOG.info("Iniciando sincronización de datos con reintentos");
        Optional<ApiToken> optionalToken = apiTokenManager.loadToken();
        if (optionalToken.isPresent()) {
            ApiToken token = optionalToken.get();
            try {
                if (!syncData(token.getToken())) {
                    LOG.warn("Token expirado, renovando token");
                    token = renewToken();
                    syncData(token.getToken());
                }
            } catch (HttpClientErrorException.Unauthorized e) {
                LOG.error("Error no autorizado: {}", e.getMessage());
                // Si el token está expirado, intenta renovarlo.
                System.err.println("Error no autorizado: " + e.getMessage());
                token = renewToken();
                syncData(token.getToken());
            }
        } else {
            LOG.warn("No se encontró un token, renovando token");
            ApiToken token = renewToken();
            syncData(token.getToken());
        }
    }

    // Método que realiza la sincronización de datos con el servidor remoto utilizando un token JWT.
    protected boolean syncData(String jwtToken) {
        LOG.info("Sincronizando datos con el token: {}", jwtToken);
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(jwtToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<List<DispositivoDTO>> response = restTemplate.exchange(
                DEVICES_URL,
                HttpMethod.GET,
                entity,
                new ParameterizedTypeReference<List<DispositivoDTO>>() {}
            );

            if (response == null || response.getBody() == null) {
                LOG.error("La respuesta o el cuerpo de la respuesta son nulos");
                throw new RuntimeException("Error al sincronizar datos: la respuesta o el cuerpo de la respuesta son nulos");
            }

            if (response.getStatusCode() == HttpStatus.OK) {
                List<DispositivoDTO> devices = response.getBody();
                LOG.info("Sincronización de datos exitosa, se recuperaron {} dispositivos", devices.size());
                updateLocalDatabase(devices); // Actualiza la base de datos local con los dispositivos obtenidos.
                return true;
            } else if (response.getStatusCode() == HttpStatus.UNAUTHORIZED) {
                LOG.warn("Acceso no autorizado, el token puede estar expirado");
                return false;
            } else {
                LOG.error("Error al sincronizar los datos, código de estado: {}", response.getStatusCode());
                throw new RuntimeException("Error al sincronizar los datos");
            }
        } catch (HttpClientErrorException e) {
            if (e.getStatusCode() == HttpStatus.UNAUTHORIZED) {
                LOG.warn("Acceso no autorizado, el token puede estar expirado");
                return false;
            } else {
                LOG.error("Error al sincronizar los datos", e);
                throw new RuntimeException("Error al sincronizar los datos", e);
            }
        }
    }

    // Método que renueva el token utilizando las credenciales configuradas.
    ApiToken renewToken() {
        LOG.info("Renovando token");
        Map<String, Object> authRequest = new HashMap<>();
        authRequest.put("username", USERNAME);
        authRequest.put("password", PASSWORD);
        authRequest.put("rememberMe", false);

        ResponseEntity<AuthResponse> response = restTemplate.postForEntity(AUTH_URL, authRequest, AuthResponse.class);

        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            String newToken = response.getBody().getId_token();
            LOG.info("Token renovado exitosamente: {}", newToken);

            System.out.println(newToken);
            ApiToken apiToken = new ApiToken();
            apiToken.setToken(newToken);
            apiTokenManager.saveToken(apiToken);
            updateTokenFile(newToken); // Actualiza el archivo con el nuevo token.

            return apiToken;
        } else {
            LOG.error("Error al renovar el token, código de estado: {}", response.getStatusCode());
            throw new RuntimeException("Error al renovar el token");
        }
    }

    // Método que actualiza el archivo local con el nuevo token.
    void updateTokenFile(String newToken) {
        LOG.info("Actualizando el archivo del token con el nuevo token");
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("token", newToken);

        try (FileWriter file = new FileWriter("apitoken.json")) {
            file.write(jsonObject.toString());
            LOG.info("Archivo del token actualizado exitosamente");
        } catch (IOException e) {
            LOG.error("Error al actualizar el archivo del token", e);
            throw new RuntimeException("Error al actualizar el archivo del token", e);
        }
    }

    // Método que inicia la sincronización de datos de manera programada cada 15 minutos.
    private void startScheduledSync() {
        LOG.info("Iniciando sincronización programada de datos");
        ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
        scheduler.scheduleAtFixedRate(this::syncDataWithRetry, 0, 15, TimeUnit.MINUTES);
    }

    // Método que actualiza la base de datos local con los dispositivos obtenidos del servidor.
    void updateLocalDatabase(List<DispositivoDTO> devices) {
        LOG.info("Actualizando la base de datos local con {} dispositivos", devices.size());
        List<DispositivoDTO> localDevices = dispositivoService.findAllNoPag();

        // Crear un mapa de dispositivos locales para una búsqueda rápida
        Map<Long, DispositivoDTO> localDeviceMap = localDevices
            .stream()
            .collect(Collectors.toMap(DispositivoDTO::getId, dispositivo -> dispositivo));

        for (DispositivoDTO remoteDevice : devices) {
            DispositivoDTO localDevice = localDeviceMap.get(remoteDevice.getId());
            if (localDevice == null || !localDevice.equals(remoteDevice)) {
                // Si el dispositivo no existe localmente o ha cambiado, actualizarlo
                dispositivoService.save(remoteDevice);
                LOG.info("Dispositivo actualizado: {}", remoteDevice.getId());
            }
        }

        LOG.info("Base de datos local actualizada exitosamente");
    }
}
