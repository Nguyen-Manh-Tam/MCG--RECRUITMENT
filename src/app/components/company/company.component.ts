import { Component, ViewChild, Injector } from '@angular/core';
import { IntlService } from '@progress/kendo-angular-intl';
import { MessageService } from '@progress/kendo-angular-l10n';
import { CustomMessagesService } from 'src/app/services/custom-messages.service';
import { PageChangeEvent } from "@progress/kendo-angular-pager"
import { CompanyApi } from 'src/app/api/company.api';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceApi } from 'src/app/api/resource.api';
import { process } from '@progress/kendo-data-query';
import { Employee } from 'src/app/models/employee.model';

@Component({
    selector: 'app-company-component',
    templateUrl: './company.component.html'
})
export class CompanyComponent {
    public pageSize = 8;
    public skip = 0;
    public pagedDestinations = [];
    public total : number;

    public data: Array<string>

    public customMsgService: CustomMessagesService;

    constructor(public intl: IntlService, public messages: MessageService, private injector: Injector, private api: CompanyApi, route: ActivatedRoute, private router: Router, resourceApi: ResourceApi
    ) {
        this.customMsgService = this.messages as CustomMessagesService;
        let response = route.snapshot.data['fetch']
        this._companies = response?.Datas
        // this.count = response.Count
        this.total = response.Count
        this.url = resourceApi.baseURL
    }
    _companies: Array<any>
    searchTerm: string
    // count: number;
    page: number = 1;
    url: string
    checkImage = true;
    default_logo = './../../../../assets/images/logos/logo.png'

    fetch(value: {
        Page: number,
        Quantity: number,
        Scstr: string,
        Query: string
    }) {
        this.api.post('getall', value).then((response: any) => {
            this._companies = response?.Datas
            this.total = response.Count
        })
    }

    ngOnInit() {
        this.pageData();
    }

    public onPageChange(e: PageChangeEvent): void {
        this.skip = e.skip;
        this.pageSize = e.take;
        this.pageData();
        this.fetch({
            Page: (e.skip/e.take + 1),
            Quantity: this.pageSize,
            Scstr: 'nothing',
            Query: this.searchTerm
          })
    }

    private pageData(): void {
        this.pagedDestinations = this._companies.slice(
            this.skip,
            this.skip + this.pageSize
        );
    }



    public onFilter(inputValue: string): void {
        this._companies = process(this.data, {
            filter: {
                logic: 'or',
                filters: [
                    {
                        field: this.getField,
                        operator: 'contains',
                        value: inputValue
                    }
                ]
            }
        }).data;

        this.skip = 0;
    }

    public getField = (args: Employee) => {
        return `${args.fullName}_${args.jobTitle}_${args.budget}_${args.phone}_${args.address}`;
    }

    jobDetail(Code: string) {
        this.router.navigateByUrl(`/job/${Code}`)
    }

    openwebsite(url: string) {
        window.open('//' + url, '_blank')
    }

}
