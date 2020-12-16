import React,{useMemo} from 'react'
import {useTable, useSortBy, useGlobalFilter,useFilters} from 'react-table'
import MOCK_DATA from '../CardComponents/MOCK_DATA.json'
import {Columns, GroupedColumns} from './Columns'
import { GlobalFiltering } from './GlobalFiltering'
import {ColumnFiltering} from './ColumnFiltering'


export const SortingColumns = () => {

    const columns = useMemo(()=>GroupedColumns,[])
    const data = useMemo(()=> MOCK_DATA,[])
    const defaultColumn = useMemo(()=>{
        return {
            Filter: ColumnFiltering
        }
    },[])
    const tableInstance = useTable({
        columns,
        data,
        defaultColumn
    },useFilters,useGlobalFilter,useSortBy)
    const {getTableProps,getTableBodyProps,headerGroups,rows,prepareRow,state,setGlobalFilter, footerGroups,getSortByToggleProps} = tableInstance
    const {globalFilter} = state
    console.log(state)
    return (
        <>
        <GlobalFiltering filter={globalFilter} setFilter={setGlobalFilter}></GlobalFiltering>
        <table {...getTableProps()}>
            <thead>
                {
                    headerGroups.map((headerGroup)=>(
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {
                            headerGroup.headers.map((column)=>(
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render("Header")}
                                    <div>
                                        {column.canFilter ? column.render('Filter'):null}
                                    </div>
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? 'desc':'asc'):''}
                                    </span>
                                    
                                </th>
                            ))}
                    </tr>
                    ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    rows.map((row)=>{
                        prepareRow(row)
                        return(
                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map((cell)=>{
                                        return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                        })}
                            </tr>
                        )})}
            </tbody>
            <tfoot>
                {
                    footerGroups.map((footer)=>(
                        <tr {...footer.getFooterGroupProps()}>
                            {
                                footer.headers.map((column)=>(
                                <th {...column.getFooterProps()}>{column.render("Footer")}</th>
                                ))
                            }
                        </tr>
                    ))
                }
            </tfoot>
        </table>
        </>
    )
}
