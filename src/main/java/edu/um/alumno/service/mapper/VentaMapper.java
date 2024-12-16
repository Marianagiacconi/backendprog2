package edu.um.alumno.service.mapper;

import edu.um.alumno.domain.User;
import edu.um.alumno.domain.Venta;
import edu.um.alumno.service.dto.UserDTO;
import edu.um.alumno.service.dto.VentaDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Venta} and its DTO {@link VentaDTO}.
 */
@Mapper(componentModel = "spring")
public interface VentaMapper extends EntityMapper<VentaDTO, Venta> {
    @Mapping(target = "user", source = "user", qualifiedByName = "userId")
    VentaDTO toDto(Venta s);

    @Named("userId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    UserDTO toDtoUserId(User user);
}
