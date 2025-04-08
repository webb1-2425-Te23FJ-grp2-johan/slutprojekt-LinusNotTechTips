// https://github.com/ArsenTech/source-codes/tree/main/Weather%20App/assets
const weather_codes = {
    0: {
         name: "Clear Sky",
         icons: {
              day: "clear.svg",
              night: "clear-night.svg"
         }
    },
    1: {
         name: "Mainly Clear",
         icons: {
              day: "clear.svg",
              night: "clear-night.svg"
         }
    },
    2: {
         name: "Partly Cloudy",
         icons: {
              day: "partly-cloudy.svg",
              night: "partly-cloudy-night.svg"
         }
    },
    3: {
         name: "Overcast",
         icons: {
              day: "overcast.svg",
              night: "overcast.svg"
         }
    },
    45: {
         name: "Fog",
         icons: {
              day: "fog.svg",
              night: "fog-night.svg"
         }
    },
    48: {
         name: "Rime Fog",
         icons: {
              day: "rime-fog.svg",
              night: "rime-fog.svg"
         }
    },
    51: {
         name: "Light Drizzle",
         icons: {
              day: "light-drizzle.svg",
              night: "light-drizzle.svg"
         }
    },
    53: {
         name: "Moderate Drizzle",
         icons: {
              day: "drizzle.svg",
              night: "drizzle.svg"
         }
    },
    55: {
         name: "Heavy Drizzle",
         icons: {
              day: "heavy-drizzle.svg",
              night: "heavy-drizzle.svg"
         }
    },
    56: {
         name: "Light Freezing Drizzle",
         icons: {
              day: "drizzle.svg",
              night: "drizzle.svg"
         }
    },
    57: {
         name: "Dense Freezing Drizzle",
         icons: {
              day: "heavy-drizzle.svg",
              night: "heavy-drizzle.svg"
         }
    },
    61: {
         name: "Slight Rain",
         icons: {
              day: "slight-rain.svg",
              night: "slight-rain-night.svg"
         }
    },
    63: {
         name: "Moderate Rain",
         icons: {
              day: "rain.svg",
              night: "rain.svg"
         }
    },
    65: {
         name: "Heavy Rain",
         icons: {
              day: "heavy-rain.svg",
              night: "heavy-rain.svg"
         }
    },
    66: {
         name: "Light Freezing Rain",
         icons: {
              day: "rain.svg",
              night: "rain.svg"
         }
    },
    67: {
         name: "Heavy Freezing Rain",
         icons: {
              day: "heavy-rain.svg",
              night: "heavy-rain.svg"
         }
    },
    71: {
         name: "Slight snowfall",
         icons: {
              day: "light-snow.svg",
              night: "light-snow-night.svg"
         }
    },
    73: {
         name: "Moderate snowfall",
         icons: {
              day: "snow.svg",
              night: "snow.svg"
         }
    },
    75: {
         name: "Heavy snowfall",
         icons: {
              day: "heavy-snow.svg",
              night: "heavy-snow.svg"
         }
    },
    77: {
         name: "Snow Grains",
         icons: {
              day: "snow-grains.svg",
              night: "snow-grains.svg"
         }
    },
    80: {
         name: "Slight Rain Showers",
         icons: {
              day: "slight-rain-showers.svg",
              night: "slight-rain-showers-night.svg"
         }
    },
    81: {
         name: "Moderate Rain Showers",
         icons: {
              day: "rain-showers.svg",
              night: "rain-showers.svg"
         }
    },
    82: {
         name: "Violent Rain Showers",
         icons: {
              day: "heavy-rain-showers.svg",
              night: "heavy-rain-showers.svg"
         }
    },
    85: {
         name: "Light Snow Showers",
         icons: {
              day: "light-snow-showers.svg",
              night: "light-snow-showers.svg"
         }
    },
    86: {
         name: "Heavy Snow Showers",
         icons: {
              day: "heavy-snow-showers.svg",
              night: "heavy-snow-showers.svg"
         }
    },
    95: {
         name: "Thunderstorm",
         icons: {
              day: "thunderstorm.svg",
              night: "thunderstorm.svg"
         }
    },
    96: {
         name: "Slight Hailstorm",
         icons: {
              day: "hail.svg",
              night: "hail.svg"
         }
    },
    99: {
         name: "Heavy Hailstorm",
         icons: {
              day: "heavy-hail.svg",
              night: "heavy-hail.svg"
         }
    }
};


const container = document.querySelector(".container");
const inputElement = document.getElementById("input");
const submitElement = document.getElementById("submit");
const weatherConIcon = document.getElementById("weather-condition-icon");
const outputElement1 = document.getElementById("city");
const outputElement2 = document.getElementById("temp");
const outputElement3 = document.getElementById("humid");
const outputElement4 = document.getElementById("wind");

let cityName = "None";

submitElement.addEventListener('click', async e=>{
     e.preventDefault();
     try {
          const weather = await getWeather(inputElement.value);
          const {temperature_2m,relative_humidity_2m,weather_code,is_day,wind_speed_10m} = weather.current;
          const {weather_code: daily_weather_code,temperature_2m_max,temperature_2m_min,time} = weather.daily;
          const weatherCondition = weather_codes[weather_code];
          const imgSrc = `assets/${is_day ? weatherCondition.icons.day : weatherCondition.icons.night}`;
          outputElement1.textContent = "Stad: " + cityName;
          outputElement2.textContent = "Temperatur: " + temperature_2m + "°C";
          outputElement3.textContent = "Fuktighet: " + relative_humidity_2m + "%";
          outputElement4.textContent = "Vindhastighet: " + wind_speed_10m + " km/s";
          weatherConIcon.classList.remove('hidden');
          weatherConIcon.src = imgSrc;
     } catch {
          outputElement1.textContent = "Location Not Found";
     }


});

async function getLocation(location){
    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=en&format=json`);
    const data = await res.json();
    const result = data.results[0];
    cityName = result.name;
    return {
         lat: result.latitude,
         lon: result.longitude
    }
}

async function getWeather(location){
    const {lat,lon} = await getLocation(location);
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min`);
    const data = await res.json();
    console.log(data);
    console.log("Generation time: " + data.generationtime_ms);
    return data;
}







