package edu.um.alumno.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A DTO for the {@link edu.um.alumno.domain.Opcion} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class OpcionDTO implements Serializable {

    private Long id;

    @NotNull
    private String codigo;

    @NotNull
    private String nombre;

    @NotNull
    private String descripcion;

    @NotNull
    private BigDecimal precioAdicional;

    private PersonalizacionDTO personalizacion;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public BigDecimal getPrecioAdicional() {
        return precioAdicional;
    }

    public void setPrecioAdicional(BigDecimal precioAdicional) {
        this.precioAdicional = precioAdicional;
    }

    public PersonalizacionDTO getPersonalizacion() {
        return personalizacion;
    }

    public void setPersonalizacion(PersonalizacionDTO personalizacion) {
        this.personalizacion = personalizacion;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OpcionDTO)) {
            return false;
        }

        OpcionDTO opcionDTO = (OpcionDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, opcionDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "OpcionDTO{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", precioAdicional=" + getPrecioAdicional() +
//            ", personalizacion=" + getPersonalizacion() +
            "}";
    }
}
