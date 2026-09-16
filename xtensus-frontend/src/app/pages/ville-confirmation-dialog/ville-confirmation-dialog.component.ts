import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Ville } from 'src/app/models/ville';
import { VilleService } from 'src/app/ville.service';

@Component({
  selector: 'app-ville-confirmation-dialog',
  templateUrl: './ville-confirmation-dialog.component.html',
  styleUrls: ['./ville-confirmation-dialog.component.scss']
})
export class VilleConfirmationDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public ville: Ville,
    private dialogRef: MatDialogRef<VilleConfirmationDialogComponent>,
    private villeService: VilleService
  ) { }

  confirmDelete(): void {
    this.villeService.deleteVille(this.ville.villeId).subscribe(() => {

      this.dialogRef.close(true);
      $('#myDataTable').DataTable().destroy();


    });
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }
}
