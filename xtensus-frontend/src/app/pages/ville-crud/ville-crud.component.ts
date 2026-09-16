import { Gouvernorat } from './../../models/gouvernorat';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Ville } from '../../models/ville';
import { VilleService } from '../../ville.service';
import { PersonneService } from '../../personne.service';

import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Subject, takeUntil } from 'rxjs';
import { VilleConfirmationDialogComponent } from '../ville-confirmation-dialog/ville-confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ville-crud',
  templateUrl: './ville-crud.component.html',
  styleUrls: ['./ville-crud.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VilleCrudComponent implements OnInit {
  villes: Ville[] = [];
  editingVille: Ville | null = null;
  isEditMode: boolean = false;
  addVilleForm: FormGroup;
  sortKey: string = '';
  showFiller = false;
  private destroy$: Subject<void> = new Subject<void>();


  title = 'datatables';
  dtOptions: DataTables.Settings = {};
  dtTrigger:Subject<any>= new Subject<any>();

  constructor(
    private fb: FormBuilder,
    private villeService: VilleService,
    private router: Router,
    private dialog: MatDialog,
    private personneService: PersonneService,
    private snackBar: MatSnackBar,

  ) {
    this.addVilleForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      lengthChange: true,
      searching: true,
      ordering: true,
      info: true,
      responsive: true,
      language: {
        search: 'Rechercher:',
        lengthMenu: 'Afficher _MENU_ enregistrements par page',
        info: 'Affichage de _START_ à _END_ sur un total de _TOTAL_ enregistrements',
        paginate: {
          first: 'Premier',
          previous: 'Précédent',
          next: 'Suivant',
          last: 'Dernier',
        },
      },
      columnDefs: [
        {
          targets: [0, 1, 2],
          orderable: true,
        },
        {
          targets: [3],
          orderable: false,
        },
      ],
    };

    this.getVilles();

  }


  // ngOnDestroy(): void {
  //   // Unsubscribe and complete the destroy$ subject to prevent memory leaks
  //   this.destroy$.next();
  //   this.destroy$.complete();
  // }


  newVille: Ville = {
    villeId: 0,
    nom: '',
    description: '',
    personnes: [],
    gouvernorat:new Gouvernorat(),

  };

  /*getVilles(): void {
    // Unsubscribe from previous subscriptions to prevent memory leaks
    this.destroy$.next();

    this.personneService.getAllVilles()
      .pipe(takeUntil(this.destroy$)) // Unsubscribe when the destroy$ subject emits
      .subscribe((villes) => {
        this.villes = villes;

        // Ensure DataTable is initialized if not already
        if (!this.dtTrigger) {
          this.dtTrigger = new Subject<any>();
        } else {
          // Trigger DataTables to refresh data
          this.dtTrigger.next(null);
        }
      });
  }*/
  getVilles(): void {
    this.personneService.getAllVilles()
      .subscribe(villes => {
        this.villes = villes;
        this.dtTrigger.next(null);


        this.editingVille = null;
        console.log('iheb');
      });
  }



  openAddDialog(): void {
    this.router.navigate(['/ajouter-ville']);
  }

  openUpdatePage(ville: Ville): void {
    this.router.navigate(['/update-ville', ville.villeId]);
  }

  openVilleDetailsPage(villeId: number): void {
    this.router.navigate(['/ville-details', villeId]);
  }


  getVilleeById(id: number): void {
    this.villeService.getVilleeById(id).subscribe(
      (ville: Ville) => {
        this.editingVille = ville;
        this.isEditMode = true;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  /*deleteVille(ville: Ville) {
    const dialogRef = this.dialog.open(VilleConfirmationDialogComponent, {
      width: '400px',
      data: ville,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Destroy the DataTable

        this.getVilles(); // Fetch new data


      }
    });
  }*/
  deleteVille(ville: Ville) {
    this.villeService.deleteVille(ville.villeId).subscribe(() => {
      $('#myDataTable').DataTable().destroy();


      this.getVilles();
    });
  }

  openConfirmationDialog(ville: Ville): void {
    console.log('Personne to delete:', ville);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: ville,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteVille(ville);
      }
    });
  }

  private showErrorDialog(title: string, message: string): void {
    this.snackBar.open(message, title, {
      duration: 3000, // Adjust the duration as needed
      verticalPosition: 'top', // or 'bottom'
      horizontalPosition: 'center', // or 'start' | 'end' | 'left' | 'right'
      panelClass: ['error-snackbar'], // You can define custom CSS classes for styling
    });
  }






}
