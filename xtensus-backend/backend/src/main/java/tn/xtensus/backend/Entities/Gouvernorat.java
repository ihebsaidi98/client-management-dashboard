package tn.esprit.ihebsaidi.Entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults (level= AccessLevel.PRIVATE)
@Entity

public class Gouvernorat implements Serializable {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    Integer gouverId;
    String nomg;
    String description;


    @JsonIgnore
    @OneToMany(mappedBy = "gouvernorat")
    private Set<Ville> villes;
}
