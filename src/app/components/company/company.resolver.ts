import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { CompanyApi } from './../../api/company.api';
import { StorageService } from 'src/app/services/storage.service';
import * as _ from 'lodash';

@Injectable()
export class CompanyResolve implements Resolve<Object> {
    constructor(private storage: StorageService, private api: CompanyApi) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const model: any = {}
        model.Scstr = 'nothing'
        model.Page = 1
        model.Quantity = this.storage.resolve(state.url) || 8;
        return this.api.post('getall', model)
    }
}
