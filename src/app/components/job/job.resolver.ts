import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { RecruitmentPostApi } from '../../api/recruitment-post.api';
import { StorageService } from '../../services/storage.service';
import * as _ from 'lodash';

@Injectable()
export class JobResolve implements Resolve<Object> {
    constructor(private storage: StorageService, private api: RecruitmentPostApi) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const model: any = {}
        model.Scstr = 'nothing'
        model.Page = 1
        model.Quantity = this.storage.resolve(state.url) || 10;
        return this.api.post('jobs', model)
    }
}
