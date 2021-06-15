import { Table, Icon, Button } from 'semantic-ui-react';

const Sellers = ({sellers}) => {

	function deleteSeller(sellerID){
		fetch('/sellers/'+sellerID,{
			method: 'DELETE',
			header: {'Content-Type': 'application/json',
				'Accept': 'application/json'
				}
		})
	};

	return ( 
		<Table color='black'>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>ID</Table.HeaderCell>
					<Table.HeaderCell>Vorname</Table.HeaderCell>
					<Table.HeaderCell>Nachname</Table.HeaderCell>
					<Table.HeaderCell></Table.HeaderCell>
				</Table.Row>
			</Table.Header>

			<Table.Body>
				{sellers.map(seller => {
					return(
						<Table.Row key={sellers.seller_id}>
							<Table.Cell>{seller.seller_id}</Table.Cell>
							<Table.Cell>{seller.first_name}</Table.Cell>
							<Table.Cell>{seller.last_name}</Table.Cell>
							<Table.Cell>
								<Button icon onClick={() => deleteSeller(seller.seller_id)}>
									<Icon name='delete' color='red' />
								</Button>
							</Table.Cell>
						</Table.Row>
					)
				})}
			</Table.Body>
		</Table>
	 );
}
 
export default Sellers;