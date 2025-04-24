import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-client',
  standalone: true,
  imports: [],
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.css'
})
export class EditClientComponent implements OnInit {

  myForm: FormGroup | any;
  form: FormGroup | any;
  address!:any[];
  client!:any;
  selected!:any; 
  hidden_ind!:any;
  directory_code!:any;
  residenceId!:any; 
  residentType!:any[];
  residentCode!:any[];
  selectedFile: File | null = null;
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
      let data = this._route.getCurrentNavigation()?.extras.state!['client'];
          console.log("Data Resident",data);
          
          this.client = data;
         // console.log("Resident Data",this.resident);
        // this.hidden_ind =  String(this.resident.hidden_ind);
        // this.directory_code =  String(this.resident.directory_code);
         //console.log("hidden_ind",this.hidden_ind);
         // this.selected=String(this.resident.residenttypeID);
          this.residenceId=this.client.ID;
          //var frg = this.resident.name.split(",");
          //var resultLast = frg[0];
          //var resultFirst = frg[1];
          //var resultMiddle = resultFirst.split(" ");
          //console.log(result)
          this.myForm = this.fb.group({
            Name: [this.client.name, Validators.required],            
            Address: [this.client.Address, Validators.required],
            Active: [this.client.Active],
            City: [this.client.City, Validators.required],
            Country:[this.client.Country],
            Documents_and_other_requirements: [this.client.Documents_and_other_requirements, Validators.required],
            Invoice_Date:[this.client.Invoice_Date,Validators.required],
            Logo:[this.client.Logo,Validators.required],
            Period_of_Invoice:[this.client.Period_of_Invoice,Validators.required],
            Procedure:[this.client.Procedure,Validators.required],
            State:[this.client.State,Validators.required],
            ZipCode:[this.client.ZipCode,Validators.required],
           // selectedOption1: ['', Validators.required],
           // additionalEmail: [this.resident.additionalEmail],
           // directoryName: [this.resident.directory_name],   
           // directoryPhone: [this.resident.directory_phone],
//directory_code: [this.resident.directory_code],
           /// hidden_ind: [this.resident.hidden_ind],
           // dir: [this.resident.dir],
            selectedOption2: ['', Validators.required]
          });

         
          
      // this.vehicle= data.data;
      // console.log("vehicle",this.vehicle);


     }
    
    
  }
  
  ngOnInit(): void {
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
    first_name:[this.myForm.get('name')!.value],
    middle_name:[ this.myForm.get('middle')!.value],
    last_name:[this.myForm.get('last')!.value],
    email_address:[this.myForm.get('email')!.value],
    primary_phone:[this.myForm.get('primaryphone')!.value],
    alternate_phone:[this.myForm.get('alternatephone')!.value],
    resident_type_id:[this.myForm.get('selectedOption1')!.value,Validators.required],
    directoryName: [this.myForm.get('directoryName')!.value],   
    directoryPhone: [this.myForm.get('directoryPhone')!.value],
    directory_code: [this.myForm.get('directory_code')!.value],
    hidden_ind: [this.myForm.get('hidden_ind')!.value],
    dir: [this.myForm.get('dir')!.value],
    address: [this.myForm.get('address')!.value], 
    residenceId: [this.residenceId],
    resident_id:[this.myForm.get('resident_id')!.value]
   // family_id:[this.owneradd]
   })

 
   console.log('Formulario aupte:', this.form.value);
   this.apiServices.updateClient(this.form.value).subscribe((resp:any)=>{
     console.log('Formulario enviado:', resp);
     alert("Resident updated");
     this.back();
   }
  )


   /*this.apiServices.GettranslateInfo(this.resident.resident_id).subscribe((resp:any)=>{
  });*/
  

}

  back(){
    this._route.navigate(['/tabs']);
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
  buildForm(){
    this.myForm = this.fb.group({
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
    });
  }
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
