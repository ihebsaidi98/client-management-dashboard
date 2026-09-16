package tn.esprit.ihebsaidi.Interfaces;

import tn.esprit.ihebsaidi.Entities.Personne;
import tn.esprit.ihebsaidi.Entities.Ville;

import java.util.List;

public interface VilleInterface {




    Ville ajouterVille( Ville ville );


     Ville updateVille(Integer id, Ville villeDetails) ;

    void deleteVille( Integer villeId ) ;

     Ville findVilleById( String nom ) ;
     Ville findVilleeById( Integer villeId ) ;
    List <String> getAllGouvernoratNames() ;

     void ajouterEtAffecterGouvernorat(Ville ville, String nomGouvernorat) ;


    }
