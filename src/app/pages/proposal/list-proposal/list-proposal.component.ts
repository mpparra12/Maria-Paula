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
import { proposals } from '../../client/list-clients/model/proposals';
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
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-proposal',
  standalone: true,
  imports: [MatTableModule, 
    MatPaginatorModule, 
    MatSortModule, 
    MatCardModule,CommonModule, MatPaginator,
    MatIconModule, MatFormFieldModule,ReactiveFormsModule,
    MatTableExporterModule, MenuComponent,
    MatTooltipModule, MatButtonModule,  MatInputModule,  MatCheckboxModule],
  templateUrl: './list-proposal.component.html',
  styleUrl: './list-proposal.component.css'
})

export class ListProposalComponent { 
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
 
  myForm: FormGroup | any;
  position = new FormControl(this.positionOptions[0]);
 
  formData: any = {}; 
 // displayedColumnsS: string[] = [ 'ClientID','Name', 'Address','City','State','ZipCode','Logo','Active','Country' ,'Period_of_Invoice','Invoice_Date','ProcedureDetails','Actions'];
 displayedColumns: string[] = [

  'Name', 
  'Category', 
  'ProjectDescription', 
    'Scope',
  'ContractValue', 
  'EstimatedHours', 
  'Year', 
  'NoProposal', 
  'Country', 
  'ProposalSubmitted',

  'StatusProp','Actions'
];

EmpData : [proposals]=[ 
  {
    ClientID: 24,
    Name: "TENSAR",
    Category: "xx",
    ProjectDescription: "xx",
    ContractValue: "xx",
    EstimatedHours: "xx",
    Year: "tensar.png",
    Proposal: "xx",
    NoProposal: "xx",
    Country: "xx",
    ProposalRequestDate: "xx",
    ProposalSubmitted: "xx",
    Scope: "xx",
    StatusProp: "xx",

  }
];


 
 // EmpData : client[]=[ {
 //   ClientID:1,Name:"XXX", Address:"XXX", City:"XXX", State: "XXX", ZipCode: "XXX", Logo: "XXX", Active: 1, Country: "XXX" , Period_of_Invoice: "XXX", Invoice_Date: "XXX", ProcedureDetails: "XXX"}];
   

  owner: any;
  dataSource = new MatTableDataSource<proposals>(this.EmpData);
  //dataSource: any;
  dataSourceV: any;
  dataSourceG: any;
  columnas: any[] = [];
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
@ViewChild(MatPaginator) paginator = {} as MatPaginator;

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
 
  // https://www.angularjswiki.com/material/mat-table-sort
  //https://stackoverflow.com/questions/58094372/mat-table-datasource-doesnt-work-when-using-rest-api///
  ngAfterViewInit() {
   
   this.empTbSort.disableClear = true;
   this.dataSource.sort = this.empTbSort;
   this.dataSource.paginator = this.paginator;
  // this.dataSource2.sort = this.empTbSort;
 
   }
 
  ngOnInit(): void {
   // this.dataSource1 = new MatTableDataSource();
    this.dataSource = new MatTableDataSource();
 
    this.getAllProposals();
 
   
  }
 
  exportCsv(){
   
     }
 
  openmap(data:any):void{
   // 
   console.log('dato',data)
   window.open(data.File);
 /*  var frg = data.split("(");
  var result = frg[0];
  console.log(result)
 let datasin=  result.replaceAll(" ","+");
   window.open("https://www.google.com/maps/place/"+ datasin + ",+Katy,+TX+77494/");*/
   
    //location.href = "{data}";
 }
 
 
  getAllProposalsByYear(data:any):void
  {
    console.log("Estoy aqui");
  
      this.apiServices.getAllNoProposal(data).subscribe(
       
        (resp) => {
          debugger;
          console.log("Proposal:", resp);
          
           resp.forEach((element:any) => {
        if (element.File==null)
        element.Design=true;
      else
        element.Design=false;
      });
      this.dataSource.data = resp;
          
        },
        (error) => {
          console.error("Error fetching proposals:", error);
        }
      );

  }

 getAllProposals()
  {
    console.log("Estoy aqui");
  
      this.apiServices.getAllProposals().subscribe(
       
        (resp) => {
          debugger;
          console.log("Proposal:", resp);
          
           resp.forEach((element:any) => {
        if (element.File==null)
        element.Design=true;
      else
        element.Design=false;
      });
      this.dataSource.data = resp;
          
        },
        (error) => {
          console.error("Error fetching proposals:", error);
        }
      );

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
 
  

  AddClient():void{
   
    this._route.navigate(['/AddClient']);
 
  }

  AddProposal():void{
   
    this._route.navigate(['/AddProposal']);
  
  }

  ListProposal():void{
   
    this._route.navigate(['/ListProposal']);
 
  }

  
  

  edit(data:any):void{
   
    this._route.navigate(['/EditProposal'],{state:{ client:{data}}});
 
  }
 
  select(data:any):void{
   
    this._route.navigate(['/tabs'],{state:{ resident:{data}}});
 
  }
 
 
  residen1():void{
   
    this._route.navigate(['/Issue']);
 
  }
  Directory():void{
   
    this._route.navigate(['/Directory']);
 
  }
 
 
  editv(data:any):void{
   
    this._route.navigate(['/edit-vehicle'],{state:{ vehicle:{data}}});
   
 
  }
 
  add():void{
   
     this._route.navigate(['/add-resident']);
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
 
  openDialog(): void {
    //const dialogRef = this.dialog.cr
  }
 
}


