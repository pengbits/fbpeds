import { datePretty } from "../../util/date"
const TableHead = ({cols}) => (
  <thead>
    <tr>
      {cols.map(c => <th key={c}>{c}</th>)}
    </tr>
  </thead>
)

const TableBody = ({cols,rows}) => (
  <tbody>
  {rows.map((row,idx) => (
    <tr key={idx}>
      {cols.map(c => <td key={c}>{c == 'date' ? datePretty(row[c]) : row[c]}</td>)}
    </tr>)
  )}
  </tbody>
)
export const Table = ({cols,rows}) => {
  return (
    <table border="1" width="100%">
      <TableHead cols={cols} />
      <TableBody cols={cols} rows={rows} />
    </table>
  )

}

export default Table