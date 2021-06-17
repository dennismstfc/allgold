import { useEffect, useState } from 'react';
import {Bar} from 'react-chartjs-2';

const TopSellersDoughnutChart = () => {

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

			})
		});
			
		setChartData ({
			labels: selName,
			datasets: [
				{ 
					label: 'Top 5 sellers',
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
			console.log(selName, selAmount);
	}

	useEffect(() => {
		chart();
	}, []);

	return ( 
		<div>
			<p className="home-subheadline">Top 5 Verkäufer</p>
			  <Bar
				data={chartData}
				options={{
				responsive: true,
				title: { text: "THICCNESS SCALE", display: true },
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
				}
				}}
			/>
		</div>
	 );
}
 
export default TopSellersDoughnutChart;