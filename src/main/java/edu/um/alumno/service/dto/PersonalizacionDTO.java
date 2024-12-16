package edu.um.alumno.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the {@link edu.um.alumno.domain.Personalizacion} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class PersonalizacionDTO implements Serializable {

    private Long id;

    @NotNull
    private String nombre;

    @NotNull
    private String descripcion;

    private DispositivoDTO dispositivo;

    private Set<OpcionDTO> opciones;

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

    public Set<OpcionDTO> getOpciones() {
        return opciones;
    }

    public void setOpciones(Set<OpcionDTO> opciones) {
        this.opciones = opciones;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PersonalizacionDTO)) {
            return false;
        }

        PersonalizacionDTO personalizacionDTO = (PersonalizacionDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, personalizacionDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PersonalizacionDTO{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
//            ", dispositivo=" + getDispositivo() +
            "}";
    }
}
