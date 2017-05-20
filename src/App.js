import React from 'react';
import { Admin, Resource } from 'admin-on-rest';
import client from './rest/client';

import SwitchTitleReducer from './reducers/SwitchTitleReducer';

import { TypeList, TypeCreate, TypeEdit, TypeDelete } from './types';
import { PermissionList, PermissionCreate } from './permission';

const App = () => (
    <Admin customReducers={{titleSwitched: SwitchTitleReducer}} title='Dolores Admin' restClient={client('http://127.0.0.1:3280/admin/v1')}>
        <Resource name='type' list={TypeList} create={TypeCreate} edit={TypeEdit} remove={TypeDelete}/>
        <Resource name='permission' list={PermissionList} create={PermissionCreate} />
    </Admin>
);

export default App;
