import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Personne } from 'src/app/models/personne';
import { PersonneService } from 'src/app/personne.service';
import { VilleService } from '../../ville.service';
import { Ville } from 'src/app/models/ville';


@Component({
  selector: 'app-personne-update-component',
  templateUrl: './personne-update-component.component.html',
  styleUrls: ['./personne-update-component.component.scss']
})
export class PersonneUpdateComponentComponent implements OnInit {
  updatePersonneForm: FormGroup;
  personneId!: number;
  currentVilleName: string = '';
  existingVilleNames: string[] = [];

  selectedVilleName: string = '';

  constructor(
    private villeService: VilleService,
    private route: ActivatedRoute,
    private personneService: PersonneService,
    private fb: FormBuilder,
    private router: Router,
    ) {
      this.updatePersonneForm = this.fb.group({
        personneNom: ['', Validators.required],
        personnePrenom: ['', Validators.required],
        personneDateNaissance: [''],
        personneMail: ['', [Validators.required, Validators.email]],
        numTel: ['',
        [
          Validators.required,
          Validators.pattern(/^(£?[0-9().+\-\s]{8,20})$/)
        ]
      ],
      villeName: [''],

      });
    }




    ngOnInit(): void {
      this.route.params.subscribe(params => {

        this.personneService.getAllVilleNames().subscribe(
          existingVilleNames => {
            console.log('Existing Ville Names:', existingVilleNames);
            this.existingVilleNames = existingVilleNames;
          },
          error => {
            console.error('Error fetching Ville names:', error);
          }
        );





        this.personneId = params['id'];

        this.personneService.getPersonneById(this.personneId).subscribe(personne => {
          this.currentVilleName = personne.ville ? personne.ville.nom : '';

          this.personneService.getAllVilleNames().subscribe(
            existingVilleNames => {
              console.log('Existing Ville Names:', existingVilleNames);
              this.existingVilleNames = existingVilleNames;
            },
            error => {
              console.error('Error fetching Ville names:', error);
            }
          );
          this.updatePersonneForm.patchValue({
            personneNom: personne.personneNom,
            personnePrenom: personne.personnePrenom,
            personneDateNaissance: personne.personneDateNaissance,
            personneMail: personne.personneMail,
            numTel: personne.numTel,
            villeName: this.currentVilleName,
          });

        });
      });
    }

  newPersonne: Personne = {
    id: 0,
    personneNom: '',
    personnePrenom: '',
    personneDateNaissance: new Date(),
    personneMail: '',
    numTel: '',
    ville: new Ville(),
  };

  initializeForm(personne: Personne): void {
    this.updatePersonneForm = this.fb.group({
      personneNom: ['', Validators.required],
      personnePrenom: ['', Validators.required],
      personneDateNaissance: ['', Validators.required],
      personneMail: ['', [Validators.required, Validators.email]],
      numTel: ['',[Validators.required, Validators.pattern(/^(£?[0-9().+\-\s]{8,20})$/)] ]
    });
  }
  isNumTelValid(): boolean {
    const numTel = this.newPersonne.numTel;
    return /^(£?[0-9().+\-\s]{8,20})$/.test(numTel);
  }
  isEmailValid(): boolean {
    const email = this.newPersonne.personneMail;
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
  }


  hasError(controlName: string, errorName: string): boolean {
    const control = this.updatePersonneForm.get(controlName);
    return control ? control.hasError(errorName) : false;
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.updatePersonneForm.controls[fieldName];
    return field.valid || !field.touched;
  }

  isFormValid(): boolean {
    return this.updatePersonneForm.valid;
  }

  onCancelClick(): void {
    this.router.navigate(['/personne']);
  }


  onUpdateClick(): void {
    if (this.updatePersonneForm.valid ) {
      const updatedVilleName = this.updatePersonneForm.get('villeName')?.value || '';
      if (this.existingVilleNames.includes(updatedVilleName)) {

      const updatedPersonne: Personne = {
        ...this.updatePersonneForm.value,
        ville: {
          nom: updatedVilleName,
        },
      };

      this.personneService.updatePersonne(this.personneId, updatedPersonne).subscribe(() => {
        this.router.navigate(['/personne']);
      });
    }else {
      console.log('Selected Ville name is not in the existing list.');
    }
  }
  }
}
