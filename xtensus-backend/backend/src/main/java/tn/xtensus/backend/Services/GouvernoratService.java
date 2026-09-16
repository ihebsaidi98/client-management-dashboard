package tn.esprit.ihebsaidi.Services;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;
import tn.esprit.ihebsaidi.Entities.Gouvernorat;
import tn.esprit.ihebsaidi.Entities.Personne;
import tn.esprit.ihebsaidi.Entities.Ville;
import tn.esprit.ihebsaidi.Interfaces.GouvernoratInterface;
import tn.esprit.ihebsaidi.Interfaces.PersonneInterface;
import tn.esprit.ihebsaidi.Repositories.GouvernoratRepository;
import tn.esprit.ihebsaidi.Repositories.PersonneRepository;
import tn.esprit.ihebsaidi.Repositories.VilleRepository;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j

public class GouvernoratService  implements GouvernoratInterface {

    VilleRepository villeRepository;
    GouvernoratRepository gouvernoratRepository;

    PersonneRepository repopersonne;

    @Override
    public Gouvernorat ajouterGouvernorat( Gouvernorat gouvernorat ) {
        return    gouvernoratRepository.save(gouvernorat);
    }


    @Override
    public Gouvernorat findGouvernoratById( Integer gouverId ) {
        return gouvernoratRepository.findById(gouverId).orElse(null);
    }

    @Override
    public List <Gouvernorat> findAllGouvernorats() {
        return gouvernoratRepository.findAll();
    }


    @Override
    public void deleteGouvernorat(Integer gouverId) {
        Gouvernorat gouvernorat = gouvernoratRepository.findById(gouverId)
                .orElseThrow(() -> new NotFoundException("Gouvernorat not found"));

        for (Ville ville : gouvernorat.getVilles()) {
            ville.setGouvernorat(null);
            villeRepository.save(ville);
        }

        gouvernoratRepository.delete(gouvernorat);
    }



    @Override
    public Gouvernorat updateGouvernorat( Integer gouverId,Gouvernorat gouvernoratDetails) {
        Gouvernorat oldgouvernorat =  gouvernoratRepository.findById(gouverId).orElse(null);
        oldgouvernorat.setNomg(gouvernoratDetails.getNomg());
        oldgouvernorat.setDescription(gouvernoratDetails.getDescription());
        return gouvernoratRepository.save(oldgouvernorat);
    }

}
