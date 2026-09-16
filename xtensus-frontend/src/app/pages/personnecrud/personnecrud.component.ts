import { Personne } from 'src/app/models/personne';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { PersonneService } from '../../personne.service';
import { VilleService } from '../../ville.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Subject } from 'rxjs/internal/Subject';
import { Ville } from 'src/app/models/ville';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';




@Component({
  selector: 'app-personne-crud',
  templateUrl: './personnecrud.component.html',
  styleUrls: ['./personnecrud.component.scss'],
  encapsulation: ViewEncapsulation.None,


})
export class PersonneCrudComponent implements OnInit {
  personnes: Personne[] = [];
  editingPersonne: any=null;
  isEditMode: boolean = false;
  addPersonneForm: FormGroup = new FormGroup({});
  personneForm: FormGroup;
  sortKey: string = '';
  showFiller = false;


  phonePattern: RegExp = /^\d{12}$/;
  emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;



 title = 'datatables';
  dtOptions: DataTables.Settings = {};
  dtTrigger:Subject<any>= new Subject<any>();





  constructor(private fb: FormBuilder, private personneService: PersonneService,private router: Router, private villeService: VilleService,private dialog: MatDialog) {
    this.personneForm = this.fb.group({
      personneNom: ['', Validators.required],
      personnePrenom: ['', Validators.required],
      personneDateNaissance: [null, Validators.required],
      personneMail: ['', [Validators.required, Validators.email]],
      numTel: ['', [Validators.required, Validators.pattern(/^\d{12}$/)]],


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
          targets: [0, 1, 2, 3, 4, 5],
          orderable: true,
        },
        {
          targets: [6],
          orderable: false,
        },
      ],
    };



    this.getPersonnes();
    this.addPersonneForm = new FormGroup({
      numTel: new FormControl('', [Validators.required, Validators.pattern(this.phonePattern)]),
      personneMail: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    });
    this.editingPersonne = null;

  }


  newPersonne: Personne = {
    id: 0,
    personneNom: '',
    personnePrenom: '',
    personneDateNaissance: new Date(),
    personneMail: '',
    numTel: '',
    ville:new Ville(),
  };

  openPersonneDetailsPage(personneId: number): void {
    this.router.navigate(['/personne', personneId]);
  }


  isNumTelValid(): boolean {
    const numTel = this.newPersonne.numTel;
    return /^\+216\d{8}$/.test(numTel);
  }

  isEmailValid(): boolean {
    const email = this.newPersonne.personneMail;
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
  }
  isFormValid(): boolean {
    return this.isNumTelValid() && this.isEmailValid();
  }

  isNomPrenomNotEmpty(): boolean {
    return this.newPersonne.personneNom.trim() !== '' && this.newPersonne.personnePrenom.trim() !== '';
  }



  openAddDialog(): void {
    this.router.navigate(['/per']);
  }

  getPersonnes(): void {
    this.personneService.getAllPersonnes()
      .subscribe(personnes => {
        this.personnes = personnes;
        this.dtTrigger.next(null);


        this.editingPersonne = null;
        console.log('iheb');
      });
  }


  openUpdatePage(personne: Personne): void {
    this.router.navigate(['/update-personne', personne.id]);
  }

  getPersonneById(id: number): void {
    this.personneService.getPersonneById(id)
      .subscribe(
        (personne: Personne) => {
          this.editingPersonne = personne;
          this.isEditMode = true;

        },
        (error: any) => {
          console.error(error);
        }
      );
  }

  deletePersonne(personne: Personne) {
    this.personneService.deletePersonne(personne.id).subscribe(() => {
      $('#myDataTable').DataTable().destroy();


      this.getPersonnes();
    });
  }
 /* deletePersonne(personne: Personne) {
    // Pass the selected personne to the confirmation dialog
    this.openConfirmationDialog(personne);
  }*/


confirmDeletePersonne(personne: Personne): void {
  const isConfirmed = window.confirm(
    `Voulez-vous vraiment supprimer ${personne.personneNom} ${personne.personnePrenom} ?`
  );

  if (isConfirmed) {
    this.deletePersonne(personne);
  }
}

