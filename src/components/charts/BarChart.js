import { Bar } from 'vue-chartjs'
import database from '../../firebase.js'

export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{
                label: "",  //multiple groups of data
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","rgba(255,221,50,1)"],
                data: []
              }]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Total Number of Each Dish'
            },
            scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }],
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
        let dishdata = {}
        database.collection('orders').get().then(querySnapShot => {
            querySnapShot.forEach(doc => {
                /*for (var key in doc.data()) {
                    alert(key)
                    alert(key in dishdata)
                    alert(doc.data()[key])
                }*/
                for (var dish in doc.data()) {
                    if (dish in dishdata) {
                        dishdata[dish] = dishdata[dish] + doc.data()[dish]
                    }
                    else {
                        dishdata[dish] = doc.data()[dish]
                    }
                }
            })
            for (var dish in dishdata) {
                //alert(dish)
                //alert(dishdata[dish])
                this.datacollection.labels.push(dish);
                this.datacollection.datasets[0].data.push(dishdata[dish])
            }
            this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created () {
    this.fetchItems()
  }
}