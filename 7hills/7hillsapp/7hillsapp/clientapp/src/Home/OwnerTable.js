import React,{useMemo,useEffect,useState} from 'react'
import api from '../actions/api'
import '../StyleCss/TableStyleCss.scss'
import {useTable, useSortBy, useGlobalFilter,useFilters,usePagination} from 'react-table'
import {TableHeaderOwnerColumn} from './TableHeaderColumn'
import { ColumnFiltering } from '../Table/ColumnFiltering'

export const OwnerTable = () => {
    const [ownerList,setOwnerList] = useState([])

    function fetchAllList(){
        api.ownersAPI().fetchAll().then(res=>{
            setOwnerList(res.data)
        })
        .catch(err=>console.log(err))
    }
    useEffect(()=>{
        fetchAllList()
    },[])
    const columns = useMemo(()=>TableHeaderOwnerColumn,[])
    const data = useMemo(()=>ownerList,[])
    const tableInstance = useTable({
        columns,data
    },useSortBy,usePagination)
    const {getTableProps,getTableBodyProps,headerGroups,rows,prepareRow,state} = tableInstance
    return (
        <>
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
                            return(
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map((cell)=>{
                                        return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}
