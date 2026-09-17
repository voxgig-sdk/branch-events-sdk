import { CustomEntity } from './entity/CustomEntity';
import { StandardEntity } from './entity/StandardEntity';
export type * from './BranchEventsTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { BranchEventsEntityBase } from './BranchEventsEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class BranchEventsSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Custom(entopts?: Record<string, any>): CustomEntity;
    Standard(entopts?: Record<string, any>): StandardEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): BranchEventsSDK;
    tester(testopts?: any, sdkopts?: any): BranchEventsSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof BranchEventsSDK;
export { stdutil, config, BaseFeature, BranchEventsEntityBase, BranchEventsSDK, SDK, };
