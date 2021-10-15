import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import * as _ from 'lodash';
import { RecruitmentPostApi } from 'src/app/api/recruitment-post.api';
import { StorageService } from 'src/app/services/storage.service';

@Injectable()
export class JobDetailResolve implements Resolve<Object> {
    constructor(private storage: StorageService, private api: RecruitmentPostApi) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const code = _.get(route, 'params.code')
        return this.api.get(`${code}`)
    }
}
