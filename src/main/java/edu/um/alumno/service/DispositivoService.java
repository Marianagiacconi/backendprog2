package edu.um.alumno.service;

import edu.um.alumno.domain.Dispositivo;
import edu.um.alumno.repository.DispositivoRepository;
import edu.um.alumno.service.dto.DispositivoDTO;
import edu.um.alumno.service.mapper.DispositivoMapper;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link edu.um.alumno.domain.Dispositivo}.
 */
@Service
@Transactional
public class DispositivoService {

    private static final Logger LOG = LoggerFactory.getLogger(DispositivoService.class);

    private final DispositivoRepository dispositivoRepository;

    private final DispositivoMapper dispositivoMapper;

    public DispositivoService(DispositivoRepository dispositivoRepository, DispositivoMapper dispositivoMapper) {
        this.dispositivoRepository = dispositivoRepository;
        this.dispositivoMapper = dispositivoMapper;
    }

    /**
     * Save a dispositivo.
     *
     * @param dispositivoDTO the entity to save.
     * @return the persisted entity.
     */
    public DispositivoDTO save(DispositivoDTO dispositivoDTO) {
        try {
            LOG.debug("Request to save Dispositivo : {}", dispositivoDTO);
            Dispositivo dispositivo = dispositivoMapper.toEntity(dispositivoDTO);
            dispositivo = dispositivoRepository.save(dispositivo);
            LOG.info("Dispositivo saved with ID: {}", dispositivo.getId());
            return dispositivoMapper.toDto(dispositivo);
        } catch (Exception e) {
            LOG.error("Error saving Dispositivo with ID: {}", dispositivoDTO.getId());
            return null;
        }
    }

    /**
     * Update a dispositivo.
     *
     * @param dispositivoDTO the entity to save.
     * @return the persisted entity.
     */
    public DispositivoDTO update(DispositivoDTO dispositivoDTO) {
        try {
            LOG.debug("Request to update Dispositivo : {}", dispositivoDTO);
            Dispositivo dispositivo = dispositivoMapper.toEntity(dispositivoDTO);
            dispositivo = dispositivoRepository.save(dispositivo);
            LOG.info("Dispositivo updated with ID: {}", dispositivo.getId());
            return dispositivoMapper.toDto(dispositivo);
        } catch (Exception e) {
            LOG.error("Error updating Dispositivo with ID: {}", dispositivoDTO.getId());
            return null;
        }
    }

    /**
     * Partially update a dispositivo.
     *
     * @param dispositivoDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<DispositivoDTO> partialUpdate(DispositivoDTO dispositivoDTO) {
        LOG.debug("Request to partially update Dispositivo : {}", dispositivoDTO);

        return dispositivoRepository
            .findById(dispositivoDTO.getId())
            .map(existingDispositivo -> {
                dispositivoMapper.partialUpdate(existingDispositivo, dispositivoDTO);
                LOG.info("Dispositivo partially updated with ID: {}", existingDispositivo.getId());

                return existingDispositivo;
            })
            .map(dispositivoRepository::save)
            .map(dispositivoMapper::toDto);
    }

    /**
     * Get all the dispositivos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */

    @Transactional(readOnly = true)
    public Page<DispositivoDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all Dispositivos");
        return dispositivoRepository.findAll(pageable).map(dispositivoMapper::toDto);
    }

    @Transactional(readOnly = true)
    public List<DispositivoDTO> findAllNoPag() {
        LOG.debug("Request to get all Dispositivos without pagination");
        return dispositivoRepository.findAll().stream().map(dispositivoMapper::toDto).collect(Collectors.toList());
    }

    /**
     * Get all the dispositivos with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<DispositivoDTO> findAllWithEagerRelationships(Pageable pageable) {
        return dispositivoRepository.findAllWithEagerRelationships(pageable).map(dispositivoMapper::toDto);
    }

    /**
     * Get one dispositivo by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<DispositivoDTO> findOne(Long id) {
        try {
            LOG.debug("Request to get Dispositivo : {}", id);
            return dispositivoRepository.findOneWithEagerRelationships(id).map(dispositivoMapper::toDto);
        } catch (Exception e) {
            LOG.error("Error getting Dispositivo with ID: {}", id);
            return null;
        }
    }

    /**
     * Delete the dispositivo by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        try {
            LOG.debug("Request to delete Dispositivo : {}", id);
            dispositivoRepository.deleteById(id);
            LOG.info("Dispositivo deleted with ID: {}", id);
        } catch (Exception e) {
            LOG.error("Error deleting Dispositivo with ID: {}", id);
        }
    }

    public List<DispositivoDTO> saveAll(List<DispositivoDTO> dispositivoDTOs) {
        LOG.debug("Request to save list of Dispositivos : {}", dispositivoDTOs);
        List<Dispositivo> dispositivos = dispositivoDTOs.stream().map(dispositivoMapper::toEntity).collect(Collectors.toList());
        dispositivos = dispositivoRepository.saveAll(dispositivos);
        LOG.info("List of Dispositivos saved successfully");
        return null;
    }
}
