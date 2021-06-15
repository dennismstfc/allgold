import {Table} from 'semantic-ui-react'; 

const Sales = ({sales}) => {
	return ( 
		<Table celled inverted selectable>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Standort</Table.HeaderCell>
					<Table.HeaderCell>Produkt</Table.HeaderCell>
					<Table.HeaderCell>Anzahl verkauft</Table.HeaderCell>
					<Table.HeaderCell>Profit </Table.HeaderCell>
				</Table.Row>
			</Table.Header>

			<Table.Body>
				{sales.map(sale => {
					return(
						<Table.Row key={sale.location}>
							<Table.Cell>{sale.location}</Table.Cell>
							<Table.Cell>{sale.name}</Table.Cell>
							<Table.Cell>{sale.amount_sold}</Table.Cell>
							<Table.Cell>{sale.profit} €</Table.Cell>
						</Table.Row>
					)
				})}
			</Table.Body>
		</Table>
	 );
}
 
export default Sales;