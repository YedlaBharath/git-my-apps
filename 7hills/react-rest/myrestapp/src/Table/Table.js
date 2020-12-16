import React,{useMemo} from 'react'
import {useTable} from 'react-table'
import MOCK_DATA from '../CardComponents/MOCK_DATA.json'
import {Columns, GroupedColumns} from './Columns'


export const Table = () => {

    const columns = useMemo(()=>GroupedColumns,[])
    const data = useMemo(()=> MOCK_DATA,[])
    const tableInstance = useTable({
        columns,
        data,
    })
    const {getTableProps,getTableBodyProps,headerGroups,rows,prepareRow, footerGroups} = tableInstance
    // console.log(tableInstance)
    return (
        <table {...getTableProps()}>
            <thead>
                {
                    headerGroups.map((headerGroup)=>(
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {
                            headerGroup.headers.map((column)=>(
                                <th {...column.getHeaderProps()}>
                                    {column.render("Header")}
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
    )
}
