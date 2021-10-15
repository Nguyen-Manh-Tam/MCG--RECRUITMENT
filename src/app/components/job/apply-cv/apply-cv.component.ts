import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecruitmentCvApi } from 'src/app/api/recruitment-cv.api';
import { RecruitmentPostApi } from 'src/app/api/recruitment-post.api';
import { ToastrService } from 'src/app/services/toastr.service';
import { Utils } from 'src/app/utils';

@Component({
	selector: 'app-apply-cv',
	templateUrl: './apply-cv.component.html',
})
export class ApplyCvComponent implements OnInit {

	constructor(private injector: Injector, private api: RecruitmentCvApi, route: ActivatedRoute, private toastr: ToastrService,
		private rPostApi: RecruitmentPostApi, private router: Router) {
		this.model = route.snapshot.data['datas']
		this.code = route.snapshot.params['code']
		this.data = new Object()
		this.data.WorkExperiences = [{}]
		this.data.Certificates = [{}]
		this.data.LanguageForJobs = [{}]
		this.data.OfficeForJobs = [{}]
		this.data.ContactPersons = [{}]
	}
	model: any
	data: any
	code: string
	pattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
	candidateValidator: FormControl = new FormControl('', [Validators.required])
	emailValidator: FormControl = new FormControl('', [Validators.required])
	index: number = 0
	work: any
	public value: Date = new Date();
	recruitmentPost: any
	public allowCustom = true;
	public range = { start: null, end: null };

	public valueNumber: number;
	public events: string[] = [];

	public listItems: Array<string> = [
		"Baseball",
		"Basketball",
		"Cricket",
		"Field Hockey",
		"Football",
		"Table Tennis",
		"Tennis",
		"Volleyball",
	];

	back() {
		this.index--
	}

	ngOnInit() {
		this.rPostApi.get(`${this.code}`).then((response: any) => {
			this.recruitmentPost = response
		})
	}

	accept(f: NgForm) {
		this.data.RecruitmentPost = this.recruitmentPost
		var check = this.validate()
		if (!check) return;
		this.api.post('applycv', this.data).then(() => {
			// this.toastr.success('Nhập hồ sơ thành công')
			this.router.navigateByUrl('/apps/company')
		}).catch(() => {
			// this.toastr.error('Nhập hồ sơ không thành công')
		})
	}

	onTabChanged($event) {
		this.index = $event.index
	}



	next1() {
		if (Utils.isStringEmpty(this.data.CandidateName)) {
			// this.toastr.error('Họ và tên trống')
			return;
		}
		if (Utils.isStringEmpty(this.data.Email)) {
			// this.toastr.error('Email trống')
			return;
		}
		this.index++
	}

	next2() {
		if (Utils.isArrayNotEmpty(this.data.WorkExperiences)) {
			var count = this.data.WorkExperiences.filter((x: any) => x.CompanyName === undefined || x.CompanyName === '' || x.Job === undefined || x.Job === '')
			if (Utils.isArrayNotEmpty(count)) {
				// this.toastr.error('Dữ liệu còn thiếu')
				return
			}
		}
		this.index = 2
	}

	next3() {
		if (Utils.isArrayNotEmpty(this.data.Certificates)) {
			var count = this.data.Certificates.filter((x: any) => x.CertificateType === undefined)
			if (Utils.isArrayNotEmpty(count)) {
				// this.toastr.error('Dữ liệu còn thiếu')
				return
			}
		}
		this.index = 3
	}

	next4() {
		if (Utils.isArrayNotEmpty(this.data.LanguageForJobs)) {
			var count = this.data.LanguageForJobs.filter((x: any) => x.Language === undefined)
			if (Utils.isArrayNotEmpty(count)) {
				// this.toastr.error('Dữ liệu còn thiếu')
				return
			}
		}
		this.index = 4
	}

	next5() {
		if (Utils.isArrayNotEmpty(this.data.OfficeForJobs)) {
			var count = this.data.OfficeForJobs.filter((x: any) => x.Office === undefined)
			if (Utils.isArrayNotEmpty(count)) {
				// this.toastr.error('Dữ liệu còn thiếu')
				return
			}
		}
		this.index = 5
	}

	onHistoriesCallBack($event) {
		this.data.WorkExperiences = $event
	}

	onCertificatesCallBack($event) {
		this.data.Certificates = $event
	}

	onLanguagesCallBack($event) {
		this.data.LanguageForJobs = $event
	}

	onOfficesCallBack($event) {
		this.data.OfficeForJobs = $event
	}

	onContactPersonsCallBack($event) {
		this.data.ContactPersons = $event
	}



	validate() {
		if (Utils.isStringEmpty(this.data.CandidateName)) {
			// this.toastr.error('Họ và tên trống')
			return false;
		}
		if (Utils.isStringEmpty(this.data.Email)) {
			// this.toastr.error('Email trống')
			return false;
		}
		if (Utils.isArrayNotEmpty(this.data.WorkExperiences)) {
			var count = this.data.WorkExperiences.filter((x: any) => x.CompanyName === undefined || x.CompanyName === '' || x.Job === undefined || x.Job === '')
			if (Utils.isArrayNotEmpty(count)) {
				// this.toastr.error('Nơi công tác/Vị trí công việc trống')
				return false
			}
		}
		if (Utils.isArrayNotEmpty(this.data.OfficeForJobs)) {
			var count = this.data.OfficeForJobs.filter((x: any) => x.Office === undefined)
			if (Utils.isArrayNotEmpty(count)) {
				// this.toastr.error('Tin học trống')
				return false
			}
		}
		if (Utils.isArrayNotEmpty(this.data.Certificates)) {
			var count = this.data.Certificates.filter((x: any) => x.CertificateType === undefined)
			if (Utils.isArrayNotEmpty(count)) {
				// this.toastr.error('Loại bằng cấp ngữ trống')
				return false
			}
		}
		if (Utils.isArrayNotEmpty(this.data.LanguageForJobs)) {
			var count = this.data.LanguageForJobs.filter((x: any) => x.Language === undefined)
			if (Utils.isArrayNotEmpty(count)) {
				// this.toastr.error('Ngoại ngữ trống')
				return false
			}
		}
		if (Utils.isArrayNotEmpty(this.data.ContactPersons)) {
			var count = this.data.ContactPersons.filter((x: any) => x.Name === undefined || x.Name === '' || x.RelationshipToCandidate === undefined)
			if (Utils.isArrayNotEmpty(count)) {
				// this.toastr.error('Tên người tham khảo/Mối quan hệ trống')
				return false
			}
		}
		return true
	}



	public onFocus(): void {
		this.log("NumericTextBox is focused");
	}

	public onBlur(): void {
		this.log("NumericTextBox is blurred");
	}

	public onChange(valueNumber: string): void {
		this.log(`valueChange ${valueNumber}`);
	}

	private log(event: string): void {
		this.events.unshift(`${event}`);
	}
}

