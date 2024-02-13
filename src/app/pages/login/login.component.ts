import { HttpClient,HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,HttpClientModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
loginObj: Login;
errorMessage: string = '';
token: string = '';
constructor(private http: HttpClient,private router: Router, private authService: AuthService){

  this.loginObj=new Login()
}
onLogin(){
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  console.log(this.loginObj)
  this.http.post('https://web-nzcq.onrender.com/api/login/', this.loginObj, { headers }).subscribe((res: any) => {
    console.log(res)
    if (res.token) {
      this.token = res.token;
      this.authService.setToken(res.token);
      this.router.navigate(['/dashboard']);
      alert("Success");
    } else {
      alert(res.error);
  }
},
(error) => {
  console.error('An error occurred:', error.error);
  this.errorMessage = "Invalid credentials";
}

);
}
}
export class Login{
  username: string;
  password: string;
  constructor(){
    this.username='';
    this.password='';
  }
}