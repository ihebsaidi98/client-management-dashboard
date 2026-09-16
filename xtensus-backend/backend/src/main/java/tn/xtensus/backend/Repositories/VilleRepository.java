package tn.esprit.ihebsaidi.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.ihebsaidi.Entities.Personne;
import tn.esprit.ihebsaidi.Entities.Ville;

import java.util.List;

@Repository

public interface VilleRepository extends JpaRepository <Ville, Integer> {

     Ville findByNom( String nom);
     List<Ville> findVilleByNom( String nom);


}
