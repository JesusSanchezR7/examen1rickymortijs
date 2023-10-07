
import imagenRickMorty from './assets/img/rick.png'
import { useState,useEffect } from 'react'
import './App.css'
import Characters from './components/Characteres'


function App() {
  const [character, setcharacter] = useState(null)
  const [pageNumber, setpageNumber] = useState(0);
  const [buscar,setBuscrar] = useState("");
  const [info, setinfo] = useState(null);
  
  //es de donde se consume la api 
  const Url= "https://rickandmortyapi.com/api/character/?page="+pageNumber+"&name="+buscar;
  
  
 
  
  useEffect(() => {
    if(pageNumber==0){
      return setcharacter(null);
    }
    fetch(Url)
      .then((response) => response.json())
      .then((data) =>{
        if(data.error){
          setcharacter(data.error);
        }else{
          setcharacter(data.results)
          setinfo(data.info)
        }
      } );
  }, [Url]);

  
 

  const reqApi=async() =>{
    const api= await fetch(Url);
    const charactersApi= await api.json();    
    setcharacter(charactersApi.results); 
    setinfo(charactersApi.info);  
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='title'>Informacion de Rick and Mortiii JS </h1>
        
        {
          character ? ( 
            <Characters info={info} setBuscrar={setBuscrar} pageNumber={pageNumber} setpageNumber={setpageNumber} characters={character} setCharacters={setcharacter}/>
          ) : (
            <>
            <img src={imagenRickMorty} className="img-home" alt="Rick & Morty"  />  
            <br/>
             <button onClick={reqApi} className="btn-search" >Buscar</button>           
            </>
           )           
        } 
      </header>            
    </div>
  )
}

export default App
