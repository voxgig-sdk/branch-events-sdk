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
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('StandardEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when BRANCH_EVENTS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('BRANCH_EVENTS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.BranchEventsSDK.test();
        const ent = testsdk.Standard();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.BRANCH_EVENTS_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'standard.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "ascending_only": { "a": true, "h": "Ascending Only", "n": "ascending_only", "r": false, "t": "`$BOOLEAN`", "key$": "ascending_only", "index$": 0 }, "branch_key": { "a": true, "h": "Branch Key", "n": "branch_key", "r": true, "sh": "The Branch Key of the originating app obtained in your [Account Settings](https://help.branch.io/using-branch/docs/profile-settings)", "t": "`$STRING`", "key$": "branch_key", "index$": 1 }, "coarse_key": { "a": true, "h": "Coarse Key", "n": "coarse_key", "r": false, "t": "`$STRING`", "key$": "coarse_key", "index$": 2 }, "content_items": { "a": true, "h": "Content Items", "n": "content_items", "r": false, "t": "`$ARRAY`", "key$": "content_items", "index$": 3 }, "custom_data": { "a": true, "h": "Custom Data", "n": "custom_data", "r": false, "sh": "Additional custom key-value pairs that you want attached to the event.", "t": "`$OBJECT`", "key$": "custom_data", "index$": 4 }, "customer_event_alias": { "a": true, "h": "Customer Event Alias", "n": "customer_event_alias", "r": false, "sh": "The event alias as defined by you; used in addition to the event name defined above.", "t": "`$STRING`", "key$": "customer_event_alias", "index$": 5 }, "event_data": { "a": true, "h": "Event Data", "n": "event_data", "r": false, "t": "`$OBJECT`", "key$": "event_data", "index$": 6 }, "locked": { "a": true, "h": "Locked", "n": "locked", "r": false, "t": "`$BOOLEAN`", "key$": "locked", "index$": 7 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "sh": "The name of the event to log.", "t": "`$STRING`", "key$": "name", "index$": 8 }, "update_conversion_value": { "a": true, "h": "Update Conversion Value", "n": "update_conversion_value", "r": false, "t": "`$INTEGER`", "key$": "update_conversion_value", "index$": 9 }, "user_data": { "a": true, "h": "User Data", "n": "user_data", "r": true, "sh": "Information about the user and the device the event occurred on.", "t": "`$OBJECT`", "key$": "user_data", "index$": 10 } }, "name": "standard", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /event/standard", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "application/json", "k": "header", "n": "accept", "or": "accept", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "application/json", "k": "header", "n": "content_type", "or": "content_type", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "198.51.100.42", "k": "header", "n": "x_ip_override", "or": "x_ip_override", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/event/standard", "q": { "exist": ["accept", "content_type", "x_ip_override"] }, "r": {}, "s": [{ "lit": "event" }, { "lit": "standard" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "standard", "name__orig": "standard", "Name": "Standard", "name_": "standard", "name-": "standard", "NAME": "STANDARD", "index$": 1 }, { "active": true, "entity": "standard", "key$": "BasicStandardFlow", "kind": "basic", "name": "BasicStandardFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "standard_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'Standard', { "POST /event/standard": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "type": "object", "properties": { "branch_key": { "description": "The Branch Key of the originating app obtained in your [Account Settings](https://help.branch.io/using-branch/docs/profile-settings)", "type": "string", "example": "key_live_xxxx", "key$": "branch_key" }, "name": { "type": "string", "description": "The name of the event to log. Must be one of the following standard Branch Event names:\n  * Commerce:\n    * ADD_TO_CART\n    * ADD_TO_WISHLIST\n    * VIEW_CART\n    * INITIATE_PURCHASE\n    * ADD_PAYMENT_INFO\n    * CLICK_AD\n    * PURCHASE\n    * SPEND_CREDITS\n    * VIEW_AD\n  * Content:\n    * SEARCH\n    * VIEW_ITEM\n    * VIEW_ITEMS\n    * RATE\n    * SHARE\n    * INITIATE_STREAM\n    * COMPLETE_STREAM\n  * User Lifecycle:\n    * COMPLETE_REGISTRATION\n    * COMPLETE_TUTORIAL\n    * ACHIEVE_LEVEL\n    * UNLOCK_ACHIEVEMENT\n    * INVITE\n    * LOGIN\n    * START_TRIAL\n    * SUBSCRIBE\n", "enum": ["ADD_TO_CART", "ADD_TO_WISHLIST", "VIEW_CART", "INITIATE_PURCHASE", "ADD_PAYMENT_INFO", "CLICK_AD", "PURCHASE", "SPEND_CREDITS", "VIEW_AD", "SEARCH", "VIEW_ITEM", "VIEW_ITEMS", "RATE", "SHARE", "INITIATE_STREAM", "COMPLETE_STREAM", "COMPLETE_REGISTRATION", "COMPLETE_TUTORIAL", "ACHIEVE_LEVEL", "UNLOCK_ACHIEVEMENT", "INVITE", "LOGIN", "START_TRIAL", "SUBSCRIBE"], "example": "PURCHASE", "key$": "name" }, "customer_event_alias": { "type": "string", "description": "The event alias as defined by you; used in addition to the event name defined above.", "example": "my custom alias", "key$": "customer_event_alias" }, "user_data": { "type": "object", "description": "Information about the user and the device the event occurred on.\n\n**Required identifiers**: You must include at least one of the following in `user_data`:\n  * `developer_identity`, or\n  * `browser_fingerprint_id`, or\n  * `os=iOS` AND `idfa`, or\n  * `os=iOS` AND `idfv`, or\n  * `os=Android` AND `android_id`, or\n  * `os=Android` AND `aaid`\n", "properties": { "os": { "type": "string", "description": "One of the following operating system e.g. Android, iOS,MAC_OS,LINUX,WINDOWS etc.", "example": "Android" }, "os_version": { "type": "string", "description": "The version of the operating system. Strongly recommended for all paid traffic to ensure accurate attribution. **Required** for Facebook campaigns on iOS.\n", "example": "12.4.0" }, "environment": { "type": "string", "description": "usually FULL_APP", "example": "FULL_APP" }, "aaid": { "type": "string", "description": "The Android/Google advertising ID.", "example": "abcdabcd-0123-0123-00f0-000000000000" }, "android_id": { "type": "string", "description": "Android hardware ID", "example": "a12300000000" }, "idfa": { "type": "string", "description": "iOS advertising ID", "example": "00000000-0000-0000-0000-000000000001" }, "idfv": { "type": "string", "description": "iOS vendor ID", "example": "00000000-0000-0000-0000-000000000002" }, "anon_id": { "type": "string", "description": "The Facebook anonymous user ID. **Required** when running Facebook campaigns using Aggregated Event Measurement (AEM) on iOS.", "example": "fbanon_abc123def456" }, "advertising_ids": { "type": "object", "description": "Wrapper object for advertising identifiers. Use this in addition to the flat aaid, idfa, and idfv fields above to future-proof your integration for non-standard IDs (for example, OAID on Huawei devices). Additional advertising ID keys may be supported as new platforms emerge — contact Branch Support if you need to send an identifier that is not listed here.", "properties": { "oaid": {} } }, "google_analytics_id": { "type": "string", "description": "The Google Analytics client ID, useful for cross-platform stitching with Google Analytics. Include where applicable to improve attribution coverage and downstream analytics.", "example": "GA1.2.123456789.1234567890" }, "limit_ad_tracking": { "type": "boolean", "description": "true if the partner has opted to not be tracked by advertisers", "example": "false" }, "user_agent": { "type": "string", "description": "The user agent of the browser or app where the event occurred. Usually associated with a webview.", "example": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko)" }, "browser_fingerprint_id": { "type": "string", "description": "Branch internal-only field for tracking browsers.", "example": "857675855146829999" }, "http_origin": { "type": "string", "description": "The current page url where Web SDK logged web session start.", "example": "https://example.com/landing" }, "http_referrer": { "type": "string", "description": "The referral url that led to the current page where Web SDK logged web session start.", "example": "https://referrer.example.com/path" }, "developer_identity": { "type": "string", "description": "The developer-specified identity for a user.", "example": "user123" }, "country": { "type": "string", "description": "The country code of the user, usually based on device settings or user agent string.", "example": "US" }, "language": { "type": "string", "description": "The language code of the user, usually based on device settings or user agent string.", "example": "en" }, "ip": { "type": "string", "description": "The IP address for the device where the event occurred. Required if using the `X-IP-Override` request header.", "example": "198.51.100.42" }, "local_ip": { "type": "string", "description": "Android only - local ip of the device", "example": "192.0.2.1" }, "brand": { "type": "string", "description": "The brand of the device", "example": "LGE" }, "randomized_device_token": { "type": "string", "description": "Branch internal-only field for tracking devices.", "example": "857675855146829998" }, "app_version": { "type": "string", "description": "The app version downloaded by the user.", "example": "1.0.0" }, "model": { "type": "string", "description": "The model of the device.", "example": "Nexus 5X" }, "screen_dpi": { "type": "integer", "description": "The screen's DPI.", "example": "420" }, "screen_height": { "type": "integer", "description": "The screen's height.", "example": "1794" }, "screen_width": { "type": "integer", "description": "The screen's width.", "example": "1080" }, "dma_eea": { "type": "boolean", "description": "Whether European regulations, including the DMA, apply to this user and conversion. **Required** if EU regulations apply to this user. Failure to include user consent signals may result in attribution or campaign performance degradation.", "example": "true" }, "dma_ad_personalization": { "type": "boolean", "description": "Whether end user has granted or denied ads personalization consent. **Required** if `dma_eea` is set to `true` (i.e., EU regulations apply to this user). Failure to include user consent signals may result in attribution or campaign performance degradation.", "example": "true" }, "dma_ad_user_data": { "type": "boolean", "description": "Whether end user has granted or denied consent for 3P transmission of user level data for ads. **Required** if `dma_eea` is set to `true` (i.e., EU regulations apply to this user). Failure to include user consent signals may result in attribution or campaign performance degradation.", "example": "true" } }, "x-ref": "#/components/schemas/user_data_standard", "key$": "user_data" }, "custom_data": { "type": "object", "description": "Additional custom key-value pairs that you want attached to the event. Values may be of any JSON type. Attached to events retrieved via Exports and sent via Webhooks.", "additionalProperties": "true", "key$": "custom_data" }, "event_data": { "type": "object", "properties": { "transaction_id": { "type": "string", "description": "The partner-specified transaction id for their internal use", "example": "00000000" }, "revenue": { "type": "number", "description": "The partner-specified reported revenue for the event.", "example": "1.5" }, "currency": { "type": "string", "description": "Currency that revenue, price, shipping, tax were originally reported in by the partner", "example": "USD" }, "shipping": { "type": "number", "description": "Shipping cost associated with the transaction.", "example": "10.2" }, "tax": { "type": "number", "description": "Total tax associated with the transaction.", "example": "12.3" }, "coupon": { "type": "string", "description": "Transaction coupon redeemed with the transaction (e.g. \"SPRING2017\")", "example": "coupon" }, "affiliation": { "type": "string", "description": "Store or affiliation from which this transaction occurred (e.g. Google Store)", "example": "test_affiliation" }, "description": { "type": "string", "description": "Description associated with the event, not necessarily specific to any individual content items (see below)", "example": "Event_description" }, "search_query": { "type": "string", "description": "Additional search queries.", "example": "Test Search query" } }, "x-ref": "#/components/schemas/event_data_standard", "key$": "event_data" }, "content_items": { "type": "array", "items": { "type": "object", "properties": { "$content_schema": { "type": "string", "description": "Category / Schema for a piece of content.", "enum": [], "example": "COMMERCE_PRODUCT" }, "$og_title": { "type": "string", "description": "Commerce and Content Reports only. The title (for the individual content item).", "example": "My Content Title" }, "$og_image_url": { "type": "string", "description": "Commerce and Content Reports only. The image URL (for the individual content item).", "example": "valid URL" }, "$canonical_identifier": { "type": "string", "description": "Commerce and Content Reports only. Used to allow Branch to unify content/messages for Content Analytics", "example": "item12345" }, "$publicly_indexable": { "type": "boolean", "description": "Commerce and Content Reports only. true-  content can be seen by anyone. false- cannot index for public use", "example": "false" }, "$locally_indexable": { "type": "boolean", "description": "Commerce and Content Reports only. true- content can be indexed for local (device) use. false- cannot index for local use", "example": "true" }, "$price": { "type": "number", "description": "Commerce and Content Reports only. The price for the product/content.", "example": "23.2" }, "$quantity": { "type": "number", "description": "Commerce and Content Reports only. The quantity of the item to be ordered (for PURCHASE, ADD_TO_CART, etc).", "example": "2" }, "$sku": { "type": "string", "description": "Commerce and Content Reports only. The product sku or product ID.", "example": "1994320302" }, "$product_name": { "type": "string", "description": "Commerce and Content Reports only. The product's name.", "example": "my_product_name1" }, "$product_brand": { "type": "string", "description": "Commerce and Content Reports only. The product's brand.", "example": "my_prod_Brand1" }, "$product_category": { "type": "string", "description": "Commerce and Content Reports only. The product's category, if it's a product", "enum": [], "example": "BABY_AND_TODDLER" }, "$product_variant": { "type": "string", "description": "Commerce and Content Reports only. The product's variant (e.g. XL, red).", "example": "3T" }, "$rating_average": { "type": "number", "description": "Commerce and Content Reports only. The average rating of the item.", "example": "4.2" }, "$rating_count": { "type": "number", "description": "Commerce and Content Reports only. The number of ratings for the item.", "example": "5" }, "$rating_max": { "type": "number", "description": "Commerce and Content Reports only. The maximum possible rating for the item (e.g. 5.0 if 5 stars is highest possible rating).", "example": "5" }, "$creation_timestamp": { "type": "integer", "format": "int64", "description": "Commerce and Content Reports only. The time the content was created (Unix timestamp, typically in milliseconds).", "example": "1499892854966" }, "$exp_date": { "type": "integer", "format": "int64", "description": "Commerce and Content Reports only. The last time after which this content is no longer valid. null / 0 mean no limit. Should rarely be set.", "example": "0" }, "$keywords": { "type": "array", "description": "Commerce and Content Reports only. keywords", "items": {}, "example": [] }, "$address_street": { "type": "string", "description": "Commerce and Content Reports only. The street address for a restaurant, business, room (hotel), etc.", "example": "Street_name1" }, "$address_city": { "type": "string", "description": "Commerce and Content Reports only. The street address for a restaurant, business, room (hotel), etc.", "example": "city1" }, "$address_region": { "type": "string", "description": "Commerce and Content Reports only. The state or region for a restaurant, business, room (hotel), etc.", "example": "Region1" }, "$address_country": { "type": "string", "description": "Commerce and Content Reports only. The country code for a restaurant, business, room (hotel), etc.", "example": "Country1" }, "$address_postal_code": { "type": "string", "description": "Commerce and Content Reports only. The postal/zip code for a restaurant, business, room (hotel), etc.", "example": "postal_code" }, "$latitude": { "type": "number", "description": "Commerce and Content Reports only. The latitude for a restaurant, business, room (hotel), etc.", "example": "12.07" }, "$longitude": { "type": "number", "description": "Commerce and Content Reports only. The longitude for a restaurant, business, room (hotel), etc.", "example": "-97.5" }, "$image_captions": { "type": "array", "description": "Commerce and Content Reports only.  The captions associated with the image.", "items": {} }, "$condition": { "type": "string", "description": "Commerce and Content Reports only. For auctions, whether the item is new, good, acceptable, etc.", "enum": [] }, "$custom_fields": { "description": "Commerce and Content Reports only. key-value pairs that the app developer would like attached to the content item. Values may be of any JSON type. Attached to events that are retrieved via Exports and sent via Webhooks.", "type": "object", "additionalProperties": "true" } }, "x-ref": "#/components/schemas/content_items_standard" }, "key$": "content_items" } }, "required": ["branch_key", "name", "user_data"], "x-ref": "#/components/schemas/log_standard_request_body", "index$": 1 } } } }, "parameters": [{ "in": "header", "name": "Content-Type", "schema": { "type": "string", "example": "application/json" }, "required": "false", "description": "Recommended. The media type of the request body. Should be `application/json`.", "index$": 0 }, { "in": "header", "name": "Accept", "schema": { "type": "string", "example": "application/json" }, "required": "false", "description": "Recommended. The media type the client expects in the response. Should be `application/json`.", "index$": 1 }, { "in": "header", "name": "X-IP-Override", "schema": { "type": "string", "example": "198.51.100.42" }, "required": "false", "description": "Optional. Override the IP address Branch uses for the event (for example, when forwarding events server-to-server from your own backend).\n\n**Two requirements must be met for this header to function:**\n\n1. **Your app ID must be allowlisted by Branch.** The header is ignored until allowlisting is enabled. [Open a support request](https://support.branch.io/) to have your app ID allowlisted before sending this header in production.\n2. **You must also include `user_data.ip` in the request body** with the same IP value. Sending the header alone is not sufficient — the body field is what Branch persists for attribution.\n", "index$": 2 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const standard_ref01_ent = client.Standard();
        let standard_ref01_data = setup.data.new.standard['standard_ref01'];
        standard_ref01_data = (await standard_ref01_ent.create(standard_ref01_data)).data();
        (0, node_assert_1.default)(null != standard_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/standard/StandardTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.BranchEventsSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['standard01', 'standard02', 'standard03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'BRANCH_EVENTS_TEST_STANDARD_ENTID': idmap,
        'BRANCH_EVENTS_TEST_LIVE': 'FALSE',
        'BRANCH_EVENTS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['BRANCH_EVENTS_TEST_STANDARD_ENTID'];
    const live = 'TRUE' === env.BRANCH_EVENTS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['BRANCH_EVENTS_TEST_STANDARD_ENTID'];
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
//# sourceMappingURL=StandardEntity.test.js.map