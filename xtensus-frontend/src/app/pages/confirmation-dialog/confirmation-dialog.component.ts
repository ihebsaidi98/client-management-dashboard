import { Component, OnInit,Inject, EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Personne } from 'src/app/models/personne';
import { PersonneService } from 'src/app/personne.service';
import { VilleService } from 'src/app/ville.service';


@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  personnes: Personne[] = [];
  editingPersonne: any=null;
  @Output() confirmDelete: EventEmitter<void> = new EventEmitter<void>();



  constructor(@Inject(MAT_DIALOG_DATA) public personne: any,    private dialog: MatDialog,private personneService: PersonneService, private villeService: VilleService
  ) { }

  ngOnInit(): void {
    console.log('ConfirmationDialogComponent initialized');

  }
  getPersonnes(): void {
    this.personneService.getAllPersonnes()
      .subscribe(personnes => {
        this.personnes = personnes;


        for (const personne of this.personnes) {
          this.villeService.getPersonneVilles(personne.id)
            .subscribe(villes => {
              //personne.ville = villes;
            },
            error => {
              console.error('Error fetching villes:', error);
            }
            );
        }

        this.editingPersonne = null;
        console.log('iheb');
      });

  }


  deletePersonne(personne: Personne) {
    console.log('Deleting personne:', personne);
    this.personneService.deletePersonne(personne.id).subscribe(() => {
      console.log('Personne deleted successfully');
      this.getPersonnes();
    });
  }
  openConfirmationDialog(personne: Personne): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: personne
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deletePersonne(personne);
      }
    });
  }


}
