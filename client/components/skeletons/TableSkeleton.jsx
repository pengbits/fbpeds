import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css';
import { Table, Link } from "@radix-ui/themes"

export default () => {
  const rows = Array(20).fill(1).map((_, i) => (i))
  return (<Table.Root layout='responsive'>
    <Table.Header>
      <Table.Row>
        <Table.ColumnHeaderCell>
          <Skeleton height={5} width={50} />
        </Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell>
          <Skeleton height={5} width={35} />
        </Table.ColumnHeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {rows.map(r => <Table.Row key={r}>
        <Table.Cell><Skeleton height={5} width={60+ (Math.random() * 25)} /></Table.Cell>
        <Table.Cell><Skeleton height={5} width={60+ (Math.random() * 25)} /></Table.Cell>
      </Table.Row>)}
    </Table.Body>
  </Table.Root>)
}