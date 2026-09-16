import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Personne } from '../models/personne';
import { VilleService } from 'src/app/ville.service';
import { PersonneService } from '../personne.service';
import { Ville } from '../models/ville';

@Component({
  selector: 'app-add-personne-dialog',
  templateUrl: './add-personne-dialog.component.html',
})
export class AddPersonneDialogComponent {
    editingPersonne: any=null;
    personnes: Personne[] = [];


  addPersonneForm = this.fb.group({
    personneNom: ['', Validators.required],
    personnePrenom: ['', Validators.required],
    personneDateNaissance: [null],
    personneMail: ['', [Validators.required, Validators.email]],
    numTel: ['', [Validators.required, Validators.pattern(/^\+216\d{8}$/)]],
  });

  constructor(
    private fb: FormBuilder,
    private villeService: VilleService,
    private personneService: PersonneService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddPersonneDialogComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    console.error("iheeeeeeeeb");
    if (this.addPersonneForm.valid) {
      const newPersonne: Personne = this.addPersonneForm.value;
      console.log("onAddClick");

      this.addPersonne(newPersonne);
      this.dialogRef.close(newPersonne);
    }
    console.error("saidi");
  }


  cancelAdd() {
    this.editingPersonne = {}; // Clear the newPersonne object to reset the form
  }

  newPersonne: Personne = {
    id: 0,
    personneNom: '',
    personnePrenom: '',
    personneDateNaissance: new Date(),
    personneMail: '',
    numTel: '',
    ville:new Ville(), // Assign a default Ville object as an array
  };
  isNumTelValid(): boolean {
    const numTel = this.newPersonne.numTel;
    return /^\+216\d{8}$/.test(numTel);
  }
  isEmailValid(): boolean {
    const email = this.newPersonne.personneMail;
    // Use a basic email pattern or more advanced email validation logic
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
  }
  isFormValid(): boolean {
    return this.isNumTelValid() && this.isEmailValid(); // Add other validation checks as needed
  }



  isNomPrenomNotEmpty(): boolean {
    return this.newPersonne.personneNom.trim() !== '' && this.newPersonne.personnePrenom.trim() !== '';
  }


  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddPersonneDialogComponent, {
      width: '400px', // Adjust width as needed
      data: this.newPersonne // Pass the newPersonne object to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // If the dialog result is valid, you can refresh your list of persons
        this.getPersonnes();
      }
    });
  }


  getPersonnes(): void {
    this.personneService.getAllPersonnes()
      .subscribe(personnes => {
        this.personnes = personnes;

        // Fetch and assign the ville objects for each personne
        for (const personne of this.personnes) {
          this.villeService.getPersonneVilles(personne.id) // Use the correct method to get personne's villes
            .subscribe(villes => {
             // personne.ville = villes; // Assign the retrieved villes to the personne
            },
            error => {
              console.error('Error fetching villes:', error);
            }
            );
        }

        this.editingPersonne = null;
        console.log('iheb');
      });
  }


  addPersonne(newPersonne: Personne): void {
    console.error("chfama");

    if (this.addPersonneForm.valid && this.isNomPrenomNotEmpty()) {
      this.personneService.createPersonne(newPersonne).subscribe(
        (createdPersonne: Personne) => {
          console.log('Personne created:', createdPersonne);
          this.dialogRef.close(createdPersonne);
        },
        (error: any) => {
          console.error('Error creating personne:', error);
        }
      );

      console.error("iheeeeeeeeb");

    }
  }




    isFieldInvalid(fieldName: string): boolean {
      const formControl = this.addPersonneForm.get(fieldName);
      return formControl ? formControl.invalid && formControl.touched : false;
    }
}
