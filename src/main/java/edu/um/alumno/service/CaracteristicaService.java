package edu.um.alumno.service;

import edu.um.alumno.domain.Caracteristica;
import edu.um.alumno.repository.CaracteristicaRepository;
import edu.um.alumno.service.dto.CaracteristicaDTO;
import edu.um.alumno.service.mapper.CaracteristicaMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link edu.um.alumno.domain.Caracteristica}.
 */
@Service
@Transactional
public class CaracteristicaService {

    private static final Logger LOG = LoggerFactory.getLogger(CaracteristicaService.class);

    private final CaracteristicaRepository caracteristicaRepository;

    private final CaracteristicaMapper caracteristicaMapper;

    public CaracteristicaService(CaracteristicaRepository caracteristicaRepository, CaracteristicaMapper caracteristicaMapper) {
        this.caracteristicaRepository = caracteristicaRepository;
        this.caracteristicaMapper = caracteristicaMapper;
    }

    /**
     * Save a caracteristica.
     *
     * @param caracteristicaDTO the entity to save.
     * @return the persisted entity.
     */
    public CaracteristicaDTO save(CaracteristicaDTO caracteristicaDTO) {
        LOG.debug("Request to save Caracteristica : {}", caracteristicaDTO);
        Caracteristica caracteristica = caracteristicaMapper.toEntity(caracteristicaDTO);
        caracteristica = caracteristicaRepository.save(caracteristica);
        LOG.info("Caracteristica saved with ID: {}", caracteristica.getId());
        return caracteristicaMapper.toDto(caracteristica);
    }

    /**
     * Update a caracteristica.
     *
     * @param caracteristicaDTO the entity to save.
     * @return the persisted entity.
     */
    public CaracteristicaDTO update(CaracteristicaDTO caracteristicaDTO) {
        LOG.debug("Request to update Caracteristica : {}", caracteristicaDTO);
        Caracteristica caracteristica = caracteristicaMapper.toEntity(caracteristicaDTO);
        caracteristica = caracteristicaRepository.save(caracteristica);
        LOG.info("Caracteristica updated with ID: {}", caracteristica.getId());
        return caracteristicaMapper.toDto(caracteristica);
    }

    /**
     * Partially update a caracteristica.
     *
     * @param caracteristicaDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<CaracteristicaDTO> partialUpdate(CaracteristicaDTO caracteristicaDTO) {
        LOG.debug("Request to partially update Caracteristica : {}", caracteristicaDTO);

        return caracteristicaRepository
            .findById(caracteristicaDTO.getId())
            .map(existingCaracteristica -> {
                caracteristicaMapper.partialUpdate(existingCaracteristica, caracteristicaDTO);
                LOG.info("Caracteristica partially updated with ID: {}", existingCaracteristica.getId());
                return existingCaracteristica;
            })
            .map(caracteristicaRepository::save)
            .map(caracteristicaMapper::toDto);
    }

    /**
     * Get all the caracteristicas.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<CaracteristicaDTO> findAll() {
        LOG.debug("Request to get all Caracteristicas");
        return caracteristicaRepository
            .findAll()
            .stream()
            .map(caracteristicaMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one caracteristica by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<CaracteristicaDTO> findOne(Long id) {
        LOG.debug("Request to get Caracteristica : {}", id);
        return caracteristicaRepository.findById(id).map(caracteristicaMapper::toDto);
    }

    /**
     * Delete the caracteristica by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        LOG.debug("Request to delete Caracteristica : {}", id);
        caracteristicaRepository.deleteById(id);
        LOG.info("Caracteristica deleted with ID: {}", id);
    }
}
