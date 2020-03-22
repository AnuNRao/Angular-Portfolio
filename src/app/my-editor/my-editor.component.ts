import { Component, OnInit } from '@angular/core';
import { MyEditorService } from './myeditor.service';

@Component({
  selector: 'app-myeditor',
  templateUrl: './my-editor.component.html',
  styleUrls: ['./my-editor.component.scss'],
  providers: [MyEditorService]
})
export class MyEditorComponent implements OnInit {
  usersList: any[];
  name = '';
  email: '';
  constructor( private _editorService:MyEditorService) { }
 

  ngOnInit() {
    this.getUsersList();
  }

  addUsers = false;
  isUpdateUser = false;
  selectedUser: any;

  getUsersList() {
    this._editorService.getUsers().subscribe((response: any)=>{
      this.usersList = response;
      console.log(this.usersList);
    })
  }

  addNewUsers(){
    this.addUsers = false;
    const newUser = {
      'name' : this.name, 
      'email': this.email
    }
    this.usersList.push(newUser);
    this.name = '';
    this.email= '';
  }
 

  editUser(user: any){    
    this.selectedUser = user;
    this.name= user.name;
    this.email = user.email;
    this.isUpdateUser = true;
    console.log("current user", user);
  }

  updateUser() {
    this.isUpdateUser = false;
    this.selectedUser.name = this.name;
    this.selectedUser.email = this.email;
    this.name = '';
    this.email= '';
  }

  cancelNewUsers(){
    this.addUsers = false;
    this.isUpdateUser = false;
    this.name = '';
    this.email= '';
  }

  deleteUser(user: any){
    this.usersList = this.usersList.filter(x => x != user);
  }

}