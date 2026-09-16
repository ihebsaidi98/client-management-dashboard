import { Component, OnInit ,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Personne } from '../../models/personne';
import { PersonneService } from 'src/app/personne.service';
import { VilleService } from 'src/app/ville.service';

@Component({
  selector: 'app-update-personne-dialog',
  templateUrl: './update-personne-dialog.component.html',
  styleUrls: ['./update-personne-dialog.component.scss']
})
export class UpdatePersonneDialogComponent implements OnInit {
  updatePersonneForm!: FormGroup;
  personnes: Personne[] = [];
  editingPersonne: any=null;


  constructor(private fb: FormBuilder,
    private personneService: PersonneService,
    private villeService: VilleService,
    public dialogRef: MatDialogRef<UpdatePersonneDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Personne) { }

  ngOnInit(): void {
    this.updatePersonneForm = this.fb.group({
      personneNom: [this.data.personneNom, Validators.required],
      personnePrenom: [this.data.personnePrenom, Validators.required],
      personneDateNaissance: [this.data.personneDateNaissance, Validators.required],
      personneMail: [this.data.personneMail, [Validators.required, Validators.email]],
      numTel: [
        null,
        [
          Validators.required,
          Validators.pattern(/^\+\d{1,4}\d{6,14}$/), ], ],
          });
  }

  onUpdateClick(): void {
    if (this.updatePersonneForm.valid) {
      const updatedPersonne: Personne = {
        ...this.data,
        ...this.updatePersonneForm.value
      };
      this.dialogRef.close(updatedPersonne);
    }
  }

  isNumTelValid(): boolean {
    const numTel = this.editingPersonne.numTel;
    return /^\+\d{1,4}\d{6,14}$/.test(numTel);
  }

  isEmailValid(): boolean {
    const email = this.editingPersonne.personneMail;
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
  }
  isFormValid(): boolean {
    return this.isNumTelValid() && this.isEmailValid();
  }

  isNomPrenomNotEmpty(): boolean {
    return this.editingPersonne.personneNom.trim() !== '' && this.editingPersonne.personnePrenom.trim() !== '';
  }


  onCancelClick(): void {
    this.dialogRef.close();
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

  updatePersonne(updatedPersonne: Personne): void {
    this.personneService.updatePersonne(updatedPersonne.id, updatedPersonne)
      .subscribe(() => {
        console.log('Personne updated:', updatedPersonne);
        this.getPersonnes();
      },
      (error: any) => {
        console.error(error);
      });
  }
}