openConfirmationDialog(personne: Personne): void {
  console.log('Personne to delete:', personne);
  const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    width: '400px',
    data: personne,
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.deletePersonne(personne);
    }
  });
}


/*generatePdf() {
  this.personneService.generatePdfForPersonnes().subscribe(
    (pdfBlob: Blob) => {
      const blobUrl = URL.createObjectURL(pdfBlob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'personnes.pdf';
      link.click();

      URL.revokeObjectURL(blobUrl);
    },
    error => {
      console.error('Error generating PDF:', error);
    }
  );
}*/


// ...

generatePdf() {
  const doc = new jsPDF.default();

  const headerText = '                                     Personne List';
  const headerX = 30;
  const headerY = 20;
  const headerFontSize = 14;

  const footerX = 10;
  const footerFontSize = 10;

  const leftLogoImageUrl = 'assets/logo-left.png';
  const leftLogoWidth = 20;
  const leftLogoHeight = 20;
  doc.addImage(leftLogoImageUrl, 'PNG', 10, 10, leftLogoWidth, leftLogoHeight);

  const rightLogoImageUrl = 'assets/logo-right.png';
  const rightLogoWidth = 30;
  const rightLogoHeight = 20;
  const pageWidth = doc.internal.pageSize.width;
  const rightLogoX = pageWidth - 10 - rightLogoWidth;
  doc.addImage(rightLogoImageUrl, 'PNG', rightLogoX, 10, rightLogoWidth, rightLogoHeight);

  const columns = ['Nom', 'Prénom', 'Date', 'E-mail', 'NumTel', 'Ville', 'Gouvernorat'];
  const rows: any[] = [];

  this.personnes.forEach(personne => {
    const parsedDate = new Date(personne.personneDateNaissance);
    const formattedDate = parsedDate.toLocaleDateString('fr-FR');

    rows.push([
      personne.personneNom,
      personne.personnePrenom,
      formattedDate,
      personne.personneMail,
      personne.numTel,
      personne.ville ? personne.ville.nom : '',
      personne.ville && personne.ville.gouvernorat ? personne.ville.gouvernorat.nomg : ''
    ]);
  });

  const fontSize = 8;

  doc.setFontSize(headerFontSize);
  doc.text(headerText, headerX, headerY);
  doc.setLineWidth(0.5);
  doc.setLineHeightFactor(4);

  doc.line(headerX, headerY + headerFontSize, pageWidth - rightLogoWidth - 20, headerY + headerFontSize); // Extend the line

  const totalFooterHeight = Math.max(leftLogoHeight, rightLogoHeight, 7) + 10;

  const footerY = doc.internal.pageSize.height - totalFooterHeight;

  const addressLogoImageUrl = 'assets/address-logo.png';
  const addressLogoWidth = 7;
  const addressLogoHeight = 7;
  doc.addImage(addressLogoImageUrl, 'PNG', footerX, footerY, addressLogoWidth, addressLogoHeight);

  const addressText = 'Address: 123 ariana soghra, Ariana';
  doc.setFontSize(footerFontSize);
  doc.text(addressText, footerX + addressLogoWidth + 5, footerY + 12);

  const emailLogoImageUrl = 'assets/email-logo.png';
  const emailLogoWidth = 7;
  const emailLogoHeight = 7;
  doc.addImage(emailLogoImageUrl, 'PNG', footerX, footerY + addressLogoHeight + 8, emailLogoWidth, emailLogoHeight +1);

  const emailText = 'Email: saidi.iheb@esprit.tn';
  doc.setFontSize(footerFontSize);
  doc.text(emailText, footerX + emailLogoWidth + 6, footerY + addressLogoHeight + 11);

  (doc as any).autoTable({
    head: [columns],
    body: rows,
    startY: headerY + headerFontSize + 15,
    styles: {
      fontSize: fontSize,
      cellPadding: 5,
      overflow: 'linebreak',
    },
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { cellWidth: 'auto' },
      2: { cellWidth: 'auto' },
      3: { cellWidth: 'auto' },
      4: { cellWidth: 'auto' },
      5: { cellWidth: 'auto' },
      6: { cellWidth: 'auto' }
    },
  });

  doc.save('personnes.pdf');
}





}
