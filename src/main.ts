import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';


bootstrapApplication(AppComponent, {
  ...appConfig,   // 👈 on étend la config existante
  providers: [
    ...(appConfig.providers || []), // 👈 on garde les anciens providers
    provideHttpClient()             // 👈 on ajoute HttpClient
  ]
})
.catch((err) => console.error(err));
