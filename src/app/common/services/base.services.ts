import {Injectable} from '@angular/core';

@Injectable()

export class BaseServices
{

    public get(property: string)
    {
        return this[property];
    }

    //**************************************************************************

    public set(property: string, value: any)
    {
        this[property] = value;
    }

    //**************************************************************************

}