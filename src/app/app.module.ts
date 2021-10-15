import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RatingComponent } from './components/team/rating.component';
import { CompanyComponent } from './components/company/company.component';
import { ContactComponent } from './components/contact/contact.component';
import { HeaderComponent } from './header/header.component';
import { TeamComponent } from './components/team/team.component';
import { CustomMessagesService } from './services/custom-messages.service';

import { ExcelModule, GridModule, PDFModule } from '@progress/kendo-angular-grid';
import { LabelModule } from '@progress/kendo-angular-label';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { EditorModule } from '@progress/kendo-angular-editor';
import { FileSelectModule, UploadModule } from '@progress/kendo-angular-upload';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { IntlModule } from '@progress/kendo-angular-intl';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { MessageService } from '@progress/kendo-angular-l10n';
import { ListViewModule } from '@progress/kendo-angular-listview';
import { PagerModule } from '@progress/kendo-angular-pager';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';





const drawerRoutes = [
    { path: '', component: TeamComponent },
    {
        path: 'company', component: CompanyComponent,
        resolve: { fetch: CompanyResolve }
    },
    {
        path: 'job', component: JobComponent,
        resolve: { fetch: JobResolve },
    },
    {
        path: 'job/:code',
        component: JobComponent,
        resolve: { fetch: JobResolve},
    },
    {
        path: 'job-detail/:code',
        component: JobDetailComponent,
        resolve: { data: JobDetailResolve }
    },
    {
        path: 'apply-cv/:code',
        component: ApplyCvComponent 
    },
    { path: 'contact', component: ContactComponent }
];

import 'hammerjs';

import '@progress/kendo-angular-intl/locales/en/all';
import '@progress/kendo-angular-intl/locales/es/all';
import '@progress/kendo-angular-intl/locales/fr/all';
import { CompanyResolve } from './components/company/company.resolver';
import { CompanyApi } from './api/company.api';
import { ResourceApi } from './api/resource.api';
import { StorageService } from './services/storage.service';
import { IconsModule } from '@progress/kendo-angular-icons';
import { JobComponent } from './components/job/job.component';
import { JobResolve } from './components/job/job.resolver';
import { RecruitmentPostApi } from './api/recruitment-post.api';
import { JobDetailComponent } from './components/job/job-detail/job-detail.component';
import { JobDetailResolve } from './components/job/job-detail.resolver';
import { McgDataApi } from './api/mcg-data.api';
import { ModalService } from './services/modal.service';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { ApplyDialogComponent } from './components/job/apply-dialog/apply-dialog.component';
import { ApplyCvComponent } from './components/job/apply-cv/apply-cv.component';
import { RecruitmentCvApi } from './api/recruitment-cv.api';
import { ToastrService } from './services/toastr.service';
import { ContactsComponent } from './components/job/contacts/contacts.component';
import { McgCertificatesComponent } from './components/job/mcg-certificates/mcg-certificates.component';
import { McgCertificateComponent } from './components/job/mcg-certificate/mcg-certificate.component';





@NgModule({
    declarations: [
        AppComponent,
        RatingComponent,
        CompanyComponent,
        JobComponent,
        HeaderComponent,
        ContactComponent,
        TeamComponent,
        JobDetailComponent,
        ApplyDialogComponent,
        ApplyCvComponent,
        ApplyCvComponent,
        ContactsComponent,
        McgCertificatesComponent,
        McgCertificateComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        GridModule,
        PDFModule,
        ExcelModule,
        LabelModule,
        LayoutModule,
        SchedulerModule,
        ButtonsModule,
        EditorModule,
        FileSelectModule,
        HttpClientModule,
        ChartsModule,
        IntlModule,
        DateInputsModule,
        InputsModule,
        DropDownsModule,
        RouterModule.forRoot(drawerRoutes),
        NotificationModule,
        PagerModule,
        ListViewModule,
        IconsModule,
        DialogsModule,
        UploadModule,
        NoopAnimationsModule
    ],
    providers: [
        { provide: MessageService, useClass: CustomMessagesService },
        { provide: LOCALE_ID, useValue: 'en-US' },
        CompanyApi,
        ResourceApi,
        McgDataApi,
        RecruitmentCvApi,
        RecruitmentPostApi,
        CompanyResolve,
        JobResolve,
        JobDetailResolve,
        StorageService,
        ModalService,
        ToastrService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
