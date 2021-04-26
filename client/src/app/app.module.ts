import { Token } from './services/token';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './screens/error/error.component';
import { DefaultComponent } from './layouts/default/default.component';
import { TestPipe } from './pipes/test.pipe';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminComponent } from './layouts/admin/admin.component';
import { DashboardComponent } from './screens/admin/dashboard/dashboard.component';
import { CategoryComponent } from './screens/admin/category/category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateCategoryComponent } from './screens/admin/create-category/create-category.component';
import { LoginComponent } from './screens/login/login.component';
import { NotifierModule } from 'angular-notifier';
import { ListAuthorComponent } from './screens/admin/author/list-author/list-author.component';
import { FormAuthorComponent } from './screens/admin/author/form-author/form-author.component';
import { FormComicComponent } from './screens/admin/comic/form-comic/form-comic.component';
import { ListComicComponent } from './screens/admin/comic/list-comic/list-comic.component';
import { StatusPipe } from './pipes/status.pipe';
import { HomeComponent } from './screens/client/home/home.component';
import { ComicComponent } from './screens/client/comic/comic.component';
import { AuthorComponent } from './screens/client/author/author.component';
import { CategoryItemComponent } from './screens/client/category-item/category-item.component';


@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    DefaultComponent,
    TestPipe,
    AdminComponent,
    DashboardComponent,
    CategoryComponent,
    CreateCategoryComponent,
    LoginComponent,
    ListAuthorComponent,
    FormAuthorComponent,
    FormComicComponent,
    ListComicComponent,
    StatusPipe,
    HomeComponent,
    ComicComponent,
    AuthorComponent,
    CategoryItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    NotifierModule.withConfig({
      //config notify
      position: {
        horizontal: {
          position: 'right',
          distance: 12
        },
        vertical: {
          position: 'top',
          distance: 12,
          gap: 10
        }
      },
      behaviour: {
        autoHide: 3000,
        onClick: "hide",
        onMouseover: "pauseAutoHide",
        showDismissButton: true,
        stacking: 4
      },
    })
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: Token, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
