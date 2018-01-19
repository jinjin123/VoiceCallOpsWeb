import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
const option = {
  scales: {
    yAxes:[{
      ticks: {
        max: 400,
        min:0
      }
    }]
  }
}
export default {
  extends: Line,
  props: ['chartData', 'options'],
  mixins: [reactiveProp],
  mounted() {
    this.renderChart(this.chartData, this.options)
  }
}
