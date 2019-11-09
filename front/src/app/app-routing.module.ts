import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutPageComponent } from './about-page/about-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ToolsPageComponent } from './tools-page/tools-page.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ToolSaveEditComponent } from './tools-page/tool-save-edit/tool-save-edit.component';
import { UserPageComponent } from './user-page/user-page.component';

const routes: Routes = [
  { path: "", component: HomePageComponent, children: [
    { path: "", component: ToolsPageComponent },
    { path: "sobre", component: AboutPageComponent },
  ]},
  { path: "register", component: RegisterPageComponent },
  { path: "login", component: LoginPageComponent },
  { path: "logout", component: LogoutComponent, canActivate: [AuthGuard]},

  { path: "usuarios/:id", component: UserPageComponent, canActivate: [AuthGuard]},
  { path: "usuarios/:id/ferramentas", component: ToolsPageComponent, canActivate: [AuthGuard]},

  { path: "ferramentas/novo", component: ToolSaveEditComponent, canActivate: [AuthGuard]},

  { path: "**", redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}