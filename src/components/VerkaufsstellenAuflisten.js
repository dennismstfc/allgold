import {useEffect, useState} from 'react';
import Stations from './Stations';

const VerkaufsstellenAuflisten = () => {
    const [stations, setStations]= useState([]);
    
    useEffect(() => {
        fetch("/stations").then(response =>
          response.json().then(data => {
            setStations(data.stations);
          })
        );
      }, []);


    return (
        <div className="main">
          <p className="home-headline">Verkaustellen auflisten</p>
          <Stations stations={stations} />
        </div>
      );
}
 
export default VerkaufsstellenAuflisten;