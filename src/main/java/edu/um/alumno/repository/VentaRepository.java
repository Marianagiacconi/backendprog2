package edu.um.alumno.repository;

import edu.um.alumno.domain.Venta;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Venta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VentaRepository extends JpaRepository<Venta, Long> {
    //    @Query("select venta from Venta venta where venta.user.login = ?#{authentication.name}")
    //    List<Venta> findByUserIsCurrentUser();

    List<Venta> findByUserId(Long userId);
}
