import { Component } from '@angular/core';
import { MessageService } from '@progress/kendo-angular-l10n';
import { CustomMessagesService } from 'src/app/services/custom-messages.service';

@Component({
    selector: 'app-contact-component',
    templateUrl: './contact.component.html',
})
export class ContactComponent {
    public customMsgService: CustomMessagesService;

    constructor(public msgService: MessageService) {
        this.customMsgService = this.msgService as CustomMessagesService;
    }
}
