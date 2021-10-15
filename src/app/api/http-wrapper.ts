import { HttpClient } from '@angular/common/http';

export class HttpWrapper {
    constructor(public http: HttpClient, public baseURL: string) {
    }

    fetch(page: number, quantity: number, query: string = '', params: any = {}) {
        return this.http.get(this.baseURL + `/${page}/${quantity}/${query}`, {
            params: params
        }).toPromise();
    }

    get(href: string = '', params: any = {}) {
        return this.http.get(this.baseURL + `/${href}`, {
            params: params
        }).toPromise();
    }

    text(href: string = '', params: any = {}) {
        return this.http.get(this.baseURL + `/${href}`, {
            params: params,
            responseType: 'text'
        }).toPromise();
    }

    post(href: string = '', data: any, params: any = {}) {
        return this.http.post(this.baseURL + `/${href}`, data, {
            params: params
        }).toPromise();
    }

    save(data: any) {
        return this.http.post(this.baseURL + ``, data).toPromise();
    }

    put(href: string = '', data: any, params: any = {}) {
        return this.http.put(this.baseURL + `/${href}`, data, {
            params: params
        }).toPromise();
    }

    update(data: any) {
        return this.http.put(this.baseURL + ``, data).toPromise();
    }

    single(code: string) {
        return this.http.get(this.baseURL + `/${code}`).toPromise();
    }

    delete(code: string) {
        return this.http.delete(this.baseURL + `/${code}`).toPromise();
    }

    selectize() {
        return this.http.get(this.baseURL + `/selectize`).toPromise();
    }

    published(code: string) {
        return this.http.post(this.baseURL + `/published/${code}`, {}).toPromise();
    }

    unpublished(code: string) {
        return this.http.post(this.baseURL + `/unpublished/${code}`, {}).toPromise();
    }
}
