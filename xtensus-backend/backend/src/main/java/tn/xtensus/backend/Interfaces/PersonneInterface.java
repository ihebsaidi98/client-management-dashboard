package tn.esprit.ihebsaidi.Interfaces;

import tn.esprit.ihebsaidi.Entities.Personne;
import tn.esprit.ihebsaidi.Entities.PersonneWithVilleDTO;
import tn.esprit.ihebsaidi.Entities.Ville;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface PersonneInterface {

    Personne ajouterPersonne( Personne personne);

    Personne findPersonneById(Integer id);
    List <Personne> findAllPersonnesWithVille();

  Personne updatePersonne(Integer id, Personne personneDetails);

    void deletePersonne(Integer id);

     Ville getPersonneVille(Integer personneId) ;

     //void ajouterEtAffecterVille(Personne personne, String nom) ;
     void ajouterEtAffecterVille(Personne personne, String nomGouvernorat, String nomVille) ;

        Ville findVilleById( String nom ) ;
     List<String> getAllVilleNames() ;

     byte[] generatePdfForPersonnes(List<Personne> personnes) throws IOException ;

     Optional<PersonneWithVilleDTO> getPersonneWithVille( Integer personneId) ;
     List<Ville> findAllVille() ;


    }
