import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { SessionService } from '../core/services/session.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'si-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  private returnUrl: string;
  private error: string = "";

  private loginForm = this.formBuilder.group({
    user: ['', Validators.required],
    password: ['', Validators.required],
  });
  
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private sessionService: SessionService, 
              private formBuilder: FormBuilder) { }

  ngOnInit(){
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';

    if(this.sessionService.isLogged()){
      this.router.navigate([''])
    }
  }

  onSubmit(){
    if( this.loginForm.status == "INVALID" )
      this.error = "Usuário ou senha não foram preenchidos"
    else
      this.error = ""

    const { user, password } = this.loginForm.value;

    this.sessionService.loginServer(user, password).subscribe(response => {
      this.sessionService.loginClient(response, this.returnUrl);
    })
  }

  goTo(url){
    this.router.navigate([url]);
  }
}
