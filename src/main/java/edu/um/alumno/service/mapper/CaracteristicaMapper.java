package edu.um.alumno.service.mapper;

import edu.um.alumno.domain.Caracteristica;
import edu.um.alumno.domain.Dispositivo;
import edu.um.alumno.service.dto.CaracteristicaDTO;
import edu.um.alumno.service.dto.DispositivoDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Caracteristica} and its DTO {@link CaracteristicaDTO}.
 */
@Mapper(componentModel = "spring")
public interface CaracteristicaMapper extends EntityMapper<CaracteristicaDTO, Caracteristica> {
    @Mapping(target = "dispositivo", source = "dispositivo", qualifiedByName = "dispositivoId")
    CaracteristicaDTO toDto(Caracteristica s);

    @Named("dispositivoId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    DispositivoDTO toDtoDispositivoId(Dispositivo dispositivo);
}
