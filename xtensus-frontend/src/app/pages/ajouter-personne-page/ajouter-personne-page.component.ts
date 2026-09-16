import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Gouvernorat } from 'src/app/models/gouvernorat';
import { Personne } from 'src/app/models/personne';
import { Ville } from 'src/app/models/ville';
import { PersonneService } from 'src/app/personne.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter-personne-page',
  templateUrl: './ajouter-personne-page.component.html',
  styleUrls: ['./ajouter-personne-page.component.scss']
})
export class AjouterPersonnePageComponent implements OnInit {
  personneForm: FormGroup;
  selectedGouvernorat: Gouvernorat | null = null;
  selectedVille: Ville | null = null;
  gouvernorats: Gouvernorat[] = [];
  villes: Ville[] = [];
  filteredVilles: Ville[] = [];

  newPersonne: Personne = {
    id: 0,
    personneNom: '',
    personnePrenom: '',
    personneDateNaissance: new Date(),
    personneMail: '',
    numTel: '',
    ville: '',
  };

  constructor(
    private fb: FormBuilder,
    private personneService: PersonneService,
    private router: Router
  ) {
    this.personneForm = this.fb.group({
      personneNom: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      personnePrenom: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      personneDateNaissance: [''],
      personneMail: ['', [Validators.required, Validators.email]],
      numTel: ['', [Validators.required, Validators.pattern(/^(£?[0-9().+\-\s]{8,20})$/)]],
      selectedGouvernorat: ['', [Validators.required]],
      selectedVille: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.personneService.getAllGouvernorats().subscribe(
      (gouvernorats: Gouvernorat[]) => {
        this.gouvernorats = gouvernorats;
      },
      (error: any) => {
        console.log('Error fetching gouvernorats:', error);
      }
    );

    this.personneService.getAllVilles().subscribe(
      (villes: Ville[]) => {
        this.villes = villes;
      },
      (error: any) => {
        console.log('Error fetching villes:', error);
      }
    );
  }

  onGouvernoratChange(): void {
    const selectedGouvernoratControl = this.personneForm.get('selectedGouvernorat');

    if (selectedGouvernoratControl && selectedGouvernoratControl.value) {
      this.selectedGouvernorat = selectedGouvernoratControl.value as Gouvernorat;

      this.filteredVilles = this.villes.filter(ville => ville.gouvernorat?.nomg === this.selectedGouvernorat?.nomg);

      // Update selectedVille or set it to null
      this.selectedVille = this.filteredVilles.length > 0 ? this.filteredVilles[0] : null;
    } else {
      this.filteredVilles = [];
      this.selectedVille = null;
    }
  }


  addPersonne(): void {
    if (this.personneForm.valid) {
      if (this.selectedGouvernorat !== null && this.selectedVille !== null) {
        const formValues = this.personneForm.value as Personne;
        const nomGouvernorat = this.selectedGouvernorat.nomg;
        const nomVille = this.selectedVille.nom;

        this.personneService
          .createPersonneavecville(formValues, nomGouvernorat, nomVille)
          .subscribe(
            (createdPersonne: Personne) => {
              console.log('Personne created:', createdPersonne);
              this.router.navigate(['/personne']);
            },
            (error: any) => {
              console.error('Error creating personne:', error);
            }
          );
      } else {
        console.error(
          'SelectedGouvernorat or SelectedVille is null or invalid.'
        );
      }
    } else {
      console.error('Form is not valid.');
    }
  }

  isFormValid(): boolean {
    return this.isNumTelValid() && this.isEmailValid();
  }

  isNumTelValid(): boolean {
    const numTel = this.newPersonne.numTel;
    return /^(£?[0-9().+\-\s]{8,20})$/.test(numTel);
  }

  isEmailValid(): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(this.newPersonne.personneMail);
  }

  isNomPrenomNotEmpty(): boolean {
    return this.newPersonne.personneNom.trim() !== '' && this.newPersonne.personnePrenom.trim() !== '';
  }

  cancelAdd() {
    this.router.navigate(['/personne']);
  }
}
