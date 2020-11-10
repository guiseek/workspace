import { ControlBase, ControlService, DynamicControlService } from '../../dynamic';
import { AutodocsConfig, AUTODOCS_CONFIG } from '../../autodocs-injectors';
import { Component, Inject, OnInit, Type } from '@angular/core';
import { PreviewRef } from './../../preview/preview-ref';
import { PREVIEW_DATA } from '../../preview';
import { compodoc } from '../../interfaces';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'autodocs-preview',
  templateUrl: './preview.container.html',
  styleUrls: ['./preview.container.scss'],
})
export class PreviewContainer implements OnInit {
  controls: ControlBase<any>[];
  component: Type<any>
  form: FormGroup
  constructor(
    private previewRef: PreviewRef<PreviewContainer>,
    @Inject(AUTODOCS_CONFIG) private config: AutodocsConfig,
    @Inject(PREVIEW_DATA) public data: compodoc.Component,
    private dcs: DynamicControlService,
    private control: ControlService
  ) { }

  ngOnInit(): void {
    this.component = this.config.components.get(this.data.name);
    this.controls = this.control.toControls(this.data)
    this.form = this.dcs.toFormGroup(
      this.control.toControls(this.data)
    )
  }
}
