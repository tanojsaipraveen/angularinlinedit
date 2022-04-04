import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApidataService } from '../app/apidata.service'
import { datacl } from './datamodel';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  datac = new datacl();
  userdata: any;
  formBuilder: any;
  titlesearch = "";
  editmode: boolean = false;
  config: any;
  aa: boolean = false;
  checkpoint: boolean = false;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];

  constructor(private data: ApidataService, private router: Router) {

    this.getdata();
  }

  getdata() {
    this.data.getData().subscribe(res => {
      this.userdata = res;
      this.userdata.forEach((element: { [x: string]: boolean; }) => {
        element['isEdit'] = false;
      });
    })
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getdata();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getdata();

  }
  UpdateRecord(e: any) {
    e.isEdit = true;
    this.editmode = true;
    // update api call
    console.log(e);
  }
  DeleteRecord(e: any) {
    e.isEdit = false;
    // deleteapi call
    console.log(e);
  }

  checkRecord(e: any) {
    if (e.title == null && e.id == null) {
      alert("should not be empty")
    }
    else {
      console.log(e);
    }

  }
  crossRecord(e: any) {
    this.editmode = false;
    e.isEdit = false;
    if (e.new) {
      const index = this.userdata.indexOf(e);
      this.userdata.splice(index, 1);
    }
  }

  AddRecord() {
    this.page = 1;
    this.datac = new datacl();
    this.userdata.unshift(this.datac);
    this.checkpoint = true;
  }


}
