import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
// const option = {
//   tooltips: {
//     enabled:true
//   }
// }
export default {
  extends: Line,
  props: ['chartData', 'options'],
  mixins: [reactiveProp],
  mounted() {
    this.renderChart(this.chartData, this.options)
  }
}