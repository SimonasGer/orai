import { useEffect, useState } from "react";
import { fetchWeather, getDate } from "../../../api/fetch";

const Weather = (props) => {
    const [loading, setLoading] = useState(props.loading);
    const [times, setTimes] = useState([])
    const [weather, setWeather] = useState({
        forecastTimeUtc: "",
        airTemperature: "",
        feelsLikeTemperature: "",
        windSpeed: "",
        windGust: "",
        windDirection: "",
        cloudCover: "",
        seaLevelPressure: "",
        relativeHumidity: "",
        totalPrecipitation: "",
        conditionCode: ""
    });

    const city = props.city
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(false)
                const data = await fetchWeather(city.code);
                setTimes(data.forecastTimestamps)
                const current = [data.forecastTimestamps][0].filter((stamp) => stamp.forecastTimeUtc === getDate())
                setWeather(current[0])
            } catch (error) {
                setLoading(false)
                console.error("Error fetching locations:", error);
            }  
        }   
        if (loading){
            fetchData();
            
        }
    }, [loading, city.code])
    return(
        <section>
            <h2>{city.name || "ass"}</h2>
            <p>{getDate().slice(0, 13)}h</p>
            <p>{weather.conditionCode}</p>
            <p>{weather.airTemperature} °C</p>
            <div className="scroll">
                {times.map((stamp) => (
                        <p>{stamp.forecastTimeUtc.slice(8)} {stamp.airTemperature} °C</p>
                    ))}
            </div>
            
        </section>
    )
}

export default Weather