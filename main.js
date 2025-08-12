const apiKey = "0926c0ad684e4b59b36104731251208"; 

document.getElementById("getWeather").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  const weatherDiv = document.getElementById("weather");

  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  weatherDiv.innerHTML = "Loading...";

  fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        weatherDiv.innerHTML = `<p>City not found 😔</p>`;
      } else {
        weatherDiv.innerHTML = `
          <h2>${data.location.name}, ${data.location.country}</h2>
          <img src="https:${data.current.condition.icon}" alt="${data.current.condition.text}">
          <p>Condition: ${data.current.condition.text}</p>
          <p>Temperature: ${data.current.temp_c}°C</p>
          <p>Wind: ${data.current.wind_kph} km/h</p>
          <p>Humidity: ${data.current.humidity}%</p>
        `;
      }
    })
    .catch(err => {
      weatherDiv.innerHTML = `<p>Error occurred 😢</p>`;
      console.error(err);
    });
});
