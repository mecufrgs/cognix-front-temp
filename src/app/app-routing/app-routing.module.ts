import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { LoggedComponent } from '../logged/logged.component';
import { NewDocumentComponent } from '../new-document/new-document.component';
import { InfoMetadadosComponent } from '../info-metadados/info-metadados.component';
import { AboutComponent } from "../about/about.component"
import { RegisterComponent } from '../register/register.component';
import { ProfileComponent } from '../profile/profile.component';
import { NewDocumentFastComponent } from '../new-document-fast/new-document-fast.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }, {
    path: 'about',
    component: AboutComponent
  },  {
    path: 'register',
    component: RegisterComponent
  },{
    path: 'profile/:id',
    component: ProfileComponent
  },  {
    path: 'documents/add',
    component: NewDocumentFastComponent
  }, {
    path: 'documents/:id',
    component: InfoMetadadosComponent
  },{
    path: '**',
    component: LoggedComponent
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
