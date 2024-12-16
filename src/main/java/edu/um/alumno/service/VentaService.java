package edu.um.alumno.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import edu.um.alumno.domain.User;
import edu.um.alumno.domain.Venta;
import edu.um.alumno.repository.UserRepository;
import edu.um.alumno.repository.VentaRepository;
import edu.um.alumno.service.dto.VentaDTO;
import edu.um.alumno.service.dto.VentaRequestDTO;
import edu.um.alumno.service.dto.VentaResponseDTO;
import edu.um.alumno.service.mapper.VentaMapper;
import edu.um.alumno.web.rest.VentaResource;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

/**
 * Service Implementation for managing {@link edu.um.alumno.domain.Venta}.
 */
@Service
@Transactional
public class VentaService {

    private static final Logger LOG = LoggerFactory.getLogger(VentaService.class);

    private final VentaRepository ventaRepository;
    private final UserRepository userRepository;

    private final VentaMapper ventaMapper;

    private static final RestTemplate restTemplate = new RestTemplate();
    private static final String profesorBackendUrl = "http://192.168.194.254:8080/api/catedra/";

    public VentaService(VentaRepository ventaRepository, VentaMapper ventaMapper, UserRepository userRepository) {
        this.ventaRepository = ventaRepository;
        this.ventaMapper = ventaMapper;
        this.userRepository = userRepository;
    }

    /**
     * Save a venta.
     *
     * @param ventaDTO the entity to save.
     * @return the persisted entity.
     */
    public VentaDTO save(VentaDTO ventaDTO) {
        try {
            LOG.debug("Request to save Venta : {}", ventaDTO);
            Venta venta = ventaMapper.toEntity(ventaDTO);
            venta = ventaRepository.save(venta);
            LOG.info("Venta saved with ID: {}", venta.getId());
            return ventaMapper.toDto(venta);
        } catch (Exception e) {
            LOG.error("Error saving Venta", e);
            throw new RuntimeException("Error saving Venta", e);
        }
    }

    /**
     * Update a venta.
     *
     * @param ventaDTO the entity to save.
     * @return the persisted entity.
     */
    public VentaDTO update(VentaDTO ventaDTO) {
        try {
            LOG.debug("Request to update Venta : {}", ventaDTO);
            Optional<Venta> optionalVenta = ventaRepository.findById(ventaDTO.getId());
            if (optionalVenta.isEmpty()) {
                LOG.warn("Venta with ID {} not found", ventaDTO.getId());
                return null; // or throw an exception
            }
            Venta venta = ventaMapper.toEntity(ventaDTO);
            venta = ventaRepository.save(venta);
            LOG.info("Venta updated with ID: {}", venta.getId());
            return ventaMapper.toDto(venta);
        } catch (Exception e) {
            LOG.error("Error updating Venta", e);
            throw new RuntimeException("Error updating Venta", e);
        }
    }

