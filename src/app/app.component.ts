import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

import io from 'socket.io-client';

const socket = io('https://secure-socket-server-production.up.railway.app');

Chart.register(...registerables);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'secure-id-socket';
  ctx = document.getElementById('bar');
  chart!: Chart;

  ngOnInit(): void {
    socket.on('dataset1', (res) => {
      this.updateChartData(this.chart, res, 0);
    });

    socket.on('dataset2', (res) => {
      this.updateChartData(this.chart, res, 1);
    });

    this.createNewDataSet();
  }

  createNewDataSet() {
    this.chart = new Chart('chart', {
      type: 'bar',

      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            type: 'bar',
            label: '1st data set',
            data: [243, 156, 365, 30, 156, 265, 356, 543],
            backgroundColor: 'rgba(255,0,255,0.4)',
            borderColor: 'rgba(255,0,255,0.4)',
            borderWidth: 1,
          },
          {
            type: 'bar',
            label: 'My Second dataset',
            data: [243, 156, 365, 30, 156, 265, 356, 543].reverse(),
            backgroundColor: 'rgba(0,0,255,0.4)',
            borderColor: 'rgba(0,0,255,0.4)',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  updateChartData(chart: Chart, data: any, dataSetIndex: number) {
    chart.data.datasets[dataSetIndex].data = data;
    chart.update();
  }
}
