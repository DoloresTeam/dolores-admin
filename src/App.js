import React from 'react';
import { Admin, Resource } from 'admin-on-rest';

import client from './rest/client';
import authClient from './rest/authClient';

import SwitchTitleReducer from './reducers/SwitchTitleReducer';

import { TypeList, TypeCreate, TypeEdit, TypeDelete } from './resources/type';
import { PermissionList, PermissionCreate, PermissionEdit, PermissionDelete } from './resources/permission';
import { RoleList, RoleCreate, RoleEdit, RoleDelete } from './resources/role'
import { MemberList } from './resources/member'
import { DepartmentList, DepartmentCreate, DepartmentEdit } from './resources/department'

import MemberIcon from 'material-ui/svg-icons/social/group';
import DepartmentIcon from 'material-ui/svg-icons/action/group-work';
import RoleIcon from 'material-ui/svg-icons/action/face';
import TypeIcon from 'material-ui/svg-icons/action/view-module';

import DashBoard from './dashboard'

const App = () => (
    <Admin authClient={authClient} dashboard={DashBoard} customReducers={{titleSwitched: SwitchTitleReducer}} title='Dolores Admin' restClient={client('http://127.0.0.1:3280/admin/v1')}>
        <Resource name='type' list={TypeList} create={TypeCreate} edit={TypeEdit} remove={TypeDelete} icon={TypeIcon}/>
        <Resource name='permission' list={PermissionList} create={PermissionCreate} edit={PermissionEdit} remove={PermissionDelete} />
        <Resource name="u_permission" />
        <Resource name="p_permission" />
        <Resource name='role' list={RoleList} create={RoleCreate} edit={RoleEdit} remove={RoleDelete} icon={RoleIcon}/>
        <Resource name='member' list={MemberList} icon={MemberIcon}/>
        <Resource name='department' list={DepartmentList} create={DepartmentCreate} edit={DepartmentEdit} icon={DepartmentIcon}/>
    </Admin>
);

export default App;
