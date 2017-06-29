import React from 'react'
import { List, Datagrid, TextField } from 'admin-on-rest';
import { ReferenceField, EditButton, DeleteButton } from 'admin-on-rest';
import { Create, Edit, Delete, SimpleForm, DisabledInput, TextInput, ReferenceInput, SelectInput } from 'admin-on-rest';
import { required } from 'admin-on-rest';

export const DepartmentList = (props) => (
    <List {...props} pagination={null}>
        <Datagrid>
            <TextField source="id" sortable={false}/>
            <TextField label='Name' source="ou" sortable={false}/>
            <TextField source="description" sortable={false}/>
            <ReferenceField source="rbacType" reference="type" sortable={false} linkType="edit" allowEmpty={true}>
                <TextField source="ou" />
            </ReferenceField>
            <ReferenceField label="Parent Department" source="parentID" reference="department" sortable={false} allowEmpty={true}>
                <TextField source="ou" />
            </ReferenceField>
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export const DepartmentCreate = (props) => (
    <Create {...props}>
        <SimpleForm >
            <TextInput source='ou' label='Name' validate={[required]}/>
            <TextInput source='description' label='Description' options={{ multiLine: true }}/>
            <ReferenceInput label="Department Type" source="rbacType" reference="type" filter={{isUnit: true}} allowEmpty={true}>
                <SelectInput optionText="cn" />G
            </ReferenceInput>
            <ReferenceInput label="Parent Department" source="parentID" reference="department" allowEmpty={true}>
                <SelectInput optionText="ou" />
            </ReferenceInput>
            <TextInput lable="优先级" source="priority"/>
        </SimpleForm>
    </Create>
);

export const DepartmentEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput label="ID" source="id" />
            <TextInput source='ou' label='Name' validate={[required]}/>
            <TextInput source='description' label='Description' options={{ multiLine: true }}/>
            <ReferenceInput label="Department Type" source="rbacType" reference="type" filter={{isUnit: true}} allowEmpty={true}>
                <SelectInput optionText="ou" />
            </ReferenceInput>
            <TextInput lable="优先级" source="priority"/>
        </SimpleForm>
    </Edit>
);

export const DepartmentDelete = (props) => (
    <Delete {...props} />
);