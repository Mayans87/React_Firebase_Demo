import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";
function App() {
  const[loading,setloading]=useState(false);
  
  const[Movies,setMovies]=useState([]);
  const [fetchedmovies,setfetchedmovies]=useState(false);
  
  const fetchMoviesHandler = useCallback(() => {
   try{ setloading(true);
    setfetchedmovies(true);

    
    //  fetch("https://swapi.dev/api/films/")
     fetch("https://http-project-655d6-default-rtdb.firebaseio.com/movies.json")
      .then((response) => {
        console.log(response.status); 
        if(!response.ok){
          console.error(response.status)
          throw new Error(response);
        }  //json() converts recieved JSON response object to js object.
        return response.json();   
      })
      .then((data) => {
        const loadedmovies =[];
        for(const key in data){
          loadedmovies.push({
            id:key,
            title:data[key].title,
            openingText:data[key].openingText,
            releaseDate:data[key].releaseDate,
          });
        }
        
        setMovies(loadedmovies);
        setloading(false);
      });}
      catch(err){
        console.log(err);
        
      }
  },[]);
  useEffect(()=>{
    fetchMoviesHandler();
    
},[fetchMoviesHandler]);

async function addMovieHandler(movie){ 
  await fetch("https://http-project-655d6-default-rtdb.firebaseio.com/movies.json",{
  method: 'POST',
  body: JSON.stringify(movie)
  
  //header not necessary.
});
console.log(JSON.stringify("log from json stringify "+movie))}


  return (
    <React.Fragment>
      <section>
      <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!fetchedmovies && <p style={{'fontWeight':'bold'}}>No Movies Yet! Please use Fetch button.</p>}
       {!loading && <MoviesList movies={Movies} />}
       {loading && <p style={{'fontWeight':'bold'}}>Loading....</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
