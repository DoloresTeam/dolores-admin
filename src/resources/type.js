import React from 'react';
import { Create, Edit, Delete, EditButton, DeleteButton, SimpleForm, TextInput, SelectInput, Datagrid, TextField, DisabledInput } from 'admin-on-rest';
// import { required, minLength, maxLength, minValue, maxValue, number, regex, email, choices } from 'admin-on-rest';
import { required } from 'admin-on-rest';
import DList from '../ui/doloresList';

export const TypeList = (props) => (
    <DList {...props} title='Type List'>
        <Datagrid>
            <TextField source="id" sortable={false} style={{width: '20%'}}/>
            <TextField label='Name' source="cn" sortable={false} style={{width: '20%'}}/>
            <TextField source="description" sortable={false} style={{width: '30%'}}/>
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </DList>
);

export const TypeCreate = (props) => (
    <Create {...props}>
        <SimpleForm >
            <TextInput source='cn' label='Name' validate={[required]}/>
            <TextInput source='description' label='Description' options={{ multiLine: true }}/>
            <SelectInput source="category" choices={[
                { id: 'Department', name: 'Department' },
                { id: 'Member', name: 'Member' },
            ]}  label='Category' defaultValue={'Department'}/>
        </SimpleForm>
    </Create>
)

export const TypeEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput label="ID" source="id" />
            <DisabledInput label="Category" source="category" />
            <TextInput source="cn" label="Name" validate={required} />
            <TextInput source='description' label='Description' options={{ multiLine: true }}/>
        </SimpleForm>
    </Edit>
)

export const TypeDelete = (props) => (
    <Delete {...props}>

    </Delete>
)
