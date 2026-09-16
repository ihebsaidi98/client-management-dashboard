package tn.esprit.ihebsaidi.Interfaces;

import tn.esprit.ihebsaidi.Entities.Gouvernorat;

import java.util.List;

public interface GouvernoratInterface {



     Gouvernorat ajouterGouvernorat( Gouvernorat gouvernorat );


     Gouvernorat findGouvernoratById( Integer gouverId ) ;

     List <Gouvernorat> findAllGouvernorats();



     void deleteGouvernorat( Integer gouverId ) ;


     Gouvernorat updateGouvernorat( Integer gouverId,Gouvernorat gouvernoratDetails) ;

     }
