import { BranchEventsEntityBase } from '../BranchEventsEntityBase';
import type { BranchEventsSDK } from '../BranchEventsSDK';
import type { Control } from '../types';
import type { Standard, StandardCreateData } from '../BranchEventsTypes';
declare class StandardEntity extends BranchEventsEntityBase<Standard> {
    constructor(client: BranchEventsSDK, entopts: any);
    make(this: StandardEntity): StandardEntity;
    create(this: any, reqdata?: StandardCreateData, ctrl?: Control): Promise<StandardEntity>;
}
export { StandardEntity };
