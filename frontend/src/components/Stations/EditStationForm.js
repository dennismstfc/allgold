import React, {useState} from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const EditStationForm = ({ stationToBeEdited }) => {
    const [location, setLocation] = useState(stationToBeEdited.location);
    const [longitude, setLongitude] = useState(stationToBeEdited.longitude);
    const [latitude, setLatitude] = useState(stationToBeEdited.latitude);
    const [type, setType] = useState(stationToBeEdited.type);
    const [description, setDescription] = useState(stationToBeEdited.description);


    return ( 
       <Form>
           <Form.Field>
               <Form.Input
                fluid
                label='Standort'
                placeholder="Standort"
                value={location}
                onChange={e => setLocation(e.target.value)}
                />
           </Form.Field>
           
           <Form.Group widths='equal'>
                <Form.Input
                    fluid
                    label='Longitude'
                    placeholder="Longitude"
                    value={longitude}
                    onChange={e => setLongitude(e.target.value)}
                />
                
                <Form.Input
                    fluid
                    label='Latitude'
                    placeholder="Latitude"
                    value={latitude}
                    onChange={e => setLatitude(e.target.value)}
                />
                
               <Form.Input
                    fluid
                    label='Typ'
                    placeholder='Typ'
                    value={type}
                    onChange={e => setType(e.target.value)}
               />
            </Form.Group>
        
               <Form.TextArea
                fluid
                label='Beschreibung'
                placeholder="Beschreibung"
                value={description}
                onChange={e => setDescription(e.target.value)}
                />

            <Link to='/verkaufsstellen-auflisten'>
                <Form.Field>
                    <Button
                    onClick={async () => {
                        const station = {location, longitude, latitude, type, description};
                        const response = await fetch("/stations/"+stationToBeEdited.station_id, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(station)
                        });

                        if (response.ok){
                            console.log("response worked!");
                            setLocation("");
                            setLongitude("");
                            setType("");
                            setLatitude("");
                            setDescription("");
                        }
                    }}
                    >Update</Button>
                </Form.Field>
            </Link>
       </Form> 
     );
}
 
export default EditStationForm;