package edu.um.alumno.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link edu.um.alumno.domain.Caracteristica} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CaracteristicaDTO implements Serializable {

    private Long id;

    @NotNull
    private String nombre;

    @NotNull
    private String descripcion;

    private DispositivoDTO dispositivo;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public DispositivoDTO getDispositivo() {
        return dispositivo;
    }

    public void setDispositivo(DispositivoDTO dispositivo) {
        this.dispositivo = dispositivo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CaracteristicaDTO)) {
            return false;
        }

        CaracteristicaDTO caracteristicaDTO = (CaracteristicaDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, caracteristicaDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CaracteristicaDTO{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
//            ", dispositivo=" + getDispositivo() +
            "}";
    }
}
