package edu.um.alumno.service.dto;

import jakarta.persistence.Lob;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the {@link edu.um.alumno.domain.Dispositivo} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class DispositivoDTO implements Serializable {

    private Long id;

    @NotNull
    private String codigo;

    @NotNull
    private String nombre;

    @Lob
    private String descripcion;

    @NotNull
    private BigDecimal precioBase;

    @NotNull
    private String moneda;

    private Set<AdicionalDTO> adicionales = new HashSet<>();

    private Set<CaracteristicaDTO> caracteristicas;
    private Set<PersonalizacionDTO> personalizaciones;

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

    public BigDecimal getPrecioBase() {
        return precioBase;
    }

    public void setPrecioBase(BigDecimal precioBase) {
        this.precioBase = precioBase;
    }

    public String getMoneda() {
        return moneda;
    }

    public void setMoneda(String moneda) {
        this.moneda = moneda;
    }

    public Set<AdicionalDTO> getAdicionales() {
        return adicionales;
    }

    public void setAdicionales(Set<AdicionalDTO> adicionales) {
        this.adicionales = adicionales;
    }

    public Set<CaracteristicaDTO> getCaracteristicas() {
        return caracteristicas;
    }

    public void setCaracteristicas(Set<CaracteristicaDTO> caracteristicas) {
        this.caracteristicas = caracteristicas;
    }

    public Set<PersonalizacionDTO> getPersonalizaciones() {
        return personalizaciones;
    }

    public void setPersonalizaciones(Set<PersonalizacionDTO> personalizaciones) {
        this.personalizaciones = personalizaciones;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DispositivoDTO that = (DispositivoDTO) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(codigo, that.codigo) &&
            Objects.equals(nombre, that.nombre) &&
            Objects.equals(descripcion, that.descripcion) &&
            Objects.equals(precioBase, that.precioBase) &&
            Objects.equals(moneda, that.moneda) &&
            Objects.equals(caracteristicas, that.caracteristicas) &&
            Objects.equals(personalizaciones, that.personalizaciones) &&
            Objects.equals(adicionales, that.adicionales)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nombre, precioBase, moneda, caracteristicas, personalizaciones, adicionales);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DispositivoDTO{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", precioBase=" + getPrecioBase() +
            ", moneda='" + getMoneda() + "'" +
            ", caracteristicas=" + caracteristicas +
            ", personalizaciones=" + personalizaciones +
            ", adicionales=" + getAdicionales() +
            "}";
    }
}
