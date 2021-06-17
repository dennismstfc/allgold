import {useEffect, useState} from 'react';
import Stations from './Stations';
import {Table, Input} from 'semantic-ui-react';

const VerkaufsstellenAuflisten = () => {
    const [stations, setStations]= useState([]);
    
    useEffect(() => {
        fetch("/stations").then(response =>
          response.json().then(data => {
            setStations(data.stations);
            console.log(data.stations)
          })
        );
      }, []);

    function deleteStation(stationID){
        alert(stationID)
        fetch('/stations/'+stationID,{
            method: 'DELETE',
            header:{'Content-Type': 'application/json',
                    'Accept': 'application/json'
                    }
        })
    };

    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="main">
          <p className="home-headline">Verkaufsstellen auflisten</p>
          <Input
            placeholder='Suche Station'
            onChange={event => {setSearchTerm(event.target.value)}}
          >

          </Input>
          <Table color='black'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Standort</Table.HeaderCell>
                <Table.HeaderCell>Longitude</Table.HeaderCell>
                <Table.HeaderCell>Latitude</Table.HeaderCell>
                <Table.HeaderCell>Typ</Table.HeaderCell>
                <Table.HeaderCell>Beschreibung</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {stations.filter((station) => {
                if (searchTerm == ""){
                  return station;
                }
                else if (station.location.toLowerCase().includes(searchTerm.toLowerCase())){
                  return station;
                }
              }).map((station) => (
                <Stations key={station.station_id} station={station} deleteStation={deleteStation} x={station.station_id}/>
              ))}
              </Table.Body>
          </Table>
        </div>
      );
}
 
export default VerkaufsstellenAuflisten;