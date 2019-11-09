import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../core/services/session.service';

@Component({
  selector: 'si-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogged: boolean = false;
  loggedUser: any;
  nav: any[] = [
    { id: 1, url: '/', label: 'Soluções', isActive: false },
    // { id: 2, url: '/ferramentas', label: 'Soluções', isActive: false },
  ];

  constructor(private router: Router,
              private sessionService: SessionService) { }

  ngOnInit() {
    this.updateActiveUrl();
    const loggedUser = this.sessionService.isLogged();
    if( loggedUser ){
      this.isLogged = true;
      this.loggedUser = loggedUser.user;
    }
  }

  login(){
    this.nav.push({ id: 4, 
      label: "Sair", 
      url: '/logout', 
      isActive: false 
    });
  }

  updateActiveUrl(){
    this.nav.forEach(item => {
      if( this.router.url === item.url ){
        item.isActive = true
      }
      else {
        item.isActive = false
      }
    });
  }

  fromItemGoTo(item){
    this.router.navigate([item.url])
    .then(ok => this.updateActiveUrl());
  }

  goTo(item){
    this.router.navigate([item])
    .then(ok => this.updateActiveUrl());
  }

  goToUserTools(user){
    this.router.navigate([`usuarios/${user.id}/ferramentas`]);
  }
}
