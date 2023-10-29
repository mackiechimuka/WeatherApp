"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class WeatherApp {
    constructor() { }
    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition.bind(this));
        }
        else {
            alert('Oops could not get your location');
        }
    }
    showPosition(positions) {
        const lat = positions.coords.latitude;
        const long = positions.coords.longitude;
        console.log(lat, long);
        this.fetchWeather(lat, long);
    }
    fetchWeather(latitude, longitude) {
        const apiKey = "c0c96f6b560d532a74ad73b558a917eb";
        const first3rdAp = "https://api.openweathermap.org/data/2.5/weather?lat=";
        const second3rdAp = "&lon=";
        const thirdAp = "&units=metric&appid=";
        const fullApi = first3rdAp + latitude + second3rdAp + longitude + thirdAp + apiKey;
        this.displayWeather(fullApi);
    }
    displayWeather(fullApi) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiData = yield fetch(fullApi);
            const data = yield apiData.json();
            console.log(data);
            const { main, wind, name, weather } = data;
            const cityElement = document.querySelector(".city");
            const iconElement = document.querySelector(".icon");
            const descriptionElement = document.querySelector(".description");
            const tempElement = document.querySelector(".temp");
            const humidityElement = document.querySelector(".humidity");
            const windElement = document.querySelector(".wind");
            cityElement.innerText = "Weather in " + name;
            iconElement.src = "https://openweathermap.org/img/wn/" + weather[0].icon + ".png";
            descriptionElement.innerText = weather[0].description;
            tempElement.innerText = main.temp + "°C";
            humidityElement.innerText = "Humidity: " + main.humidity + "%";
            windElement.innerText = "Wind speed: " + wind.speed + " km/h";
            document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
        });
    }
    initialize() {
        const geoLocButton = document.querySelector(".geoLoc");
        geoLocButton.addEventListener("click", () => {
            this.getLocation();
        });
    }
}
const weatherApp = new WeatherApp();
weatherApp.initialize();
