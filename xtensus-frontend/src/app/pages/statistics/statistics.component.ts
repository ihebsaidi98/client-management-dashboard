import { Component, OnInit } from '@angular/core';
//import { ChartData, ChartType } from 'chart.js';
import { PersonneService } from 'src/app/personne.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  numberOfPersonsPerCity: { ville: string; count: number }[] = [];
  chartLabels: string[] = ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'];
  chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };


  //chartType: ChartType = 'bar'; // Set the chart type to 'bar' or another valid type

 /* chartData: ChartData = {
    labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
    datasets: [
      {
        label: 'Dataset Label',
        data: [10, 20, 30, 40, 50],
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Customize the background color
        borderColor: 'rgba(75, 192, 192, 1)', // Customize the border color
        borderWidth: 1, // Customize the border width
      },
    ],
  };*/


  constructor(
    private personneService: PersonneService,
  ) {}

  ngOnInit(): void {
    this.personneService.getAllPersonnes().subscribe((persons) => {
      this.personneService.getAllVilles().subscribe((villes) => {
        this.numberOfPersonsPerCity = villes.map((ville) => ({
          ville: ville.nom,
          count: persons.filter((personne) => personne.ville?.nom === ville.nom).length,
        }));
      });
    });



  }


}
