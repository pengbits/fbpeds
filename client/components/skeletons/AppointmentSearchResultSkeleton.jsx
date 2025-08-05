import { Box, Card, Flex } from "@radix-ui/themes"
import Skeleton from "react-loading-skeleton"
const AvailabilityListItemSkeleton = ({index}) => (
  <Box mr='2'>
    <Skeleton width={40+ (index > 8 ? 10 : 0)} height={30} />
  </Box>
)

export default () => {
  const len = Math.floor(Math.random() * 5) + 10
  const items = Array(len).fill(1).map((_,i) => i)
  return (<Card height={'200px'} className="card">
    <Skeleton height={30} width={150} />
    <div className='provider__image'>
      <Skeleton circle with={100} height={100} />
    </div>
    <Skeleton height={20} width={150} />
    <Flex>
    {items.map(i => <AvailabilityListItemSkeleton key={i} index={i} />)}
    </Flex>
  </Card>)
}