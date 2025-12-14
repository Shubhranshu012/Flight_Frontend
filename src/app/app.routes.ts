import { Routes } from '@angular/router';
import { Register } from './components/register/register';
import { Login } from './components/login/login';
import { Search } from './components/search/search';

export const routes: Routes = [{path: 'register',component: Register},
    {path: 'login',component: Login},{path:'search',component: Search}
];
