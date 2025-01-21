import { LoginService } from './../../services/login.service';
import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { ToastrService } from 'ngx-toastr';

interface LoginForm {
  email: FormControl,
  password: FormControl
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent,
  ],
  providers: [
    LoginService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup<LoginForm>;

  constructor(
    private LoginService: LoginService,
    private toastService: ToastrService
  ){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })

  }

  submit() {
    if (this.loginForm.invalid) {
      if (this.loginForm.get('password')?.hasError('required')) {
        this.toastService.error('Campo de senha obrigatório');
      }
      if (this.loginForm.get('password')?.hasError('minlength')) {
        this.toastService.error('A senha deve ter pelo menos 6 caracteres');
      }
      
      if (this.loginForm.get('email')?.hasError('required')) {
        this.toastService.error('Campo de email obrigatório');
      
      } else if (this.loginForm.get('email')?.hasError('email')) {
        this.toastService.error('Email inválido');
      }

      return; 
    }

    this.toastService.success("Login feito com sucesso!");
    
  }
}
