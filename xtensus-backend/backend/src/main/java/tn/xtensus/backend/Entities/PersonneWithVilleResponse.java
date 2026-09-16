package tn.esprit.ihebsaidi.Entities;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

public class PersonneWithVilleResponse {

    private Personne personne;
    private Ville ville;

    public PersonneWithVilleResponse(Personne personne, Ville ville) {
        this.personne = personne;
        this.ville = ville;
    }

}
