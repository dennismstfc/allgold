import { Table, Icon, Button } from 'semantic-ui-react';

const Products = ({products}) => {

    function deleteProduct(productID){
        fetch('/products/'+productID,{
            method: 'DELETE',
            header:{'Content-Type': 'application/json',
                    'Accept': 'application/json'            
                    }
        })
    };

    return ( 
        <Table color='black'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Artikel</Table.HeaderCell>
                    <Table.HeaderCell>Preis in <Icon name='euro sign' /></Table.HeaderCell>
                    <Table.HeaderCell>Haltbarkeit in Tagen</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {products.map(product => {
                    return(
                        <Table.Row key={product.product_id}>
                            <Table.Cell>{product.name}</Table.Cell>
                            <Table.Cell>{product.price}</Table.Cell>
                            <Table.Cell>{product.durability}</Table.Cell>
                            <Table.Cell>
                                <Button icon onClick={() => deleteProduct(product.product_id)}>
                                    <Icon name='delete' color='red'/>
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    )
                })}
            </Table.Body>
        </Table>
     );
}
 
export default Products;