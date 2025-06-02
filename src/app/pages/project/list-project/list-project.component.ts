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
import { project } from '../../client/list-clients/model/project'
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
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../../../components/menu/menu/menu.component';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-list-project',
  standalone: true,
  imports: [MatTableModule,
    MatPaginatorModule, 
    MatSortModule, FormsModule, 
    MatCardModule,CommonModule,
    MatIconModule, MatFormFieldModule,ReactiveFormsModule,
    MatTableExporterModule, MenuComponent,
    MatTooltipModule, MatButtonModule,  MatInputModule,  MatCheckboxModule],
  templateUrl: './list-project.component.html',
  styleUrl: './list-project.component.css'
})
export class ListProjectComponent implements OnInit{
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
 
  myForm: FormGroup | any;
  position = new FormControl(this.positionOptions[0]);
 
  formData: any = {}; // Objeto para almacenar los datos del formulario , 'residence_id',
 // displayedColumnsS: string[] = [ 'ClientID','Name', 'Address','City','State','ZipCode','Logo','Active','Country' ,'Period_of_Invoice','Invoice_Date','ProcedureDetails','Actions'];
 displayedColumns: string[] = [
  'Status', 
  'ProjectName', 
  'ClientName', 
  'ProjectDescription', 
  'PM',
  'ProjectType',
  'ContractValue',
  'NoProposal',
  'AwardDate',
  'Actions'
];

EmpData : project[]=[ 
  {
    ID: 24,
    ProjectName: "1700.00",
    ClientName: "xx",
    ProjectDescription: "xx",
    PM: "xx",
    ProjectType:'XX',
    ContractValue:'xx',
    NoProposal:'xx',
    AwardDate:'xx'
  }
];


 
 // EmpData : client[]=[ {
 //   ClientID:1,Name:"XXX", Address:"XXX", City:"XXX", State: "XXX", ZipCode: "XXX", Logo: "XXX", Active: 1, Country: "XXX" , Period_of_Invoice: "XXX", Invoice_Date: "XXX", ProcedureDetails: "XXX"}];
   

  owner: any;
  dataSource = new MatTableDataSource<project>(this.EmpData);
  //dataSource: any;
  dataSourceV: any;
  filterValues = {};
  dataSourceG: any;
  columnas: any[] = [];
   filterSelectObj = [];
   
  background = 'primary';
  links: CustomLink[] = [
    {
      label:'Home',
      path:'https://avalonsevenmeadows.org/'
    },
    {
      label:'New Residents',
      path:'https://avalonsevenmeadows.org/new-residents/'
    },
    {
      label:'Documents',
      path:'https://avalonsevenmeadows.org/#'
    },
    {
      label:'Contacts',
      path:'https://avalonsevenmeadows.org/contacts/'
    },
    {
      label:'Gallery',
      path:'https://avalonsevenmeadows.org/gallery/'
    }
];
 
@ViewChild('empTbSort') empTbSort = new MatSort();
 
constructor(
  private fb: FormBuilder,
  private apiServices: ApiService,
  private dialog: MatDialog,
  private _route: Router,
  private renderer: Renderer2,
  @Inject(PLATFORM_ID) private platformId: any
) {
  

  if (isPlatformBrowser(this.platformId)) { 
    this.renderer.setStyle(document.body, 'background', '');
  }

  // ✅ Initialize the form properly inside the constructor
  this.myForm = this.fb.group({
    address: ['', Validators.required],
    mailingAddress: ['', [Validators.required, Validators.email]]
  });
  
}
 
     // Object to create Filter for


  // https://www.angularjswiki.com/material/mat-table-sort
  //https://stackoverflow.com/questions/58094372/mat-table-datasource-doesnt-work-when-using-rest-api///
  ngAfterViewInit() {
   
   this.empTbSort.disableClear = true;
   this.dataSource.sort = this.empTbSort;
  // this.dataSource2.sort = this.empTbSort;
 
   }
 
