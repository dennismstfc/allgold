import React, { Component } from 'react';


class Form extends Component {
    
    constructor(props){
        super(props)

        this.state = {
            breitengrad: '',
            laengengrad: ''
        }
    }

    handleInput = (event) => {
        this.setState({
            breitengrad: event.target.value
        })
    }


   render(){
       return ( 
           <form action="/eroeffnen" METHOD="POST">
           <div>
               <label>Breitengrad</label>
               <input type="text" 
               value={this.state.breitengrad}
               onChange={this.handleInput}
               name="breitengrad"
               />
           </div>
           <div>
               <label>Längengrad</label>
               <input type="text"
               value={this.state.laengengrad}
               onChange={this.handleInput}
               name="laengengrad"
               />
           </div>
            <div>
                <label>Standort</label>
                <input type="text"
                value={this.state.standort}
                onChange={this.handleInput}
                name="standort"
                />
            </div>
            <div>
                <label>Typ</label>
                <select>
                    <option value="automaten">Automaten</option>
                    <option value="verkaufstelle-mit-automaten">Verkaufsstelle mit Automaten</option>
                    <option value="verkaufsstelle">Verkaufstelle</option>
                </select>
            </div>
            <div>
                <input type="submit" value="Submit" />
            </div>

           </form>
        );
                   

   }
   
}
 
export default Form;