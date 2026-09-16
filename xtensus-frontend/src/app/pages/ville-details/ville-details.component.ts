import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ville } from 'src/app/models/ville';
import { VilleService } from 'src/app/ville.service';

@Component({
  selector: 'app-ville-details',
  templateUrl: './ville-details.component.html',
  styleUrls: ['./ville-details.component.scss']
})
export class VilleDetailsComponent implements OnInit {
  ville: Ville | null = null;

  constructor(
    private route: ActivatedRoute,
    private villeService: VilleService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const villeId = this.route.snapshot.paramMap.get('id');
    if (villeId) {
      const id = parseInt(villeId, 10);
      this.villeService.getVilleeById(id).subscribe(
        (ville: Ville) => {
          this.ville = ville;
          console.log('Received ville:', this.ville);
        },
        (error: any) => {
          if (error.status === 404) {
            // Handle 404 error, e.g., display a "Ville not found" message
          } else {
            console.error('Error fetching ville:', error);
            // Handle other error cases
          }
        }
      );

    }
  }

  goBack(): void {
    this.router.navigate(['/villes']);
  }
}
