import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { ShortNamePipe } from '../../shared/pipes/shortName.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, RouterLink, CommonModule, ShortNamePipe, MatDividerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;
  user: any = null;

  constructor(private router: Router) {}

  selectedTheme: 'light' | 'dark' | 'colorful' = 'light';
  
ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    // Példa: töltsd be a user-t localStorage-ból vagy máshonnan
    const userData = localStorage.getItem('user');
    this.user = userData ? JSON.parse(userData) : null;
  }

  changePage() {
    this.router.navigateByUrl("/login");
  }

}