import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoggedComponent } from './logged/logged.component';
import { LoginService } from './login.service';
import { PanelComponent } from './panel/panel.component';
import { DocumentsComponent } from './documents/documents.component';
import { NewDocumentComponent } from './new-document/new-document.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import {MatPaginatorModule} from '@angular/material/paginator';

import {MatButtonModule, MatCheckboxModule, MatTabsModule, } from '@angular/material';
import {MatChipsModule} from '@angular/material/chips'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatSliderModule} from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon'; 

import { InfoMetadadosComponent } from './info-metadados/info-metadados.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { NewDocumentFastComponent } from './new-document-fast/new-document-fast.component';
import { HttpClientModule } from '@angular/common/http';

import { FileSelectDirective } from 'ng2-file-upload';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoggedComponent,
    PanelComponent,
    DocumentsComponent,
    NewDocumentComponent,
    InfoMetadadosComponent,
    AboutComponent,
    RegisterComponent,
    ProfileComponent,
    NewDocumentFastComponent,
    FileSelectDirective    
  ],
  imports: [
    BrowserModule,
    UiModule,
    AppRoutingModule,
    FormsModule,
    MatButtonModule, MatCheckboxModule, MatTabsModule, BrowserAnimationsModule, MatInputModule, MatGridListModule,
    MatSelectModule, MatRadioModule, MatSliderModule, MatCardModule, MatChipsModule, MatIconModule, RouterModule, MatProgressBarModule,
    MatPaginatorModule,
    HttpClientModule,
    
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
