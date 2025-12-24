import { Routes } from '@angular/router';
import { Register } from './components/register/register';
import { Login } from './components/login/login';
import { Search } from './components/search/search';
import { Home } from './components/home/home';
import { BookingComponent } from './components/booking-component/booking-component';
import { Cancel } from './components/cancel/cancel';
import { Profile } from './components/profile/profile';
import { Inventory } from './components/inventory/inventory';
import { ForcePassword } from './components/force-password/force-password';

export const routes: Routes = [{path: 'register',component: Register},
    {path: 'login',component: Login},{path:'search',component: Search},{ path: '', component: Home },
    { path: 'booking/:id', component: BookingComponent },{path:'all',component:Cancel},
    {path:'profile',component:Profile},
    {path:'inventory',component:Inventory},
    {path:'forcePassword',component:ForcePassword}
];
