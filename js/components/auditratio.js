google.charts.load('current', {'packages':['corechart']});

const auditRatio = (up, down) => {
    var data = google.visualization.arrayToDataTable([
        ['Audits', 'Count'],
        ['Audits done(kB)', up],
        ['Audits received(kB)', down]
      ])
    
      var options = {
        title: 'Audits done and recieved(kB)',
        backgroundColor: 'transparent',
        pieHole: 0.4,
        colors: ['blue', 'red']
      }
    
      var chart = new google.visualization.PieChart(document.getElementById('graph-2'))
      chart.draw(data, options)
}

export default auditRatio

