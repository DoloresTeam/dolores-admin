import React from 'react';
import { List, Datagrid, TextField, ReferenceManyField, SingleFieldList, ChipField } from 'admin-on-rest';
import { Create, Edit, Delete, EditButton, DeleteButton } from 'admin-on-rest';
import { SimpleForm, DisabledInput, TextInput, ReferenceArrayInput, SelectArrayInput } from 'admin-on-rest';
import Pagination from '../ui/pagination';

export const RoleList = (props) => (
    <List {...props} pagination={<Pagination />}>
        <Datagrid>
            <TextField source="id" sortable={false}/>
            <TextField label="name" source="cn" sortable={false}/>
            <TextField source="description" sortable={false}/>
            <ReferenceManyField label="Department Permissions" reference="u_permission" target="role_id">
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

export const RoleCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="cn" label="Name"/>
            <TextInput source="description" label="Description"/>
            <ReferenceArrayInput source="upid" label="Department Permissions" filter={{isUnit: true}} reference="permission" allowEmpty={true}>
                <SelectArrayInput optionText="cn" optionValue="id" />
            </ReferenceArrayInput>
            <ReferenceArrayInput source="ppid" label="Member Permissions" filter={{isUnit: false}} reference="permission" allowEmpty={true}>
                <SelectArrayInput optionText="cn" optionValue="id" />
            </ReferenceArrayInput>
        </SimpleForm>
    </Create>
);

export const RoleEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput source="id" label="ID"/>
            <TextInput source="cn" label="Name"/>
            <TextInput source="description" label="Description"/>
            <ReferenceArrayInput source="upid" label="Department Permissions" filter={{isUnit: true}} reference="permission" allowEmpty={true}>
                <SelectArrayInput optionText="cn" optionValue="id" />
            </ReferenceArrayInput>
            <ReferenceArrayInput source="ppid" label="Member Permissions" filter={{isUnit: false}} reference="permission" allowEmpty={true}>
                <SelectArrayInput optionText="cn" optionValue="id" />
            </ReferenceArrayInput>
        </SimpleForm>
    </Edit>
);

export const RoleDelete = (props) => (
    <Delete {...props} />
)