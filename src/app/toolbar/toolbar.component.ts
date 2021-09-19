import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  /** Whether the user is logged in. */
  get isLoggedIn() {return this.authService.isAuthenticated}

  constructor(private authService: AuthService) { }
}
