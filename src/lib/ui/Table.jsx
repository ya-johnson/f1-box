

const Table = ({ cols, rows, width }) => {

  return (
    <table className={`${width && width} mb-10 mt-1 text-center border border-neutral-500 border-solid overflow-scroll`}>
      <thead>
        {cols.map(col => {
          return (
            <th className="font-Kanit font-semibold py-1 px-4 capitalize
                           bg-white dark:bg-neutral-900
                           border border-neutral-500 border-solid lg:px-2">
              {col}
            </th>
          )
        })}
      </thead>
      <tbody className="bg-white dark:bg-neutral-900">
        {rows.map(row => {
          const rowItems = Object.values(row)
          return (
            <tr className="hover:text-amber-400">
              { rowItems.map(rowItem => {
                return (
                  <td className="py-1 px-4 border border-neutral-500 border-solid lg:px-2">{rowItem}</td>
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