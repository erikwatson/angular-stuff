import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import {
  ChildDirective,
  MyParentComponent,
  MyRadioDirective,
  MyRadioGroupDirective,
  MyRadioButtonDirective,
  MyRadioButtonSelectedDirective,
} from './my-parent/my-parent.component';
import { MyChildComponent } from './my-child/my-child.component';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  declarations: [
    AppComponent,
    HelloComponent,
    MyParentComponent,
    MyChildComponent,
    ChildDirective,
    MyRadioDirective,
    MyRadioGroupDirective,
    MyRadioButtonDirective,
    MyRadioButtonSelectedDirective,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
