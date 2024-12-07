import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pb-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  constructor( public authService : AuthService, private router:Router ) { }
  ngOnInit() {
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
}

}
