import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css';
import { Card, Flex } from "@radix-ui/themes"

export default ({appointments}) => (
<Card className="patient card">
  <Flex>
    <div className="patient__image patient__image--loading">
      <Skeleton circle width={100} height={100} />
    </div>
    <div className="patient__actions">
        <Skeleton width={250} height={15} count={3}/>
    </div>
  </Flex>
  {appointments && 
  <div className="patient__footer">
    <Skeleton width={'100%'} height={10} count={2} />
  </div>}
</Card>)