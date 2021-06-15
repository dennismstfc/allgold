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
	return (
		<div>
			<p className="home-subheadline">Besten Verkäufer</p>
			<Sellers sellers={sellers} />
		</div>
	);
}
 
export default TopSellers;