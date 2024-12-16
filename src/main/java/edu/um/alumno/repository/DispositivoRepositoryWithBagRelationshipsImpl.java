package edu.um.alumno.repository;

import edu.um.alumno.domain.Dispositivo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

/**
 * Utility repository to load bag relationships based on https://vladmihalcea.com/hibernate-multiplebagfetchexception/
 */
public class DispositivoRepositoryWithBagRelationshipsImpl implements DispositivoRepositoryWithBagRelationships {

    private static final String ID_PARAMETER = "id";
    private static final String DISPOSITIVOS_PARAMETER = "dispositivos";

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<Dispositivo> fetchBagRelationships(Optional<Dispositivo> dispositivo) {
        return dispositivo.map(this::fetchAdicionales);
    }

    @Override
    public Page<Dispositivo> fetchBagRelationships(Page<Dispositivo> dispositivos) {
        return new PageImpl<>(
            fetchBagRelationships(dispositivos.getContent()),
            dispositivos.getPageable(),
            dispositivos.getTotalElements()
        );
    }

    @Override
    public List<Dispositivo> fetchBagRelationships(List<Dispositivo> dispositivos) {
        return Optional.of(dispositivos).map(this::fetchAdicionales).orElse(Collections.emptyList());
    }

    Dispositivo fetchAdicionales(Dispositivo result) {
        return entityManager
            .createQuery(
                "select dispositivo from Dispositivo dispositivo left join fetch dispositivo.adicionales where dispositivo.id = :id",
                Dispositivo.class
            )
            .setParameter(ID_PARAMETER, result.getId())
            .getSingleResult();
    }

    List<Dispositivo> fetchAdicionales(List<Dispositivo> dispositivos) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, dispositivos.size()).forEach(index -> order.put(dispositivos.get(index).getId(), index));
        List<Dispositivo> result = entityManager
            .createQuery(
                "select dispositivo from Dispositivo dispositivo left join fetch dispositivo.adicionales where dispositivo in :dispositivos",
                Dispositivo.class
            )
            .setParameter(DISPOSITIVOS_PARAMETER, dispositivos)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }
}
