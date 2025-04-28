import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { Router, Route } from '@angular/router';
import { CustomLink } from '../../client/list-clients/model/custom-link';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatSort,Sort} from '@angular/material/sort';
//import { client } from './model/clients';
import {TooltipPosition} from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../../components/menu/menu/menu.component';

@Component({
  selector: 'app-list-proposal',
  standalone: true,
  imports: [],
  templateUrl: './list-proposal.component.html',
  styleUrl: './list-proposal.component.css'
})
export class ListProposalComponent {

}
