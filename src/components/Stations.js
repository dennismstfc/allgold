import { List, Header } from "semantic-ui-react";

const Stations = ({stations}) => {
    return ( 
        <List>
            {stations.map(station => {
                return(
                    <List.Item key={station.id}>
                        <Header>{station.location}</Header>
                        <List.Content>Longitude: {station.longitude} </List.Content>
                        <List.Content>Latitude: {station.latitude}</List.Content>
                        <List.Content>Typ: {station.type}</List.Content>
                        <List.Content>Beschreibung: {station.description}</List.Content>
                    </List.Item>
                );
    	    })}
        </List>
     );
}
 
export default Stations;