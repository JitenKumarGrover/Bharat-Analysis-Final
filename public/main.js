const form = document.getElementById('vote-form');

form-addEventListener('submit', (e) => {
    const choice = document.querySelector('input[name=os]:checked').value;
    const data = {os: choice};

    fetch('http://localhost:443/poll', {
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-type' : 'application/json'
        })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));

    e.preventDefault();
});

fetch('http://localhost:443/poll')
.then(res => res.json())
.then(data => {
    const votes = data.votes;
    const totalVotes = votes.length; 

    const voteCounts = votes.reduce((acc, vote) => (acc[vote.topic] = (acc[vote.topic] || 0) + parseInt(vote.points)), acc);


    let dataPoints = [
        {label : 'Windows' , y: voteCounts.Windows},
        {label : 'Macos' , y: voteCounts.Macos},
        {label : 'Linux' , y: voteCounts.Linux},
        {label : 'Other' , y: voteCounts.Other},
    ];
    
    const chartContainer = document.querySelector('#chartContainer');
    
    if(chartContainer){
        const chart = new CanvasJS.Chart('chartContainer', {
            animationEnabled: true,
            theme: 'theme1',
            title:{
                text: 'OS Results'
            },
            data: [
                {
                    type: 'column',
                    dataPoints: dataPoints
                }
            ]
        });
        chart.render();
    
        Pusher.logToConsole = true;
    
        var pusher = new Pusher('2cb9668530b26d14ea3e', {
          cluster: 'ap2'
        });
    
        var channel = pusher.subscribe('ba-poll');
        channel.bind('ba-vote', function(data) {
          dataPoints = dataPoints.map(x=> {
              if(x.label == data.os){
                  x.y += data.points;
                  return x;
              } else {
                  return x;
              }
          });
          chart.render();
        });
    }
})

