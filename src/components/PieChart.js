import { Pie, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
const option = {
  tooltips: {
    callbacks: {
      label: function (tooltipItem, data) {
        var allData = data.datasets[tooltipItem.datasetIndex].data;
        var tooltipLabel = data.labels[tooltipItem.index];
        var tooltipData = allData[tooltipItem.index];
        var total = 0;
        for (var i in allData) {
          total += allData[i];
        }
        var tooltipPercentage = Math.round((tooltipData / total) * 100);
        return tooltipLabel + ': ' + tooltipData + ' (' + tooltipPercentage + '%)';
      }
    }
  },
  legend: {
    position: 'top',
    labels: {
      boxWidth: 15,
      padding: 5,
      fontSize: 10
    }
  }
}
export default {
  extends: Pie,
  props: ['options'],
  mixins: [reactiveProp],
  mounted() {
    this.renderChart(this.chartData, option)
  }
}