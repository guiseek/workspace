// tslint:disable: no-string-literal
// tslint:disable: directive-selector
import { CommonModule, NgClass } from '@angular/common';
import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  ViewContainerRef,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';

import {
  ComponentInjectorComponent,
  InjectedComponent,
  MockedInjectedComponent,
  TestComponent,
  TestModule,
} from '../../test';
import {
  ComponentOutletInjectorDirective,
  DynamicComponentInjectorToken,
} from '../component-injector';
import { IoFactoryService } from '../io';
import { WindowRefService, WindowRefToken } from '../window-ref';
import {
  DirectiveRef,
  DynamicDirectiveDef,
  dynamicDirectiveDef,
  DynamicDirectivesDirective,
} from './dynamic-directives.directive';

@Directive({ selector: 'mock' })
class MockDirective
  implements
    OnInit,
    OnDestroy,
    OnChanges,
    AfterViewInit,
    AfterViewChecked,
    AfterContentInit,
    AfterContentChecked {
  static INSTANCES = new Set<MockDirective>();
  @Input()
  set in(val: any) {
    this.logHook('inputSet:' + val)();
    this._in = val;
  }
  get in(): any {
    return this._in;
  }
  // tslint:disable-next-line: variable-name
  private _in: any;
  @Input()
  in2: any;
  @Output()
  out = new Subject<any>();
  @Output()
  out2 = new Subject<any>();
  ngAfterContentChecked = jest
    .fn()
    .mockImplementation(this.logHook('ngAfterContentChecked'));
  ngAfterContentInit = jest
    .fn()
    .mockImplementation(this.logHook('ngAfterContentInit'));
  ngAfterViewChecked = jest
    .fn()
    .mockImplementation(this.logHook('ngAfterViewChecked'));
  ngAfterViewInit = jest
    .fn()
    .mockImplementation(this.logHook('ngAfterViewInit'));
  ngOnChanges = jest.fn().mockImplementation(this.logHook('ngOnChanges'));
  ngOnInit = jest.fn().mockImplementation(this.logHook('ngOnInit'));
  ngDoCheck = jest.fn().mockImplementation(this.logHook('ngDoCheck'));
  ngOnDestroy = jest.fn().mockImplementation(() => {
    this.hooksOrder.push('ngOnDestroy');
    MockDirective.INSTANCES.delete(this);
  });
  hooksOrder = [];
  constructor() {
    MockDirective.INSTANCES.add(this);
  }
  private logHook(name: string) {
    return () => this.hooksOrder.push(name);
  }
}

@Directive({ selector: 'mock2' })
class Mock2Directive extends MockDirective {}

