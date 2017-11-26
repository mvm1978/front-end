import {Injectable} from '@angular/core';

@Injectable()

export class BaseServices
{

    public get(property: string): any
    {
        return this[property];
    }

    //**************************************************************************

    public set(property: string, value: any): void
    {
        this[property] = value;
    }

    //**************************************************************************

}