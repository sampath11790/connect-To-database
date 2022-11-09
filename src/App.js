import React, { useState, useEffect, useCallback } from "react";
import AddMovies from "./components/AddMovies";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [Movies, setMovies] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState(null);

  const fetchdataHandler = useCallback(async () => {
    setisLoading(true);
    seterror(null);
    try {
      const responce = await fetch(
        "https://movies-671f6-default-rtdb.firebaseio.com/movielist.json"
      );

      if (!responce.ok) {
        throw new Error("somting went wrong");
      }

      const data = await responce.json();
      const Loadedarray = [];
      for (const key in data) {
        Loadedarray.push({
          id: key,
          title: data[key].title,
          releaseDate: data[key].date,
          openingText: data[key].openiningText,
        });
      }
      // const Listmovie = data.results.map((item) => {
      //   return {
      //     id: item.episode_id,
      //     title: item.title,
      //     releaseDate: item.release_date,
      //     openingText: item.opening_crawl,
      //   };
      // });
      setMovies([...Loadedarray]);
      setisLoading(false);
      //console.log(data)

      console.log("am fetch data");
    } catch (err) {
      seterror(err.message);

      //console.log(err.message)
    }
    setisLoading(false);
  });

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
  }, []);

  useEffect(() => {
    fetchdataHandler();
  }, []);

  const addMovieHandler = async (movie) => {
    //console.log(movie);
    console.log("am add movie handler");
    const responce = await fetch(
      "https://movies-671f6-default-rtdb.firebaseio.com/movielist.json",

      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const data = await responce.json();
    console.log(data);
  };
  const DeleteHandler = async (id) => {
    try {
      const deleteid = await fetch(
        `https://movies-671f6-default-rtdb.firebaseio.com/movielist/${id}.json`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        }
      );
      console.log(deleteid);
      fetchdataHandler();
    } catch (error) {
      console.log(error);
    }
  };

  const cancelIntervel = () => {
    seterror(null);
    //console.log('am cancel',intervelid)
    // clearInterval(intervelid)
  };

  let Content = <p>No Movies In The List</p>;
  if (Movies.length > 0) {
    Content = (
      <MoviesList movies={Movies} ondeletemovieHandler={DeleteHandler} />
    );
  }
  if (error) {
    Content = <p>{error}</p>;
  }
  if (isLoading === true) {
    Content = <p>Loading.....</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovies onaddmovieHandler={addMovieHandler}></AddMovies>
      </section>
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
