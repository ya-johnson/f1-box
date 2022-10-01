

const Table = ({ cols, rows, width}) => {

  return (
    <table className={`${width} mb-10 text-center border border-neutral-500 border-solid`}>
      <thead>
        {cols.map(col => {
          return (
            <th className="font-Kanit font-medium py-1 px-4 capitalize
                         bg-neutral-200 dark:bg-neutral-700
                           border border-neutral-500 border-solid">
              {col}
            </th>
          )
        })}
      </thead>
      <tbody>
        {rows.map(row => {
          const rowItems = Object.values(row)
          return (
            <tr className="hover:text-amber-400">
              { rowItems.map(rowItem => {
                return (
                  <td className="py-1 px-4 border border-neutral-500 border-solid">{rowItem}</td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}


export default Table