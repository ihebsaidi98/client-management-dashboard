package tn.esprit.ihebsaidi.Controllers;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.ihebsaidi.Entities.*;
import tn.esprit.ihebsaidi.Interfaces.GouvernoratInterface;
import tn.esprit.ihebsaidi.Interfaces.PersonneInterface;
import tn.esprit.ihebsaidi.Interfaces.VilleInterface;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.Set;

//@CrossOrigin(origins = "http://localhost:4200")
@RestController
@AllArgsConstructor
@RequestMapping ("/personne")
@Tag (name = "personne Management")
public class PersonneController {


    PersonneInterface servu;
    VilleInterface servv;

    GouvernoratInterface servg;


    @Operation ( description = "Add personne" )
    @PostMapping ( "/add-personne" )
    public void ajouterPersonne( @RequestBody Personne personne ) {

        servu.ajouterPersonne(personne);
    }


    @Operation ( description = "Find Onepersonne" )
    @GetMapping ( "/un-personne/{id}" )
    public Personne findPersonneById( @PathVariable Integer id ) {
        return servu.findPersonneById(id);
    }

    @Operation ( description = "Delete Onepersonne" )
    @DeleteMapping ( "/delete-personne/{id}" )
    public void supprimerPersonne( @PathVariable Integer id ) {
        servu.deletePersonne(id);
    }

    @Operation ( description = "Update Onepersonne" )
    @PutMapping ( "update-personne/{id}" )
    public Personne updatePersonne( @PathVariable Integer id ,@RequestBody Personne personneDetails ) {
        return servu.updatePersonne(id ,personneDetails);
    }

    @Operation ( description = "Find Allpersonne" )
    @GetMapping ( "/list-personne" )
    public List <Personne> getAllPersonnesWithVille() {
        return servu.findAllPersonnesWithVille();
    }





   /* @Operation ( description = "Add personne and assign ville" )
    @PostMapping ( "/add-personne-and-assign-ville/{nom}" )
    public void ajouterEtAffecterVille( @RequestBody Personne personne ,@PathVariable String nom ) {


        servu.ajouterEtAffecterVille(personne ,nom);

    }*/

    @Operation(description = "Add personne and assign ville")
    @PostMapping("/add-personne-and-assign-ville/{nomGouvernorat}/{nomVille}")
    public void ajouterEtAffecterVille(@RequestBody Personne personne, @PathVariable String nomGouvernorat, @PathVariable String nomVille) {
        servu.ajouterEtAffecterVille(personne, nomGouvernorat, nomVille);
    }





    @Operation ( description = "Find personnewithville" )

    @GetMapping("/{personneId}")
    public ResponseEntity<PersonneWithVilleDTO> getPersonneWithVille(@PathVariable Integer personneId) {
        Optional<PersonneWithVilleDTO> personneWithVilleDTO = servu.getPersonneWithVille(personneId);

        if (personneWithVilleDTO.isPresent()) {
            return ResponseEntity.ok(personneWithVilleDTO.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }





    //------- ville controller-----------//
    @Operation ( description = "Find Allvilles" )
    @GetMapping ( "/list-ville" )
    public List <Ville> getAllVille() {
        return servu.findAllVille();
    }


    @Operation ( description = "Find Oneville" )
    @GetMapping ( "/un-ville/{villeId}" )
    public Ville findvilleeById( @PathVariable Integer villeId ) {
        return servv.findVilleeById(villeId);
    }

    @Operation ( description = "Find villebyname" )

    @GetMapping("/villes/names")

    public ResponseEntity<List<String>> getAllVilleNames() {
        List<String> villeNames = servu.getAllVilleNames();
        return ResponseEntity.ok(villeNames);
    }

    @Operation ( description = "ajouter ville" )
    @PostMapping("/add-ville")
    public Ville ajouterVille(@RequestBody Ville ville) {
        return servv.ajouterVille(ville);
    }


    @Operation ( description = "update ville" )

    @PutMapping("update-ville/{id}")
    public Ville updateVille(@PathVariable Integer id, @RequestBody Ville villeDetails) {
        return servv.updateVille(id, villeDetails);
    }
    @Operation ( description = "supprimer ville" )

    @DeleteMapping("/delete-ville/{villeId}")
    public void supprimerVille(@PathVariable Integer villeId ){
        servv.deleteVille(villeId);
    }


     @Operation ( description = "Add ville and assign gouvernorat" )
    @PostMapping ( "/add-ville-and-assign-gouvernorat/{nomg}" )
    public void ajouterEtAffecterGouvernorat( @RequestBody Ville ville ,@PathVariable String nomg ) {


         servv.ajouterEtAffecterGouvernorat(ville ,nomg);

    }




    //--------gouvernorat controller-----------//


    @Operation ( description = "Find Allgouvernorats" )
    @GetMapping ( "/list-gouvernorat" )
    public List <Gouvernorat> getAllGouvernorat() {
        return servg.findAllGouvernorats();
    }



    @Operation ( description = "Add gouvernorat" )
    @PostMapping ( "/add-gouvernorat" )
    public void ajouterGouvernorat( @RequestBody Gouvernorat gouvernorat ) {

        servg.ajouterGouvernorat(gouvernorat);
    }


    @Operation ( description = "Find Onegouvernorat" )
    @GetMapping ( "/un-gouvernorat/{gouverId}" )
    public Gouvernorat findGouvernoratById( @PathVariable Integer gouverId ) {
        return servg.findGouvernoratById(gouverId);
    }

    @Operation ( description = "Delete Onegouvernorat" )
    @DeleteMapping ( "/delete-gouvernorat/{gouverId}" )
    public void supprimerGouvernorat( @PathVariable Integer gouverId ) {
        servg.deleteGouvernorat(gouverId);
    }


    @Operation ( description = "update gouvernorat" )

    @PutMapping("update-gouvernorat/{gouverId}")
    public Gouvernorat updateVille(@PathVariable Integer gouverId, @RequestBody Gouvernorat gouvernoratDetails) {
        return servg.updateGouvernorat(gouverId, gouvernoratDetails);
    }

    @Operation ( description = "Find gouvernoratbyname" )

    @GetMapping("/gouvernorats/names")

    public ResponseEntity<List<String>> getAllGouvernoratNames() {
        List<String> gouvernoratNames = servv.getAllGouvernoratNames();
        return ResponseEntity.ok(gouvernoratNames);
    }

    @GetMapping("/generate-pdf")
    public ResponseEntity<byte[]> generatePdfForPersonnes() {
        try {
            List<Personne> personnes = servu.findAllPersonnesWithVille();
            byte[] pdfBytes = servu.generatePdfForPersonnes(personnes);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", "personnes.pdf");

            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace(); // Handle the exception appropriately
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