  ngOnInit(): void {
   // this.dataSource1 = new MatTableDataSource();
    this.dataSource = new MatTableDataSource();
 
    this.getProjects();
  
   
  }
 
  exportCsv(){
   
     }
 
  openmap(data:any):void{
   console.log('dato',data)
   window.open(data.File);
 }
 

  getAllProjectsStatus(data:any):void
  {
    console.log("Estoy aqui");
    //if (isPlatformBrowser(this.platformId)) { 
      //const user = localStorage.getItem('user');
      
      /*if (user) {
        const parsedUser = JSON.parse(user);
        console.log("User Data:", parsedUser);
      }*/
    console.log("User Data:", data);

      this.apiServices.getAllProjectsStatus(data).subscribe(
       
        (resp) => {
          debugger;
          console.log("getProjectQAQC:", resp);
           resp.forEach((element:any) => {
        if (element.File==null)
        element.Design=true;
      else
        element.Design=false;
      });
      this.dataSource.data = resp;
        },
        (error) => {
          console.error("Error fetching clients:", error);
        }
      );
    //} else {
     // console.warn("localStorage is not available in this environment.");
    //}
  }
 getProjects()
  {
    console.log("Estoy aqui");
    //if (isPlatformBrowser(this.platformId)) { 
      //const user = localStorage.getItem('user');
      
      /*if (user) {
        const parsedUser = JSON.parse(user);
        console.log("User Data:", parsedUser);
      }*/
  
      this.apiServices.getAllProjects().subscribe(
       
        (resp) => {
          debugger;
          console.log("getProjectQAQC:", resp);
           resp.forEach((element:any) => {
        if (element.File==null)
        element.Design=true;
      else
        element.Design=false;
      });
      this.dataSource.data = resp;
  
        },
        (error) => {
          console.error("Error fetching clients:", error);
        }
      );
    //} else {
     // console.warn("localStorage is not available in this environment.");
    //}
  }



  
  onSubmit() {
    // Verificar si el formulario es válido
    if (this.myForm.valid) {
      // Lógica para manejar el envío del formulario aquí
      console.log(this.formData);
    } else {
      // Marcar los campos como tocados para mostrar los mensajes de error
      Object.values(this.myForm.controls).forEach(control => {
        (control as any).markAsTouched(); // Usa una afirmación de tipo
      });
    }
  }
 
  addRow() {
    // Duplica la primera fila (la última del dataSource)
   // const newRow = { ...this.dataSource[this.dataSource.length - 1] };
    //this.dataSource.push(newRow);
  }
 
  

  AddProject():void{
   
    this._route.navigate(['/AddProjects']);
 
  }

  ListProposal():void{
   
    this._route.navigate(['/ListProposal']);
 
  }


 
  select(data:any):void{
   
    this._route.navigate(['/tabs'],{state:{ resident:{data}}});
 
  }
 
 
 
  edit(data:any):void{
   
    this._route.navigate(['/EditProjects'],{state:{ project:{data}}});
   
 
  }
 
  delete(client: any) {
    console.log("Client para borrar",client);
    if(confirm("Are you sure to delete the Project?")) {
      this.apiServices.deleteClient(client).subscribe((resp:any)=>{
        if (resp.success) {
          //this.ngOnInit();

         // alert(resp.response);
          //this.ngOnInit();
          this.refresh()
        }
        
      });
      
    }
  }

  add():void{
   
     this._route.navigate(['/AddProjects']);
    //this._route.navigate(['/new-emr']);
   
 
  }
 
  applyFilter(event: any) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.value !== undefined) {
      const filterValue = inputElement.value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }
 
  addVehicle():void{
   
    // this._route.navigate(['/add-resident']);
    this._route.navigate(['/add-vehicle']);
   
 
  }
 
  addEmr():void{
   
    this._route.navigate(['/new-emr']);
   
 
  }
 
  refresh(){
    this._route.navigate(['/ListClient']);
  }

  openDialog(): void {
    //const dialogRef = this.dialog.cr
  }
 
}
