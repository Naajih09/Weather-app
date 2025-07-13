const apiKey = "bbc0c96272e6ef3844637c8c4e0e3e45"; 

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const weatherInfo = document.getElementById("weatherInfo");
  const loading = document.getElementById("loading");

  if (!city) {
    weatherInfo.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  loading.style.display = "block";
  weatherInfo.innerHTML = "";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    const html = `
      <p><strong><i class="fas fa-city"></i> City:</strong> ${data.name}</p>
      <img src="${iconUrl}" alt="Weather icon">
      <p><strong><i class="fas fa-thermometer-half"></i> Temperature:</strong> ${data.main.temp} °C</p>
      <p><strong><i class="fas fa-cloud-sun"></i> Condition:</strong> ${data.weather[0].description}</p>
      <p><strong><i class="fas fa-tint"></i> Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong><i class="fas fa-wind"></i> Wind Speed:</strong> ${data.wind.speed} m/s</p>
      <p><strong><i class="fas fa-clock"></i> Updated:</strong> ${new Date().toLocaleString()}</p>
    `;

    weatherInfo.innerHTML = html;
    changeBackground(data.weather[0].main.toLowerCase());
  } catch (error) {
    weatherInfo.innerHTML = `<p>${error.message}</p>`;
  }

  loading.style.display = "none";
}

function changeBackground(condition) {
  let background = "#f4f6f8";

  if (condition.includes("cloud")) background = "#dce3ea";
  else if (condition.includes("rain")) background = "#a3bce2";
  else if (condition.includes("clear")) background = "#ffe47a";
  else if (condition.includes("snow")) background = "#e0f7fa";
  else if (condition.includes("storm")) background = "#9e9e9e";

  document.body.style.backgroundColor = background;
}
