import { Component, Injector, Input, Output, EventEmitter, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'mcg-certificates',
  templateUrl: './mcg-certificates.component.html',
  styleUrls: ['./mcg-certificates.component.scss']
})
export class McgCertificatesComponent {

  constructor() { 
    
  }

  add() {
    this.entities = this.entities || []
    this.entities.push({})
    this.onCertificateCallBack({})
  }

  remove(data: Object) {
    var index = this.entities.indexOf(data)
    this.entities.splice(index, 1)
    this.entitiesChanged.emit(this.entities)
  }

  @Input('entities') entities: Array<any>
  @Input('certificateTypes') certificateTypes: Array<any>
  @Input('majors') majors: Array<any>
  @Input('classifications') classifications: Array<any>
  @Input() form: NgForm;
  @Output() entitiesChanged = new EventEmitter()

  onCertificateCallBack(data: any) {
    this.entitiesChanged.emit(this.entities)
  }

}
