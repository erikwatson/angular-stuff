import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import {
  ChildDirective,
  MyParentComponent,
} from './my-parent/my-parent.component';
import { MyChildComponent } from './my-child/my-child.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [
    AppComponent,
    HelloComponent,
    MyParentComponent,
    MyChildComponent,
    ChildDirective,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
