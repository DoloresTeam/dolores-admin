import React from 'react';
import { List, Datagrid, TextField, ReferenceManyField, SingleFieldList, ChipField } from 'admin-on-rest';
import { EditButton, DeleteButton } from 'admin-on-rest'
import Pagination from '../ui/pagination';

export const RoleList = (props) => (
    <List {...props} pagination={<Pagination />}>
        <Datagrid>
            <TextField source="id" sortable={false}/>
            <TextField label="name" source="cn" sortable={false}/>
            <TextField source="description" sortable={false}/>
            <ReferenceManyField label="Member Permissions" reference="u_permission" target="role_id">
                <SingleFieldList>
                    <ChipField source="cn" />
                </SingleFieldList>
            </ReferenceManyField>
            <ReferenceManyField label="Member Permissions" reference="p_permission" target="role_id">
                <SingleFieldList>
                    <ChipField source="cn" />
                </SingleFieldList>
            </ReferenceManyField>
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);
