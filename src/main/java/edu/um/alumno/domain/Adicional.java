package edu.um.alumno.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Adicional.
 */
@Entity
@Table(name = "adicional")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Adicional implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    //    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "nombre", nullable = false)
    private String nombre;

    @NotNull
    @Column(name = "descripcion", nullable = false)
    private String descripcion;

    @NotNull
    @Column(name = "precio", precision = 21, scale = 2, nullable = false)
    private BigDecimal precio;

    @Column(name = "precio_gratis", precision = 21, scale = 2)
    private BigDecimal precioGratis;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "adicionales", cascade = CascadeType.ALL)
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "caracteristicas", "personalizaciones", "adicionales" }, allowSetters = true)
    private Set<Dispositivo> dispositivos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Adicional id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return this.nombre;
    }

    public Adicional nombre(String nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public Adicional descripcion(String descripcion) {
        this.setDescripcion(descripcion);
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public BigDecimal getPrecio() {
        return this.precio;
    }

    public Adicional precio(BigDecimal precio) {
        this.setPrecio(precio);
        return this;
    }

    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }

    public BigDecimal getPrecioGratis() {
        return this.precioGratis;
    }

    public Adicional precioGratis(BigDecimal precioGratis) {
        this.setPrecioGratis(precioGratis);
        return this;
    }

    public void setPrecioGratis(BigDecimal precioGratis) {
        this.precioGratis = precioGratis;
    }

    public Set<Dispositivo> getDispositivos() {
        return this.dispositivos;
    }

    public void setDispositivos(Set<Dispositivo> dispositivos) {
        if (this.dispositivos != null) {
            this.dispositivos.forEach(i -> i.removeAdicionales(this));
        }
        if (dispositivos != null) {
            dispositivos.forEach(i -> i.addAdicionales(this));
        }
        this.dispositivos = dispositivos;
    }

    public Adicional dispositivos(Set<Dispositivo> dispositivos) {
        this.setDispositivos(dispositivos);
        return this;
    }

    public Adicional addDispositivos(Dispositivo dispositivo) {
        this.dispositivos.add(dispositivo);
        dispositivo.getAdicionales().add(this);
        return this;
    }

    public Adicional removeDispositivos(Dispositivo dispositivo) {
        this.dispositivos.remove(dispositivo);
        dispositivo.getAdicionales().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Adicional)) {
            return false;
        }
        return getId() != null && getId().equals(((Adicional) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Adicional{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", precio=" + getPrecio() +
            ", precioGratis=" + getPrecioGratis() +
            "}";
    }
}
