import { Component, Injector, Input, Output, EventEmitter, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'mcg-certificate',
  templateUrl: './mcg-certificate.component.html',
  styleUrls: ['./mcg-certificate.component.scss']
})
export class McgCertificateComponent {

  constructor(private injector: Injector) { 
    
  }

  public range = { start: null, end: null };
  delete($event) {
    this.remove.emit($event)
  }

  @Input('entity') entity: any
  @Input('certificateTypes') certificateTypes: Array<any>
  @Input('majors') majors: Array<any>
  @Input('classifications') classifications: Array<any>
  @Input() form: NgForm;
  @Output() remove =  new EventEmitter();
  @Output() entityChange = new EventEmitter();

  changed() {
    this.entityChange.emit(this.entity)
  }

  fromChange($event) {
    this.entity.FromYear = new Date($event)
  }

  toChange($event) {
    this.entity.ToYear = new Date($event)
  }

}
