import {
  Component,
  OnInit,
  Directive,
  QueryList,
  ContentChildren,
} from '@angular/core';

@Directive({ selector: 'child-item' })
export class ChildDirective {
  id: string;
  title: string;
  checked: boolean;
}

@Component({
  selector: 'my-parent',
  templateUrl: './my-parent.component.html',
  styleUrls: ['./my-parent.component.css'],
})
export class MyParentComponent implements OnInit {
  selected: number;
  @ContentChildren(ChildDirective) contentChildren!: QueryList<ChildDirective>;

  constructor() {}

  ngOnInit() {}

  ngAfterContentInit() {
    console.log(this.contentChildren);
    this.contentChildren.forEach((child) => {
      console.log(child);
    });
  }

  setSelected(event) {
    console.log('set selected');
  }
}
