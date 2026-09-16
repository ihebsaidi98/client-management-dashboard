package tn.esprit.ihebsaidi.Services;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tn.esprit.ihebsaidi.Entities.Gouvernorat;
import tn.esprit.ihebsaidi.Entities.Personne;
import tn.esprit.ihebsaidi.Entities.Ville;
import tn.esprit.ihebsaidi.Interfaces.VilleInterface;
import tn.esprit.ihebsaidi.Repositories.GouvernoratRepository;
import tn.esprit.ihebsaidi.Repositories.VilleRepository;

import java.util.List;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
@Slf4j

public class VilleService implements VilleInterface {

    VilleRepository repville;
GouvernoratRepository repgouv;

    GouvernoratRepository gouvernoratRepository;



    @Override
    public Ville ajouterVille( Ville ville ) {
        return    repville.save(ville);
    }

@Override
    public void ajouterEtAffecterGouvernorat(Ville ville, String nomg) {
        Gouvernorat gouvernorat = gouvernoratRepository.findByNomg(nomg);

        if (gouvernorat != null) {
            ville.setGouvernorat(gouvernorat);
            repville.save(ville);
            log.info("Ville {} assigned to gouvernorat: {}", ville.getNom(), gouvernorat.getNomg());

        } else {
            log.error("Ville with name {} not found.", nomg);

        }
    }

    @Override
    public Ville findVilleById( String nom ) {
        return repville.findByNom(nom);
    }
    @Override
    public Ville updateVille(Integer id, Ville villeDetails) {
        Ville oldville = repville.findById(id).orElse(null);
        if (oldville != null) {
            List <Gouvernorat> gouvernorats = repgouv.findGouvernoratByNomg(villeDetails.getGouvernorat().getNomg());

            if (!gouvernorats.isEmpty()) {
                Gouvernorat existingGouvernorat = gouvernorats.get(0);

                oldville.setGouvernorat(existingGouvernorat);
            } else
                oldville.setNom(villeDetails.getNom());
            oldville.setDescription(villeDetails.getDescription());
        }
            return repville.save(oldville);

        }
    @Override
    public void deleteVille( Integer villeId ) {
        repville.deleteById(villeId);
        log.info("ville deleted");


    }
    @Override
    public Ville findVilleeById( Integer villeId ) {
        return repville.findById(villeId).orElse(null);
    }


    @Override
    public List<String> getAllGouvernoratNames() {
        List<Gouvernorat> gouvernorats = repgouv.findAll();
        List<String> gouvernoratNames = gouvernorats.stream()
                .map(Gouvernorat::getNomg)
                .collect(Collectors.toList());
        return gouvernoratNames;
    }
}