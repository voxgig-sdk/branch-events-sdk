"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('CustomEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when BRANCH_EVENTS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('BRANCH_EVENTS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.BranchEventsSDK.test();
        const ent = testsdk.Custom();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.BRANCH_EVENTS_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'custom.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "ascending_only", "req": false, "type": "`$BOOLEAN`", "index$": 0 }, { "active": true, "name": "branch_key", "req": true, "short": "The Branch Key of the originating app obtained in your [Account Settings](https://help.branch.io/using-branch/docs/profile-settings)", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "coarse_key", "req": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "custom_data", "req": false, "short": "Additional custom key-value pairs that you want attached to the event.", "type": "`$OBJECT`", "index$": 3 }, { "active": true, "name": "event_data", "req": false, "type": "`$OBJECT`", "index$": 4 }, { "active": true, "name": "locked", "req": false, "type": "`$BOOLEAN`", "index$": 5 }, { "active": true, "name": "meta_data", "req": false, "short": "Additional metadata for the event.", "type": "`$OBJECT`", "index$": 6 }, { "active": true, "name": "name", "req": true, "short": "The name of the event to log.", "type": "`$STRING`", "index$": 7 }, { "active": true, "name": "update_conversion_value", "req": false, "type": "`$INTEGER`", "index$": 8 }, { "active": true, "name": "user_data", "req": false, "short": "Information about the user and the device the event occurred on.", "type": "`$OBJECT`", "index$": 9 }], "name": "custom", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": { "header": [{ "active": true, "example": "application/json", "kind": "header", "name": "accept", "orig": "accept", "reqd": true, "type": "`$STRING`" }, { "active": true, "example": "application/json", "kind": "header", "name": "content_type", "orig": "content_type", "reqd": true, "type": "`$STRING`" }, { "active": true, "example": "198.51.100.42", "kind": "header", "name": "x_ip_override", "orig": "x_ip_override", "reqd": true, "type": "`$STRING`" }] }, "contract": { "id": "POST /event/custom", "json": "{\"operationId\":\"logCustomEvents\",\"parameters\":[{\"description\":\"Recommended. The media type of the request body. Should be `application/json`.\",\"in\":\"header\",\"name\":\"Content-Type\",\"required\":\"false\",\"schema\":{\"example\":\"application/json\",\"type\":\"string\"}},{\"description\":\"Recommended. The media type the client expects in the response. Should be `application/json`.\",\"in\":\"header\",\"name\":\"Accept\",\"required\":\"false\",\"schema\":{\"example\":\"application/json\",\"type\":\"string\"}},{\"description\":\"Optional. Override the IP address Branch uses for the event (for example, when forwarding events server-to-server from your own backend).\\n\\n**Two requirements must be met for this header to function:**\\n\\n1. **Your app ID must be allowlisted by Branch.** The header is ignored until allowlisting is enabled. [Open a support request](https://support.branch.io/) to have your app ID allowlisted before sending this header in production.\\n2. **You must also include `user_data.ip` in the request body** with the same IP value. Sending the header alone is not sufficient — the body field is what Branch persists for attribution.\\n\",\"in\":\"header\",\"name\":\"X-IP-Override\",\"required\":\"false\",\"schema\":{\"example\":\"198.51.100.42\",\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"branch_key\":{\"description\":\"The Branch Key of the originating app obtained in your [Account Settings](https://help.branch.io/using-branch/docs/profile-settings)\",\"example\":\"key_live_xxxx\",\"type\":\"string\"},\"custom_data\":{\"additionalProperties\":\"true\",\"description\":\"Additional custom key-value pairs that you want attached to the event. Values may be of any JSON type. Attached to events retrieved via Exports and sent via Webhooks.\",\"type\":\"object\"},\"event_data\":{\"properties\":{\"affiliation\":{\"description\":\"Store or affiliation from which this transaction occurred (e.g. Google Store)\",\"example\":\"test_affiliation\",\"type\":\"string\"},\"coupon\":{\"description\":\"Transaction coupon redeemed with the transaction (e.g. \\\"SPRING2017\\\")\",\"example\":\"coupon\",\"type\":\"string\"},\"currency\":{\"description\":\"Currency that revenue, price, shipping, tax were originally reported in by the partner\",\"example\":\"USD\",\"type\":\"string\"},\"description\":{\"description\":\"Description associated with the event, not necessarily specific to any individual content items (see below)\",\"example\":\"Event_description\",\"type\":\"string\"},\"revenue\":{\"description\":\"The partner-specified reported revenue for the event.\",\"example\":\"1.5\",\"type\":\"number\"},\"search_query\":{\"description\":\"Additional search queries.\",\"example\":\"Test Search query\",\"type\":\"string\"},\"shipping\":{\"description\":\"Shipping cost associated with the transaction.\",\"example\":\"10.2\",\"type\":\"number\"},\"tax\":{\"description\":\"Total tax associated with the transaction.\",\"example\":\"12.3\",\"type\":\"number\"},\"transaction_id\":{\"description\":\"The partner-specified transaction id for their internal use\",\"example\":\"00000000\",\"type\":\"string\"}},\"type\":\"object\"},\"meta_data\":{\"additionalProperties\":\"true\",\"description\":\"Additional metadata for the event.\",\"type\":\"object\"},\"name\":{\"description\":\"The name of the event to log. Can be a string of custom event name. For instance \\\"picture swiped\\\".\\n\",\"example\":\"CustomEventTest\",\"type\":\"string\"},\"user_data\":{\"description\":\"Information about the user and the device the event occurred on.\\n\\n**Required identifiers**: You must include at least one of the following in `user_data`:\\n  * `developer_identity`, or\\n  * `browser_fingerprint_id`, or\\n  * `os=iOS` AND `idfa`, or\\n  * `os=iOS` AND `idfv`, or\\n  * `os=Android` AND `android_id`, or\\n  * `os=Android` AND `aaid`\\n\",\"properties\":{\"aaid\":{\"description\":\"The Android/Google advertising ID.\",\"example\":\"abcdabcd-0123-0123-00f0-000000000000\",\"type\":\"string\"},\"advertising_ids\":{\"description\":\"Wrapper object for advertising identifiers. Use this in addition to the flat aaid, idfa, and idfv fields above to future-proof your integration for non-standard IDs (for example, OAID on Huawei devices). Additional advertising ID keys may be supported as new platforms emerge — contact Branch Support if you need to send an identifier that is not listed here.\",\"properties\":{\"oaid\":{\"description\":\"Open Advertising ID, used on Huawei devices and other Android devices without Google Play Services.\",\"example\":\"00aa00a0-0000-0a00-a000-aaa0000a0aaa\",\"type\":\"string\"}},\"type\":\"object\"},\"android_id\":{\"description\":\"Android hardware ID\",\"example\":\"a12300000000\",\"type\":\"string\"},\"anon_id\":{\"description\":\"The Facebook anonymous user ID. **Required** when running Facebook campaigns using Aggregated Event Measurement (AEM) on iOS.\",\"example\":\"fbanon_abc123def456\",\"type\":\"string\"},\"app_version\":{\"description\":\"The app version downloaded by the user.\",\"example\":\"1.0.0\",\"type\":\"string\"},\"brand\":{\"description\":\"The brand of the device\",\"example\":\"LGE\",\"type\":\"string\"},\"browser_fingerprint_id\":{\"description\":\"Branch internal-only field for tracking browsers.\",\"example\":\"857675855146829999\",\"type\":\"string\"},\"country\":{\"description\":\"The country code of the user, usually based on device settings or user agent string.\",\"example\":\"US\",\"type\":\"string\"},\"developer_identity\":{\"description\":\"The developer-specified identity for a user.\",\"example\":\"user123\",\"type\":\"string\"},\"dma_ad_personalization\":{\"description\":\"Whether end user has granted or denied ads personalization consent. **Required** if `dma_eea` is set to `true` (i.e., EU regulations apply to this user). Failure to include user consent signals may result in attribution or campaign performance degradation.\",\"example\":\"true\",\"type\":\"boolean\"},\"dma_ad_user_data\":{\"description\":\"Whether end user has granted or denied consent for 3P transmission of user level data for ads. **Required** if `dma_eea` is set to `true` (i.e., EU regulations apply to this user). Failure to include user consent signals may result in attribution or campaign performance degradation.\",\"example\":\"true\",\"type\":\"boolean\"},\"dma_eea\":{\"description\":\"Whether European regulations, including the DMA, apply to this user and conversion. **Required** if EU regulations apply to this user. Failure to include user consent signals may result in attribution or campaign performance degradation.\",\"example\":\"true\",\"type\":\"boolean\"},\"environment\":{\"description\":\"usually FULL_APP\",\"example\":\"FULL_APP\",\"type\":\"string\"},\"google_analytics_id\":{\"description\":\"The Google Analytics client ID, useful for cross-platform stitching with Google Analytics. Include where applicable to improve attribution coverage and downstream analytics.\",\"example\":\"GA1.2.123456789.1234567890\",\"type\":\"string\"},\"http_origin\":{\"description\":\"The current page url where Web SDK logged web session start.\",\"example\":\"https://example.com/landing\",\"type\":\"string\"},\"http_referrer\":{\"description\":\"The referral url that led to the current page where Web SDK logged web session start.\",\"example\":\"https://referrer.example.com/path\",\"type\":\"string\"},\"idfa\":{\"description\":\"iOS advertising ID\",\"example\":\"00000000-0000-0000-0000-000000000001\",\"type\":\"string\"},\"idfv\":{\"description\":\"iOS vendor ID\",\"example\":\"00000000-0000-0000-0000-000000000002\",\"type\":\"string\"},\"ip\":{\"description\":\"The IP address for the device where the event occurred. Required if using the `X-IP-Override` request header.\",\"example\":\"198.51.100.42\",\"type\":\"string\"},\"language\":{\"description\":\"The language code of the user, usually based on device settings or user agent string.\",\"example\":\"en\",\"type\":\"string\"},\"limit_ad_tracking\":{\"description\":\"true if the partner has opted to not be tracked by advertisers\",\"example\":\"false\",\"type\":\"boolean\"},\"local_ip\":{\"description\":\"Android only - local ip of the device\",\"example\":\"192.0.2.1\",\"type\":\"string\"},\"model\":{\"description\":\"The model of the device.\",\"example\":\"Nexus 5X\",\"type\":\"string\"},\"os\":{\"description\":\"One of the following operating system e.g. Android, iOS,MAC_OS,LINUX,WINDOWS etc.\",\"example\":\"Android\",\"type\":\"string\"},\"os_version\":{\"description\":\"The version of the operating system. Strongly recommended for all paid traffic to ensure accurate attribution. **Required** for Facebook campaigns on iOS.\\n\",\"example\":\"12.4.0\",\"type\":\"string\"},\"randomized_device_token\":{\"description\":\"Branch internal-only field for tracking devices.\",\"example\":\"857675855146829998\",\"type\":\"string\"},\"screen_dpi\":{\"description\":\"The screen's DPI.\",\"example\":\"420\",\"type\":\"integer\"},\"screen_height\":{\"description\":\"The screen's height.\",\"example\":\"1794\",\"type\":\"integer\"},\"screen_width\":{\"description\":\"The screen's width.\",\"example\":\"1080\",\"type\":\"integer\"},\"user_agent\":{\"description\":\"The user agent of the browser or app where the event occurred. Usually associated with a webview.\",\"example\":\"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko)\",\"type\":\"string\"}},\"type\":\"object\"}},\"required\":[\"branch_key\",\"name\"],\"type\":\"object\"}}}},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Successful event ingestion. The response carries SKAdNetwork-relevant fields that the app can use to update its native SKAN conversion value.\",\"properties\":{\"ascending_only\":{\"example\":\"false\",\"type\":\"boolean\"},\"coarse_key\":{\"example\":\"high\",\"type\":\"string\"},\"locked\":{\"example\":\"false\",\"type\":\"boolean\"},\"update_conversion_value\":{\"example\":\"3\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Ok\"},\"400\":{\"content\":{\"application/json\":{\"examples\":{\"Result\":{\"value\":\"{\\n    \\\"error\\\": {\\n        \\\"message\\\": \\\"Authentication failed !\\\",\\n        \\\"code\\\": 400\\n    }\\n}\"}},\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"example\":\"400\",\"type\":\"integer\"},\"message\":{\"example\":\"Authentication failed !\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Authentication Failed\"},\"429\":{\"content\":{\"application/json\":{\"examples\":{\"Result\":{\"value\":\"{\\n    \\\"error\\\": {\\n        \\\"code\\\": 429,\\n        \\\"message\\\": \\\"Rate limit reached.\\\"\\n    }\\n}\"}},\"schema\":{\"properties\":{\"$ref\":\"#/responses/400/content/application~1json/schema/properties\"},\"type\":\"object\"}}},\"description\":\"Rate Limit Reached\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/event/custom", "segments": [{ "lit": "event" }, { "lit": "custom" }], "select": { "exist": ["accept", "content_type", "x_ip_override"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "custom", "name__orig": "custom", "Name": "Custom", "name_": "custom", "name-": "custom", "NAME": "CUSTOM", "index$": 0 }, { "active": true, "entity": "custom", "key$": "BasicCustomFlow", "kind": "basic", "name": "BasicCustomFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "custom_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }] }, 'Custom');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const custom_ref01_ent = client.Custom();
        let custom_ref01_data = setup.data.new.custom['custom_ref01'];
        custom_ref01_data = (await custom_ref01_ent.create(custom_ref01_data)).data();
        (0, node_assert_1.default)(null != custom_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/custom/CustomTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.BranchEventsSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['custom01', 'custom02', 'custom03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'BRANCH_EVENTS_TEST_CUSTOM_ENTID': idmap,
        'BRANCH_EVENTS_TEST_LIVE': 'FALSE',
        'BRANCH_EVENTS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['BRANCH_EVENTS_TEST_CUSTOM_ENTID'];
    const live = 'TRUE' === env.BRANCH_EVENTS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['BRANCH_EVENTS_TEST_CUSTOM_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.BranchEventsSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.BRANCH_EVENTS_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=CustomEntity.test.js.map