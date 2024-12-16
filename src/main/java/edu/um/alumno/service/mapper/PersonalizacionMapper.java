package edu.um.alumno.service.mapper;

import edu.um.alumno.domain.Dispositivo;
import edu.um.alumno.domain.Personalizacion;
import edu.um.alumno.service.dto.DispositivoDTO;
import edu.um.alumno.service.dto.PersonalizacionDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Personalizacion} and its DTO {@link PersonalizacionDTO}.
 */
@Mapper(componentModel = "spring")
public interface PersonalizacionMapper extends EntityMapper<PersonalizacionDTO, Personalizacion> {
    @Mapping(target = "dispositivo", source = "dispositivo", qualifiedByName = "dispositivoId")
    PersonalizacionDTO toDto(Personalizacion s);

    @Named("dispositivoId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    DispositivoDTO toDtoDispositivoId(Dispositivo dispositivo);
}
