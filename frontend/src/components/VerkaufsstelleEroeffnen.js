import {useState} from 'react'
import StationForm from './StationForm';

const VerkaufsstelleEroeffnen =() => {
    const [stations, setStations]= useState([]);

    return ( 
        <div>
            <div className="main">
                <p className="home-headline">Verkaufstelle eröffnen </p>
                 <StationForm
                    onNewStation={station =>
                    setStations(currentStations => [station, ...currentStations])
                     }
                  />
            </div>
        </div>
        
     );

}
 
export default VerkaufsstelleEroeffnen;