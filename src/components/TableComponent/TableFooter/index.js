import React, { useEffect, useState } from 'react'

import styles from './TableFooter.module.css'
import useTable from '../../../hooks/useTable'

const TableFooter = ({ data, setPage, setSlice, page, rowsPerPage }) => {
  const [rows, setRows] = useState(rowsPerPage)
  const { slice, range } = useTable(data, page, rows)

  useEffect(() => {
    setSlice(slice)
  }, [slice, setSlice])

  const from = (page - 1) * rows + 1
  const to = from + slice.length - 1

  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1)
    }
  }, [slice, page, setPage])
  return (
    <div className={styles.tableFooter}>
      <div className='rangeShower'>
        <input
          type='number'
          name='rangeNo'
          defaultValue={rows}
          max={data.length}
          min={1}
          id='rangeNo'
          className={`${styles.input}`}
          onChange={(e) => setRows(e.target.value)}
        />
        <span>
          Showing {from} - {to} of {data.length}
        </span>
      </div>
      <div className='pagination'>
        {range.map((el, index) => (
          <button
            key={index}
            className={`${styles.button} ${
              page === el ? styles.activeButton : styles.inactiveButton
            }`}
            onClick={() => setPage(el)}
          >
            {el}
          </button>
        ))}
      </div>
      <div className='goto'>
        <span>Go to Page</span>
        <input
          type='number'
          name='pageNo'
          defaultValue={page}
          max={range[range.length - 1]}
          min={range[0]}
          id='inputGoto'
          className={`${styles.input}`}
        />
        <button
          className={`${styles.button}`}
          onClick={() => setPage(Number(document.getElementById('inputGoto').value))}
        >
          Go
        </button>
      </div>
    </div>
  )
}

export default TableFooter
