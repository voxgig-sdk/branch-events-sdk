import { BranchEventsEntityBase } from '../BranchEventsEntityBase';
import type { BranchEventsSDK } from '../BranchEventsSDK';
import type { Control } from '../types';
import type { Custom, CustomCreateData } from '../BranchEventsTypes';
declare class CustomEntity extends BranchEventsEntityBase<Custom> {
    constructor(client: BranchEventsSDK, entopts: any);
    make(this: CustomEntity): CustomEntity;
    create(this: any, reqdata?: CustomCreateData, ctrl?: Control): Promise<CustomEntity>;
}
export { CustomEntity };
