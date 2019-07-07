import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { MainContentComponent } from './main-content/main-content.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { CsvFileUploadComponent } from './csv-file-upload/csv-file-upload.component';
import { FeaturePreferencesComponent } from './feature-preferences/feature-preferences.component';
import { DatasetCleaningComponent } from './dataset-cleaning/dataset-cleaning.component';
import { CsvFileDownloadComponent } from './csv-file-download/csv-file-download.component';
import { AlgorithmsSuggestionComponent } from './algorithms-suggestion/algorithms-suggestion.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    StatusBarComponent,
    MainContentComponent,
    CsvFileUploadComponent,
    FeaturePreferencesComponent,
    DatasetCleaningComponent,
    CsvFileDownloadComponent,
    AlgorithmsSuggestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
