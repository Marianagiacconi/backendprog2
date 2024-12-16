package edu.um.alumno.service.dto;

import java.math.BigDecimal;
import java.util.List;

public class VentaResponseDTO {

    private static Long idVenta;
    private Long idDispositivo;
    private String codigo;
    private String nombre;
    private String descripcion;
    private BigDecimal precioBase;
    private String moneda;
    private List<CaracteristicaDTO> catacteristicas;
    private List<PersonalizacionDTO> personalizaciones;
    private List<AdicionalDTO> adicionales;

    // Getters and Setters

    public static Long getIdVenta() {
        return idVenta;
    }

    public void setIdVenta(Long idVenta) {
        this.idVenta = idVenta;
    }

    public static class CaracteristicaDTO {

        private Long id;
        private String nombre;
        private String descripcion;
        // Getters and Setters
    }

    public static class PersonalizacionDTO {

        private Long id;
        private String nombre;
        private String descripcion;
        private OpcionDTO opcion;

        // Getters and Setters

        public static class OpcionDTO {

            private Long id;
            private String codigo;
            private String nombre;
            private String descripcion;
            private BigDecimal precioAdicional;
            // Getters and Setters
        }
    }

    public static class AdicionalDTO {

        private Long id;
        private String nombre;
        private String descripcion;
        private BigDecimal precio;
        // Getters and Setters
    }
}
