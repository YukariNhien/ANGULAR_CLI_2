import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { Login } from './login/login.component';
import { Home } from './home/home.component';
import { AuthGuard} from './auth.service';
const routes: Routes = [

    {
        path: '',
        redirectTo: 'trang-chu', pathMatch: 'full'
    },
   
    {
        path: 'trang-chu',
        component: Home,
      
    },
    {
        path: 'login',
        component: Login,
    },

];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });