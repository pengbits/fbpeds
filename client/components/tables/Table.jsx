import { datePretty } from "../../util/date"
import { Link } from "react-router"

const isDate      = column => (column == 'date')
const isImage     = column => (column == 'image')
const isVisitDate = column => (column == 'visit_date')

const formattedCellContent = (column, value, row, baseUrl) => {
  if(isDate(column)) return datePretty(value)
  // if(isBool(column)) return !!value ? '√' : null
  if(isImage(column)) return (
    !!value && <a href={value} target="_blank">📷</a>
  )
  if(isVisitDate(column)) {
    const {visit_id} = row
    return (<Link to={`${baseUrl}/visits/${visit_id}`}>{datePretty(value)}</Link>)
  }
  return value
}

const TableHead = ({cols}) => (
  <thead>
    <tr>
      {cols.map(c => <th key={c}>{c.replace('_',' ')}</th>)}
    </tr>
  </thead>
)

const TableBody = ({cols,rows,baseUrl}) => (
  <tbody>
  {rows.map((row,idx) => (
    <tr key={idx}>
      {cols.map(c => <td key={c}>
        {formattedCellContent(c, row[c], row, baseUrl)}
        </td>)}
    </tr>)
  )}
  </tbody>
)
export const Table = ({cols,rows,baseUrl}) => {
  return (
    <table border="1" width="100%">
      <TableHead cols={cols} />
      <TableBody cols={cols} rows={rows} baseUrl={baseUrl} />
    </table>
  )

}

export default Table