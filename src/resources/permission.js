import React from 'react';
import { Create, ReferenceInput, CheckboxGroupInput, EditButton, SingleFieldList, ChipField, ReferenceManyField, DeleteButton, SimpleForm, TextInput, SelectInput, Datagrid, TextField } from 'admin-on-rest';
// import { required, minLength, maxLength, minValue, maxValue, number, regex, email, choices } from 'admin-on-rest';
import { required } from 'admin-on-rest';
import DList from '../ui/doloresList';

export const PermissionList = (props) => (
    <DList {...props} title='Permission List'>
        <Datagrid>
            <TextField source="id" sortable={false}/>
            <TextField label='Name' source="cn" sortable={false}/>
            <TextField source="description" sortable={false}/>
            <ReferenceManyField label="RBACTypes" reference="type" target="permission_id">
                <SingleFieldList>
                    <ChipField source="cn" />
                </SingleFieldList>
            </ReferenceManyField>
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </DList>
);

export const PermissionCreate = (props) => (
    <Create {...props}>
        <SimpleForm >
            <SelectInput source="category" choices={[
                { id: `1`, name: 'Department' },
                { id: `2`, name: 'Member' },
            ]}  optionText='name' optionValue='id' label='Category' defaultValue={`1`} />
            <TextInput source='cn' label='Name' validate={[required]}/>
            <TextInput source='description' label='Description' options={{ multiLine: true }}/>
            <ReferenceInput label="Type" filter={{isUnit: true}} source="rbacType" reference="type" allowEmpty={true}>
                <SelectInput optionText="cn" optionValue="id" validate={[required]}/>
            </ReferenceInput>
        </SimpleForm>
    </Create>
)
