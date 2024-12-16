package edu.um.alumno.repository;

import edu.um.alumno.domain.Personalizacion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Personalizacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PersonalizacionRepository extends JpaRepository<Personalizacion, Long> {}
