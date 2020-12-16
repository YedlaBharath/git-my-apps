import React,{useMemo} from 'react'
import {useTable, useSortBy, useGlobalFilter,useFilters,usePagination} from 'react-table'
import MOCK_DATA from '../CardComponents/MOCK_DATA.json'
import {Columns, GroupedColumns} from './Columns'
import { GlobalFiltering } from './GlobalFiltering'
import {ColumnFiltering} from './ColumnFiltering'


export const PagginationTable = () => {

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
    },useFilters,useGlobalFilter,useSortBy,usePagination)
    const {getTableProps,getTableBodyProps,headerGroups,page,nextPage,previousPage,canPreviousPage,canNextPage,pageOptions,gotoPage,pageCount,setPageSize,prepareRow,state,setGlobalFilter,getSortByToggleProps} = tableInstance
    const {globalFilter} = state
    const { pageIndex, pageSize } = state
    // console.log(state)

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
                    page.map((row)=>{
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
            {/* <tfoot>
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
            </tfoot> */}
            <div>
                <span>
                    Go TO Page: {' '}
                    <input type="number" defaultValue={pageIndex+1} 
                    onChange={(e)=>{
                    const pageNumber= e.target.value? Number(e.target.value):0 
                    if(pageNumber>99)
                    (
                        window.alert("You have entered number does not exist")
                    )
                        gotoPage(pageNumber)
                }}
                    ></input>
                </span>
                <span>
                    | Show Top :{' '}
                    <select value={pageSize} onChange={(e)=> setPageSize(Number(e.target.value))}>
                        {
                            [10,20,40,60].map(pageSize=>(
                            <option value={pageSize} key={pageSize}>Showing {pageSize}</option>
                            ))
                        }
                        </select>{' '}|
                </span>
                <span>
                    Page:{' '}
                <strong>{pageIndex +1} of {pageOptions.length}</strong>{' '}
                <span>
                    {pageOptions.map((e,index)=>
                    <button onClick={()=> gotoPage(index)}>{pageOptions[index]}</button>
                    )}
                </span>
                </span>
                    <button onClick={()=>gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                <button onClick={()=>previousPage()} disabled={!canPreviousPage}>previous</button>
                <button onClick={()=>nextPage()} disabled={!canNextPage}>Next</button>
                    <button onClick={()=> gotoPage(pageCount-1)} disabled={!canNextPage}>{'>>'}</button>
            </div>
        </table>
        </>
    )
}
