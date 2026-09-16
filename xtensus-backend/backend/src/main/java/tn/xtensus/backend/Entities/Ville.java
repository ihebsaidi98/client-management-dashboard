package tn.esprit.ihebsaidi.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults (level= AccessLevel.PRIVATE)
@Entity
public class Ville implements Serializable {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    Integer villeId;
    String nom;
    String description;

    @JsonIgnore
    @OneToMany(mappedBy = "ville")
    private Set<Personne> personnes;




    @ManyToOne
    private Gouvernorat gouvernorat;
}
