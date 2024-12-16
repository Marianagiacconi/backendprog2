package edu.um.alumno.service.dto;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.List;

public class VentaRequestDTO {

    private static Long userId;
    private Long idDispositivo;
    private List<PersonalizacionDTO> personalizaciones;
    private List<AdicionalDTO> adicionales;
    private BigDecimal precioFinal;
    private ZonedDateTime fechaVenta;

    // Getters and Setters
    public Long getIdDispositivo() {
        return idDispositivo;
    }

    public void setIdDispositivo(Long idDispositivo) {
        this.idDispositivo = idDispositivo;
    }

    public static Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public List<PersonalizacionDTO> getPersonalizaciones() {
        return personalizaciones;
    }

    public void setPersonalizaciones(List<PersonalizacionDTO> personalizaciones) {
        this.personalizaciones = personalizaciones;
    }

    public List<AdicionalDTO> getAdicionales() {
        return adicionales;
    }

    public void setAdicionales(List<AdicionalDTO> adicionales) {
        this.adicionales = adicionales;
    }

    public BigDecimal getPrecioFinal() {
        return precioFinal;
    }

    public void setPrecioFinal(BigDecimal precioFinal) {
        this.precioFinal = precioFinal;
    }

    public ZonedDateTime getFechaVenta() {
        return fechaVenta;
    }

    public void setFechaVenta(ZonedDateTime fechaVenta) {
        this.fechaVenta = fechaVenta;
    }

    public static class PersonalizacionDTO {

        private Long id;
        private BigDecimal precioAdicional;

        // Getters and Setters
        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public BigDecimal getPrecioAdicional() {
            return precioAdicional;
        }

        public void setPrecioAdicional(BigDecimal precioAdicional) {
            this.precioAdicional = precioAdicional;
        }
    }

    public static class AdicionalDTO {

        private Long id;
        private BigDecimal precio;

        // Getters and Setters
        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public BigDecimal getPrecio() {
            return precio;
        }

        public void setPrecio(BigDecimal precio) {
            this.precio = precio;
        }
    }
}
