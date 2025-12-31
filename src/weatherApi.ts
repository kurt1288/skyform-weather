import { fetchWeatherApi } from "openmeteo";

// WMO Weather interpretation codes
const weatherLabels: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Foggy",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snow fall",
  73: "Moderate snow fall",
  75: "Heavy snow fall",
  77: "Snow grains",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};

const url = "https://api.open-meteo.com/v1/forecast";
const params = {
  latitude: 52.52, // Changed by setLocation method
	longitude: 13.41, // Changed by setLocation method
	daily: ["temperature_2m_max", "temperature_2m_min", "precipitation_sum", "precipitation_probability_max", "wind_speed_10m_max", "wind_gusts_10m_max", "wind_direction_10m_dominant"],
	hourly: ["temperature_2m", "wind_speed_10m", "precipitation_probability", "precipitation", "cloud_cover", "wind_direction_10m", "wind_gusts_10m"],
	current: ["temperature_2m", "precipitation", "wind_speed_10m", "cloud_cover", "wind_direction_10m", "apparent_temperature", "wind_gusts_10m", "weather_code", "relative_humidity_2m"],
	timeformat: "unixtime",
	wind_speed_unit: "mph",
	temperature_unit: "fahrenheit",
	precipitation_unit: "inch",
	timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
};

function setLocation(position: GeolocationPosition) {
  params.latitude = position.coords.latitude;
  params.longitude = position.coords.longitude;
}

async function getWeather() {
  const responses = await fetchWeatherApi(url, params);
  const response = responses[0];

  if (!response) return;

  const current = response.current()!;
  const hourly = response.hourly()!;
  const daily = response.daily()!;

  const hourlyArray = {
    time: Array.from(
      { length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() },
      (_, i) => new Date((Number(hourly.time()) + i * hourly.interval()) * 1000)
    ),
    temperature_2m: hourly.variables(0)!.valuesArray(),
    wind_speed_10m: hourly.variables(1)!.valuesArray(),
    precipitation_probability: hourly.variables(2)!.valuesArray(),
    precipitation: hourly.variables(3)!.valuesArray(),
    cloud_cover: hourly.variables(4)!.valuesArray(),
    wind_direction_10m: hourly.variables(5)!.valuesArray(),
    wind_gusts_10m: hourly.variables(6)!.valuesArray(),
  };

  const dailyArray = {
    time: Array.from(
			{ length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() },
			(_, i) => new Date((Number(daily.time()) + i * daily.interval()) * 1000)
		),
		temperature_2m_max: daily.variables(0)!.valuesArray(),
		temperature_2m_min: daily.variables(1)!.valuesArray(),
		precipitation_sum: daily.variables(2)!.valuesArray(),
		precipitation_probability_max: daily.variables(3)!.valuesArray(),
		wind_speed_10m_max: daily.variables(4)!.valuesArray(),
		wind_gusts_10m_max: daily.variables(5)!.valuesArray(),
		wind_direction_10m_dominant: daily.variables(6)!.valuesArray(),
  };

  const weatherData = {
  	current: {
  		time: new Date(Number(current.time())),
  		temperature_2m: current.variables(0)!.value(),
  		precipitation: current.variables(1)!.value(),
  		wind_speed_10m: current.variables(2)!.value(),
  		cloud_cover: current.variables(3)!.value(),
  		wind_direction_10m: current.variables(4)!.value(),
  		apparent_temperature: current.variables(5)!.value(),
      wind_gusts_10m: current.variables(6)!.value(),
      weather_code: current.variables(7)!.value(),
      relative_humidity_2m: current.variables(8)!.value(),
      wmo: weatherLabels[current.variables(7)!.value()],
  	},
   	hourly: hourlyArray.time.map((t, i) => {
      return {
        time: t,
        temp: hourlyArray.temperature_2m![i],
        windSpeed: hourlyArray.wind_speed_10m![i],
        precipProb: hourlyArray.precipitation_probability![i],
        precip: hourlyArray.precipitation![i],
        clouds: hourlyArray.cloud_cover![i],
        windDir: hourlyArray.wind_direction_10m![i],
        gusts: hourlyArray.wind_gusts_10m![i]
      };
    }),
  	daily: dailyArray.time.map((t, i) => {
     return {
       time: t,
       tempMax: dailyArray.temperature_2m_max![i],
       tempMin: dailyArray.temperature_2m_min![i],
       precipTotal: dailyArray.precipitation_sum![i],
       precipChance: dailyArray.precipitation_probability_max![i],
       windMax: dailyArray.wind_speed_10m_max![i],
       gustMax: dailyArray.wind_gusts_10m_max![i],
       windDir: dailyArray.wind_direction_10m_dominant![i],
     };
    }),
  };

  console.log(weatherData);
  return weatherData;
}

export { setLocation, getWeather };
