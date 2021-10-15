import { Component } from '@angular/core';
import { CustomMessagesService } from 'src/app/services/custom-messages.service';
import { IntlService } from '@progress/kendo-angular-intl';
import { MessageService } from '@progress/kendo-angular-l10n';
import { PageChangeEvent } from "@progress/kendo-angular-pager"
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceApi } from 'src/app/api/resource.api';

@Component({
    selector: 'app-job-component',
    templateUrl: './job.component.html'
})
export class JobComponent {
    public pageSize = 8;
    public skip = 0;
    public pagedDestinations = [];
    public total: number;

    // count: number;
    _job: Array<any>
    url: string
    default_logo: string = './../assets/images/logos/logo1.png'

    public data: Array<string>;
    public customMsgService: CustomMessagesService;

    constructor(public intl: IntlService, public messages: MessageService, resourceApi: ResourceApi, private router: Router, route: ActivatedRoute,) {
        this.customMsgService = this.messages as CustomMessagesService;
        let response = route.snapshot.data['fetch']
        this._job = response?.Datas
        // this.count = response.Count
        this.total = response.Count
        this.url = resourceApi.baseURL
        console.log(this._job, "hhhhhh");
        
    }



    public onPageChange(e: PageChangeEvent): void {
        this.skip = e.skip;
        this.pageSize = e.take;
        this.pageData();
    }

    
    private pageData(): void {
        this.pagedDestinations = this._job.slice(
            this.skip,
            this.skip + this.pageSize
        );
    }


    jobSelected(code: string) {
        this.router.navigateByUrl(`/job-detail/${code}`)
      }

}
