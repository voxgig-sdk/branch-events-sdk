import { Context } from './Context';
declare class BranchEventsError extends Error {
    isBranchEventsError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { BranchEventsError };
