import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnDestroy {
  @Input() sidenav!: MatSidenav;
  @Input() isLoggedIn: boolean = false;
  @Input() currentUser: any = null;
  @Output() logoutEvent = new EventEmitter<void>();
  
  private authSub: Subscription;

  constructor(private authService: AuthService) {
    this.authSub = this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.isLoggedIn = !!user;
    });
  }

  closeMenu() {
    if (this.sidenav) {
      this.sidenav.close();
    }
  }

  logout() {
    this.authService.signOut().then(() => {
      this.logoutEvent.emit();
      this.closeMenu();
    });
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
