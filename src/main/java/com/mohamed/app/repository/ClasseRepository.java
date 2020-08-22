package com.mohamed.app.repository;

import com.mohamed.app.domain.Classe;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Classe entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClasseRepository extends JpaRepository<Classe, Long> {

    @Query("select classe from Classe classe where classe.teacher.login = ?#{principal.username}")
    List<Classe> findByTeacherIsCurrentUser();
}
