import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { email, form, FormField, pattern, required } from '@angular/forms/signals';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-form',
  imports: [FormField, InputTextModule, TextareaModule, CardModule, ButtonModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Form {

  loading = signal(false);

  formModel = signal<FormData>({
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
    pattern(schemaPath.password, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {message: 'password must be at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number'});
  });
}
