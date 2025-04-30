import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from '../../../components/menu/menu/menu.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Renderer2, ViewChild } from '@angular/core';
import { FormControl} from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { Route } from '@angular/router';
import { CustomLink } from '../../client/list-clients/model/custom-link';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort,Sort} from '@angular/material/sort';
import { projectQAQC } from '../../client/list-clients/model/projectQAQC'
import {TooltipPosition} from '@angular/material/tooltip';
import { MatTableExporterModule } from 'mat-table-exporter';
import { HttpClientModule } from '@angular/common/http';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'


@Component({
  selector: 'app-qadetails',
  standalone: true,
  imports: [MatTableModule, 
      MatPaginatorModule, 
      MatSortModule, 
      MatCardModule,CommonModule,
      MatIconModule, MatFormFieldModule,ReactiveFormsModule,
      MatTableExporterModule, MenuComponent,
      MatTooltipModule, MatButtonModule,  MatInputModule,  MatCheckboxModule],
  templateUrl: './qadetails.component.html',
  styleUrl: './qadetails.component.css'
})
export class QADetailsComponent implements OnInit {

  myForm: FormGroup | any;
  form: FormGroup | any;
  address!:any[];
  client!:any;
  selected!:any; 
  name!:any; 
  active!:any;
  directory_code!:any;
  ClientId!:any; 
  residentType!:any[];
  residentCode!:any[];
  selectedFile: File | null = null;
  formData: any = {}; // Objeto para almacenar los datos del formulario , 'residence_id',
  // displayedColumnsS: string[] = [ 'ClientID','Name', 'Address','City','State','ZipCode','Logo','Active','Country' ,'Period_of_Invoice','Invoice_Date','ProcedureDetails','Actions'];
  displayedColumns: string[] = [
   'ID', 
   'ProjectName', 
   'ClientName', 
   'ProjectDescription', 
   'PM',
   'ProjectType',
   'Actions'
 ];
 
 EmpData : projectQAQC[]=[ 
   {
     ID: 24,
     ProjectName: "1700.00",
     ClientName: "xx",
     ProjectDescription: "xx",
     PM: "xx",
     ProjectType:'XX'
 
   }
 ];
 
 
  
  // EmpData : client[]=[ {
  //   ClientID:1,Name:"XXX", Address:"XXX", City:"XXX", State: "XXX", ZipCode: "XXX", Logo: "XXX", Active: 1, Country: "XXX" , Period_of_Invoice: "XXX", Invoice_Date: "XXX", ProcedureDetails: "XXX"}];
    
 
   owner: any;
   dataSource = new MatTableDataSource<projectQAQC>(this.EmpData);
   //dataSource: any;

   columnas: any[] = [];
  /**
   *
   */
  constructor(
    private fb: FormBuilder,
    private apiServices: ApiService,
    private _route: Router
    ) {
      if( _route.getCurrentNavigation()!.extras.state)
     {
      let data = this._route.getCurrentNavigation()?.extras.state!['DetailProject'];
          console.log("DetailProject",data);
          
          this.client = data;
          this.ClientId=this.client.data.ID;
          this.active=this.client.data.Active;
          this.name=this.client.data.Name;
          console.log("Active", this.active);
          this.myForm = this.fb.group({
            ClientName: [this.client.data.ClientName],            
            ProjectName: [this.client.data.ProjectName, Validators.required],
            Active: [this.client.data.Active],
            City: [this.client.data.City, Validators.required],
            Status:[this.client.data.Status],
            ProjectDescription: [this.client.data.ProjectDescription, Validators.required],
            Invoice_Date:[this.client.data.Invoice_Date,Validators.required],
            ServiceEng:[this.client.data.ServiceEng,Validators.required],
            Discipline:[this.client.Discipline,Validators.required],
            Procedure:[this.client.data.Procedure,Validators.required],
            State:[this.client.data.State,Validators.required],
            ZipCode:[this.client.data.ZipCode,Validators.required],
           // selectedOption1: ['', Validators.required],
           // additionalEmail: [this.resident.additionalEmail],
           // directoryName: [this.resident.directory_name],   
           // directoryPhone: [this.resident.directory_phone],
//directory_code: [this.resident.directory_code],
           /// hidden_ind: [this.resident.hidden_ind],
           // dir: [this.resident.dir],
          //  selectedOption2: ['', Validators.required]

          });

         console.log("Datos a editar",this.myForm);
          
      // this.vehicle= data.data;
      // console.log("vehicle",this.vehicle);


     }
    
    
  }
  
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
 
