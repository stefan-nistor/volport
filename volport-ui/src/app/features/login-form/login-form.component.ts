import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginFormGroup: FormGroup;
  hide1 = true;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.loginFormGroup = this.formBuilder.group({

      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  ngOnInit(): void {
  }

  submit(): void{

  }

}
