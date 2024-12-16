package edu.um.alumno.service;

import edu.um.alumno.domain.Personalizacion;
import edu.um.alumno.repository.PersonalizacionRepository;
import edu.um.alumno.service.dto.PersonalizacionDTO;
import edu.um.alumno.service.mapper.PersonalizacionMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link edu.um.alumno.domain.Personalizacion}.
 */
@Service
@Transactional
public class PersonalizacionService {

    private static final Logger LOG = LoggerFactory.getLogger(PersonalizacionService.class);

    private final PersonalizacionRepository personalizacionRepository;

    private final PersonalizacionMapper personalizacionMapper;

    public PersonalizacionService(PersonalizacionRepository personalizacionRepository, PersonalizacionMapper personalizacionMapper) {
        this.personalizacionRepository = personalizacionRepository;
        this.personalizacionMapper = personalizacionMapper;
    }

    /**
     * Save a personalizacion.
     *
     * @param personalizacionDTO the entity to save.
     * @return the persisted entity.
     */
    public PersonalizacionDTO save(PersonalizacionDTO personalizacionDTO) {
        LOG.debug("Request to save Personalizacion : {}", personalizacionDTO);
        Personalizacion personalizacion = personalizacionMapper.toEntity(personalizacionDTO);
        personalizacion = personalizacionRepository.save(personalizacion);
        return personalizacionMapper.toDto(personalizacion);
    }

    /**
     * Update a personalizacion.
     *
     * @param personalizacionDTO the entity to save.
     * @return the persisted entity.
     */
    public PersonalizacionDTO update(PersonalizacionDTO personalizacionDTO) {
        LOG.debug("Request to update Personalizacion : {}", personalizacionDTO);
        Personalizacion personalizacion = personalizacionMapper.toEntity(personalizacionDTO);
        personalizacion = personalizacionRepository.save(personalizacion);
        return personalizacionMapper.toDto(personalizacion);
    }

    /**
     * Partially update a personalizacion.
     *
     * @param personalizacionDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<PersonalizacionDTO> partialUpdate(PersonalizacionDTO personalizacionDTO) {
        LOG.debug("Request to partially update Personalizacion : {}", personalizacionDTO);

        return personalizacionRepository
            .findById(personalizacionDTO.getId())
            .map(existingPersonalizacion -> {
                personalizacionMapper.partialUpdate(existingPersonalizacion, personalizacionDTO);

                return existingPersonalizacion;
            })
            .map(personalizacionRepository::save)
            .map(personalizacionMapper::toDto);
    }

    /**
     * Get all the personalizacions.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<PersonalizacionDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all Personalizacions");
        return personalizacionRepository.findAll(pageable).map(personalizacionMapper::toDto);
    }

    /**
     * Get one personalizacion by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<PersonalizacionDTO> findOne(Long id) {
        LOG.debug("Request to get Personalizacion : {}", id);
        return personalizacionRepository.findById(id).map(personalizacionMapper::toDto);
    }

    /**
     * Delete the personalizacion by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        LOG.debug("Request to delete Personalizacion : {}", id);
        personalizacionRepository.deleteById(id);
    }
}
