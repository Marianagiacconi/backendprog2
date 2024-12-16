package edu.um.alumno.web.rest;

import edu.um.alumno.repository.PersonalizacionRepository;
import edu.um.alumno.service.PersonalizacionService;
import edu.um.alumno.service.dto.PersonalizacionDTO;
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
 * REST controller for managing {@link edu.um.alumno.domain.Personalizacion}.
 */
@RestController
@RequestMapping("/api/personalizacions")
public class PersonalizacionResource {

    private static final Logger LOG = LoggerFactory.getLogger(PersonalizacionResource.class);

    private static final String ENTITY_NAME = "personalizacion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PersonalizacionService personalizacionService;

    private final PersonalizacionRepository personalizacionRepository;

    public PersonalizacionResource(PersonalizacionService personalizacionService, PersonalizacionRepository personalizacionRepository) {
        this.personalizacionService = personalizacionService;
        this.personalizacionRepository = personalizacionRepository;
    }

    /**
     * {@code POST  /personalizacions} : Create a new personalizacion.
     *
     * @param personalizacionDTO the personalizacionDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new personalizacionDTO, or with status {@code 400 (Bad Request)} if the personalizacion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<PersonalizacionDTO> createPersonalizacion(@Valid @RequestBody PersonalizacionDTO personalizacionDTO)
        throws URISyntaxException {
        LOG.debug("REST request to save Personalizacion : {}", personalizacionDTO);
        if (personalizacionDTO.getId() != null) {
            throw new BadRequestAlertException("A new personalizacion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        personalizacionDTO = personalizacionService.save(personalizacionDTO);
        return ResponseEntity.created(new URI("/api/personalizacions/" + personalizacionDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, personalizacionDTO.getId().toString()))
            .body(personalizacionDTO);
    }

    /**
     * {@code PUT  /personalizacions/:id} : Updates an existing personalizacion.
     *
     * @param id the id of the personalizacionDTO to save.
     * @param personalizacionDTO the personalizacionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated personalizacionDTO,
     * or with status {@code 400 (Bad Request)} if the personalizacionDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the personalizacionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<PersonalizacionDTO> updatePersonalizacion(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody PersonalizacionDTO personalizacionDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update Personalizacion : {}, {}", id, personalizacionDTO);
        if (personalizacionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, personalizacionDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!personalizacionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        personalizacionDTO = personalizacionService.update(personalizacionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, personalizacionDTO.getId().toString()))
            .body(personalizacionDTO);
    }

    /**
     * {@code PATCH  /personalizacions/:id} : Partial updates given fields of an existing personalizacion, field will ignore if it is null
     *
     * @param id the id of the personalizacionDTO to save.
     * @param personalizacionDTO the personalizacionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated personalizacionDTO,
     * or with status {@code 400 (Bad Request)} if the personalizacionDTO is not valid,
     * or with status {@code 404 (Not Found)} if the personalizacionDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the personalizacionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<PersonalizacionDTO> partialUpdatePersonalizacion(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody PersonalizacionDTO personalizacionDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update Personalizacion partially : {}, {}", id, personalizacionDTO);
        if (personalizacionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, personalizacionDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!personalizacionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<PersonalizacionDTO> result = personalizacionService.partialUpdate(personalizacionDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, personalizacionDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /personalizacions} : get all the personalizacions.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of personalizacions in body.
     */
    @GetMapping("")
    public ResponseEntity<List<PersonalizacionDTO>> getAllPersonalizacions(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get a page of Personalizacions");
        Page<PersonalizacionDTO> page = personalizacionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /personalizacions/:id} : get the "id" personalizacion.
     *
     * @param id the id of the personalizacionDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the personalizacionDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<PersonalizacionDTO> getPersonalizacion(@PathVariable("id") Long id) {
        LOG.debug("REST request to get Personalizacion : {}", id);
        Optional<PersonalizacionDTO> personalizacionDTO = personalizacionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(personalizacionDTO);
    }

    /**
     * {@code DELETE  /personalizacions/:id} : delete the "id" personalizacion.
     *
     * @param id the id of the personalizacionDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePersonalizacion(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete Personalizacion : {}", id);
        personalizacionService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
