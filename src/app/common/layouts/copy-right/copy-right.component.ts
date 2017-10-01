import {Component} from '@angular/core';

@Component({
    selector: 'copy-right',
    templateUrl: './app/common/layouts/copy-right/copy-right.component.html',
    styleUrls: [
        './app/common/layouts/copy-right/copy-right.component.css'
    ],
})

export class CopyRightComponent {

    public urls = [
        {
            caption: 'Terms of Use',
            link: 'https://www.ableto.com/'
        },
        {
            caption: 'Privacy Policy',
            link: 'https://www.ableto.com/'
        }
    ];
}
