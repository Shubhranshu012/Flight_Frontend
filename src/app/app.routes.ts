import { Routes } from '@angular/router';
import { Register } from './components/register/register';
import { Login } from './components/login/login';
import { Search } from './components/search/search';
import { Home } from './components/home/home';
import { BookingComponent } from './components/booking-component/booking-component';
import { Temp } from './components/temp/temp';
import { Cancel } from './components/cancel/cancel';

export const routes: Routes = [{path: 'register',component: Register},
    {path: 'login',component: Login},{path:'search',component: Search},{ path: '', component: Home },
    { path: 'booking/:id', component: BookingComponent },
    {path:'temp',component:Temp},{path:'all',component:Cancel}
];
