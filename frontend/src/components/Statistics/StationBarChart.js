import { useEffect, useState } from 'react';
import {Bar} from 'react-chartjs-2';
import 'chartjs-plugin-zoom';


const StationBarChart = () => {

	const [chartData, setChartData] = useState({});

	const chart = () => {	
		
		let staLocation = [];
		let staAmount = []; 

		fetch("/stations/top_stations").then(response => {
			response.json().then(data => {
				for(const dataObj of data.stations){
					staLocation.push(dataObj.location)					
					staAmount.push(dataObj.amount)				
				}

				console.log(data.stations)

				setChartData ({
					labels: staLocation,
					datasets: [
						{ 
							label: 'Stationertrag',
							data: staAmount,
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
			<p className="home-subheadline">Alle Stationen im Vergleich</p>
			  <Bar
				data={chartData}
				options={{
				responsive: true,
				title: { text: "Alle Stationen im Vergleich", display: true },
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
 
export default StationBarChart;