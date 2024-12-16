package edu.um.alumno.repository;

import edu.um.alumno.domain.Dispositivo;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface DispositivoRepositoryWithBagRelationships {
    Optional<Dispositivo> fetchBagRelationships(Optional<Dispositivo> dispositivo);

    List<Dispositivo> fetchBagRelationships(List<Dispositivo> dispositivos);

    Page<Dispositivo> fetchBagRelationships(Page<Dispositivo> dispositivos);
}
