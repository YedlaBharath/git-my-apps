import {ColumnFiltering} from './ColumnFiltering'
export const Columns=[
    {Header:"Id",Footer:"Id",accessor:"id"},
    {Header:"First Name",Footer:"First Name",accessor:"first_name"},
    {Header:"Last Name",Footer:"Last Name",accessor:"last_name"},
    {Header:"Gender",Footer:"Gender",accessor:"gender"},
    {Header:"Date of Birth",Footer:"Date of Birth",accessor:"data_of_birth"}
]

export const GroupedColumns=[
    {Header:"Id",Footer:"Id",accessor:"id",disableFilters:true},
    {
        Header:"Name",
        Footer:"Name",
        columns:[
            {Header:"First Name",Footer:"First Name",accessor:"first_name"},
            {Header:"Last Name",Footer:"Last Name",accessor:"last_name"},
        ]
    },
    {
        Header:"Info",
        Footer:"Info",
        columns:[
            {Header:"Gender",Footer:"Gender",accessor:"gender"},
            {Header:"Date of Birth",Footer:"Date of Birth",accessor:"data_of_birth"}
        ]
    }
]