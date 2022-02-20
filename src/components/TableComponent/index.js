import React, { useState } from 'react'

import useTable from '../../hooks/useTable'
import styles from './Table.module.css'
import TableFooter from './TableFooter'

const TableComponent = ({ data, rowsPerPage = 4 }) => {
  const [page, setPage] = useState(1)
  const { slice } = useTable(data, page, rowsPerPage)
  const [sliceshow, setSliceshow] = useState(slice)

  const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = React.useState(config)

    const sortedItems = React.useMemo(() => {
      let sortableItems = [...sliceshow]
      if (sortConfig !== null) {
        sortableItems.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1
          }
          return 0
        })
      }
      return sortableItems
    }, [sortConfig])

    const requestSort = (key) => {
      let direction = 'ascending'
      if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
        direction = 'descending'
      }
      setSortConfig({ key, direction })
    }

    return { items: sortedItems, requestSort, sortConfig }
  }

  const ProductTable = (props) => {
    const { items, requestSort } = useSortableData(props.products)

    return (
      <table className={styles.table}>
        <thead className={styles.tableRowHeader}>
          <tr>
            <th onClick={() => requestSort('name')} className={styles.tableHeader}>
              Country
            </th>
            <th onClick={() => requestSort('capital')} className={styles.tableHeader}>
              Capital
            </th>
            <th onClick={() => requestSort('language')} className={styles.tableHeader}>
              Language
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((el) => (
            <tr className={styles.tableRowItems} key={el.id}>
              <td className={styles.tableCell}>{el.name}</td>
              <td className={styles.tableCell}>{el.capital}</td>
              <td className={styles.tableCell}>{el.language}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  return (
    <>
      <ProductTable products={data} />
      <TableFooter
        data={data}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        setSlice={setSliceshow}
        page={page}
      />
    </>
  )
}

export default TableComponent
