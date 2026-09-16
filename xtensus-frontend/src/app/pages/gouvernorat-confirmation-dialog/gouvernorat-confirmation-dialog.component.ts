import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Gouvernorat } from 'src/app/models/gouvernorat';
import { GouvernoratService } from 'src/app/gouvernorat.service';

@Component({
  selector: 'app-gouvernorat-confirmation-dialog',
  templateUrl: './gouvernorat-confirmation-dialog.component.html',
  styleUrls: ['./gouvernorat-confirmation-dialog.component.scss']
})
export class GouvernoratConfirmationDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public gouvernorat: Gouvernorat,
    private dialogRef: MatDialogRef<GouvernoratConfirmationDialogComponent>,
    private gouvernoratService: GouvernoratService
  ) { }




  confirmDelete(): void {
    this.gouvernoratService.deleteGouvernorat(this.gouvernorat.gouverId).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }



}
