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
class Weather {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    fetchWeather(city) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`);
                if (!response.ok) {
                    throw new Error("No weather found.");
                }
                const data = yield response.json();
                this.displayWeather(data);
            }
            catch (error) {
                alert("No weather found.");
                throw new Error("No weather found.");
            }
        });
    }
    displayWeather(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        const cityElement = document.querySelector(".city");
        if (cityElement instanceof HTMLElement) {
            cityElement.innerText = `Weather for ${name}`;
        }
        const iconElement = document.querySelector(".icon");
        if (iconElement !== null) {
            iconElement.src = `https://openweathermap.org/img/wn/${icon}.png`;
        }
        const descriptionElement = document.querySelector(".description");
        if (descriptionElement instanceof HTMLElement) {
            descriptionElement.innerText = description;
        }
        const tempElement = document.querySelector(".temp");
        if (tempElement instanceof HTMLElement) {
            tempElement.innerText = `${temp}°C`;
        }
        const humidityElement = document.querySelector(".humidity");
        if (humidityElement instanceof HTMLElement) {
            humidityElement.innerText = `Humidity: ${humidity}%`;
        }
        const windElement = document.querySelector(".wind");
        if (windElement instanceof HTMLElement) {
            windElement.innerText = `Wind speed: ${speed} km/h`;
        }
        document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}')`;
    }
    search() {
        const searchBar = document.querySelector(".search-bar");
        this.fetchWeather(searchBar.value);
    }
}
const apiKey = "c0c96f6b560d532a74ad73b558a917eb";
const weather = new Weather(apiKey);
const searchButton = document.querySelector(".search button");
if (searchButton instanceof HTMLElement) {
    searchButton.addEventListener("click", function () {
        weather.search();
    });
}
const searchBar = document.querySelector(".search-bar");
if (searchBar instanceof HTMLElement) {
    searchBar.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            weather.search();
        }
    });
}
