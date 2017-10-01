import {ApiRoot} from './../api-root';
import {GlobalEventsManager} from './../modules/global-events-manager';
import {SharedService} from './../modules/shared.service';

export * from './../api-root';
export * from './../modules/global-events-manager';
export * from './../modules/shared.service';

export const CoreProviders = [
	ApiRoot,
    GlobalEventsManager,
    SharedService
];