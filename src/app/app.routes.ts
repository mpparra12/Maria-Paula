import { Routes } from '@angular/router';
import { ListClientsComponent } from './pages/client/list-clients/list-clients.component';
import { AddClientComponent } from './pages/client/add-client/add-client.component';

export const routes: Routes = [
    { path: 'ListClient', component: ListClientsComponent },
    { path: 'AddClient', component: AddClientComponent },
    { path: '', redirectTo: '/ListClient', pathMatch: 'full' } 
 
];
