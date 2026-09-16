// gouvernorat-update.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Gouvernorat } from '../../models/gouvernorat';
import { GouvernoratService } from '../../gouvernorat.service';

@Component({
  selector: 'app-gouvernorat-update',
  templateUrl: './gouvernorat-update.component.html',
  styleUrls: ['./gouvernorat-update.component.scss']
})
export class GouvernoratUpdateComponent implements OnInit {
  updateGouvernoratForm: FormGroup;
  gouverId!: number;

  constructor(
    private gouvernoratService: GouvernoratService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.updateGouvernoratForm = this.fb.group({
      nomg: ['', Validators.required],
      description: ['']
      // Add form controls for other Gouvernorat attributes here
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.gouverId = params['id'];

      if (this.gouverId !== undefined) {
        // Fetch the existing Gouvernorat details and populate the form
        this.gouvernoratService.getGouvernoratById(this.gouverId).subscribe((gouvernorat: Gouvernorat) => {

          this.updateGouvernoratForm.patchValue({
            nomg: gouvernorat.nomg,
            description: gouvernorat.description,
            // Update other form controls with Gouvernorat attributes here
          });
        });
      }
    });
  }

  // Handle form submission and update the Gouvernorat
  onUpdateClick(): void {
    if (this.updateGouvernoratForm.valid) {
      // Prepare the Gouvernorat object to send to the API
      const updatedGouvernorat: Gouvernorat = {
        gouverId: this.gouverId,
        nomg: this.updateGouvernoratForm.get('nomg')?.value || '', // Use the safe navigation operator
        description: this.updateGouvernoratForm.get('description')?.value || '', // Use the safe navigation operator
        // Add other Gouvernorat attributes here
      };

      // Call your GouvernoratService to update the Gouvernorat
      this.gouvernoratService.updateGouvernorat(this.gouverId, updatedGouvernorat).subscribe(() => {
        // Redirect to the Gouvernorat list page after successful update
        this.router.navigate(['/gouvernorats']);
      });
    }
  }

  // Other methods in the component...



  onCancelClick(): void {
    this.router.navigate(['/gouvernorats']);
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.updateGouvernoratForm.get(controlName);
    return control ? control.hasError(errorName) : false;
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.updateGouvernoratForm.controls[fieldName];
    return field.valid || !field.touched;
  }


}
