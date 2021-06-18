import { useEffect, useState } from 'react';
import EditStationForm from './EditStationForm';

const VerkaufsstelleBearbeiten = () => {
      
    var station_id = prompt("Gebe Station ID ein!")
    const [station, setStation] = useState([]);

    useEffect(() => {
        fetch("/stations/"+station_id).then(response =>
            response.json().then(data => {
                setStation(data.stations[0]);
            })
        );
    }, []);



      return ( 
        <div className="main">
            <p className="home-headline">{station.location} editieren</p>
            <EditStationForm stationToBeEdited={station}/>
        </div>
     );
}
 
export default VerkaufsstelleBearbeiten;