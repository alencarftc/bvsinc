import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup, EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from '../core/models/user.model';
import { SessionService } from '../core/services/session.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'si-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  private submitted: boolean = false;
  private registerForm = this.formBuilder.group({
    name: ['', Validators.required], 
    email: ['', Validators.required],
    user: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  });

  constructor(private sessionService: SessionService,
              private router: Router, 
              private formBuilder: FormBuilder) { }

  ngOnInit(){
    if(this.sessionService.isLogged()){
      this.router.navigate([''])
    }
  }

  goTo(url){
    this.router.navigate([url]);
  }

  onSubmit() {
    const { name, email, user, password } = this.registerForm.value;

    const userInfo: UserModel = {
      id: null, name, email, user, password
    }

    this.sessionService.register(userInfo).subscribe(response => 
      this.sessionService.loginClient(response, "/"))
  }

  validateEmail(email: string){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(email)
  }

  validate(){
    this.submitted = true;
    const { name, email, user, password, confirmPassword } = this.registerForm.value;
  
    if( !(name && email && user && password && confirmPassword)){
      this.submitted = false;
      return false
    }

    if( this.validateEmail(email) || password !== confirmPassword){
      this.submitted = false;
      return false
    }

    return true;
  }
}
