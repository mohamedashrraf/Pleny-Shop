import { Component, Inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  searchTerm:string = ''
  loggedIn : boolean = true;
  noOfNumCart: any = 0 ;

  constructor(
    private authService:AuthService,
    private router:Router,
    private productService:ProductService,
  ){
    if (this.getItem('currentUser')) {
      this.authService.userValidaty.next(true);
    }
    this.authService.userValidaty.subscribe(res => this.loggedIn = res)
    this.productService.noOfNumCart.subscribe(res => this.noOfNumCart = res);
  }

  search()
  {
    console.log(this.searchTerm);

    this.productService.searchTerm.next(this.searchTerm)
  }

  Logout()
  {
    this.removeItem('currentUser')
    this.authService.userValidaty.next(false)
    this.router.navigate(['/login'])
  }

    getItem(key: string): string | null {
    if (typeof window === 'undefined') {
      return null;
    } else {
      return localStorage.getItem(key);
    }
  }

    removeItem(key: string): void {
    if (typeof window !== 'undefined' && localStorage.getItem(key)) {
      localStorage.removeItem(key);
    }
  }



}
