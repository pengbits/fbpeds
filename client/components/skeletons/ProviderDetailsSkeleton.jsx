import Skeleton from "react-loading-skeleton"

import { Box } from "@radix-ui/themes";
export default () => {
  const items = new Array(15).fill(1).map((_,i) => i)
  return (<div className="provider-details card">
  <div className="provider-details__head">
    <Skeleton height={15} width={175} />
    
    <div className="provider__image provider__image--large"  style={{marginBottom:'20px'}}> 
      <Skeleton circle width={200} height={200} />
    </div>
    {items.map(p => (
      <Skeleton height={15} width={`${50 + Math.random() * 50}%`} />
    ))}
  </div>
</div>)
}