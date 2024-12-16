package edu.um.alumno.service.mapper;



import edu.um.alumno.domain.Adicional;
import edu.um.alumno.domain.Dispositivo;
import edu.um.alumno.service.dto.*;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Mapper for the entity {@link Dispositivo} and its DTO {@link DispositivoDTO}.
 */
@Mapper(
    componentModel = "spring",
    nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
    nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface DispositivoMapper extends EntityMapper<DispositivoDTO, Dispositivo> {
    Logger LOG = LoggerFactory.getLogger(DispositivoMapper.class);

    @Mapping(target = "caracteristicas", source = "caracteristicas")
    @Mapping(target = "personalizaciones", source = "personalizaciones")
    @Mapping(target = "adicionales", source = "adicionales")
    default DispositivoDTO toDto(Dispositivo dispositivo) {
        try {
            DispositivoDTO dto = new DispositivoDTO();
            dto.setId(dispositivo.getId());
            dto.setCodigo(dispositivo.getCodigo());
            dto.setNombre(dispositivo.getNombre());
            dto.setDescripcion(dispositivo.getDescripcion());
            dto.setPrecioBase(dispositivo.getPrecioBase());
            dto.setMoneda(dispositivo.getMoneda());
            dto.setCaracteristicas(
                dispositivo
                    .getCaracteristicas()
                    .stream()
                    .map(caracteristica -> {
                        CaracteristicaDTO caracteristicaDTO = new CaracteristicaDTO();
                        caracteristicaDTO.setId(caracteristica.getId());
                        caracteristicaDTO.setNombre(caracteristica.getNombre());
                        caracteristicaDTO.setDescripcion(caracteristica.getDescripcion());
                        return caracteristicaDTO;
                    })
                    .collect(Collectors.toSet())
            );
            dto.setPersonalizaciones(
                dispositivo
                    .getPersonalizaciones()
                    .stream()
                    .map(personalizacion -> {
                        PersonalizacionDTO personalizacionDTO = new PersonalizacionDTO();
                        personalizacionDTO.setId(personalizacion.getId());
                        personalizacionDTO.setNombre(personalizacion.getNombre());
                        personalizacionDTO.setDescripcion(personalizacion.getDescripcion());
                        personalizacionDTO.setOpciones(
                            personalizacion
                                .getOpciones()
                                .stream()
                                .map(opcion -> {
                                    OpcionDTO opcionDTO = new OpcionDTO();
                                    opcionDTO.setId(opcion.getId());
                                    opcionDTO.setCodigo(opcion.getCodigo());
                                    opcionDTO.setNombre(opcion.getNombre());
                                    opcionDTO.setDescripcion(opcion.getDescripcion());
                                    opcionDTO.setPrecioAdicional(opcion.getPrecioAdicional());
                                    return opcionDTO;
                                })
                                .collect(Collectors.toSet())
                        );
                        return personalizacionDTO;
                    })
                    .collect(Collectors.toSet())
            );
            dto.setAdicionales(
                dispositivo
                    .getAdicionales()
                    .stream()
                    .map(adicional -> {
                        AdicionalDTO adicionalDTO = new AdicionalDTO();
                        adicionalDTO.setId(adicional.getId());
                        adicionalDTO.setNombre(adicional.getNombre());
                        adicionalDTO.setDescripcion(adicional.getDescripcion());
                        adicionalDTO.setPrecio(adicional.getPrecio());
                        adicionalDTO.setPrecioGratis(adicional.getPrecioGratis());
                        return adicionalDTO;
                    })
                    .collect(Collectors.toSet())
            );
            return dto;
        } catch (Exception e) {
            LOG.error("Error mapping Dispositivo to DispositivoDTO", e);
            System.out.println("Error mapping Dispositivo to DispositivoDTO");
            return null;
        }
    }

    @Mapping(target = "caracteristicas", source = "caracteristicas")
    @Mapping(target = "personalizaciones", source = "personalizaciones")
    @Mapping(target = "adicionales", source = "adicionales")
    @Mapping(target = "removeAdicionales", ignore = true)
    Dispositivo toEntity(DispositivoDTO dispositivoDTO);

    @Named("adicionalId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AdicionalDTO toDtoAdicionalId(Adicional adicional);

    @Named("adicionalIdSet")
    default Set<AdicionalDTO> toDtoAdicionalIdSet(Set<Adicional> adicional) {
        return adicional.stream().map(this::toDtoAdicionalId).collect(Collectors.toSet());
    }
}
