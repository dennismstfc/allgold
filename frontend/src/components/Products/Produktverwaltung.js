import ProductForm from './ProductForm';
import Products from './Products';
import {useEffect, useState} from 'react';

const Produktverwaltung = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("/products").then(response =>
            response.json().then(data => {
                setProducts(data.products);
            })
        );
    }, []);

    return (
        <div className="main">
            <p className="home-headline">Produktverwaltung</p>
            <p className="home-subheadline">Neues Produkt anlegen</p>
            <ProductForm 
                onNewProduct={product =>
                    setProducts(currentProducts => [product, ...currentProducts])
                }
            />
            <Products products={products}/>
        </div>
    );
}
 
export default Produktverwaltung;