describe('Directive: DynamicDirectives', () => {
  beforeEach(() => {
    MockDirective.INSTANCES.clear();
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [
        DynamicDirectivesDirective,
        TestComponent,
        ComponentInjectorComponent,
        ComponentOutletInjectorDirective,
      ],
      providers: [
        {
          provide: DynamicComponentInjectorToken,
          useExisting: ComponentInjectorComponent,
        },
        { provide: WindowRefToken, useValue: window },
        WindowRefService,
        IoFactoryService,
      ],
    });
  });

  describe('directives', () => {
    let fixture: ComponentFixture<TestComponent>;
    let hostComp: { dirs: DynamicDirectiveDef<any>[] };

    beforeEach(() => {
      const template = `<component-injector><div [ndcDynamicDirectives]="dirs"></div></component-injector>`;
      TestBed.overrideComponent(TestComponent, { set: { template } });
      fixture = TestBed.createComponent(TestComponent);
      hostComp = fixture.componentInstance as any;
    });

    it('should init directives', () => {
      hostComp.dirs = [
        dynamicDirectiveDef(MockDirective),
        dynamicDirectiveDef(Mock2Directive),
      ];

      expect(MockDirective.INSTANCES.size).toBe(0);
      fixture.detectChanges();
      expect(MockDirective.INSTANCES.size).toBe(2);
    });

    it('should destroy all directives', () => {
      hostComp.dirs = [
        dynamicDirectiveDef(MockDirective),
        dynamicDirectiveDef(Mock2Directive),
      ];

      fixture.detectChanges();
      expect(MockDirective.INSTANCES.size).toBeGreaterThan(0);

      fixture.destroy();
      expect(MockDirective.INSTANCES.size).toBe(0);
    });

    it('should call static life-cycle hooks in order', () => {
      hostComp.dirs = [dynamicDirectiveDef(MockDirective)];

      fixture.detectChanges();

      const dir = getFirstDir();

      expect(dir.ngOnInit).toHaveBeenCalledTimes(1);
      expect(dir.ngAfterContentInit).toHaveBeenCalledTimes(1);
      expect(dir.ngAfterContentChecked).toHaveBeenCalledTimes(1);
      expect(dir.ngAfterViewInit).toHaveBeenCalledTimes(1);
      expect(dir.ngAfterViewChecked).toHaveBeenCalledTimes(1);

      // Verify order
      expect(dir.hooksOrder).toEqual([
        'ngOnInit',
        'ngDoCheck',
        'ngAfterContentInit',
        'ngAfterContentChecked',
        'ngAfterViewInit',
        'ngAfterViewChecked',
      ]);
    });

    it('should set inputs before ngOnInit hook called', () => {
      hostComp.dirs = [dynamicDirectiveDef(MockDirective, { in: true })];

      fixture.detectChanges();

      const dir = getFirstDir();

      expect(dir.hooksOrder[0]).toBe('inputSet:true');
      expect(dir.hooksOrder[1]).toBe('ngOnChanges');
      expect(dir.hooksOrder[2]).toBe('ngOnInit');
    });

    it('should not init directives of same type', () => {
      hostComp.dirs = [
        dynamicDirectiveDef(MockDirective),
        dynamicDirectiveDef(MockDirective),
        dynamicDirectiveDef(MockDirective),
      ];

      fixture.detectChanges();

      expect(MockDirective.INSTANCES.size).toBe(1);
    });

    it('should init added directive', () => {
      hostComp.dirs = [dynamicDirectiveDef(MockDirective)];
      fixture.detectChanges();

      expect(MockDirective.INSTANCES.size).toBe(1);

      hostComp.dirs = [
        dynamicDirectiveDef(MockDirective),
        dynamicDirectiveDef(Mock2Directive),
      ];
      fixture.detectChanges();

      expect(MockDirective.INSTANCES.size).toBe(2);
    });

    it('should init pushed directive', () => {
      const dirs = [dynamicDirectiveDef(MockDirective)];
      hostComp.dirs = dirs;
      fixture.detectChanges();

      expect(MockDirective.INSTANCES.size).toBe(1);

      dirs.push(dynamicDirectiveDef(Mock2Directive));
      fixture.detectChanges();

      expect(MockDirective.INSTANCES.size).toBe(2);
    });

    it('should destroy removed directive', () => {
      hostComp.dirs = [
        dynamicDirectiveDef(MockDirective),
        dynamicDirectiveDef(Mock2Directive),
      ];
      fixture.detectChanges();

      expect(MockDirective.INSTANCES.size).toBe(2);

      hostComp.dirs = [dynamicDirectiveDef(MockDirective)];
      fixture.detectChanges();

      expect(MockDirective.INSTANCES.size).toBe(1);
    });

    it('should not do anything when no component', () => {
      hostComp.dirs = [dynamicDirectiveDef(MockDirective)];
      const compInjectorElem = fixture.debugElement.query(
        By.directive(ComponentInjectorComponent),
      );
      expect(compInjectorElem).toBeTruthy();
      const compInjector = compInjectorElem.componentInstance as ComponentInjectorComponent;
      compInjector.component = null;

      fixture.detectChanges();

      expect(MockDirective.INSTANCES.size).toBe(0);
    });

    it('should destroy directives when component unset', () => {
      const compInjectorElem = fixture.debugElement.query(
        By.directive(ComponentInjectorComponent),
      );
      expect(compInjectorElem).toBeTruthy();
      const compInjector = compInjectorElem.componentInstance as ComponentInjectorComponent;

      hostComp.dirs = [dynamicDirectiveDef(MockDirective)];

      fixture.detectChanges();

      expect(MockDirective.INSTANCES.size).toBe(1);
      const dir = getFirstDir();
      expect(dir).toEqual(expect.any(MockDirective));

      compInjector.component = null;

      fixture.detectChanges();

      expect(MockDirective.INSTANCES.size).toBe(0);
      expect(dir.ngOnDestroy).toHaveBeenCalled();
    });

    it('should re-create directives when component changed', () => {
      const compInjectorElem = fixture.debugElement.query(
        By.directive(ComponentInjectorComponent),
      );
      expect(compInjectorElem).toBeTruthy();
      const compInjector = compInjectorElem.componentInstance as ComponentInjectorComponent;

      hostComp.dirs = [dynamicDirectiveDef(MockDirective)];

      fixture.detectChanges();

      expect(MockDirective.INSTANCES.size).toBe(1);
      const dir = getFirstDir();
      expect(dir).toEqual(expect.any(MockDirective));

      compInjector.component = new MockedInjectedComponent();

      fixture.detectChanges();

      expect(MockDirective.INSTANCES.size).toBe(1);
      expect(dir.ngOnDestroy).toHaveBeenCalled();
      const newDir = getFirstDir();
      expect(newDir).toEqual(expect.any(MockDirective));
      expect(newDir).not.toBe(dir);
    });
  });

  describe('@Output(ndcDynamicDirectivesCreated)', () => {
    let fixture: ComponentFixture<TestComponent>;
    let hostComp: { dirs: DynamicDirectiveDef<any>[]; created: jest.Mock };
    const created = jest.fn();

    beforeEach(() => {
      created.mockReset();
      const template = `<component-injector><div
        [ndcDynamicDirectives]="dirs"
        (ndcDynamicDirectivesCreated)="created($event)"></div></component-injector>`;
      TestBed.overrideComponent(TestComponent, { set: { template } });
      fixture = TestBed.createComponent(TestComponent);
      hostComp = fixture.componentInstance as any;
      hostComp.created = created;
    });

    it('should emit with dynamic directive refs', () => {
      hostComp.dirs = [dynamicDirectiveDef(MockDirective)];

      fixture.detectChanges();

      const dir = getFirstDir();

      expect(dir).toBeTruthy();
      expect(created).toHaveBeenCalledWith([
        expect.objectContaining({
          type: MockDirective,
          instance: dir,
        }),
      ]);
    });

    it('should emit with only added directive refs', () => {
      const dirs = [dynamicDirectiveDef(MockDirective)];
      hostComp.dirs = dirs;

      fixture.detectChanges();
      created.mockReset();

      dirs.push(dynamicDirectiveDef(Mock2Directive));
      fixture.detectChanges();

      const dir = Array.from(MockDirective.INSTANCES).pop();

      expect(created).toHaveBeenCalledWith([
        expect.objectContaining({
          type: Mock2Directive,
          instance: dir,
        }),
      ]);
    });
  });

  describe('with `ngComponentOutlet`', () => {
    let fixture: ComponentFixture<TestComponent>;
    const created = jest.fn<MockDirective, any>();

    beforeEach(() => {
      created.mockReset();
      const template = `<ng-container [ngComponentOutlet]="comp"
        [ndcDynamicDirectives]="dirs"
        (ndcDynamicDirectivesCreated)="created($event)"></ng-container>`;
      TestBed.overrideComponent(TestComponent, { set: { template } });
      fixture = TestBed.createComponent(TestComponent);
      fixture.componentInstance['comp'] = InjectedComponent;
      fixture.componentInstance['created'] = created;
    });

    it('should apply directives', () => {
      fixture.componentInstance['dirs'] = [dynamicDirectiveDef(MockDirective)];

      fixture.detectChanges();

      expect(created).toHaveBeenCalled();

      const dir = getCreateDirs(created);
      expect(dir).toBeTruthy();
    });
  });

  describe('with `*ngComponentOutlet`', () => {
    let fixture: ComponentFixture<TestComponent>;
    const created = jest.fn<MockDirective, any>();

    beforeEach(() => {
      created.mockReset();
      const template = `<ng-container *ngComponentOutlet="comp; ndcDynamicDirectives: dirs"></ng-container>`;
      TestBed.overrideComponent(TestComponent, { set: { template } });
      fixture = TestBed.createComponent(TestComponent);
      fixture.componentInstance['comp'] = InjectedComponent;
      fixture.componentInstance['created'] = created;
    });

    it('should apply directives', () => {
      fixture.componentInstance['dirs'] = [dynamicDirectiveDef(MockDirective)];

      fixture.detectChanges();

      // @Output(ndcDynamicDirectivesCreated) cannot be used with `*` syntax!
      expect(MockDirective.INSTANCES.size).toBe(1);
    });
  });

  describe('injector', () => {
    let fixture: ComponentFixture<TestComponent>;
    const created = jest.fn<any, any>();

    beforeEach(() => {
      created.mockReset();
      const template = `<ng-container
        [ngComponentOutlet]="comp"
        [ndcDynamicDirectives]="dirs"
        (ndcDynamicDirectivesCreated)="created($event)"></ng-container>`;
      TestBed.resetTestingModule()
        .configureTestingModule({
          imports: [CommonModule, TestModule],
          declarations: [
            DynamicDirectivesDirective,
            TestComponent,
            ComponentOutletInjectorDirective,
          ],
        })
        .overrideComponent(TestComponent, { set: { template } });
      fixture = TestBed.createComponent(TestComponent);
      fixture.componentInstance['comp'] = InjectedComponent;
      fixture.componentInstance['created'] = created;
    });

    it('should be able to inject `ElementRef`', () => {
      @Directive({ selector: 'mock' })
      class TestDirective {
        constructor(public elem: ElementRef) {}
      }
      fixture.componentInstance['dirs'] = [dynamicDirectiveDef(TestDirective)];

      fixture.detectChanges();

      const [{ instance }] = getCreateDirs<TestDirective>(created);

      expect(instance).toBeTruthy();
      expect(instance.elem).toBeInstanceOf(ElementRef);
    });

    it('should be able to inject `ChangeDetectorRef`', () => {
      @Directive({ selector: 'mock' })
      class TestDirective {
        constructor(public cdr: ChangeDetectorRef) {}
      }
      fixture.componentInstance['dirs'] = [dynamicDirectiveDef(TestDirective)];

      fixture.detectChanges();

      const [{ instance }] = getCreateDirs<TestDirective>(created);

      expect(instance).toBeTruthy();
      expect(instance.cdr).toEqual(
        expect.objectContaining(ChangeDetectorRef.prototype),
      );
    });

    it('should be able to inject `ViewContainerRef`', () => {
      @Directive({ selector: 'mock' })
      class TestDirective {
        constructor(public vcr: ViewContainerRef) {}
      }
      fixture.componentInstance['dirs'] = [dynamicDirectiveDef(TestDirective)];

      fixture.detectChanges();

      const [{ instance }] = getCreateDirs<TestDirective>(created);

      expect(instance).toBeTruthy();
      expect(instance.vcr).toEqual(
        expect.objectContaining(ViewContainerRef.prototype),
      );
    });
  });

  describe('directive inputs', () => {
    let fixture: ComponentFixture<TestComponent>;
    const created = jest.fn<MockDirective, any>();
    let hostComp: any;

    beforeEach(() => {
      created.mockReset();
      const template = `<ng-container [ngComponentOutlet]="comp"
        [ndcDynamicDirectives]="dirs"
        (ndcDynamicDirectivesCreated)="created($event)"></ng-container>`;
      TestBed.overrideComponent(TestComponent, { set: { template } });
      fixture = TestBed.createComponent(TestComponent);
      hostComp = fixture.componentInstance;
      hostComp.comp = InjectedComponent;
      hostComp.created = created;
    });

    it('should set inputs on directive instance', () => {
      hostComp.dirs = [
        dynamicDirectiveDef(MockDirective, { in: 'in' }),
        dynamicDirectiveDef(Mock2Directive, { in2: 'in2' }),
      ];

      fixture.detectChanges();

      const [dir1, dir2] = getCreateDirs(created);

      expect(dir1.instance.in).toBe('in');
      expect(dir2.instance.in2).toBe('in2');
    });

    it('should call `OnChanges` hook with initial changes', () => {
      hostComp.dirs = [
        dynamicDirectiveDef(MockDirective, { in: 'val' }),
        dynamicDirectiveDef(Mock2Directive, { in2: 'val2' }),
      ];

      fixture.detectChanges();

      const [dir1, dir2] = getCreateDirs(created);

      expect(dir1.instance.ngOnChanges).toHaveBeenCalledWith({
        in: new SimpleChange(undefined, 'val', true),
      });
      expect(dir2.instance.ngOnChanges).toHaveBeenCalledWith({
        in2: new SimpleChange(undefined, 'val2', true),
      });
    });

    it('should call `OnChanges` when inputs change', () => {
      const inputs1 = { in: 'val' };
      const inputs2 = { in2: 'val2' };
      hostComp.dirs = [
        dynamicDirectiveDef(MockDirective, inputs1),
        dynamicDirectiveDef(Mock2Directive, inputs2),
      ];

      fixture.detectChanges();

      const [dir1, dir2] = getCreateDirs(created);

      dir1.instance.ngOnChanges.mockReset();
      dir2.instance.ngOnChanges.mockReset();

      inputs1.in = 'new-val';
      fixture.detectChanges();

      expect(dir1.instance.ngOnChanges).toHaveBeenCalledWith({
        in: new SimpleChange('val', 'new-val', false),
      });
      expect(dir2.instance.ngOnChanges).not.toHaveBeenCalled();

      dir1.instance.ngOnChanges.mockReset();
      dir2.instance.ngOnChanges.mockReset();

      inputs2.in2 = 'new-val2';
      fixture.detectChanges();

      expect(dir1.instance.ngOnChanges).not.toHaveBeenCalled();
      expect(dir2.instance.ngOnChanges).toHaveBeenCalledWith({
        in2: new SimpleChange('val2', 'new-val2', false),
      });
    });

    it('should call `OnChanges` when inputs replaced', () => {
      const dirDef1 = dynamicDirectiveDef(MockDirective, { in: 'val' });
      const dirDef2 = dynamicDirectiveDef(Mock2Directive, { in2: 'val2' });
      hostComp.dirs = [dirDef1, dirDef2];

      fixture.detectChanges();

      const [dir1, dir2] = getCreateDirs(created);

      dir1.instance.ngOnChanges.mockReset();
      dir2.instance.ngOnChanges.mockReset();

      dirDef1.inputs = { in: 'new-val' };
      fixture.detectChanges();

      expect(dir1.instance.ngOnChanges).toHaveBeenCalledWith({
        in: new SimpleChange('val', 'new-val', false),
      });
      expect(dir2.instance.ngOnChanges).not.toHaveBeenCalled();

      dir1.instance.ngOnChanges.mockReset();
      dir2.instance.ngOnChanges.mockReset();

      dirDef2.inputs = { in2: 'new-val2' };
      fixture.detectChanges();

      expect(dir1.instance.ngOnChanges).not.toHaveBeenCalled();
      expect(dir2.instance.ngOnChanges).toHaveBeenCalledWith({
        in2: new SimpleChange('val2', 'new-val2', false),
      });
    });
  });

  describe('directive outputs', () => {
    let fixture: ComponentFixture<TestComponent>;
    const created = jest.fn<MockDirective, any>();
    let hostComp: any;

    beforeEach(() => {
      created.mockReset();
      const template = `<ng-container [ngComponentOutlet]="comp"
        [ndcDynamicDirectives]="dirs"
        (ndcDynamicDirectivesCreated)="created($event)"></ng-container>`;
      TestBed.overrideComponent(TestComponent, { set: { template } });
      fixture = TestBed.createComponent(TestComponent);
      hostComp = fixture.componentInstance;
      hostComp.comp = InjectedComponent;
      hostComp.created = created;
    });

    it('should be connected', () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();
      hostComp.dirs = [
        dynamicDirectiveDef(MockDirective, null, { out: callback1 }),
        dynamicDirectiveDef(Mock2Directive, null, { out: callback2 }),
      ];

      fixture.detectChanges();

      const [dir1, dir2] = getCreateDirs(created);

      dir1.instance.out.next('data');
      dir2.instance.out.next('data2');

      expect(callback1).toHaveBeenCalledWith('data');
      expect(callback2).toHaveBeenCalledWith('data2');
    });

    it('should be connected when changed and disconnected from old', () => {
      const callback = jest.fn();
      const outputs = { out: callback };
      hostComp.dirs = [dynamicDirectiveDef(MockDirective, null, outputs)];

      fixture.detectChanges();

      const [{ instance }] = getCreateDirs(created);

      const callback2 = jest.fn();
      outputs.out = callback2;

      fixture.detectChanges();

      instance.out.next('data');

      expect(callback2).toHaveBeenCalledWith('data');
      expect(callback).not.toHaveBeenCalledWith('data');
    });

    it('should disconnect when removed', () => {
      const callback = jest.fn();
      const outputs = { out: callback };
      hostComp.dirs = [dynamicDirectiveDef(MockDirective, null, outputs)];

      fixture.detectChanges();

      const [{ instance }] = getCreateDirs(created);

      outputs.out = undefined;
      fixture.detectChanges();

      instance.out.next('data');

      expect(callback).not.toHaveBeenCalled();
    });

    it('should disconnect when host component destroyed', () => {
      const callback = jest.fn();
      hostComp.dirs = [
        dynamicDirectiveDef(MockDirective, null, { out: callback }),
      ];

      fixture.detectChanges();

      const [{ instance }] = getCreateDirs(created);

      fixture.destroy();

      instance.out.next('data');

      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('example: NgClass', () => {
    type HostComponent = { dirs: DynamicDirectiveDef<any>[]; comp: any };
    let fixture: ComponentFixture<HostComponent>;
    let hostComp: HostComponent;

    beforeEach(() => {
      TestBed.resetTestingModule()
        .configureTestingModule({
          imports: [CommonModule, TestModule],
          declarations: [
            DynamicDirectivesDirective,
            TestComponent,
            ComponentOutletInjectorDirective,
          ],
        })
        .overrideTemplate(
          TestComponent,
          `<ng-container *ngComponentOutlet="comp; ndcDynamicDirectives: dirs"></ng-container>`,
        );

      fixture = TestBed.createComponent(TestComponent as any);
      hostComp = fixture.componentInstance;

      hostComp.comp = InjectedComponent;
    });

    it('should apply classes', () => {
      hostComp.dirs = [dynamicDirectiveDef(NgClass, { ngClass: 'cls1 cls2' })];

      fixture.detectChanges();

      const injectedComp = fixture.debugElement.query(
        By.directive(InjectedComponent),
      );

      expect(injectedComp).toBeTruthy();
      expect(injectedComp.classes.cls1).toBeTruthy();
      expect(injectedComp.classes.cls2).toBeTruthy();
    });
  });
});

function getFirstDir() {
  return getFirstFrom(MockDirective.INSTANCES);
}

function getFirstFrom<T>(set: Set<T>): T {
  return set.values().next().value;
}

function getCreateDirs<T>(mockFn: jest.Mock<T>): DirectiveRef<T>[] {
  return mockFn.mock.calls[0][0];
}
