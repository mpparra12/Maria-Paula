import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListClientsComponent } from './pages/client/list-clients/list-clients.component';
import { AddClientComponent } from './pages/client/add-client/add-client.component';
import { EditClientComponent } from './pages/client/edit-client/edit-client.component';
import { DashboardProposalComponent } from './pages/proposal/dashboard-proposal/dashboard-proposal.component';
import { ListProposalComponent} from './pages/proposal/list-proposal/list-proposal.component'
import { ListProjectsQAQCComponent } from './pages/QAQC/list-projects-qaqc/list-projects-qaqc.component';
import { QADetailsComponent } from './pages/QAQC/qadetails/qadetails.component';
import { QCDetailsComponent } from './pages/QAQC/qcdetails/qcdetails.component';
import { QCNewComponent } from './pages/QAQC/qc-new/qc-new.component';
import { ListProjectComponent } from './pages/project/list-project/list-project.component';
import { AddProjectComponent } from './pages/project/add-project/add-project.component';
import { EditProjectComponent } from './pages/project/edit-project/edit-project.component';
import { AddProposalComponent } from './pages/proposal/add-proposal/add-proposal.component';
import { EditProposalComponent } from './pages/proposal/edit-proposal/edit-proposal.component';
import { ListbyDetailComponent } from './pages/project/listby-detail/listby-detail.component';

export const routes: Routes = [
    { path: '', redirectTo: '/ListClient', pathMatch: 'full' }, 
    { path: 'ListClient', component: ListClientsComponent },
    { path: 'AddClient', component: AddClientComponent },
    { path: 'EditClient', component: EditClientComponent },
    { path: 'DashboardProposal', component: DashboardProposalComponent },    
    { path: 'ListProposal', component: ListProposalComponent },   
    { path: 'ListProjectsQAQC', component: ListProjectsQAQCComponent }, 
    { path: 'QADetails', component: QADetailsComponent }, 
    { path: 'QCDetails', component: QCDetailsComponent }, 
    { path: 'QCNew', component: QCNewComponent }, 
    { path: 'ListProjects', component: ListProjectComponent },
    { path: 'EditProjects', component: EditProjectComponent },
    { path: 'AddProjects', component: AddProjectComponent },
    { path: 'AddProposal', component: AddProposalComponent },
    { path: 'EditProposal', component: EditProposalComponent },    
    { path: 'ListbyDetail', component: ListbyDetailComponent }
];

@NgModule({
  
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  