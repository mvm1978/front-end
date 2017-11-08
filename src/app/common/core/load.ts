import {ApiRoot} from './../api-root';
import {BaseServices} from './../core/base.services';
import {SharedServices} from './../services/shared.services';
import {GlobalEventsManager} from './../modules/global-events-manager';

export * from './../api-root';
export * from './../core/base.services';
export * from './../services/shared.services';
export * from './../modules/global-events-manager';

export const CoreProviders = [
	ApiRoot,
    BaseServices,
    SharedServices,
    GlobalEventsManager
];