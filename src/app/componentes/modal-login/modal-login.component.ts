import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginViewModel } from 'src/app/models/login.model';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {

  username = '';
  password = '';
  invalidLogin = false
  
  @Input() error!: string | null;
  
   
  constructor(private authService: AuthService,
    private router: Router,
    public activeModal: NgbActiveModal
    ) {
     
  }
  login() {
  let newLogin: LoginViewModel = {
    "username": this.username,
    "password": this.password
  };
  this.authService.logIn(newLogin).subscribe(
    data => {
      this.router.navigate(['']);
      this.invalidLogin = false;
      this.activeModal.close();
    },
    error => {
      this.invalidLogin = true
      this.error = JSON. stringify(error.error.message) 
    }
  );
  
  //this.activeModal.close();
  }

  ngOnInit(): void {
  }

}