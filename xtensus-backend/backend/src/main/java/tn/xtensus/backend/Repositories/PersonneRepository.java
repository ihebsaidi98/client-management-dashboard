package tn.esprit.ihebsaidi.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import tn.esprit.ihebsaidi.Entities.Personne;
import tn.esprit.ihebsaidi.Entities.Ville;

import java.util.List;

@Repository
public interface PersonneRepository extends JpaRepository <Personne, Integer> {
    @Query ("SELECT p FROM Personne p LEFT JOIN FETCH p.ville")
    List <Personne> findAllWithVille();


}
