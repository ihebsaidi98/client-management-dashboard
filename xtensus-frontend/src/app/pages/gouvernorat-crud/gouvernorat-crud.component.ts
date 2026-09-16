
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Gouvernorat } from '../../models/gouvernorat';
import { GouvernoratService } from '../../gouvernorat.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Subject } from 'rxjs/internal/Subject';
import { GouvernoratConfirmationDialogComponent } from '../gouvernorat-confirmation-dialog/gouvernorat-confirmation-dialog.component';

@Component({
  selector: 'app-gouvernorat-crud',
  templateUrl: './gouvernorat-crud.component.html',
  styleUrls: ['./gouvernorat-crud.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GouvernoratCrudComponent implements OnInit {
  gouvernorats: Gouvernorat[] = [];
  editingGouvernorat: any = null;
  isEditMode: boolean = false;
  addGouvernoratForm: FormGroup = new FormGroup({});
  gouvernoratForm: FormGroup;
  sortKey: string = '';

  title = 'datatables';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private fb: FormBuilder,
    private gouvernoratService: GouvernoratService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.gouvernoratForm = this.fb.group({
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
          targets: [0,1],
          orderable: true,
        },

        {
          targets: [2],
          orderable: false,
        },
      ],
    };

    this.getGouvernorats();
    this.addGouvernoratForm = new FormGroup({
    });
    this.editingGouvernorat = null;
  }

  ngOnDestroy(): void {
    const dataTable = $('#myDataTable').DataTable();
    if (dataTable) {
      dataTable.destroy();
    }
  }



  getGouvernorats(): void {
    this.gouvernoratService.getAllGouvernorats().subscribe((gouvernorats) => {
      this.gouvernorats = gouvernorats;
      this.dtTrigger.next(null);
      this.editingGouvernorat = null;

    });
  }





  openAddDialog(): void {
    this.router.navigate(['/add-gouvernorat']);
  }

  openGouvernoratDetailsPage(id: number): void {
    this.router.navigate(['/gouvernorat-details', id]);
  }


  deleteGouvernorat(gouvernorat: Gouvernorat) {
    this.gouvernoratService.deleteGouvernorat(gouvernorat.gouverId).subscribe(() => {
      $('#myDataTable').DataTable().destroy();
      this.getGouvernorats();
    });
  }






  openConfirmationDialog(gouvernorat: Gouvernorat): void {
    const dialogRef = this.dialog.open(GouvernoratConfirmationDialogComponent, {
      width: '400px',
      data: gouvernorat
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getGouvernorats();
      }
    });
  }


  openUpdateGouvernoratPage(gouvernorat: Gouvernorat): void {
    this.router.navigate(['/update-gouvernorat', gouvernorat.gouverId]);
  }
}
