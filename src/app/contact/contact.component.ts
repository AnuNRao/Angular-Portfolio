import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ErrorStateMatcher} from '@angular/material/core';
import { InfoDialogComponent } from './info-dialog/infodialog.component';
import {ContactService} from './contact.service';
import * as states from './data/states.json';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [ContactService]
})
export class ContactComponent implements OnInit {
  
  userContact: FormGroup;
  statesList: {}

  constructor(public dialog: MatDialog, private _contactService:ContactService){
    this.createForm();
  }

  ngOnInit() {
    this.getStatesData();
  }

  /*Form group starts here*/
  private createForm(){
    this.userContact = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('', [Validators.email]),
      message: new FormControl(''),
     });
  }

  matcher = new MyErrorStateMatcher();
  /*Form group ends here*/

  /*Reset the form on click starts here*/
  updateContact(){
    this.userContact.patchValue({
      firstName: " ",
      lastName: " ",
      email: " ",
      message: " "
    });
  }
  /*Reset the form on click ends here*/

  submitted = false;

  submitForm() {
    this.submitted = true;
    // TODO: Use EventEmitter with form value
    console.log(this.userContact.value);
    this.openDialog();
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      width: '300px',
      data: this.userContact.value
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  getStatesData() {
    this._contactService.getStates().subscribe(
      data => { this.statesList = data},
      err => console.error(err),
      () => console.log('Done loading data', this.statesList)
    );
  }


}