package edu.um.alumno.service.mapper;

import edu.um.alumno.domain.Opcion;
import edu.um.alumno.domain.Personalizacion;
import edu.um.alumno.service.dto.OpcionDTO;
import edu.um.alumno.service.dto.PersonalizacionDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Opcion} and its DTO {@link OpcionDTO}.
 */
@Mapper(componentModel = "spring")
public interface OpcionMapper extends EntityMapper<OpcionDTO, Opcion> {
    @Mapping(target = "personalizacion", source = "personalizacion", qualifiedByName = "personalizacionId")
    OpcionDTO toDto(Opcion s);

    @Named("personalizacionId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    PersonalizacionDTO toDtoPersonalizacionId(Personalizacion personalizacion);
}
