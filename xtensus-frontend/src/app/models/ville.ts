import { Gouvernorat } from './gouvernorat';
import { Personne } from './personne'; // Import Personne model

export class Ville {
  villeId! : number;
  nom! : string;
  description! : string;
  personnes! : Personne[]; // Assuming you have an array of Personne
  gouvernorat?: any; // Make ville optional and handle null values

}
