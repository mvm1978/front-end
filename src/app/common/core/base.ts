import {Injectable} from '@angular/core';

@Injectable()

export class base
{

    //**************************************************************************

    public set(property: string, value: any)
    {
        this[property] = value;
    }

    //**************************************************************************

    public get(property: string)
    {
        return this[property];
    }

    //**************************************************************************

}