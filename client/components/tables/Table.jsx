import { datePretty } from "../../util/date"
import { Link as RouterLink} from "react-router"
import { Table, Link } from "@radix-ui/themes"

const isDate      = column => (column == 'date')
const isImage     = column => (column == 'image')
const isVisitDate = column => (column == 'visit_date')
const isProvider  = column => (column == 'provider')

const formattedCellContent = (column, value, row, baseUrl) => {
  if(isDate(column)) return datePretty(value)
  
  if(isImage(column)) return (
    !!value && <a href={value} target="_blank">📷</a>
  )
  
  if(isVisitDate(column)) {
    const {visit_id} = row
    return (<Link asChild>
      <RouterLink to={`${baseUrl}/visits/${visit_id}`}>{datePretty(value)}</RouterLink>
    </Link>)
  }

  if(isProvider(column)){
    return value.name
  }
  return value
}

const TableHead = ({cols}) => (
  <Table.Header>
    <Table.Row>
      {cols.map(c => <Table.ColumnHeaderCell key={c}>{c.replace('_',' ')}</Table.ColumnHeaderCell>)}
    </Table.Row>
  </Table.Header>
)

const TableBody = ({cols,rows,baseUrl}) => (
  <Table.Body>
  {rows.map((row,idx) => (
    <Table.Row key={idx}>
      {cols.map(c => <Table.Cell key={c}>
        {formattedCellContent(c, row[c], row, baseUrl)}
        </Table.Cell>)}
    </Table.Row>)
  )}
  </Table.Body>
)
export default  ({cols,rows,baseUrl}) => {
  return (
    <Table.Root layout='responsive'>
      <TableHead cols={cols} />
      <TableBody cols={cols} rows={rows} baseUrl={baseUrl} />
    </Table.Root>
  )
}