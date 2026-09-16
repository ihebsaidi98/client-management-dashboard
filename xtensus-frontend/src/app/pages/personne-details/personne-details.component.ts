import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Personne } from 'src/app/models/personne';
import { PersonneService } from 'src/app/personne.service';

@Component({
  selector: 'app-personne-details',
  templateUrl: './personne-details.component.html',
  styleUrls: ['./personne-details.component.scss']
})
export class PersonneDetailsComponent implements OnInit {
  personne: Personne | null = null;
  villeName: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private personneService: PersonneService,
    private router: Router,
  ) { }

  ngOnInit(): void {



      const personneId = this.route.snapshot.paramMap.get('id');
      if (personneId) {
        const id = parseInt(personneId, 10);
        this.personneService.getPersonneById(id).subscribe(
          (personne: Personne) => {
            this.personne = personne;
            console.log('Received personne:', this.personne);

            if (this.personne && this.personne.ville) {
              this.villeName = this.personne.ville.nom;
            }
          },
          (error: any) => {
            console.error('Error fetching personne:', error);
          }
        );


        }}


  goBack(): void {
    this.router.navigate(['/personne']);
  }
}





