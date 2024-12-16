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
 * A Dispositivo.
 */
@Entity
@Table(name = "dispositivo")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Dispositivo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    //    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "codigo", nullable = false)
    private String codigo;

    @NotNull
    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Lob
    @Column(name = "descripcion", nullable = false)
    private String descripcion;

    @NotNull
    @Column(name = "precio_base", precision = 21, scale = 2, nullable = false)
    private BigDecimal precioBase;

    @NotNull
    @Column(name = "moneda", nullable = false)
    private String moneda;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "dispositivo", cascade = CascadeType.ALL)
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "dispositivo" }, allowSetters = true)
    private Set<Caracteristica> caracteristicas = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "dispositivo", cascade = CascadeType.ALL)
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "opciones", "dispositivo" }, allowSetters = true)
    private Set<Personalizacion> personalizaciones = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(
        name = "rel_dispositivo__adicionales",
        joinColumns = @JoinColumn(name = "dispositivo_id"),
        inverseJoinColumns = @JoinColumn(name = "adicionales_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "dispositivos" }, allowSetters = true)
    private Set<Adicional> adicionales = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Dispositivo id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return this.codigo;
    }

    public Dispositivo codigo(String codigo) {
        this.setCodigo(codigo);
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNombre() {
        return this.nombre;
    }

    public Dispositivo nombre(String nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public Dispositivo descripcion(String descripcion) {
        this.setDescripcion(descripcion);
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public BigDecimal getPrecioBase() {
        return this.precioBase;
    }

    public Dispositivo precioBase(BigDecimal precioBase) {
        this.setPrecioBase(precioBase);
        return this;
    }

    public void setPrecioBase(BigDecimal precioBase) {
        this.precioBase = precioBase;
    }

    public String getMoneda() {
        return this.moneda;
    }

    public Dispositivo moneda(String moneda) {
        this.setMoneda(moneda);
        return this;
    }

    public void setMoneda(String moneda) {
        this.moneda = moneda;
    }

    public Set<Caracteristica> getCaracteristicas() {
        return this.caracteristicas;
    }

    public void setCaracteristicas(Set<Caracteristica> caracteristicas) {
        if (this.caracteristicas != null) {
            this.caracteristicas.forEach(i -> i.setDispositivo(null));
        }
        if (caracteristicas != null) {
            caracteristicas.forEach(i -> i.setDispositivo(this));
        }
        this.caracteristicas = caracteristicas;
    }

    public Dispositivo caracteristicas(Set<Caracteristica> caracteristicas) {
        this.setCaracteristicas(caracteristicas);
        return this;
    }

    public Dispositivo addCaracteristicas(Caracteristica caracteristica) {
        this.caracteristicas.add(caracteristica);
        caracteristica.setDispositivo(this);
        return this;
    }

    public Dispositivo removeCaracteristicas(Caracteristica caracteristica) {
        this.caracteristicas.remove(caracteristica);
        caracteristica.setDispositivo(null);
        return this;
    }

    public Set<Personalizacion> getPersonalizaciones() {
        return this.personalizaciones;
    }

    public void setPersonalizaciones(Set<Personalizacion> personalizacions) {
        if (this.personalizaciones != null) {
            this.personalizaciones.forEach(i -> i.setDispositivo(null));
        }
        if (personalizacions != null) {
            personalizacions.forEach(i -> i.setDispositivo(this));
        }
        this.personalizaciones = personalizacions;
    }

    public Dispositivo personalizaciones(Set<Personalizacion> personalizacions) {
        this.setPersonalizaciones(personalizacions);
        return this;
    }

    public Dispositivo addPersonalizaciones(Personalizacion personalizacion) {
        this.personalizaciones.add(personalizacion);
        personalizacion.setDispositivo(this);
        return this;
    }

    public Dispositivo removePersonalizaciones(Personalizacion personalizacion) {
        this.personalizaciones.remove(personalizacion);
        personalizacion.setDispositivo(null);
        return this;
    }

    public Set<Adicional> getAdicionales() {
        return this.adicionales;
    }

    public void setAdicionales(Set<Adicional> adicionals) {
        this.adicionales = adicionals;
    }

    public Dispositivo adicionales(Set<Adicional> adicionals) {
        this.setAdicionales(adicionals);
        return this;
    }

    public Dispositivo addAdicionales(Adicional adicional) {
        this.adicionales.add(adicional);
        return this;
    }

    public Dispositivo removeAdicionales(Adicional adicional) {
        this.adicionales.remove(adicional);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Dispositivo)) {
            return false;
        }
        return getId() != null && getId().equals(((Dispositivo) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Dispositivo{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", precioBase=" + getPrecioBase() +
            ", moneda='" + getMoneda() + "'" +
            "}";
    }
}
