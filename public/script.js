
const container= document.querySelector(".container")
const search= document.querySelector(".search-box button")
const weatherBox= document.querySelector(".weather-box")
const weatherDetails= document.querySelector(".weather-details")
const error404= document.querySelector(".not-found")
const cityHide= document.querySelector(".city-hide")
const input = document.querySelector('.search-box input');

const performSearch = () => {


    const city = input.value;
    
    if(city=='')
        return;

    fetch(`/getWeather?city=${city}`)
    .then(response => response.json())
    .then(json => {
        
        if (json.cod == '404'){
            const connectionError= document.querySelector(".not-found p")
            const Errorimage= document.querySelector(".not-found img")
            Errorimage.src = "images/404.png";
            connectionError.innerHTML= "<p>Oops! Location not found!</p>"
            cityHide.textContent = city;
            container.style.height= '400px'
            weatherBox.classList.remove('active')
            weatherDetails.classList.remove('active')
            error404.classList.add('active')
            return;

        }

        
        const image = document.querySelector(".weather-box img")
        const cityName = document.querySelector(".weather-box .city-name")
        const temperature = document.querySelector(".weather-box .temperature")
        const description = document.querySelector(".weather-box .description")
        const humidity = document.querySelector(".weather-details .humidity span")
        const wind = document.querySelector(".weather-details .wind span")

        if(cityHide.textContent == city){
            return;
        }
        else{
            cityHide.textContent=city;
            container.style.height= '555px'
            container.classList.add('active')
            weatherBox.classList.add('active')
            weatherDetails.classList.add('active')
            error404.classList.remove('active')

        setTimeout(() => {
            container.classList.remove('active')
        }, 2500);

        const iconCode = json.weather[0].icon;
        const isDay = iconCode.endsWith('d');

        
        switch (json.weather[0].main) {
            case 'Clear':
                image.src = isDay ? 'images/day/clear.png' : 'images/night/clear1.png';
                break;

            case 'Rain':
                image.src = 'images/day/rain.png';
                break;

            case 'Drizzle':
                image.src = isDay ? 'images/day/drizzle.png' : 'images/night/drizzle.png';
                break;

            case 'Snow':
                image.src = isDay ? 'images/day/snow1.png' : 'images/night/snow.png';
                break;

            case 'Clouds':
                image.src = isDay ? 'images/day/cloud.png' : 'images/night/cloud.png';
                break;

            case 'Mist':
                image.src = isDay ? 'images/day/mist.png' : 'images/night/mist.png';
                break;

            case 'Haze':
                image.src = isDay ? 'images/day/haze.png' : 'images/night/haze.png';
                break;

            case 'Fog':
            case 'Smoke':
                image.src = 'images/day/fog.png';
                break;

            case 'Thunderstorm':
                image.src ='images/day/thunderstorm.png' ;
                break;

            case 'Dust':
            case 'Sand':  
            case 'Ash': 
                image.src ='images/day/dust.png' ;
                break;

            case 'Squall':
            case 'Tornado': 
                image.src ='images/day/tornado.png';
                break;
        
            default:
                image.src = isDay ? 'images/day/cloud.png' : 'images/night/cloud.png';
                break;

        }

        cityName.innerHTML=`${json.name}, ${json.sys.country}`
        temperature.innerHTML=`${parseInt(json.main.temp)}<span>°C</span>`
        description.innerHTML=`${json.weather[0].description}`
        humidity.innerHTML=`${json.main.humidity}%`
        wind.innerHTML=`${parseInt(json.wind.speed)}Km/h`


        const infoWeather = document.querySelector('.info-weather')
        const infoHumidity = document.querySelector('.info-humidity')
        const infoWind = document.querySelector('.info-wind')

        const elCloneInfoWeather = infoWeather.cloneNode(true);
        const elCloneInfoHumidity = infoHumidity.cloneNode(true);
        const elCloneInfoWind = infoWind.cloneNode(true);

        elCloneInfoWeather.id = 'clone-info-weather';
        elCloneInfoWeather.classList.add('active-clone')

        elCloneInfoHumidity.id = 'clone-info-humidity';
        elCloneInfoHumidity.classList.add('active-clone')

        elCloneInfoWind.id = 'clone-info-wind';
        elCloneInfoWind.classList.add('active-clone')

        setTimeout(() => {
        
            infoWeather.insertAdjacentElement("afterend",elCloneInfoWeather)
            infoHumidity.insertAdjacentElement("afterend",elCloneInfoHumidity)
            infoWind.insertAdjacentElement("afterend",elCloneInfoWind)
        }, 2200);

            
       const cloneInfoWeather = document.querySelectorAll('.info-weather.active-clone')
       const totalCloneInfoWeather = cloneInfoWeather.length;
       const cloneInfoWeatherFirst = cloneInfoWeather[0]

       const cloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone')
       const cloneInfoHumidityFirst = cloneInfoHumidity[0]

       const cloneInfoWind = document.querySelectorAll('.info-wind.active-clone')
       const cloneInfoWindFirst = cloneInfoWind[0]

       if(totalCloneInfoWeather > 0){
        cloneInfoWeatherFirst.classList.remove('active-clone')
        cloneInfoHumidityFirst.classList.remove('active-clone')
        cloneInfoWindFirst.classList.remove('active-clone')

        setTimeout(() => {
            cloneInfoWeatherFirst.remove();
            cloneInfoHumidityFirst.remove();
            cloneInfoWindFirst.remove();
            
        }, 2200);

       }
           
        }

    }).catch(err=>{
        console.log("Error"+err);
        const connectionError= document.querySelector(".not-found p")
        const Errorimage= document.querySelector(".not-found img")
        Errorimage.src = "images/connection-lost.png";
        connectionError.innerHTML= "<p>Connection Lost!!</p><p>Please Check Your Internet Connection and Try Again</p>"
        cityHide.textContent = city;
        container.style.height= '450px'
        weatherBox.classList.remove('active')
        weatherDetails.classList.remove('active')
        error404.classList.add('active')
        return;
        
    })
}


// Search button click event
search.addEventListener('click', performSearch);

// Enter key press event
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});


const preloadImages = () => {
    const images = [
        'images/404.png',
        'images/connection-lost.png'
    ];
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
};

window.onload = preloadImages;