    this.getClients();
  //  this.getAddress();
   // this.getResidentType();
   // this.getResidentCode();
  }

 /* getAddress()
  {
    //this.apiServices.getAddress().subscribe((resp)=>{
      console.log("Residensts",resp);
      
      this.address = resp;
      console.log("Address",this.address);
      
    })
  }*/

    getClients()
  {
    console.log("Estoy aqui");
    //if (isPlatformBrowser(this.platformId)) { 
      //const user = localStorage.getItem('user');
      
      /*if (user) {
        const parsedUser = JSON.parse(user);
        console.log("User Data:", parsedUser);
      }*/
  
      this.apiServices.getClientsAll().subscribe(
       
        (resp) => {
          debugger;
          console.log("Clients:", resp);
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
 
  onSubmitOld() {

    console.log("Update Resident",this.myForm.value);
    
    const formData = new FormData();
    // formData.append('file', file);
 
     formData.append('first_name', this.myForm.get('name')!.value);
     formData.append('middle_name', this.myForm.get('middle')!.value);
     formData.append('last_name', this.myForm.get('last')!.value);
     formData.append('email_address', this.myForm.get('email')!.value);
     formData.append('primary_phone', this.myForm.get('primaryphone')!.value);
     formData.append('alternate_phone', this.myForm.get('alternatephone')!.value);
     formData.append('resident_type_id', this.myForm.get('selectedOption1')!.value);
     //formData.append('wp_user_id',  this.myForm.get('leaseenddate')!.value);   
     formData.append('resident_id',  this.client.ID);   
      
      
     
   //  this.apiServices.updateResident(formData).subscribe((resp:any)=>{
     //  console.log('Formulario enviado:', resp);
     //  alert("Resident updated");
       this.back();
    // }
    //)
    

}

onSubmit() {

  console.log("Update Resident",this.myForm.value);
  
    
   this.form = this.fb.group({
    Name: [this.myForm.get('Name')!.value],            
    Address: [this.myForm.get('Address')!.value],
    Active: [this.myForm.get('Active')!.value],
    City: [this.myForm.get('City')!.value],
    Country:[this.myForm.get('Country')!.value],
    Documents_and_other_requirements: [this.myForm.get('Documents_and_other_requirements')!.value],
    Invoice_Date:[this.myForm.get('Invoice_Date')!.value],
    Logo:[this.myForm.get('Logo')!.value],
    Period_of_Invoice:[this.myForm.get('Period_of_Invoice')!.value],
    Procedure:[this.myForm.get('Procedure')!.value],
    State:[this.myForm.get('State')!.value],
    ZipCode:[this.myForm.get('ZipCode')!.value],
    ID:[this.ClientId]


   // family_id:[this.owneradd]
   })

 
   console.log('Formulario aupte:', this.form.value);
   this.apiServices.updateClient(this.form.value).subscribe((resp:any)=>{
     console.log('Formulario enviado:', resp);
     alert("Client updated");
     this.back();
   }
  )


   /*this.apiServices.GettranslateInfo(this.resident.resident_id).subscribe((resp:any)=>{
  });*/
  

}

  back(){
    this._route.navigate(['/ListClient']);
  }

  

 /* FindAddress(data:any):void{
    //debugger;
    let idaddress=this.myForm.get('selectedOption')!.value;
    console.log("add",idaddress);
    this.apiServices.GetGateDirectory(idaddress).subscribe((resp:any)=>{
      console.log('Residnec Addr:', resp);
     // if (resp.success) {
      this.residentCode = resp;
      //  this.addresSel=resp.Address;
      //  this.FamilySel=resp.family_id;        

       // alert(resp.response);
   
     // }else{
       // alert(resp.error);
      //} 
      
    });

  }*/
  //buildForm(){
  /*  this.myForm = this.fb.group({
      selectedOption: ['', Validators.required],
      name: ['', Validators.required],
      middle: [''],
      last: ['', Validators.required],
      email:['',Validators.required, Validators.email],
      primaryphone:['',Validators.required],
      alternatephone:[''],
      additionalEmail:[''],
      directoryName:[''],
      directoryPhone:[''],
      fileInput: [null]
    });*/
 // }
/*
  getResidentType()
  {
    this.apiServices.getResidentType().subscribe((resp)=>{
      console.log("ResidenstType",resp);
      
      this.residentType = resp;
      console.log("Address",this.residentType);
      
    })
  }

  getResidentCode()
  {
    console.log("GetGateDirectory",this.residenceId);
    this.apiServices.GetGateDirectory(this.residenceId).subscribe((resp)=>{
      console.log("GetGateDirectory",resp);
      
      this.residentCode = resp.residentCode;
      console.log("Address",this.residentCode);
      
    })
  }
*/
  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      this.selectedFile = inputElement.files[0];
    }
  }

}
