const appKey = "c237f88f0f286b2232f236aae76a67f4";

const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search-txt');
const cityName = document.querySelector('.city-name');
const cityIcon = document.querySelector('.city-icon');
const temp = document.querySelector('.temp');
const humidityTxt = document.querySelector('.humidity-txt');

searchBtn.addEventListener("click", findWeatherDetails);
searchInput.addEventListener("keyup", enterPressed);

function enterPressed (val) {
  if (val.key === 'Enter') {
    findWeatherDetails();
  }
}

function findWeatherDetails () {
  if (searchInput === '') {

  } else {
    // 前面為 openweather api 的固定格式，q的參數為指定的城市
    const searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid=" + appKey;
    httpRequestAsync(searchLink, theResponse);
  }
}

function theResponse(res) {
  const jsonObject = JSON.parse(res);
  console.log(jsonObject)
  cityName.innerHTML = jsonObject.name;
  cityIcon.src = "http://openweathermap.org/img/w/" + jsonObject.weather[0].icon + ".png";
  temp.innerHTML = parseInt(jsonObject.main.temp - 273) + "°";
  humidityTxt.innerHTML = jsonObject.main.humidity + "%";
}

function httpRequestAsync (url, callback) {
  const httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState === 4 && httpRequest.status === 200) {
      callback(httpRequest.responseText);
    }
  }
  httpRequest.open("GET", url, true);
  httpRequest.send();
}