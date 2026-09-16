import { Ville } from "./ville";

export class Gouvernorat {
  gouverId!: number;
  nomg!: string;
  description!: string;
  villes?: Ville[]; // Make it optional

}
