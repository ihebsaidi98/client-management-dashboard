import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VilleService } from 'src/app/ville.service';
import { Ville } from 'src/app/models/ville';

@Component({
  selector: 'app-ville-update-component',
  templateUrl: './ville-update-component.component.html',
  styleUrls: ['./ville-update-component.component.scss']
})
export class VilleUpdateComponentComponent implements OnInit {
  updateVilleForm: FormGroup;
  villeId!: number;
  currentGouvernoratName: string = '';
  existingGouvernoratNames: string[] = [];

  selectedGouvernoratName: string = '';

  constructor(
    private villeService: VilleService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.updateVilleForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      gouvernoratName: [''],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.villeId = params['id'];

      this.villeService.getAllGouvernoratNames().subscribe(
        existingGouvernoratNames => {
          console.log('Existing Gouvernorat Names:', existingGouvernoratNames);
          this.existingGouvernoratNames = existingGouvernoratNames;
        },
        error => {
          console.error('Error fetching Gouvernorat names:', error);
        }
      );

      this.villeService.getVilleeById(this.villeId).subscribe(ville => {
        this.currentGouvernoratName = ville.gouvernorat ? ville.gouvernorat.nomg : '';

        this.updateVilleForm.patchValue({
          nom: ville.nom,
          description: ville.description,
          gouvernoratName: this.currentGouvernoratName,
        });
      });
    });
  }

  onUpdateClick(): void {
    if (this.updateVilleForm.valid) {
      const updatedGouvernoratName = this.updateVilleForm.get('gouvernoratName')?.value || '';
      if (this.existingGouvernoratNames.includes(updatedGouvernoratName)) {
        const updatedVille: Ville = {
          ...this.updateVilleForm.value,
          gouvernorat: {
            nomg: updatedGouvernoratName,
          },
        };

        this.villeService.updateVille(this.villeId, updatedVille).subscribe(() => {
          this.router.navigate(['/villes']);
        });
      } else {
        console.log('Selected Gouvernorat name is not in the existing list.');
      }
    }
  }

  onCancelClick(): void {
    this.router.navigate(['/villes']);
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.updateVilleForm.get(controlName);
    return control ? control.hasError(errorName) : false;
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.updateVilleForm.controls[fieldName];
    return field.valid || !field.touched;
  }

  isFormValid(): boolean {
    return this.updateVilleForm.valid;
  }
}
