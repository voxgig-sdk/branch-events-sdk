"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const DebugFeature_1 = require("./feature/debug/DebugFeature");
const IdempotencyFeature_1 = require("./feature/idempotency/IdempotencyFeature");
const MetricsFeature_1 = require("./feature/metrics/MetricsFeature");
const PagingFeature_1 = require("./feature/paging/PagingFeature");
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    debug: DebugFeature_1.DebugFeature,
    idempotency: IdempotencyFeature_1.IdempotencyFeature,
    metrics: MetricsFeature_1.MetricsFeature,
    paging: PagingFeature_1.PagingFeature,
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'BranchEvents',
        slug: "branch-events",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        debug: {
            "options": {
                "active": false,
                "max": 100,
                "redact": [
                    "authorization",
                    "cookie",
                    "set-cookie",
                    "api-key",
                    "apikey",
                    "x-api-key",
                    "idempotency-key"
                ]
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "onEntry": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "none"
        },
        idempotency: {
            "options": {
                "active": false,
                "header": "Idempotency-Key",
                "methods": [
                    "POST",
                    "PUT",
                    "PATCH",
                    "DELETE"
                ],
                "ops": [
                    "create",
                    "update",
                    "remove"
                ]
            },
            "optspec": {
                "keygen": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "none"
        },
        metrics: {
            "options": {
                "active": false
            },
            "optspec": {
                "now": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "none"
        },
        paging: {
            "options": {
                "active": false,
                "afterVar": "after",
                "cursorParam": "cursor",
                "firstVar": "first",
                "limitParam": "limit",
                "pageParam": "page",
                "startPage": 1
            },
            "optspec": {
                "limit": "`$NUMBER`",
                "ops": "`$LIST`"
            },
            "strict": false,
            "transport": "none"
        },
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://api2.branch.io/v2",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            custom: {},
            standard: {},
        }
    };
    entity = {
        "custom": {
            "fields": [
                {
                    "name": "ascending_only",
                    "title": "Ascending Only",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "branch_key",
                    "title": "Branch Key",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The Branch Key of the originating app obtained in your [Account Settings](https://help.branch.io/using-branch/docs/profile-settings)"
                },
                {
                    "name": "coarse_key",
                    "title": "Coarse Key",
                    "type": "`$STRING`"
                },
                {
                    "name": "custom_data",
                    "title": "Custom Data",
                    "type": "`$OBJECT`",
                    "short": "Additional custom key-value pairs that you want attached to the event."
                },
                {
                    "name": "event_data",
                    "title": "Event Data",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "locked",
                    "title": "Locked",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "meta_data",
                    "title": "Meta Data",
                    "type": "`$OBJECT`",
                    "short": "Additional metadata for the event."
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The name of the event to log."
                },
                {
                    "name": "update_conversion_value",
                    "title": "Update Conversion Value",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "user_data",
                    "title": "User Data",
                    "type": "`$OBJECT`",
                    "short": "Information about the user and the device the event occurred on."
                }
            ],
            "name": "custom",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/event/custom",
                            "segments": [
                                {
                                    "lit": "event"
                                },
                                {
                                    "lit": "custom"
                                }
                            ],
                            "parts": [
                                "event",
                                "custom"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "accept",
                                        "orig": "accept",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true,
                                        "example": "application/json"
                                    },
                                    {
                                        "name": "content_type",
                                        "orig": "content_type",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true,
                                        "example": "application/json"
                                    },
                                    {
                                        "name": "x_ip_override",
                                        "orig": "x_ip_override",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true,
                                        "example": "198.51.100.42"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "accept",
                                    "content_type",
                                    "x_ip_override"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "standard": {
            "fields": [
                {
                    "name": "ascending_only",
                    "title": "Ascending Only",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "branch_key",
                    "title": "Branch Key",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The Branch Key of the originating app obtained in your [Account Settings](https://help.branch.io/using-branch/docs/profile-settings)"
                },
                {
                    "name": "coarse_key",
                    "title": "Coarse Key",
                    "type": "`$STRING`"
                },
                {
                    "name": "content_items",
                    "title": "Content Items",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "custom_data",
                    "title": "Custom Data",
                    "type": "`$OBJECT`",
                    "short": "Additional custom key-value pairs that you want attached to the event."
                },
                {
                    "name": "customer_event_alias",
                    "title": "Customer Event Alias",
                    "type": "`$STRING`",
                    "short": "The event alias as defined by you; used in addition to the event name defined above."
                },
                {
                    "name": "event_data",
                    "title": "Event Data",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "locked",
                    "title": "Locked",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The name of the event to log."
                },
                {
                    "name": "update_conversion_value",
                    "title": "Update Conversion Value",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "user_data",
                    "title": "User Data",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "Information about the user and the device the event occurred on."
                }
            ],
            "name": "standard",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/event/standard",
                            "segments": [
                                {
                                    "lit": "event"
                                },
                                {
                                    "lit": "standard"
                                }
                            ],
                            "parts": [
                                "event",
                                "standard"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "accept",
                                        "orig": "accept",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true,
                                        "example": "application/json"
                                    },
                                    {
                                        "name": "content_type",
                                        "orig": "content_type",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true,
                                        "example": "application/json"
                                    },
                                    {
                                        "name": "x_ip_override",
                                        "orig": "x_ip_override",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true,
                                        "example": "198.51.100.42"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "accept",
                                    "content_type",
                                    "x_ip_override"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map