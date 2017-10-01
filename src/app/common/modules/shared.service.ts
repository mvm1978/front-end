import {Injectable} from '@angular/core';

import {base} from '../core/base';

@Injectable()

export class SharedService extends base
{
    public app: string = '';
}