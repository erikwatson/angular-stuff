import { Component, VERSION } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  greeting = 'ola';
  greetingControl = new FormControl('ola');
  greetingControl2 = new FormControl('ola');

  ngOnInit() {
    // this.greetingControl.disable();
  }
}
