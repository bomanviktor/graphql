google.charts.load('current', {'packages':['corechart']});

const timeline = (data) => {
data.sort(function(a,b){
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

const sortedData = data.filter((input) => !input.path.includes("checkpoint"))
.reverse()

let labels = []
let values = []

for (const input of sortedData) {
    console.log(input)
    labels.push(input.path.split("curriculum/")[1])
    values.push(input.amount/1000)
}

var data = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ...labels.map((label, index) => [label, values[index]])
  ]);
  
      var options = {
        title: 'Projects by XP (kB)',
        legend: { position: 'none' },
        chartArea: { width: '50%' },
        hAxis: {
          title: 'Value',
          minValue: 0
        },
        vAxis: {
          title: 'Label'
        }
      };
  
      var chart = new google.visualization.BarChart(document.getElementById('graph-1'));
      chart.draw(data, options);

}

export default timeline

