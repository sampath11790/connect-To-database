import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
const [Movies,setMovies]=useState([])
  const  fetchdataHandler= async()=>{
    
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
      //console.log(data)
    
    console.log('am fetch data')
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchdataHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={Movies} />
     
      </section>
    </React.Fragment>
  );
}

export default App;
