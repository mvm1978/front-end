import {Injectable} from '@angular/core';

@Injectable()

export class ApiRoot
{
//    public root = 'http://ec2-13-58-206-244.us-east-2.compute.amazonaws.com';
//    public authRoot = 'http://ec2-18-221-89-116.us-east-2.compute.amazonaws.com';

    public root = 'http://127.0.0.1:8000';
    public authRoot = 'http://127.0.0.1:8090';

    public api = this.root + '/api';
    public authApi = this.authRoot + '/api';
}