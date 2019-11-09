import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'si-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if( localStorage.getItem("tkn") ){
      localStorage.removeItem("tkn");
    }

    this.router.navigate([""])
  }
}
