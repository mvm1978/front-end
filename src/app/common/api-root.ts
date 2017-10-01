import {Injectable} from '@angular/core';

@Injectable()

export class ApiRoot
{
    public api = 'http://127.0.0.1:8000/api';
    public authApi = 'http://127.0.0.1:8080/api';

//    public api = 'http://ec2-13-58-206-244.us-east-2.compute.amazonaws.com/api';
//    public authApi = 'http://ec2-18-221-89-116.us-east-2.compute.amazonaws.com/api';

}
