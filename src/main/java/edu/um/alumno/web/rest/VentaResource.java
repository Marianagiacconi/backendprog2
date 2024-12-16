package edu.um.alumno.web.rest;

import edu.um.alumno.domain.Venta;
import edu.um.alumno.repository.VentaRepository;
import edu.um.alumno.service.VentaService;
import edu.um.alumno.service.dto.VentaDTO;
import edu.um.alumno.service.dto.VentaRequestDTO;
import edu.um.alumno.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link edu.um.alumno.domain.Venta}.
 */
@RestController
@RequestMapping("/api/ventas")
public class VentaResource {

    private static final Logger LOG = LoggerFactory.getLogger(VentaResource.class);

    private static final String ENTITY_NAME = "venta";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VentaService ventaService;

    private final VentaRepository ventaRepository;

    public VentaResource(VentaService ventaService, VentaRepository ventaRepository) {
        this.ventaService = ventaService;
        this.ventaRepository = ventaRepository;
    }

    /**
     * {@code POST  /ventas} : Create a new venta.
     *
     * @param ventaDTO the ventaDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ventaDTO, or with status {@code 400 (Bad Request)} if the venta has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<VentaDTO> createVenta(@Valid @RequestBody VentaDTO ventaDTO) throws URISyntaxException {
        LOG.debug("REST request to save Venta : {}", ventaDTO);
        if (ventaDTO.getId() != null) {
            LOG.warn("Attempt to create a Venta with existing ID: {}", ventaDTO.getId());
            throw new BadRequestAlertException("A new venta cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ventaDTO = ventaService.save(ventaDTO);
        LOG.info("Venta created with ID: {}", ventaDTO.getId());
        return ResponseEntity.created(new URI("/api/ventas/" + ventaDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, ventaDTO.getId().toString()))
            .body(ventaDTO);
    }

    /**
     * {@code PUT  /ventas/:id} : Updates an existing venta.
     *
     * @param id the id of the ventaDTO to save.
     * @param ventaDTO the ventaDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ventaDTO,
     * or with status {@code 400 (Bad Request)} if the ventaDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ventaDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<VentaDTO> updateVenta(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody VentaDTO ventaDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update Venta : {}, {}", id, ventaDTO);
        if (ventaDTO.getId() == null) {
            LOG.warn("Invalid ID: null");
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ventaDTO.getId())) {
            LOG.warn("Invalid ID: path ID {} does not match body ID {}", id, ventaDTO.getId());
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ventaRepository.existsById(id)) {
            LOG.warn("Entity not found with ID: {}", id);
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ventaDTO = ventaService.update(ventaDTO);
        LOG.info("Venta updated with ID: {}", ventaDTO.getId());
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ventaDTO.getId().toString()))
            .body(ventaDTO);
    }

    /**
     * {@code PATCH  /ventas/:id} : Partial updates given fields of an existing venta, field will ignore if it is null
     *
     * @param id the id of the ventaDTO to save.
     * @param ventaDTO the ventaDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ventaDTO,
     * or with status {@code 400 (Bad Request)} if the ventaDTO is not valid,
     * or with status {@code 404 (Not Found)} if the ventaDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the ventaDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<VentaDTO> partialUpdateVenta(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody VentaDTO ventaDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update Venta partially : {}, {}", id, ventaDTO);
        if (ventaDTO.getId() == null) {
            LOG.warn("Invalid ID: null");
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ventaDTO.getId())) {
            LOG.warn("Invalid ID: path ID {} does not match body ID {}", id, ventaDTO.getId());
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ventaRepository.existsById(id)) {
            LOG.warn("Entity not found with ID: {}", id);
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<VentaDTO> result = ventaService.partialUpdate(ventaDTO);
        LOG.info("Venta partially updated with ID: {}", id);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ventaDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /ventas} : get all the ventas.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ventas in body.
     */
    @GetMapping("")
    public ResponseEntity<List<VentaDTO>> getAllVentas(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        LOG.debug("REST request to get a page of Ventas");
        Page<VentaDTO> page = ventaService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        LOG.info("Returning {} ventas", page.getContent().size());
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /ventas/:id} : get the "id" venta.
     *
     * @param id the id of the ventaDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ventaDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<VentaDTO> getVenta(@PathVariable("id") Long id) {
        LOG.debug("REST request to get Venta : {}", id);
        Optional<VentaDTO> ventaDTO = ventaService.findOne(id);
        LOG.info("Returning venta with ID: {}", id);
        return ResponseUtil.wrapOrNotFound(ventaDTO);
    }

    /**
     * {@code DELETE  /ventas/:id} : delete the "id" venta.
     *
     * @param id the id of the ventaDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVenta(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete Venta : {}", id);
        ventaService.delete(id);
        LOG.info("Venta deleted with ID: {}", id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

    @PostMapping("/vender")
    public Venta crearVenta(@RequestBody VentaRequestDTO ventaRequestDTO) {
        LOG.debug("REST request to create Venta : {}", ventaRequestDTO);
        return ventaService.procesarVenta(ventaRequestDTO);
    }

    @GetMapping("/profesor/{id}")
    public ResponseEntity<Map<String, Object>> getVentaFromProfesor(@PathVariable("id") Long id) {
        LOG.debug("REST request to get Venta from profesor backend : {}", id);
        Map<String, Object> ventaInfo = ventaService.getVentaById(id);
        LOG.info("Returning venta from profesor backend with ID: {}", id);
        return ResponseEntity.ok().body(ventaInfo);
    }

    @GetMapping("/admin")
    public ResponseEntity<List<Map<String, Object>>> getVentaFromAdmin() {
        LOG.debug("REST request to get all Ventas from profesor backend");
        List<Map<String, Object>> ventasInfo = ventaService.getAllVentasAdmin();
        LOG.info("Returning all ventas from profesor backend");
        return ResponseEntity.ok().body(ventasInfo);
    }

    @GetMapping("/usuario/{userId}")
    public ResponseEntity<List<VentaDTO>> getVentasByUserId(@PathVariable("userId") Long userId) {
        LOG.debug("REST request to get all Ventas for user : {}", userId);
        List<VentaDTO> ventas = ventaService.getVentasByUserId(userId);
        LOG.info("Returning {} ventas for user ID: {}", ventas.size(), userId);
        return ResponseEntity.ok().body(ventas);
    }
}
