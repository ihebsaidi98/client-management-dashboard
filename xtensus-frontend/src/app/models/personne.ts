
import { Ville } from './ville';

export class Personne {
    id!: number;
    personneNom!: string;
    personnePrenom!: string;
    personneDateNaissance! : Date;
    personneMail! : string;
    numTel!: string;
    ville?: any; // Make ville optional and handle null values
gouvernorat?:any;
    [key: string]: any; // Index signature

    constructor() {
    }

  }
