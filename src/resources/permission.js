import React from 'react';
import { Create, Edit, Delete, EditButton } from 'admin-on-rest'
import { SingleFieldList, ChipField, ReferenceManyField, DeleteButton, Datagrid, TextField } from 'admin-on-rest';
import { SimpleForm, DisabledInput, TextInput, SelectInput, ReferenceArrayInput, SelectArrayInput } from 'admin-on-rest'
import { DependentInput } from 'aor-dependent-input';
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
            <TextInput source='cn' label='Name' validate={[required]}/>
            <TextInput source='description' label='Description' options={{ multiLine: true }}/>
            <SelectInput source="category" choices={[
                { id: 'department', name: 'Department' },
                { id: 'member', name: 'Member' },
            ]}  optionText='name' optionValue='id' label='Category' defaultValue={`department`} parse={v => v === 'department' ? true : false}/>
            <DependentInput dependsOn="category" value="department">
                <ReferenceArrayInput label="Type" filter={{isUnit: true}} source="uType" reference="type" allowEmpty={true} options={{ fullWidth: true }}>
                    <SelectArrayInput optionText="cn" optionValue="id" validate={[required]}/>
                </ReferenceArrayInput>
            </DependentInput>
            <DependentInput dependsOn="category" value="member">
                <ReferenceArrayInput label="Type" filter={{isUnit: false}} source="mType" reference="type" allowEmpty={true} options={{ fullWidth: true }}>
                    <SelectArrayInput optionText="cn" optionValue="id" validate={[required]}/>
                </ReferenceArrayInput>
            </DependentInput>
        </SimpleForm>
    </Create>
);

export const PermissionEdit = (props) => (
    <Edit {...props}>
        <SimpleForm >
            <DisabledInput label="ID" source="id" />
            <DisabledInput label="Category" source="category"/>
            <TextInput label='Name' source='cn' validate={[required]}/>
            <TextInput label='Description' source='description' options={{ multiLine: true }}/>
            <DependentInput dependsOn="category" value="部门权限">
                <ReferenceArrayInput label="Type" filter={{isUnit: true}} source="uType" reference="type" allowEmpty={true}>
                    <SelectArrayInput optionText="cn" optionValue="id" validate={[required]}/>
                </ReferenceArrayInput>
            </DependentInput>
            {/*TODO： Input 框的 parse 和 format 目前不太好用，暂时先用这个蠢方法，后期优化*/}
            <DependentInput dependsOn="category" value="员工权限">
                <ReferenceArrayInput label="Type" filter={{isUnit: false}} source="mType" reference="type" allowEmpty={true}>
                    <SelectArrayInput optionText="cn" optionValue="id" validate={[required]}/>
                </ReferenceArrayInput>
            </DependentInput>
        </SimpleForm>
    </Edit>
);

export const PermissionDelete = (props) => (
    <Delete {...props} />
)