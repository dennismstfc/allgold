import { Icon, Table, Button } from "semantic-ui-react";
import { Link } from 'react-router-dom';

const Stations = ({station, deleteStation, x}) => {

    return(
        <Table.Row>
            <Table.Cell>{station.location}</Table.Cell>
            <Table.Cell>{station.longitude} </Table.Cell>
            <Table.Cell>{station.latitude}</Table.Cell>
            <Table.Cell>{station.type}</Table.Cell>
            <Table.Cell>{station.description}</Table.Cell>
            <Table.Cell>
            <Button.Group>
                <Button icon onClick={() => deleteStation(x)}>
                    <Icon name='delete' color='red'/>
                </Button>
            </Button.Group>
            </Table.Cell>
        </Table.Row>
    );
}

export default Stations;




