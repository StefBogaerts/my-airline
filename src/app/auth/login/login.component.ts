import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  /**
   * The form that contains the login controls.
   */
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    pass: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService, private location: Location, private router: Router) { }

  ngOnInit(): void {
    if (this.location.path().includes('logout')) {
      this.authService.logout();
    }
  }

  /**
   * Login with the users credentials.
   */
  login() {
    if (this.form.valid) {
      this.authService.login(this.form.value['email'], this.form.value['pass']).subscribe(() => {
        this.location.back();
      });
    }
  }
}
