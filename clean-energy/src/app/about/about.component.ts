import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Data } from '@angular/router';
import { DataService, IRecentinnovations } from '../data.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'pb-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  chart: any = []
  constructor(private dataService:DataService) {}
  dataSource: any = {
    datasets: [
        {
            data: [],
            label: 'Expense in recent innovations in billions ',
            backgroundColor: [
              '#ffcd56',
              '#ff6384',
              '#36a2eb',
              '#fd6b19',
              '#ffe633',
              '#74ff33',
              '#da33ff'
          ],
            hoverOffset: 4
        },
    ],
    labels: [],
};
  ngOnInit(): void {
    this.dataService.getRecentinnovations()
    .subscribe({
      next: (response) => {
        let i =0;
        response.forEach((res) => {
          this.dataSource.datasets[0].data[i] = res.expense;
          this.dataSource.labels[i] = res.tech;
          i++;
        })
        console.log(this.dataSource);
        this.createChart();

      },
      error: (err) => {
        console.log("error in getting data")
      },
    });
  }



   createChart() {
    this.chart = new Chart("MyChart", {
      type: 'pie', //this denotes tha type of chart

      data: this.dataSource,
      options: {
        aspectRatio:2.5
      }

    });
  }

}
