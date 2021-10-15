import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { MessageService } from '@progress/kendo-angular-l10n';
import { DrawerComponent, DrawerMode, DrawerSelectEvent } from '@progress/kendo-angular-layout';
import { CustomMessagesService } from './services/custom-messages.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
    public selected = 'Team';
    public items: Array<any>;
    public customMsgService: CustomMessagesService;
    public mode: DrawerMode = 'push';
    public mini = true;

    constructor(private router: Router, public msgService: MessageService) {
        this.customMsgService = this.msgService as CustomMessagesService;
    }

    ngOnInit() {
        // Update Drawer selected state when change router path
        this.router.events.subscribe((route: NavigationStart) => {
            if (route instanceof NavigationStart) {
                this.items = this.drawerItems().map((item) => {
                    if (item.path && item.path === route.url) {
                        item.selected = true;
                        return item;
                    } else {
                        item.selected = false;
                        return item;
                    }
                });
            }
        });

        this.setDrawerConfig();

        this.customMsgService.localeChange.subscribe(() => {
            this.items = this.drawerItems();
        });

        window.addEventListener('resize', () => {
            this.setDrawerConfig();
        });
    }

    ngOnDestroy() {
        window.removeEventListener('resize', () => { });
    }

    public setDrawerConfig() {
        const pageWidth = window.innerWidth;
        if (pageWidth <= 770) {
            this.mode = 'overlay';
            this.mini = false;
        } else {
            this.mode = 'push';
            this.mini = true;
        }
    }

    public drawerItems() {
        return [
            { text: this.customMsgService.translate('team'), icon: 'k-i-grid', path: '/', selected: true },
            { text: this.customMsgService.translate('company'), icon: 'k-i-chart-line-markers', path: '/company', selected: false },
            { text: this.customMsgService.translate('job'), icon: 'k-i-calendar', path: '/job', selected: false },
            { separator: true },
            { text: this.customMsgService.translate('contact'), icon: 'k-i-information', path: '/contact', selected: false }
        ];
    }

    public toggleDrawer(drawer: DrawerComponent): void {
        drawer.toggle();
    }

    public onSelect(ev: DrawerSelectEvent): void {
        this.router.navigate([ev.item.path]);
        this.selected = ev.item.text;
    }

}
