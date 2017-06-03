import React from 'react'
import { List, Datagrid, TextField } from 'admin-on-rest';
import { Create, TabbedForm, FormTab } from 'admin-on-rest';
import { TextInput, ReferenceInput, SelectInput, ReferenceArrayInput, SelectArrayInput } from 'admin-on-rest';
import { email, regex, required } from 'admin-on-rest';
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
);

export const MemberCreate = (props) => (
    <Create {...props}>
        <TabbedForm>
            <FormTab label="基本信息">
                <TextInput source="name" label="姓名" validate={required}/>
                <TextInput source="cn" label="昵称" />
                <TextInput source="telephoneNumber" label="电话" validate={regex(/^1[3|4|5|8][0-9]\d{4,8}$/, 'Must be a valid phone number')}/>
                <TextInput source="email" label="电子邮箱" validate={email}/>
            </FormTab>
            <FormTab label="职位">
                <ReferenceInput label="部门" source="unitID" reference="department" allowEmpty={true}>
                    <SelectInput optionText="cn" />
                </ReferenceInput>
                <TextInput source="title" label="职位" />
                <ReferenceArrayInput source="rbacType" label="员工类别" filter={{isUnit: false}} reference="type" allowEmpty={true}>
                    <SelectArrayInput optionText="cn" optionValue="id" />
                </ReferenceArrayInput>
                <ReferenceArrayInput source="rbacRole" label="员工角色" reference="role" allowEmpty={true}>
                    <SelectArrayInput optionText="cn" optionValue="id" />
                </ReferenceArrayInput>
            </FormTab>
        </TabbedForm>
    </Create>
);