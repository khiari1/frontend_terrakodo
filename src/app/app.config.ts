import { ApplicationConfig } from '@angular/core';
import { provideRouter, Route } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksComponent } from './tasks/tasks.component'; // Chemin vers TasksComponent

const routes: Route[] = [
  { path: 'app-tasks', component: TasksComponent }, // Route vers le composant
  { path: '', redirectTo: 'app-tasks', pathMatch: 'full' }, // Redirection par défaut
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Fournit les routes
    provideHttpClient(),
    importProvidersFrom(FormsModule),
  ],
};
