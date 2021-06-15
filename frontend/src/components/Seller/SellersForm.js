import { useState } from "react";
import { Form, Button } from 'semantic-ui-react';

const VerkaueferForm = ({onNewSeller}) => {
	const [first_name, setFirstName] = useState("");
	const [last_name, setLastName] = useState("");

	return ( 
		<Form>
			<Form.Field>
				<Form.Input 
					fluid
					label='Vorname'
					placeholder='Vorname'
					value={first_name}
					onChange={e => setFirstName(e.target.value)}
				/>
			</Form.Field>
			<Form.Field>
				<Form.Input 
					fluid
					label='Nachname'
					placeholder='Nachname'
					value={last_name}
					onChange={e => setLastName(e.target.value)}
				/>
			</Form.Field>
			<Form.Field>
				<Button
				onClick={async() => {
					const seller = {first_name, last_name};
					const response = await fetch("/add_seller", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(seller)
					});
					if (response.ok){
						console.log("seller response worked!")
						onNewSeller(seller);
						setFirstName("");
						setLastName("");
					}
				}}
				>Submit</Button>
			</Form.Field>
		</Form>
	 );
}
 
export default VerkaueferForm;