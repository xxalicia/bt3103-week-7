import { Bar } from 'vue-chartjs'
import database from '../../firebase.js'

export default {
    extends: Bar,
    data: function () {
        return {
            datacollection: {
                labels: [],
                datasets: [{
                    label: "Total Quantity",
                    backgroundColor: ['#99ebff', '#66e0ff', '#33d6ff', '#00a3cc', '#007a99', '#006680'],
                    data: []
                }]
            },
            options: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Total Number of Each Dish'
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        }
    },
    methods: {
        fetchItems: function () {
          database.collection('orders').get().then(querySnapShot => {
            querySnapShot.forEach(doc => { 
                for (let i = 0; i < doc.data().order.length; i++) {
                    if (this.datacollection.labels.length === 0) {
                        this.datacollection.labels.push(doc.data().order[i].name)
                        this.datacollection.datasets[0].data.push(doc.data().order[i].quantity)
                    } else {
                        for (let j = 0; j < this.datacollection.labels.length; j++) {
                            const curr_label = this.datacollection.labels[j]
                            const curr_item = doc.data().order[i].name

                            if (curr_label == curr_item) {
                                const curr_qty = this.datacollection.datasets[0].data[j]
                                this.datacollection.labels.splice(j, 1);
                                this.datacollection.datasets[0].data.splice(j, 1)
                                this.datacollection.labels.push(doc.data().order[i].name)
                                this.datacollection.datasets[0].data.push(Number(doc.data().order[i].quantity) + Number(curr_qty))
                                break;
                            } else if (j == this.datacollection.labels.length - 1) {
                                this.datacollection.labels.push(doc.data().order[i].name)
                                this.datacollection.datasets[0].data.push(doc.data().order[i].quantity) 
                                break;
                            }
                        }
                    }
                }
            })
            this.renderChart(this.datacollection, this.options)
          })
        }
      },
      created () {
        this.fetchItems()
      }
    }