import React, { useState, useEffect } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [Movies, setMovies] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState(null);
  const fetchdataHandler = async () => {
    setisLoading(true);
    seterror(null);
    try {
      const responce = await fetch("https://swapi.dev/api/film");

      if (!responce.ok) {
        throw new Error("somting went wrong");
      }

      const data = await responce.json();

      const Listmovie = data.results.map((item) => {
        return {
          id: item.episode_id,
          title: item.title,
          releaseDate: item.release_date,
          openingText: item.opening_crawl,
        };
      });
      setMovies([...Listmovie]);
      setisLoading(false);
      //console.log(data)

      console.log("am fetch data");
    } catch (err) {
      seterror(err.message);

      //console.log(err.message)
    }
    setisLoading(false);
  };

  useEffect(() => {
    if (error) {
      seterror("somting went wrong .....Retrying");
      let intervelid = setInterval(() => {
        fetchdataHandler();
        console.log("am re trying ", intervelid);
      }, 5000);

      return () => {
        console.log("am cancel", intervelid);
        clearInterval(intervelid);
      };
    }
  });

  //  }
  const cancelIntervel = () => {
    seterror(null);
    //console.log('am cancel',intervelid)
    // clearInterval(intervelid)
  };

  let Content = <p>No Movies In The List</p>;
  if (Movies.length > 0) {
    Content = <MoviesList movies={Movies} />;
  }
  if (error) {
    Content = <p>{error}</p>;
  }
  if (isLoading == true) {
    Content = <p>Loading.....</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchdataHandler}>Fetch Movies</button>
        <button onClick={cancelIntervel}>Cancel Request</button>
      </section>
      <section>
        {Content}
        {/* {!isLoading&& Movies.length>0&& <MoviesList movies={Movies} />}
        {!isLoading&& Movies.length===0&& <p>No movies Found</p>}
        {isLoading&&<p>Loading.....</p>} */}
      </section>
    </React.Fragment>
  );
}

export default App;
