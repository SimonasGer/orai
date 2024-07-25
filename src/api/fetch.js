import axios from "axios";

export const fetchName = async () => {
    const promise = axios.get(`https://api.meteo.lt/v1/places`)
    const dataPromise = await promise.then((response) => response.data)
    return dataPromise
}

export const fetchWeather = async (city) => {
    const promise = axios.get(`https://api.meteo.lt/v1/places/${city}/forecasts/long-term`)
    const dataPromise = await promise.then((response) => response.data)
    return dataPromise
}

export const getDate = () => {
    const date = new Date().toLocaleDateString("lt")
    const hours = new Date().getHours();
    return (`${date} ${hours}:00:00`);
}