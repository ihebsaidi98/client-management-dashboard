package tn.esprit.ihebsaidi.Services;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.springframework.stereotype.Service;
import tn.esprit.ihebsaidi.Entities.Gouvernorat;
import tn.esprit.ihebsaidi.Entities.Personne;
import tn.esprit.ihebsaidi.Entities.PersonneWithVilleDTO;
import tn.esprit.ihebsaidi.Entities.Ville;
import tn.esprit.ihebsaidi.Interfaces.PersonneInterface;
import tn.esprit.ihebsaidi.Repositories.GouvernoratRepository;
import tn.esprit.ihebsaidi.Repositories.PersonneRepository;
import tn.esprit.ihebsaidi.Repositories.VilleRepository;

import javax.persistence.EntityNotFoundException;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
@Slf4j

public class PersonneService implements PersonneInterface {

     VilleRepository villeRepository;
   GouvernoratRepository gouvernoratRepository;

    PersonneRepository repopersonne;
    @Override
    public Personne ajouterPersonne( Personne personne ) {
        return    repopersonne.save(personne);
    }

    @Override
    public Personne findPersonneById( Integer id ) {
        return repopersonne.findById(id).orElse(null);
    }

    @Override
    public List<Personne> findAllPersonnesWithVille() {
        return repopersonne.findAllWithVille();
    }
    @Override
    public Personne updatePersonne(Integer id, Personne personneDetails) {
        Personne oldpersonne = repopersonne.findById(id).orElse(null);

        if (oldpersonne != null) {
            List<Ville> villes = villeRepository.findVilleByNom(personneDetails.getVille().getNom());

            if (!villes.isEmpty()) {
                Ville existingVille = villes.get(0);

                oldpersonne.setVille(existingVille);
            } else {
            }

            oldpersonne.setPersonneNom(personneDetails.getPersonneNom());
            oldpersonne.setPersonnePrenom(personneDetails.getPersonnePrenom());
            oldpersonne.setPersonneDateNaissance(personneDetails.getPersonneDateNaissance());
            oldpersonne.setPersonneMail(personneDetails.getPersonneMail());
            oldpersonne.setNumTel(personneDetails.getNumTel());

            return repopersonne.save(oldpersonne);
        }

        return null;
    }



    @Override
    public void deletePersonne(Integer id) {
        Personne personneToDelete = repopersonne.findById(id).orElse(null);
        if (personneToDelete != null) {
            repopersonne.delete(personneToDelete);
        } else {
            throw new EntityNotFoundException("Personne with ID " + id + " not found.");
        }
    }



    public Ville getPersonneVille(Integer personneId) {
        Personne personne = repopersonne.findById(personneId).orElse(null);
        if (personne != null && personne.getVille() != null) {
            return personne.getVille();
        }
        return null;
    }






    /*@Override
    public void ajouterEtAffecterVille(Personne personne, String nom) {
        Ville ville = villeRepository.findByNom(nom);

        if (ville != null) {
            personne.setVille(ville);
            repopersonne.save(personne);
            log.info("Personne {} assigned to Ville: {}", personne.getPersonneNom(), ville.getNom());
        } else {
            log.error("Ville with name {} not found.", nom);
        }
    }*/

    @Override
    public void ajouterEtAffecterVille(Personne personne, String nomg, String nomVille) {
        Gouvernorat gouvernorat = gouvernoratRepository.findByNomg(nomg);

        if (gouvernorat != null) {
            Set<Ville> villes = gouvernorat.getVilles();

            for (Ville ville : villes) {
                if (ville.getNom().equals(nomVille)) {
                    personne.setVille(ville);

                    repopersonne.save(personne);
                    log.info("Personne {} assigned to Ville: {} in Gouvernorat: {}", personne.getPersonneNom(), nomVille, nomg);
                    return;
                }
            }

            log.error("Ville with name {} not found in Gouvernorat: {}", nomVille, nomg);
        } else {
            log.error("Gouvernorat with name {} not found.", nomg);
        }
    }


    @Override
    public Ville findVilleById( String nom ) {
        return villeRepository.findByNom(nom);
    }

    public List<Ville> findAllVille() {
        return villeRepository.findAll();
    }



    @Override

    public Optional<PersonneWithVilleDTO> getPersonneWithVille(Integer personneId) {
        Optional<Personne> personneOptional = repopersonne.findById(personneId);

        if (personneOptional.isPresent()) {
            Personne personne = personneOptional.get();
            Ville ville = personne.getVille();

            PersonneWithVilleDTO personneWithVilleDTO = new PersonneWithVilleDTO(personne, ville);

            return Optional.of(personneWithVilleDTO);
        } else {
            return Optional.empty();
        }
    }


    @Override
    public List<String> getAllVilleNames() {
        List<Ville> villes = villeRepository.findAll();
        List<String> villeNames = villes.stream()
                .map(Ville::getNom)
                .collect(Collectors.toList());
        return villeNames;
    }


    @Override

    public byte[] generatePdfForPersonnes(List<Personne> personnes) throws IOException {
        PDDocument document = new PDDocument();
        PDPage page = new PDPage();
        document.addPage(page);

        PDPageContentStream contentStream = new PDPageContentStream(document, page);

        // Définissez la police de caractères que vous souhaitez utiliser
        PDFont font = PDType1Font.HELVETICA_BOLD; // Exemple : Helvetica en gras

        // Générez le contenu du PDF en fonction des données de personnes.
        for (Personne personne : personnes) {
            contentStream.setFont(font, 12); // Définissez la police et la taille

            contentStream.beginText(); // Commencez le texte ici

            contentStream.showText("Nom : " + personne.getPersonneNom());
            contentStream.newLine();
            contentStream.showText("Prénom : " + personne.getPersonnePrenom());
            contentStream.newLine();
            contentStream.showText("Date de Naissance : " + personne.getPersonneDateNaissance());
            contentStream.newLine();
            contentStream.showText("E-mail : " + personne.getPersonneMail());
            contentStream.newLine();
            contentStream.showText("Numéro de Téléphone : " + personne.getNumTel());
            contentStream.newLine();

            // Récupérez la Ville associée à la personne
            Ville ville = personne.getVille();
            if (ville != null) {
                contentStream.showText("Ville : " + ville.getNom());
                contentStream.newLine();
            }

            // Récupérez le Gouvernorat associé à la Ville
            if (ville != null) {
                Gouvernorat gouvernorat = ville.getGouvernorat();
                if (gouvernorat != null) {
                    contentStream.showText("Gouvernorat : " + gouvernorat.getNomg());
                    contentStream.newLine();
                }
            }

            contentStream.endText(); // Terminez le texte ici

            // Ajoutez d'autres attributs de la personne ici.
        }

        contentStream.close();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        document.save(outputStream);
        document.close();

        return outputStream.toByteArray();
    }




}



