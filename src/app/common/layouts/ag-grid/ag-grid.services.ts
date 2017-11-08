import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

import {BaseServices} from '../../core/base.services';
import {SharedServices} from '../../services/shared.services';
import {AuthServices} from '../../../auth/auth.services';

declare var jQuery: any;

@Injectable()

export class AgGridServices extends BaseServices
{
    private gridID: string;
    private output: any = {
        page: 1,
        sort: {},
        filter: {}
    };
    private filterField: string;
    private filterColumn: string;

    private isFilter: BehaviorSubject<any> = new BehaviorSubject<any>({});
    private setNavigation: BehaviorSubject<any> = new BehaviorSubject<any>({});
    private reload: BehaviorSubject<any> = new BehaviorSubject<any>({});

    public showFilterEmitter: Observable<any> = this.isFilter.asObservable();
    public setNavigationEmitter: Observable<any> = this.setNavigation.asObservable();
    public reloadEmitter: Observable<any> = this.reload.asObservable();

    constructor(
        private _http: Http,
        private _sharedServices: SharedServices,
        private _authServices: AuthServices
    )
    {
        super();
    }

    //**************************************************************************

    public getTableData(url:string)
    {
        let data = this.get('output');

        let params = this._sharedServices.getParamString(data),
            header = this._authServices.getAuthHeader();

        return this._http.get(url + '?' + params, header).map(res => res.json());
    }

    //**************************************************************************

    public showFilter(data: any)
    {
        this.isFilter.next(data);
    }

    //**************************************************************************

    public setGridNavigation(data: any)
    {
        this.setNavigation.next(data);
    }

    //**************************************************************************

    public reloadTable()
    {
        this.reload.next({});
    };

    //**************************************************************************

    public outputUpdate(field: any, value?: any)
    {
        let output = this.get('output'),
            isString = typeof field === 'string',
            key = '',
            innerKey = '';

        if (! isString) {

            key = Object.keys(field)[0];

            innerKey = field[key];
        }

        if (typeof value !== 'undefined') {
            if (isString) {
                output[field] = value;
            } else {
                output[key][innerKey] = value;
            }
        } else {
            if (isString) {
                delete output[field];
            } else {
                delete output[key][innerKey];
            }
        }

        this.set('output', output);
    };

    //**************************************************************************

}