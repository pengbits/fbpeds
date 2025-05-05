import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css';
import { Box } from "@radix-ui/themes";
export default () => (<div className="patient-details card">
  <div className="patient-details__head">
    <Skeleton height={20} width={80} style={{marginBottom:'20px'}} />
    <Skeleton height={30} width={150} style={{marginBottom:'40px'}} />
    
    <div className="patient__image patient__image--large patient__image--loading"  style={{marginBottom:'20px'}}> 
      <Skeleton circle width={200} height={200} />
    </div>
    <Skeleton height={15} width={225}></Skeleton>
  </div>
</div>)