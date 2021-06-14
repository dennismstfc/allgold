import { useEffect, useState } from "react";

const LastSales = () => {
	const [sales, setSales] = useState([]);

	useEffect(() => {
		fetch("/sales").then(response =>
			response.json().then(data => {
				setSales(data.sales)
			}));

	}, []);

	return ( 
		<div>
			<p className="home-subheadline">Letzten 50 Verkäufe</p>
		</div>		
	 );

}
 
export default LastSales;