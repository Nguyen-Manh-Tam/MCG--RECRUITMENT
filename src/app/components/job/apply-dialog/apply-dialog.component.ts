import { Component, Inject } from '@angular/core';
import { FileInfo, FileRestrictions } from '@progress/kendo-angular-upload';
import { Router } from '@angular/router'
import * as _ from 'lodash';

@Component({
  selector: 'app-apply-dialog',
  templateUrl: './apply-dialog.component.html',
})
export class ApplyDialogComponent {

  //   constructor(private ref: MatDialogRef<ApplyDialogComponent>,
  //     @Inject(MAT_DIALOG_DATA) bindings: any, private toastr: ToastrService, private api: RecUploadCvApi, private route: Router) {
  //     this.recruitment = _.get(bindings, 'recruitment')
  //     this.model = new Object()
  //     this.model.RecruitmentPost = this.recruitment
  //     this.model.CompanyCode = this.recruitment.CompanyCode
  //   }
  //   model: any
  //   recruitment: any
  //   file: any
  //   candidateValidator: FormControl = new FormControl('', [Validators.required])

  //   accept(f: NgForm) {
  //     var check = this.validate()
  //     if(!check) return
  //     this.model.FeaturedImageUrl = this.file.url
  //     this.model.FileName = this.file.fileName
  //     this.api.post('uploadcv', this.model).then(() => {
  //       this.toastr.success('Tải cv lên hệ thống thành công.')
  //       this.ref.close(true)
  //       this.route.navigateByUrl('/apps/company')
  //     }).catch(() => {
  //       this.toastr.error('Tải cv không thành công.')
  //       return
  //     });

  //   }

  //   onFileComplete(data: any) {
  //     this.file = data
  //   }

  //   validate() {
  //     if(this.model.Name === undefined || this.model.Name === '') {
  //       this.toastr.error('Họ và tên không được để trống')
  //       return false
  //     }
  //     if(this.file === undefined || this.file === null) {
  //       this.toastr.error('File upload không trống')
  //       return false
  //     }
  //     return true
  //   }

  //   cancel() {
  //     this.ref.close(false)
  // }

  uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
  uploadRemoveUrl = 'removeUrl'; // should represent an actual API endpoint

  public myRestrictions: FileRestrictions = {
    allowedExtensions: ['jpg', 'jpeg', 'png']
  };

  public userName: string;
  public userImages: Array<FileInfo>;

  save(_value: any, valid: boolean) {
    if (valid) {
      console.log('Everything is OK!');
    }
  }
}
