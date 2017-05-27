import React from 'react'
import { List, Datagrid, TextField } from 'admin-on-rest';

import Pagination from '../ui/pagination';

export const MemberList = (props) => (
    <List {...props} pagination={<Pagination />}>
        <Datagrid>
            <TextField source="id" sortable={false}/>
            <TextField source="cn" sortable={false}/>
            <TextField source="name" sortable={false}/>
            <TextField source="email" sortable={false}/>
            <TextField source="title" sortable={false}/>
            <TextField source="telephoneNumber" sortable={false}/>
        </Datagrid>
    </List>
)