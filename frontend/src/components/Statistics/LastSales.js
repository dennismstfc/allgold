import { useEffect, useState } from "react";
import Sales from "./Sales";

const LastSales = () => {
	const [sales, setSales] = useState([]);

	useEffect(() => {
		fetch("/sales/last_50").then(response =>
			response.json().then(data => {
				setSales(data.sales)
			}));

	}, []);

	return ( 
		<div>
			<p className="home-subheadline">Letzten 50 Verkäufe</p>
			<Sales sales={sales} />
		</div>		
	 );

}
 
export default LastSales;