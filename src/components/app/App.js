import Header from "../header/Header";
import SearchForm from "../main/searchForm/SearchForm";
import Weather from "../main/weather/Weather";
import "./app.scss"

function App() {
  return (
    <div className="App">
      <Header/>
      <main>
        <SearchForm/>
      </main>
    </div>
  );
}

export default App;
