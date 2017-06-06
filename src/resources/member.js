import React from 'react'
import { List, Datagrid, TextField, ReferenceField } from 'admin-on-rest';
import { Create, Delete, Edit, TabbedForm, FormTab, DeleteButton, EditButton } from 'admin-on-rest';
import { TextInput, ReferenceInput, SelectInput, ReferenceArrayInput, SelectArrayInput } from 'admin-on-rest';
import { email, regex, required } from 'admin-on-rest';
import Pagination from '../ui/pagination';

export const MemberList = (props) => (
    <List {...props} pagination={<Pagination />}>
        <Datagrid>
            <TextField source="name" sortable={false}/>
            <TextField source="cn" sortable={false}/>
            <TextField source="email" sortable={false}/>
            <TextField source="title" sortable={false}/>
            <TextField source="telephoneNumber" sortable={false}/>
            <ReferenceField source="rbacType" reference="type" sortable={false} linkType="edit" allowEmpty={true}>
                <TextField source="cn" />
            </ReferenceField>
            <ReferenceField label="Department" source="unitID" reference="department" sortable={false} allowEmpty={true}>
                <TextField source="cn" />
            </ReferenceField>
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export const MemberCreate = (props) => (
    <Create {...props}>
        <TabbedForm>
            <FormTab label="基本信息">
                <TextInput source="name" label="姓名" validate={required}/>
                <TextInput source="cn" label="昵称" />
                <SelectInput source="gender" choices={[
                    { id: '1', name: '男' },
                    { id: '0', name: '女' },
                ]}  label='性别' />
                <TextInput source="telephoneNumber" label="电话" validate={regex(/^1[3|4|5|8][0-9]\d{4,8}$/, 'Must be a valid phone number')}/>
                <TextInput source="email" label="电子邮箱" validate={email}/>
            </FormTab>
            <FormTab label="职位">
                <ReferenceInput label="部门" source="unitID" reference="department" allowEmpty={true}>
                    <SelectInput optionText="cn" />
                </ReferenceInput>
                <TextInput source="title" label="职位" />
                <ReferenceInput label="员工类别" source="rbacType" reference="type" filter={{isUnit: false}} allowEmpty={true}>
                    <SelectInput optionText="cn" />
                </ReferenceInput>
                <ReferenceArrayInput label="员工角色" source="rbacRole" reference="role" allowEmpty={true}>
                    <SelectArrayInput optionText="cn" optionValue="id" />
                </ReferenceArrayInput>
            </FormTab>
        </TabbedForm>
    </Create>
);

export const MemberEdit = (props) => (
    <Edit {...props}>
        <TabbedForm>
            <FormTab label="基本信息">
                <TextInput source="name" label="姓名" validate={required}/>
                <TextInput source="cn" label="昵称" />
                <SelectInput source="gender" choices={[
                    { id: '1', name: '男' },
                    { id: '0', name: '女' },
                ]}  label='性别' />
                <TextInput source="telephoneNumber" label="电话" validate={regex(/^1[3|4|5|8][0-9]\d{4,8}$/, 'Must be a valid phone number')}/>
                <TextInput source="email" label="电子邮箱" validate={email}/>
            </FormTab>
            <FormTab label="职位">
                <ReferenceArrayInput label="部门" source="unitID" reference="department" allowEmpty={true}>
                    <SelectArrayInput optionText="cn" />
                </ReferenceArrayInput>
                <TextInput source="title" label="职位" />
                <ReferenceInput label="员工类别" source="rbacType" reference="type" filter={{isUnit: false}} allowEmpty={true}>
                    <SelectInput optionText="cn" />
                </ReferenceInput>
                <ReferenceArrayInput label="员工角色" source="rbacRole" reference="role" allowEmpty={true}>
                    <SelectArrayInput optionText="cn" optionValue="id" />
                </ReferenceArrayInput>
            </FormTab>
        </TabbedForm>
    </Edit>
);

export const MemberDelete = (props) => (
    <Delete {...props} />
);