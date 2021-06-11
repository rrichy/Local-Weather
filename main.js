window.onload = () => {
    navigator.geolocation.getCurrentPosition(pos => {
        let { latitude: lat, longitude: lon } = pos.coords;
        // <defs><style>.cls-1{fill:#404b51;}.cls-2{fill:#fff;}.cls-3{fill:#7a8c9a;}.cls-4{fill:#5acaef;}</style></defs>
        const link = `https://weather-proxy.freecodecamp.rocks/api/current?lat=${lat}&lon=${lon}`;
        
        fetch(link).then(response => response.json())
        .then(data => {
            console.log(data);
            let t_unit = 'C';
            let { dt: time, name: loc, visibility } = data,
                { feels_like: like, humidity, pressure, temp } = data.main,
                { country, sunrise, sunset } = data.sys,
                weather = data.weather[0].main,
                speed = data.wind.speed;
            
            // $('#weather-pic')[0].src = weather.toLowerCase() + '.svg';
            // $('#weather-pic')[0].data = weather.toLowerCase() + '.svg';
            
            switch(weather.toLowerCase()) {
                case 'clear':
                case 'drizzle':
                case 'rain':
                case 'thunderstorm':
                    $('#temp')[0].style.color = '#00354f';
                    break;
                case 'clouds':
                case 'snow':
                    $('#temp')[0].style.color = '#4679a2';
                    break;
                default:
                    // $('#weather-pic')[0].data = 'cloud.svg';
                    $('#temp')[0].style.color = '#4679a2';

            }
                    
                    
            setText('location', loc + ', ' + country);
            setText('temp', temp + '°' + t_unit);
            setText('weather', weather);
            setText('time', 'As of ' + new Date(Date(time)).toLocaleTimeString());
            setText('like', like + '°' + t_unit);
            setText('humidity', humidity + '%');
            setText('pressure', pressure + ' mb');
            setText('speed', speed + ' m/s');
            setText('visibility', (visibility / 1000) + ' km');
            
            let temp_pointer = $('#temp')[0],
            like_pointer = $('#like')[0];
            
            temp_pointer.addEventListener('click', toggleTempUnit);
            like_pointer.addEventListener('click', toggleTempUnit);
                    
            function toggleTempUnit() {
                if(t_unit == 'C'){
                    t_unit = 'F';
                    setText('temp', (temp * 9/5 + 32).toFixed(2) + '°' + t_unit);
                    setText('like', (like * 9/5 + 32).toFixed(2) + '°' + t_unit);
                }
                else {
                    t_unit = 'C';
                    setText('temp', temp + '°' + t_unit);
                    setText('like', like + '°' + t_unit);
                }
            }
        });
                
                
        function setText(id, value) {
            $('#' + id)[0].innerText = value;
        }

    });
            
}
            /* 
switch (desc) {
    case 'drizzle':
      addIcon(desc)
      break;
    
    case 'snow':
      addIcon(desc)
      break;
    
    default:
      $('div.clouds').removeClass('hide');
  }
*/