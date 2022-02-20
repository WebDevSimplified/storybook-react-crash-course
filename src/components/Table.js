import React, { useState } from 'react'
import PropTypes from 'prop-types'

import countriesData from '../data/countries'
import TableComponent from './TableComponent'

function Table({ rows = 2 }) {
  const [countries] = useState([...countriesData])

  return <TableComponent data={countries} rowsPerPage={rows} />
}

Table.propTypes = {
  rows: PropTypes.number
}

export default Table
