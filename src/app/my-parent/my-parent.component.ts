import {
  Component,
  OnInit,
  Directive,
  QueryList,
  ContentChildren,
  forwardRef,
  Input,
  ElementRef,
  Renderer2,
  HostListener,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
  EmbeddedViewRef,
  ContentChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

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

@Directive({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MyRadioGroupDirective),
      multi: true,
    },
  ],
  selector: '[myRadioGroup]',
})
export class MyRadioGroupDirective implements ControlValueAccessor {
  value = new BehaviorSubject(null);
  disabled = new BehaviorSubject(false);

  private onChange: (value: any) => void;
  private onTouched: () => void;

  writeValue(obj: any): void {
    this.value.next(obj);
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled.next(isDisabled);
  }

  radioSelected(value: any) {
    this.onChange(value);
    this.value.next(value);
  }

  radioBlur() {
    this.onTouched();
  }
}

@Directive({ selector: '[myRadio]' })
export class MyRadioDirective {
  @Input() value: any;
  constructor(
    private radioGroup: MyRadioGroupDirective,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}
  ngOnInit() {
    this.radioGroup.value.subscribe((value) => {
      this.renderer.setProperty(
        this.elementRef.nativeElement,
        'checked',
        value === this.value
      );
    });

    this.radioGroup.disabled.subscribe((disabled) => {
      this.renderer.setProperty(
        this.elementRef.nativeElement,
        'disabled',
        disabled
      );
    });
  }

  @HostListener('change') onChange() {
    if (this.elementRef.nativeElement.checked) {
      this.radioGroup.radioSelected(this.value);
    }
  }

  @HostListener('blur') onBlur() {
    this.radioGroup.radioBlur();
  }
}

@Directive({ selector: '[myRadioButton]' })
export class MyRadioButtonDirective {
  @ContentChild(MyRadioDirective) radio: MyRadioDirective;
}

@Directive({ selector: '[myRadioButtonSelected]' })
export class MyRadioButtonSelectedDirective {
  private viewRef: EmbeddedViewRef<any>;

  constructor(
    private templateRef: TemplateRef<any>,
    private myRadioButton: MyRadioButtonDirective,
    private myRadioGroup: MyRadioGroupDirective,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngAfterContentInit() {
    this.myRadioGroup.value.subscribe((value) => {
      console.log(value, this.myRadioButton.radio.value);
      if (value === this.myRadioButton.radio.value) {
        this.show();
      } else {
        this.hide();
      }
    });
  }

  show() {
    if (!this.viewRef) {
      this.viewContainerRef.clear();
      this.viewRef = this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }

  hide() {
    if (this.viewRef) {
      this.viewContainerRef.clear();
      this.viewRef.destroy();
      this.viewRef = null;
    }
  }
}
