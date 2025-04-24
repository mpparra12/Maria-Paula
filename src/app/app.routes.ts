import { Routes } from '@angular/router';
import { ListClientsComponent } from './pages/client/list-clients/list-clients.component';
import { AddClientComponent } from './pages/client/add-client/add-client.component';
import { EditClientComponent } from './pages/client/edit-client/edit-client.component';
import { DashboardProposalComponent } from './pages/proposal/dashboard-proposal/dashboard-proposal.component';
import {ListProposalComponent} from './pages/proposal/list-proposal/list-proposal.component'

export const routes: Routes = [
    { path: 'ListClient', component: ListClientsComponent },
    { path: 'AddClient', component: AddClientComponent },
    { path: 'EditClient', component: EditClientComponent },
    { path: 'DashboardProposal', component: DashboardProposalComponent },    
    { path: 'ListProposal', component: ListProposalComponent },    
    { path: '', redirectTo: '/ListClient', pathMatch: 'full' } 
 
];
