import { useEffect, useState } from "react";
import Sellers from "./Sellers";

const TopSellers = () => {
	const [sellers, setSellers] = useState([]);

	useEffect(() => {
		fetch("/sellers/top_sellers").then(response =>
			response.json().then(data => {
				setSellers(data.sellers)
			}));
	}, []);
	
	sellers.sort(function(a, b){
		return parseFloat(b.amount) - parseFloat(a.amount)
	})


	return (
		<div>
			<p className="home-subheadline">Besten 20 Verkäufer</p>
			<div className="container-table">
				<Sellers sellers={sellers.slice(0, 20)} />
			</div>
		</div>
	);
}
 
export default TopSellers;