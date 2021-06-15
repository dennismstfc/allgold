import {Table} from 'semantic-ui-react';
import Sales from './Sales';

const Sellers = ({sellers}) => {
	return ( 
		<Table celled inverted selectable>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Name</Table.HeaderCell>
					<Table.HeaderCell>Erbrachter Umsatz</Table.HeaderCell>
				</Table.Row>
			</Table.Header>

			<Table.Body>
				{sellers.map(seller => {
					return(
						<Table.Row key={seller.name}>
							<Table.Cell>{seller.name}</Table.Cell>
							<Table.Cell>{seller.amount} €</Table.Cell>
						</Table.Row>
					)
				})}
			</Table.Body>
		</Table>
	 );
}
 
export default Sellers;
