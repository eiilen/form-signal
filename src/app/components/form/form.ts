import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { email, form, FormField, pattern, required } from '@angular/forms/signals';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

interface Chiikawa {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-form',
  imports: [FormField, InputTextModule, CardModule, ButtonModule, PasswordModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Form {

  loading = signal(false);

  formModel = signal<Chiikawa>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  form = form(this.formModel, (schemaPath) => {
    required(schemaPath.firstname, {message: 'firstname is required'});
    
    required(schemaPath.lastname, {message: 'lastname is required'});
    
    required(schemaPath.email, {message: 'email is required'});
    email(schemaPath.email, {message: 'enter a valid email address'});
    
    required(schemaPath.password, {message: 'password is required'});
    pattern(schemaPath.password, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {message: 'password must be at least 8 characters, including uppercase, lowercase, and a number'});
  });

  onSubmit(event: Event) {
    this.loading.set(true);
    console.log('event===', event);
    event.preventDefault();
    // Perform login logic here
    const credentials = this.formModel();
    console.log('Logging in with:', credentials);
    // e.g., await this.authService.login(credentials);
    setTimeout(() => {
      this.loading.set(false);
      this.resetForm()
    }, 1000);
  }
  resetForm() {
    // Clear interaction state (touched, dirty)
    this.form().reset();
    // Clear values
    this.formModel.set({
      firstname: '',
      lastname: '',
      email: '',
      password: ''
    });
  }
}
