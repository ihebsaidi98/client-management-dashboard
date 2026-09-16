import { Component, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Personne } from '../../models/personne';
import { VilleService } from 'src/app/ville.service';
import { PersonneService } from '../../personne.service';
import { Ville } from 'src/app/models/ville';

@Component({
  selector: 'app-personne',
  templateUrl: './personne.component.html',
  styleUrls: ['./personne.component.scss']
})
export class PersonneComponent implements OnInit {

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
  public dialogRef: MatDialogRef<PersonneComponent>
) {}
  ngOnInit(): void {
    console.log('PersonneComponent initialized');

  }





cancelAdd() {
  this.editingPersonne = {};
}

newPersonne: Personne = {
  id: 0,
  personneNom: '',
  personnePrenom: '',
  personneDateNaissance: new Date(),
  personneMail: '',
  numTel: '',
  ville:new Ville()
};
isNumTelValid(): boolean {
  const numTel = this.newPersonne.numTel;
  return /^\+216\d{8}$/.test(numTel);
}
isEmailValid(): boolean {
  const email = this.newPersonne.personneMail;

  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
}
isFormValid(): boolean {
  return this.isNumTelValid() && this.isEmailValid();
}



isNomPrenomNotEmpty(): boolean {
  return this.newPersonne.personneNom.trim() !== '' && this.newPersonne.personnePrenom.trim() !== '';
}


openAddDialog(): void {
  const dialogRef = this.dialog.open(PersonneComponent, {
    width: '400px',
    data: this.newPersonne
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.getPersonnes();
    }
  });
}


getPersonnes(): void {
  this.personneService.getAllPersonnes()
    .subscribe(personnes => {
      this.personnes = personnes;

      for (const personne of this.personnes) {
        this.villeService.getPersonneVilles(personne.id)
          .subscribe(
          error => {
            console.error('Error fetching villes:', error);
          }
          );
      }

      this.editingPersonne = null;
      console.log('iheb');
    });
}




addPersonne() {

    this.personneService.createPersonne(this.newPersonne).subscribe(
      (createdPersonne: Personne) => {
        console.log('Personne created:', createdPersonne);
      },
      (error: any) => {
        console.error('Error creating personne:', error);
      }
    );
  }
}






