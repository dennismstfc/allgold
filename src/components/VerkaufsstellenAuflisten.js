import {useEffect, useState} from 'react';
import Videos from './Videos';

const VerkaufsstellenAuflisten = () => {
    const [video, setVideo]= useState([])
    
    useEffect(() => {
        fetch("/video/3").then(response =>
          response.json().then(data => {
            setVideo(data);
          })
        );
      }, []);

    return (
        <div>
          <Videos videos={video}/>
        </div>

      );
}
 
export default VerkaufsstellenAuflisten;