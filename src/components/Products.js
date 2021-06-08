import { List, Header } from 'semantic-ui-react';

const Products = ({products}) => {
    return ( 
        <List>
            {products.map(product => {
                return(
                    <List.Item key={product.id}>
                        <Header>{product.name}</Header>
                        <List.Content>Preis: {product.price}</List.Content>
                        <List.Content>Haltbarkeit in Tagen: {product.durability}</List.Content>
                    </List.Item>
                )
            })}
        </List>
     );
}
 
export default Products;