package edu.um.alumno.service;

import edu.um.alumno.domain.Adicional;
import edu.um.alumno.repository.AdicionalRepository;
import edu.um.alumno.service.dto.AdicionalDTO;
import edu.um.alumno.service.mapper.AdicionalMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link edu.um.alumno.domain.Adicional}.
 */
@Service
@Transactional
public class AdicionalService {

    private static final Logger LOG = LoggerFactory.getLogger(AdicionalService.class);

    private final AdicionalRepository adicionalRepository;

    private final AdicionalMapper adicionalMapper;

    public AdicionalService(AdicionalRepository adicionalRepository, AdicionalMapper adicionalMapper) {
        this.adicionalRepository = adicionalRepository;
        this.adicionalMapper = adicionalMapper;
    }

    /**
     * Save a adicional.
     *
     * @param adicionalDTO the entity to save.
     * @return the persisted entity.
     */
    public AdicionalDTO save(AdicionalDTO adicionalDTO) {
        LOG.debug("Request to save Adicional : {}", adicionalDTO);
        Adicional adicional = adicionalMapper.toEntity(adicionalDTO);
        adicional = adicionalRepository.save(adicional);
        return adicionalMapper.toDto(adicional);
    }

    /**
     * Update a adicional.
     *
     * @param adicionalDTO the entity to save.
     * @return the persisted entity.
     */
    public AdicionalDTO update(AdicionalDTO adicionalDTO) {
        LOG.debug("Request to update Adicional : {}", adicionalDTO);
        Adicional adicional = adicionalMapper.toEntity(adicionalDTO);
        adicional = adicionalRepository.save(adicional);
        return adicionalMapper.toDto(adicional);
    }

    /**
     * Partially update a adicional.
     *
     * @param adicionalDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<AdicionalDTO> partialUpdate(AdicionalDTO adicionalDTO) {
        LOG.debug("Request to partially update Adicional : {}", adicionalDTO);

        return adicionalRepository
            .findById(adicionalDTO.getId())
            .map(existingAdicional -> {
                adicionalMapper.partialUpdate(existingAdicional, adicionalDTO);

                return existingAdicional;
            })
            .map(adicionalRepository::save)
            .map(adicionalMapper::toDto);
    }

    /**
     * Get all the adicionals.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<AdicionalDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all Adicionals");
        return adicionalRepository.findAll(pageable).map(adicionalMapper::toDto);
    }

    /**
     * Get one adicional by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<AdicionalDTO> findOne(Long id) {
        LOG.debug("Request to get Adicional : {}", id);
        return adicionalRepository.findById(id).map(adicionalMapper::toDto);
    }

    /**
     * Delete the adicional by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        LOG.debug("Request to delete Adicional : {}", id);
        adicionalRepository.deleteById(id);
    }
}
