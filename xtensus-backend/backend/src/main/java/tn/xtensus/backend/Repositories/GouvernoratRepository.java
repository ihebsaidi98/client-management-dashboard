package tn.esprit.ihebsaidi.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.ihebsaidi.Entities.Gouvernorat;
import tn.esprit.ihebsaidi.Entities.Ville;

import java.util.List;


@Repository

public interface GouvernoratRepository extends JpaRepository <Gouvernorat, Integer> {

    Gouvernorat findByNomg( String nomg);


    List<Gouvernorat> findGouvernoratByNomg( String nomg);


}
