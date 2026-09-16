// ajouter-ville-page.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VilleService } from 'src/app/ville.service';
import { GouvernoratService } from 'src/app/gouvernorat.service'; // Import GouvernoratService
import { Gouvernorat } from 'src/app/models/gouvernorat';
import { Ville } from 'src/app/models/ville';


@Component({
  selector: 'app-ajouter-ville-page',
  templateUrl: './ajouter-ville-page.component.html',
  styleUrls: ['./ajouter-ville-page.component.scss']
})
export class AjouterVillePageComponent implements OnInit {
  villeForm: FormGroup;
  gouvernoratList: Gouvernorat[] = []; // List of Gouvernorats

  villeLibelle: string = '';
  villeList:any;
  selectedGouvernorat: any;


  constructor(
    private fb: FormBuilder,
    private villeService: VilleService,
    private router: Router,
    private gouvernoratService: GouvernoratService, // Inject GouvernoratService

  ) {
    this.villeForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      selectedGouvernorat: [null, Validators.required] // Initialize with null value

    });
  }

  ngOnInit(): void {
    this.selectedGouvernorat = { nomg: '' };

  this.gouvernoratService.getAllGouvernorats().subscribe(
    (gouvernorats: Gouvernorat[]) => {
      this.gouvernoratList = gouvernorats;
      console.log('Gouvernorats:', gouvernorats);
    },
    (error: any) => {
      console.error('Error fetching Gouvernorats:', error);
    }
  );
}



  addVille() {
    console.log('selectedGouvernorat:', this.selectedGouvernorat);

    if (this.villeForm.valid && this.selectedGouvernorat && this.selectedGouvernorat.nomg) {
        const formValues = this.villeForm.value as Ville;
        const nomg = this.selectedGouvernorat.nomg;

        this.villeService.createVilleavecGouvernorat(formValues, nomg).subscribe(
            (createdVille: Ville) => {
              console.log('ville created:', createdVille);

                console.log(formValues);
                this.router.navigate(['/villes']);
            },
            (error: any) => {
                console.error('Error creating ville:', error);
            }
        );
    } else {
        console.error('SelectedGouvernorat or its "nomg" property is null.');
    }
}

  isFormValid(): boolean {
    return this.villeForm.valid;
  }

  cancelAdd() {
    this.router.navigate(['/villes']); // Redirect to the Ville list page
  }
}
