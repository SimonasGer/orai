import { fetchName } from "../../../api/fetch"
import Weather from "../weather/Weather";
import { useState, useEffect } from "react";
const SearchForm = () => {
    const [location, setLocation] = useState("")
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [city, setCity] = useState(undefined);
    const [button, setButton] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(false)
                const data = await fetchName();
                setLocations(data);
            } catch (error) {
                setLoading(false)
                console.error("Error fetching locations:", error);
            }
        }
        if (loading){
            fetchData();
        }
    }, [loading])

    useEffect(() => {
        if (location.length > 0){
            setButton(false)
        } else {
            setButton(true)
        }
    }, [location])

    const HandleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        const name = locations.filter((city) => city.name === location.split(",")[0]);
        setCity(name[0]);
        setLocation("")
    }
    return(
        <>
        <form onSubmit={HandleSubmit}>
            <fieldset>
                <input placeholder="Vietovė" list="places" value={location} onChange={(e) => setLocation(e.target.value)}/>
                <datalist id="places">
                {locations.map((city) => (
                        <option value={`${city.name}, ${city.administrativeDivision}`}></option>
                    ))}
                </datalist>
                <button type="submit" disabled={button}>Ieškoti</button>
            </fieldset>
        </form>
        {city && !loading && <Weather city={city} loading={true}/>}
        </>
    )
}

export default SearchForm