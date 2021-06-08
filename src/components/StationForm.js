import React, {useState} from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const StationForm = ({ onNewStation }) => {
    const [location, setLocation] = useState("");
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");

    const options = [
        {key: 'a', text: 'Automat', value: 'automat' },
        {key: 'a+v', text: 'Automat + Verkaufsstelle', value: 'automat+verkaufsstelle' },
        {key: 'v', text: 'Verkaufsstelle', value: 'verkaufsstelle' },
    ]


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
                        const response = await fetch("/add_station", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(station)
                        });

                        if (response.ok){
                            console.log("respone worked!");
                            onNewStation(station);
                            setLocation("");
                            setLongitude("");
                            setType("");
                            setLatitude("");
                            setDescription("");
                        }
                    }}
                    >Submit</Button>
                </Form.Field>
            </Link>
       </Form> 
     );
}
 
export default StationForm;