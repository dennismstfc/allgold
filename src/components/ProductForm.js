import React, {useState} from 'react';
import { Form, Button } from 'semantic-ui-react';

const ProductForm = ({ onNewProduct }) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [durability, setDurability] = useState("");

    return ( 
        <Form>
            <Form.Field>
                <Form.Input
                    fluid
                    label='Name'
                    placeholder='Name'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
            </Form.Field>
            
            <Form.Field>
                <Form.Input
                    fluid
                    label='Preis'
                    placeholder='Preis'
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    />
            </Form.Field>
            
            <Form.Field>
                <Form.Input
                    fluid
                    label='Haltbarkeit in Tagen'
                    placeholder='Haltbarkeit in Tagen'
                    value={durability}
                    onChange={e => setDurability(e.target.value)}
                    />
            </Form.Field>
            
            <Form.Field>
                <Button
                onClick={async() => {
                    const product = {name, price, durability};
                    const response = await fetch("/add_product", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(product)
                    });

                    if (response.ok){
                        console.log("product response worked!")
                        onNewProduct(product);
                        setName("");
                        setPrice("");
                        setDurability("");
                    }
                }}
                >Submit</Button>
            </Form.Field>
        </Form>
     );
}
 
export default ProductForm;