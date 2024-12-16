package edu.um.alumno.repository;

import edu.um.alumno.domain.Caracteristica;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Caracteristica entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CaracteristicaRepository extends JpaRepository<Caracteristica, Long> {}
