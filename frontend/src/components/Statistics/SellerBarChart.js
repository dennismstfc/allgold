import { useEffect, useState } from 'react';
import {Bar} from 'react-chartjs-2';
import 'chartjs-plugin-zoom';

const SellerBarChart = () => {

	const [chartData, setChartData] = useState({});

	const chart = () => {	
		
		let selName = [];
		let selAmount = []; 

		fetch("/sellers/top_sellers").then(response => {
			response.json().then(data => {
				for(const dataObj of data.sellers){
					selName.push(dataObj.name)					
					selAmount.push(dataObj.amount)				
				}

				setChartData ({
					labels: selName,
					datasets: [
						{ 
							label: 'Verkäuferertrag',
							data: selAmount,
							backgroundColor: [
								'rgb(255, 99, 132)',
							
							],
							borderColor: [
								'rgba(255, 99, 132, 1)',
							      ],
							borderWidth: 4
						}
					]
					})
			})
		});
			
		
	}

	useEffect(() => {
		chart();
	}, []);

	return ( 
		<div>
			<p className="home-subheadline">Alle Verkäufer im Vergleich</p>
			  <Bar
				data={chartData}
				options={{
				responsive: true,
				title: { text: "Alle Verkäufer im Vergleich", display: true },
				scales: {
				yAxes: [
					{
					ticks: {
					autoSkip: true,
					maxTicksLimit: 10,
					beginAtZero: true
					},
					gridLines: {
					display: false
					}
					}
				],
				xAxes: [
					{
					gridLines: {
					display: false
					}
					}
				]
				},
				zoom: {
					enabled: true,
					mode: 'x',
				},
				pan: {
					enabled: true,
					mode: 'x',
				}
				}}
			/>
		</div>
	 );
}
 
export default SellerBarChart;