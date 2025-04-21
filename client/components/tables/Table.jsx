import { datePretty } from "../../util/date"

const is_date_regex = /date$/
const isDate = column => (is_date_regex.test(column))
// const is_bool_regex = /^has_/
// const isBool = column => (is_bool_regex.test(column))
const is_image_regex = /^image/
const isImage = column => is_image_regex.test(column)
const formattedCellContent = (column, value) => {
  if(isDate(column)) return datePretty(value)
  // if(isBool(column)) return !!value ? '√' : null
  if(isImage(column)) return (
    !!value && <a href={value} target="_blank">📷</a>
  )
  // console.log(column, isBool(column))
  return value
}

const TableHead = ({cols}) => (
  <thead>
    <tr>
      {cols.map(c => <th key={c}>{c.replace('_',' ')}</th>)}
    </tr>
  </thead>
)

const TableBody = ({cols,rows}) => (
  <tbody>
  {rows.map((row,idx) => (
    <tr key={idx}>
      {cols.map(c => <td key={c}>
        {formattedCellContent(c, row[c])}
        </td>)}
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