import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Gouvernorat } from '../../models/gouvernorat';
import { GouvernoratService } from '../../gouvernorat.service';
@Component({
  selector: 'app-ajout-gouvernorat',
  templateUrl: './ajout-gouvernorat.component.html',
  styleUrls: ['./ajout-gouvernorat.component.scss']
})
export class AjoutGouvernoratComponent implements OnInit {
  gouvernoratForm: FormGroup;

  newGouvernorat: Gouvernorat = {
    gouverId: 0,
    nomg: '',
    description: '',
    villes: []
  };

  constructor(
    private fb: FormBuilder,
    private gouvernoratService: GouvernoratService,
    private router: Router
  ) {
    this.gouvernoratForm = this.fb.group({
      nomg: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {}

  addGouvernorat() {
    if (this.gouvernoratForm.valid) {
      const formValues = this.gouvernoratForm.value as Gouvernorat;
      this.gouvernoratService.addGouvernorat(formValues).subscribe(
        (createdGouvernorat: Gouvernorat) => {
          console.log('Gouvernorat created:', createdGouvernorat);
          this.router.navigate(['/gouvernorats']);
        },
        (error: any) => {
          console.error('Error creating Gouvernorat:', error);
        }
      );
    }
  }

  cancelAdd() {
    this.router.navigate(['/gouvernorats']);
  }
}

