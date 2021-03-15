import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
        results: [],
        datacollection: {
            labels: [],
            datasets: [{ 
                data: [],
                fill: false, 
                label: 'west',
                borderColor: '#ff1a1a'
            }, 
            { 
              data: [],
              fill: false, 
              label: 'national',
              borderColor: '#ffccff'
            }, 
            { 
              data: [],
              fill: false, 
              label: 'east',
              borderColor: '#ff9933'
            }, 
            { 
              data: [],
              fill: false, 
              label: 'central',
              borderColor: '#33cc33'
            }, 
            { 
              data: [],
              fill: false, 
              label: 'south',
              borderColor: '#33ccff'
            }, 
            { 
              data: [],
              fill: false, 
              label: 'north',
              borderColor: '#9966ff'
            }
          ]
        },
        options: {
            legend: { display: true },
            title: {
              display: true,
              text: 'PSI Twenty Four Hourly (By Region)'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
        axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`).then(response => {
            this.results = response.data.items

            for (let i = 0; i < this.results.length; i++) {
              this.datacollection.labels.push(this.results[i].timestamp)

              const psi_value = this.results[i].readings.psi_twenty_four_hourly
              this.datacollection.datasets[0].data.push(psi_value.west)
              this.datacollection.datasets[1].data.push(psi_value.national)
              this.datacollection.datasets[2].data.push(psi_value.east)
              this.datacollection.datasets[3].data.push(psi_value.central)
              this.datacollection.datasets[4].data.push(psi_value.south)
              this.datacollection.datasets[5].data.push(psi_value.north)
            }
            this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created () {
    this.fetchItems()
  }
}