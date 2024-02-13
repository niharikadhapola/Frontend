import { HttpClient,HttpHeaders,HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [FormsModule,HttpClientModule,CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  token: string | null = null;
  items: any[] = [];
  itemData = {
    sku: '',
    name: '',
    category: '',
    tags: '',
    stock_status: '',
    available_stock: ''
  };
  errorMessage: string | null = null;
  showCreateForm = false;
  showSuccessMessage: boolean = false;
  constructor(private http: HttpClient,private router: Router, private authService: AuthService) { }
  toggleCreateForm(): void {
    this.showCreateForm = !this.showCreateForm;
  }
  ngOnInit(): void {
    this.token = this.authService.getToken();
    console.log('Token:', this.token);
    this.fetchItems();
  }
  fetchItems(): void {
    const headers = new HttpHeaders().set('Authorization', `Token ${this.token}`);
    this.http.get<any>('https://web-nzcq.onrender.com/api/items/?page=1&page_size=10', { headers })
      .subscribe(
        response => {
          console.log(response)
          
          
          this.items = response.results;
        },
        error => {
          console.error('Error fetching items:', error);
        }
      );
  }

  createItem(): void {
    const headers = new HttpHeaders().set('Authorization', `Token ${this.token}`);
    this.http.post<any>('https://web-nzcq.onrender.com/api/items_create/',this.itemData, { headers })
      .subscribe(
        response => {
          console.log('Item created successfully:', response);
          this.showCreateForm = false;
          this.fetchItems();
          this.showSuccessMessage = true;
          this.itemData.sku = '';
        this.itemData.name = '';
        this.itemData.category = '';
        this.itemData.tags = '';
        this.itemData.stock_status = '';
        this.itemData.available_stock = '';
          // Optionally handle success, reset form, etc.
        },
        error => {
          console.error('Error creating item:', error);
          this.errorMessage = error.message || 'An error occurred while creating the item.';
        }
      );
  }

  
}
