import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
const [Movies,setMovies]=useState([])
const [isLoading,setisLoading]=useState(false)
  const  fetchdataHandler= async()=>{
    setisLoading(true)
    const responce=await fetch('https://swapi.dev/api/films')
     
      const data=await responce.json()
   
      const Listmovie=data.results.map((item)=>{
        return {
         id:item.episode_id,
         title:item.title,
         releaseDate:item.release_date,
        openingText:item.opening_crawl
        }
      })
      setMovies([...Listmovie])
      setisLoading(false)
      //console.log(data)
    
    console.log('am fetch data')
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchdataHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading&& Movies.length>0&& <MoviesList movies={Movies} />}
        {!isLoading&& Movies.length===0&& <p>No movies Found</p>}
        {isLoading&&<p>Loading.....</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
