import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from './app.service';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';
import { AutocompleteDirective } from './autocomplete.directive';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    AppService
  ],
  declarations: [
    MainComponent,
    AutocompleteDirective,
    AutocompleteComponent
  ],
  exports: [
    MainComponent,
    AutocompleteComponent
  ]
})
export class SharedModule { }
