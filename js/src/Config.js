
const { BaseFeature } = require('./feature/base/BaseFeature')
const { DebugFeature } = require('./feature/debug/DebugFeature')
const { IdempotencyFeature } = require('./feature/idempotency/IdempotencyFeature')
const { MetricsFeature } = require('./feature/metrics/MetricsFeature')
const { PagingFeature } = require('./feature/paging/PagingFeature')
const { RatelimitFeature } = require('./feature/ratelimit/RatelimitFeature')
const { RetryFeature } = require('./feature/retry/RetryFeature')
const { TestFeature } = require('./feature/test/TestFeature')
const { TimeoutFeature } = require('./feature/timeout/TimeoutFeature')



const FEATURE_CLASS = {
   debug: DebugFeature,
 idempotency: IdempotencyFeature,
 metrics: MetricsFeature,
 paging: PagingFeature,
 ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named requires above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
//
// Read by SecretsFeature through a DEFERRED require of this module: the
// requires above make the pair circular, and this file replaces
// module.exports at the end of its body, so anything reading the map at
// module load would get undefined. See tm/js/src/feature/secrets.
const FEATURE_PLUGINS = {
  
}


class Config {

  makeFeature(fn) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(fn) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'BranchEvents',
        slug: "branch-events",
    version: "0.0.1",
    target: "js",

  }


  feature = {
     debug:     {
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
 idempotency:     {
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
 metrics:     {
      "options": {
        "active": false
      },
      "optspec": {
        "now": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "none"
    },
 paging:     {
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
 ratelimit:     {
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
 retry:     {
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
 test:     {
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
 timeout:     {
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

  }


  options = {
    base: "https://api2.branch.io/v2",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        custom: {
        },
  
        standard: {
        },
  
    }
  }


  entity = {
    "custom": {
      "fields": [
        {
          "name": "ascending_only",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "branch_key",
          "req": true,
          "short": "The Branch Key of the originating app obtained in your [Account Settings](https://help.branch.io/using-branch/docs/profile-settings)",
          "type": "`$STRING`"
        },
        {
          "name": "coarse_key",
          "type": "`$STRING`"
        },
        {
          "name": "custom_data",
          "short": "Additional custom key-value pairs that you want attached to the event.",
          "type": "`$OBJECT`"
        },
        {
          "name": "event_data",
          "type": "`$OBJECT`"
        },
        {
          "name": "locked",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "meta_data",
          "short": "Additional metadata for the event.",
          "type": "`$OBJECT`"
        },
        {
          "name": "name",
          "req": true,
          "short": "The name of the event to log.",
          "type": "`$STRING`"
        },
        {
          "name": "update_conversion_value",
          "type": "`$INTEGER`"
        },
        {
          "name": "user_data",
          "short": "Information about the user and the device the event occurred on.",
          "type": "`$OBJECT`"
        }
      ],
      "name": "custom",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {
                "header": [
                  {
                    "example": "application/json",
                    "kind": "header",
                    "name": "accept",
                    "orig": "accept",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "example": "application/json",
                    "kind": "header",
                    "name": "content_type",
                    "orig": "content_type",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "example": "198.51.100.42",
                    "kind": "header",
                    "name": "x_ip_override",
                    "orig": "x_ip_override",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
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
              "select": {
                "exist": [
                  "accept",
                  "content_type",
                  "x_ip_override"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "event",
                "custom"
              ]
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
          "type": "`$BOOLEAN`"
        },
        {
          "name": "branch_key",
          "req": true,
          "short": "The Branch Key of the originating app obtained in your [Account Settings](https://help.branch.io/using-branch/docs/profile-settings)",
          "type": "`$STRING`"
        },
        {
          "name": "coarse_key",
          "type": "`$STRING`"
        },
        {
          "name": "content_items",
          "type": "`$ARRAY`"
        },
        {
          "name": "custom_data",
          "short": "Additional custom key-value pairs that you want attached to the event.",
          "type": "`$OBJECT`"
        },
        {
          "name": "customer_event_alias",
          "short": "The event alias as defined by you; used in addition to the event name defined above.",
          "type": "`$STRING`"
        },
        {
          "name": "event_data",
          "type": "`$OBJECT`"
        },
        {
          "name": "locked",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "name",
          "req": true,
          "short": "The name of the event to log.",
          "type": "`$STRING`"
        },
        {
          "name": "update_conversion_value",
          "type": "`$INTEGER`"
        },
        {
          "name": "user_data",
          "req": true,
          "short": "Information about the user and the device the event occurred on.",
          "type": "`$OBJECT`"
        }
      ],
      "name": "standard",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {
                "header": [
                  {
                    "example": "application/json",
                    "kind": "header",
                    "name": "accept",
                    "orig": "accept",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "example": "application/json",
                    "kind": "header",
                    "name": "content_type",
                    "orig": "content_type",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "example": "198.51.100.42",
                    "kind": "header",
                    "name": "x_ip_override",
                    "orig": "x_ip_override",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
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
              "select": {
                "exist": [
                  "accept",
                  "content_type",
                  "x_ip_override"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "event",
                "standard"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

module.exports = {
  config,
  FEATURE_PLUGINS,
}

