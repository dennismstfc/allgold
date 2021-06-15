import SellersForm from "./SellersForm"
import {useEffect, useState} from 'react';
import Sellers from "./Sellers";

const Verkaeuferverwaltung = () => {
	const [sellers, setSellers] = useState([]);

	useEffect(() => {
		fetch("/sellers").then(response =>
			response.json().then(data => {
				setSellers(data.sellers);
			})
		);
	}, []);
	
	return ( 	
		<div className="main">
			<p className="home-headline">Verkäuferverwaltung</p>
			<p className="home-subheadline">Neuen Verkäufer anlegen</p>
			<SellersForm 
				onNewSeller={seller =>
					setSellers(currentSeller => [seller, ...currentSeller])
				}	
			/>
			<br/>
			<Sellers sellers={sellers} />
		</div>
	 );
}
 
export default Verkaeuferverwaltung;