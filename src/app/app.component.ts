import { HeaderComponent } from './shared/header/header.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { AuthService } from './services/auth.service';
import { ProductService } from './services/product.service';
import { LoadingComponent } from "./shared/loading/loading.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,
    LoginComponent,
    ProductsComponent,
    HeaderComponent,
    FooterComponent, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Pleny Shop';

  authloader : boolean = false;
  constructor(
    private auth:AuthService, private productService:ProductService) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.auth.Loader.subscribe(res => {
        this.authloader = res
      })
      this.productService.loader.subscribe(res => {
        this.authloader = res
      })
    }, 500);
  }
}
