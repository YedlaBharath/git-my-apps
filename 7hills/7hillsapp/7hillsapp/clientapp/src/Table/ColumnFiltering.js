import React from 'react'

export const ColumnFiltering = ({column}) => {
    const {filterValue,setFilter} = column
    return (
        <span>
            Search:{' '}
            <input value={filterValue || ''} onChange={(e)=>setFilter(e.target.value)} style={{width:"8rem"}}></input>
        </span>
    )
}
