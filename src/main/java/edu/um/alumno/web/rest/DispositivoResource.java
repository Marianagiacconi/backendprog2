package edu.um.alumno.web.rest;

import edu.um.alumno.repository.DispositivoRepository;
import edu.um.alumno.service.DispositivoService;
import edu.um.alumno.service.dto.DispositivoDTO;
import edu.um.alumno.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
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
 * REST controller for managing {@link edu.um.alumno.domain.Dispositivo}.
 */
@RestController
@RequestMapping("/api/dispositivos")
public class DispositivoResource {

    private static final Logger LOG = LoggerFactory.getLogger(DispositivoResource.class);

    private static final String ENTITY_NAME = "dispositivo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DispositivoService dispositivoService;

    private final DispositivoRepository dispositivoRepository;

    public DispositivoResource(DispositivoService dispositivoService, DispositivoRepository dispositivoRepository) {
        this.dispositivoService = dispositivoService;
        this.dispositivoRepository = dispositivoRepository;
    }

    /**
     * {@code POST  /dispositivos} : Create a new dispositivo.
     *
     * @param dispositivoDTO the dispositivoDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new dispositivoDTO, or with status {@code 400 (Bad Request)} if the dispositivo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<DispositivoDTO> createDispositivo(@Valid @RequestBody DispositivoDTO dispositivoDTO) throws URISyntaxException {
        LOG.debug("REST request to save Dispositivo : {}", dispositivoDTO);
        if (dispositivoDTO.getId() != null) {
            LOG.warn("A new dispositivo cannot already have an ID");
            throw new BadRequestAlertException("A new dispositivo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        dispositivoDTO = dispositivoService.save(dispositivoDTO);
        LOG.info("Dispositivo saved with ID: {}", dispositivoDTO.getId());
        return ResponseEntity.created(new URI("/api/dispositivos/" + dispositivoDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, dispositivoDTO.getId().toString()))
            .body(dispositivoDTO);
    }

    /**
     * {@code PUT  /dispositivos/:id} : Updates an existing dispositivo.
     *
     * @param id the id of the dispositivoDTO to save.
     * @param dispositivoDTO the dispositivoDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dispositivoDTO,
     * or with status {@code 400 (Bad Request)} if the dispositivoDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the dispositivoDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<DispositivoDTO> updateDispositivo(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody DispositivoDTO dispositivoDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update Dispositivo : {}, {}", id, dispositivoDTO);
        if (dispositivoDTO.getId() == null) {
            LOG.warn("Invalid ID: null");
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, dispositivoDTO.getId())) {
            LOG.warn("Invalid ID: null");
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!dispositivoRepository.existsById(id)) {
            LOG.warn("Invalid ID: null");
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        dispositivoDTO = dispositivoService.update(dispositivoDTO);
        LOG.info("Dispositivo updated with ID: {}", dispositivoDTO.getId());
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, dispositivoDTO.getId().toString()))
            .body(dispositivoDTO);
    }

    /**
     * {@code PATCH  /dispositivos/:id} : Partial updates given fields of an existing dispositivo, field will ignore if it is null
     *
     * @param id the id of the dispositivoDTO to save.
     * @param dispositivoDTO the dispositivoDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dispositivoDTO,
     * or with status {@code 400 (Bad Request)} if the dispositivoDTO is not valid,
     * or with status {@code 404 (Not Found)} if the dispositivoDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the dispositivoDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<DispositivoDTO> partialUpdateDispositivo(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody DispositivoDTO dispositivoDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update Dispositivo partially : {}, {}", id, dispositivoDTO);
        if (dispositivoDTO.getId() == null) {
            LOG.warn("Invalid ID: null");
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, dispositivoDTO.getId())) {
            LOG.warn("Invalid ID: null");
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!dispositivoRepository.existsById(id)) {
            LOG.warn("Invalid ID: null");
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<DispositivoDTO> result = dispositivoService.partialUpdate(dispositivoDTO);
        LOG.info("Dispositivo partially updated with ID: {}", dispositivoDTO.getId());
        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, dispositivoDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /dispositivos} : get all the dispositivos.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of dispositivos in body.
     */
    @GetMapping("")
    public ResponseEntity<List<DispositivoDTO>> getAllDispositivos(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload
    ) {
        LOG.debug("REST request to get a page of Dispositivos");
        Page<DispositivoDTO> page;
        if (eagerload) {
            page = dispositivoService.findAllWithEagerRelationships(pageable);
        } else {
            page = dispositivoService.findAll(pageable);
            LOG.info("Found {} dispositivos", page.getTotalElements());
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /dispositivos/:id} : get the "id" dispositivo.
     *
     * @param id the id of the dispositivoDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the dispositivoDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<DispositivoDTO> getDispositivo(@PathVariable("id") Long id) {
        LOG.debug("REST request to get Dispositivo : {}", id);
        Optional<DispositivoDTO> dispositivoDTO = dispositivoService.findOne(id);
        LOG.info("Dispositivo found with ID: {}", id);
        return ResponseUtil.wrapOrNotFound(dispositivoDTO);
    }

    /**
     * {@code DELETE  /dispositivos/:id} : delete the "id" dispositivo.
     *
     * @param id the id of the dispositivoDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDispositivo(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete Dispositivo : {}", id);
        dispositivoService.delete(id);
        LOG.info("Dispositivo deleted with ID: {}", id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
