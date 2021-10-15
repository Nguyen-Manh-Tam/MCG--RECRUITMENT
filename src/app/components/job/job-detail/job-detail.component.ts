import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { McgDataApi } from 'src/app/api/mcg-data.api';
import { ResourceApi } from 'src/app/api/resource.api';
import { ModalService } from 'src/app/services/modal.service';
import * as _ from 'lodash';
// import { ApplyDialogComponent } from '../dialogs/apply-dialog/apply-dialog.component'

@Component({
	selector: 'app-job-detail',
	templateUrl: './job-detail.component.html',
})
export class JobDetailComponent {

	constructor(private injector: Injector, private api: McgDataApi, private route: ActivatedRoute, private router: Router, resourceApi: ResourceApi, private modal: ModalService) {
	  this.data = route.snapshot.data['data']
	  this.url = resourceApi.baseURL
	  console.log(this.data, 'adasd');
	  
	}
	public opened = false;
	data: any
	url: string
	default_logo: string = 'assets/images/logos/logo1.png'
  
	apply(code: string) {
	  this.router.navigateByUrl(`/apply-cv/${code}`)
	}
	
  
	async uploadCv() {
	// 	var instance = await this.modal.show(ApplyDialogComponent, {
	// 	  recruitment: this.data
	// 	}, { width: '900px' })
	// 	// instance.subscribe((reload) => {
	// 	//   if (reload) {
			
	// 	//   }
	// 	// })
	}
  
	openwebsite(url: string) {
	  window.open('//'+url, '_blank')
	}


	public close(status) {
	  console.log(`Dialog result: ${status}`);
	  this.opened = false;
	}
  
	public open() {
	  this.opened = true;
	}
  }