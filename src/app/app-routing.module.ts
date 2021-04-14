import { CategoryItemComponent } from './screens/client/category-item/category-item.component';
import { ComicComponent } from './screens/client/comic/comic.component';
import { HomeComponent } from './screens/client/home/home.component';
import { FormAuthorComponent } from './screens/admin/author/form-author/form-author.component';
import { AuthGuardGuard } from './auth/auth-guard.guard';
import { AdminComponent } from './layouts/admin/admin.component';
import { ErrorComponent } from './screens/error/error.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { CategoryComponent } from './screens/admin/category/category.component';
import { CreateCategoryComponent } from './screens/admin/create-category/create-category.component';
import { LoginComponent } from './screens/login/login.component';
import { DashboardComponent } from './screens/admin/dashboard/dashboard.component';
import { ListAuthorComponent } from './screens/admin/author/list-author/list-author.component';
import { ListComicComponent } from './screens/admin/comic/list-comic/list-comic.component';
import { FormComicComponent } from './screens/admin/comic/form-comic/form-comic.component';
import { AuthorComponent } from './screens/client/author/author.component';


const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'category/:id',
        component: CategoryItemComponent
      },
      {
        path: 'comic/:id',
        component: ComicComponent
      },
      {
        path: 'author/:id',
        component: AuthorComponent
      },
    ]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardGuard],
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'category',
        component: CategoryComponent
      },
      {
        path: 'category/create',
        component: CreateCategoryComponent
      },
      {
        path: 'category/edit/:id',
        component: CreateCategoryComponent
      },
      {
        path: 'author',
        component: ListAuthorComponent
      },
      {
        path: 'author/create',
        component: FormAuthorComponent
      },
      {
        path: 'author/edit/:id',
        component: FormAuthorComponent
      },
      {
        path: 'comic',
        component: ListComicComponent
      },
      {
        path: 'comic/create',
        component: FormComicComponent
      },
      {
        path: 'comic/edit/:id',
        component: FormComicComponent
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
