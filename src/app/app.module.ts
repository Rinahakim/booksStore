import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup-page/signup.component';
import { LoginComponent } from './components/login-page/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home-page/home/home.component';
import { DescriptionComponent } from './components/description-book/description/description.component';
import { UseraccountComponent } from './components/user-account/useraccount/useraccount.component';
import { CartComponent } from './components/cart/cart/cart.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { ProfileComponent } from './components/profile/profile/profile.component';
import { ErrorComponent } from './components/404page/error/error.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { PaginatorService } from './services/paginator-service.service';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    DescriptionComponent,
    UseraccountComponent,
    CartComponent,
    AdminComponent,
    ProfileComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    { provide: MatPaginatorIntl, useFactory: (paginatorService: PaginatorService) => paginatorService.getCustomPaginator(), deps: [PaginatorService] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