    /**
     * Partially update a venta.
     *
     * @param ventaDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<VentaDTO> partialUpdate(VentaDTO ventaDTO) {
        LOG.debug("Request to partially update Venta : {}", ventaDTO);

        return ventaRepository
            .findById(ventaDTO.getId())
            .map(existingVenta -> {
                ventaMapper.partialUpdate(existingVenta, ventaDTO);
                LOG.info("Venta updated with ID: {}", existingVenta.getId());

                return existingVenta;
            })
            .map(ventaRepository::save)
            .map(ventaMapper::toDto);
    }

    /**
     * Get all the ventas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<VentaDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all Ventas");
        return ventaRepository.findAll(pageable).map(ventaMapper::toDto);
    }

    /**
     * Get one venta by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<VentaDTO> findOne(Long id) {
        try {
            LOG.debug("Request to get Venta : {}", id);
            return ventaRepository.findById(id).map(ventaMapper::toDto);
        } catch (Exception e) {
            LOG.error("Error getting Venta", e);
            throw new RuntimeException("Error getting Venta", e);
        }
    }

    /**
     * Delete the venta by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        try {
            LOG.debug("Request to delete Venta : {}", id);
            ventaRepository.deleteById(id);
            LOG.info("Venta deleted with ID: {}", id);
        } catch (Exception e) {
            LOG.error("Error deleting Venta", e);
            throw new RuntimeException("Error deleting Venta", e);
        }
    }

    public List<VentaDTO> getVentasByUserId(Long userId) {
        try {
            LOG.debug("Request to get all Ventas for user : {}", userId);
            List<Venta> ventas = ventaRepository.findByUserId(userId);
            LOG.info("Found {} ventas for user ID: {}", ventas.size(), userId);

            return ventas.stream().map(ventaMapper::toDto).collect(Collectors.toList());
        } catch (Exception e) {
            LOG.error("Error getting Ventas", e);
            throw new RuntimeException("Error getting Ventas", e);
        }
    }

    public Venta procesarVenta(VentaRequestDTO ventaRequestDTO) {
        try {
            String token = getToken();

            // Obtener el id del usuario autenticado
            Long userId = ventaRequestDTO.getUserId();
            LOG.debug("Processing venta for user ID: {}", userId);

            // Obtener el usuario desde el repositorio
            User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

            // Crear los headers y agregar el token JWT
            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(token);

            // Crear la entidad HTTP con los headers y el cuerpo de la solicitud
            HttpEntity<VentaRequestDTO> entity = new HttpEntity<>(ventaRequestDTO, headers);

            // Enviar solicitud al backend del profesor
            ResponseEntity<VentaResponseDTO> response = restTemplate.exchange(
                profesorBackendUrl + "/vender",
                HttpMethod.POST,
                entity,
                VentaResponseDTO.class
            );

            LOG.info("Venta processed with response: {}", response.getBody());

            // Crear y guardar la venta en la base de datos
            Venta venta = new Venta();

            venta.setId(VentaResponseDTO.getIdVenta());
            venta.setFechaVenta(ventaRequestDTO.getFechaVenta());
            venta.setPrecioFinal(ventaRequestDTO.getPrecioFinal());
            venta.setUser(user);

            return ventaRepository.save(venta);
        } catch (Exception e) {
            LOG.error("Error processing Venta", e);
            throw new RuntimeException("Error processing Venta", e);
        }
    }

    public static Map<String, Object> getVentaById(Long id) {
        try {
            String token = getToken();

            LOG.debug("Request to get Venta by ID from profesor backend: {}", id);

            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(token);

            HttpEntity<String> entity = new HttpEntity<>(headers);
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                profesorBackendUrl + "/venta/" + id,
                HttpMethod.GET,
                entity,
                new ParameterizedTypeReference<Map<String, Object>>() {}
            );
            LOG.info("Venta retrieved from profesor backend: {}", response.getBody());

            return response.getBody();
        } catch (Exception e) {
            LOG.error("Error getting Venta by ID", e);
            throw new RuntimeException("Error getting Venta by ID", e);
        }
    }

    public static List<Map<String, Object>> getAllVentasAdmin() {
        try {
            String token = getToken();
            LOG.debug("Request to get all Ventas from profesor backend as admin");

            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(token);

            HttpEntity<String> entity = new HttpEntity<>(headers);
            ResponseEntity<List<Map<String, Object>>> response = restTemplate.exchange(
                profesorBackendUrl + "/ventas",
                HttpMethod.GET,
                entity,
                new ParameterizedTypeReference<List<Map<String, Object>>>() {}
            );
            LOG.info("All ventas retrieved from profesor backend: {}", response.getBody());

            return response.getBody();
        } catch (Exception e) {
            LOG.error("Error getting all Ventas as admin", e);
            throw new RuntimeException("Error getting all Ventas as admin", e);
        }
    }

    private static String getToken() {
        String token = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            byte[] jsonData = Files.readAllBytes(Paths.get("apitoken.json"));
            Map<String, String> tokenMap = objectMapper.readValue(jsonData, Map.class);
            token = tokenMap.get("token");
            LOG.debug("Token retrieved from apitoken.json");
        } catch (IOException e) {
            LOG.error("Error reading token from apitoken.json", e);

            throw new RuntimeException("Error reading token from apitoken.json", e);
        }
        return token;
    }
}
