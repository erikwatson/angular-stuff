import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'my-child',
  templateUrl: './my-child.component.html',
  styleUrls: ['./my-child.component.css'],
})
export class MyChildComponent implements OnInit {
  @Input() id: string;
  @Input() title: string;
  @Input() checked: boolean = false;

  @Output() clicked = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  click(event) {
    console.log('child click event, about to emit to parent');
    this.clicked.emit(this.id);
  }
}
