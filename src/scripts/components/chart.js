import '../helpers/jquery';
import chartsData from "./charts";
import hexToRGB from "../helpers/hex-rgba-converter";
import Chart from "chart.js";

export default class ChartJS{
  constructor(elements){
    this.elements = elements;
  }

  init(){
    let ratio = 2;
    if($(this.elements).parents('.page-analytics') && $(this.elements).parents('.page-analytics').length){
      ratio = $(window).width() <= 767 ? 2 : 5;
    }


      this.elements.forEach((el, i) => {
      let labelsJSON = chartsData[i].labels;
      let dataJSON = chartsData[i].data;
      let color = chartsData[i].color;
      let ctx = el.getContext("2d");
      let primary = getComputedStyle(document.documentElement).getPropertyValue('--' + color).replace(' ', '').toUpperCase();
      let gradient = ctx.createLinearGradient(0, 0, 0, $(el).parent().height());

      gradient.addColorStop(0, hexToRGB(primary, 0.5));
      gradient.addColorStop(0.95, hexToRGB(primary, 0));
      gradient.addColorStop(1, hexToRGB(primary, 0));

      let data = {
        type: 'line',
        data: {
          labels: labelsJSON,
          datasets: [{
            backgroundColor: gradient,
            borderWidth: 2,
            borderColor: primary,
            borderCapStyle: 'round',
            pointBackgroundColor: "#fff",
            pointBorderWidth: 2,
            pointBorderColor: primary,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointHoverBorderWidth: 2,
            data: dataJSON
          }]
        },
        options: {
          aspectRatio: ratio,
          legend: {
            display: false
          },
          scales: {
            yAxes: [{
              ticks: {
                fontColor: "rgba(0,0,0,0.3)",
                fontStyle: "bold",
                beginAtZero: true,
                maxTicksLimit: 5,
                padding: 10
              },
              gridLines: {
                zeroLineColor: "rgba(0,0,0,0.1)"
              }
            }],
            xAxes: [{
              type: 'category',
              gridLines: {
                drawBorder: false,
                drawTicks: true,
                display: false,
                zeroLineColor: "transparent",
              },
              ticks: {
                padding: 10,
                fontColor: "rgba(0,0,0,0.3)",
                fontStyle: "bold",
              }
            }]
          },
          tooltips: {
            callbacks: {
              title: function () {
              },
              label: function (tooltipItem, data) {
                let dataset = data['datasets'][0];
                let count = dataset['data'][tooltipItem['index']];
                return count + ' visitors';
              },
            },
            backgroundColor: primary,
            titleFontSize: 16,
            titleFontColor: primary,
            bodyFontColor: "#fff",
            bodyFontSize: 16,
            displayColors: false
          }
        }
      };

      return new Chart(ctx, data);
    });
  }
}
