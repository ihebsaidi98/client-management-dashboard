package tn.esprit.ihebsaidi.Entities;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PersonneWithVilleDTO {
    private Personne personne;
    private Ville ville;

    public PersonneWithVilleDTO(Personne personne, Ville ville) {
        this.personne = personne;
        this.ville = ville;
    }
}
