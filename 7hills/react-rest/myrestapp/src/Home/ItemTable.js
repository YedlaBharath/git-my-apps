import React,{useMemo,useEffect,useState} from 'react'
import api from '../actions/api'
import '../StyleCss/TableStyleCss.scss'
import {useTable, useSortBy, useGlobalFilter,useFilters,usePagination} from 'react-table'
import {TableHeaderColumn} from './TableHeaderColumn'
import { ColumnFiltering } from '../Table/ColumnFiltering'

export const ItemTable = () => {
    const [list,setList] = useState([{}])
    function fetchList(){
    api.itemsAPI().fetchAll().then(res=>{
        setList(res.data)
        }
    )
    .catch(err=>console.log(err))
}
useEffect(()=>{
    fetchList();
},[])
    const columns = useMemo(()=>TableHeaderColumn,[])
    const data = useMemo(()=>list,[])
    const defaultColumn= useMemo(()=>{
        return {
            Filter: ColumnFiltering
        }
    },[])
    const tableInstance = useTable({
        columns,data,defaultColumn
    },useFilters,useSortBy,usePagination)
    const {getTableProps, getTableBodyProps,headerGroups,page,nextPage,previousPage,canPreviousPage,canNextPage,pageOptions,gotoPage,pageCount,setPageSize,rows,prepareRow,footerGroups,state,getSortByToggleProps} = tableInstance
    const { pageIndex, pageSize } = state
    return (
        <>
        {/* {console.log(list)} */}
        <table {...getTableProps()}>
            <thead>
                {
                    headerGroups.map((headerGroup)=>(
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map((column)=>(
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render("Header")} {"   "}<i className="fa fa-arrow-down"></i>
                                        <span>
                                            {column.isSorted ? (column.isSortedDesc ? 'desc':'asc'):''}
                                        </span>
                                        <div>
                                            {column.canFilter ? column.render('Filter'):null}
                                        </div>
                                    </th>
                                ))
                            }
                        </tr>
                    ))
                }
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    rows.map((row)=>{
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell)=>{
                                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                })}
                            </tr>
                        )
                        
                    })
                }
            </tbody>
        </table>
        <div>
            <button onClick={()=>gotoPage(0)} disabled={!canPreviousPage}>{"<<"}</button>
            <button onClick={()=>previousPage()} disabled={!canPreviousPage}>Previous</button>
            <button onClick={()=>nextPage()} disabled={!canNextPage}>Next</button>
            <button onClick={()=>gotoPage(pageCount-1)} disabled={!canNextPage}>{">>"}</button>
        </div>
        </>
    )
}
