import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Gouvernorat } from 'src/app/models/gouvernorat';
import { GouvernoratService } from 'src/app/gouvernorat.service';

@Component({
  selector: 'app-gouvernorat-details',
  templateUrl: './gouvernorat-details.component.html',
  styleUrls: ['./gouvernorat-details.component.scss'],
})
export class GouvernoratDetailsComponent implements OnInit {
  gouvernorat: Gouvernorat | null = null;

  constructor(
    private route: ActivatedRoute,
    private gouvernoratService: GouvernoratService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const gouvernoratId = this.route.snapshot.paramMap.get('id');
    if (gouvernoratId) {
      const id = parseInt(gouvernoratId, 10);
      this.gouvernoratService.getGouvernoratById(id).subscribe(
        (gouvernorat: Gouvernorat) => {
          this.gouvernorat = gouvernorat;
          console.log('Received gouvernorat:', this.gouvernorat);
        },
        (error: any) => {
          console.error('Error fetching gouvernorat:', error);
        }
      );
    }
  }

  goBack(): void {
    this.router.navigate(['/gouvernorats']);
  }
}
