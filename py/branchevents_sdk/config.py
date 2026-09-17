# BranchEvents SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "BranchEvents",
            "slug": "branch-events",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "debug": {
        "options": {
          "active": False,
          "max": 100,
          "redact": [
            "authorization",
            "cookie",
            "set-cookie",
            "api-key",
            "apikey",
            "x-api-key",
            "idempotency-key",
          ],
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "onEntry": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "idempotency": {
        "options": {
          "active": False,
          "header": "Idempotency-Key",
          "methods": [
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
          ],
          "ops": [
            "create",
            "update",
            "remove",
          ],
        },
        "optspec": {
          "keygen": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "metrics": {
        "options": {
          "active": False,
        },
        "optspec": {
          "now": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "paging": {
        "options": {
          "active": False,
          "afterVar": "after",
          "cursorParam": "cursor",
          "firstVar": "first",
          "limitParam": "limit",
          "pageParam": "page",
          "startPage": 1,
        },
        "optspec": {
          "limit": "`$NUMBER`",
          "ops": "`$LIST`",
        },
        "strict": False,
        "transport": "none",
      },
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://api2.branch.io/v2",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "custom": {},
                "standard": {},
            },
        },
        "entity": {
      "custom": {
        "fields": [
          {
            "name": "ascending_only",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "branch_key",
            "req": True,
            "short": "The Branch Key of the originating app obtained in your [Account Settings](https://help.branch.io/using-branch/docs/profile-settings)",
            "type": "`$STRING`",
          },
          {
            "name": "coarse_key",
            "type": "`$STRING`",
          },
          {
            "name": "custom_data",
            "short": "Additional custom key-value pairs that you want attached to the event.",
            "type": "`$OBJECT`",
          },
          {
            "name": "event_data",
            "type": "`$OBJECT`",
          },
          {
            "name": "locked",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "meta_data",
            "short": "Additional metadata for the event.",
            "type": "`$OBJECT`",
          },
          {
            "name": "name",
            "req": True,
            "short": "The name of the event to log.",
            "type": "`$STRING`",
          },
          {
            "name": "update_conversion_value",
            "type": "`$INTEGER`",
          },
          {
            "name": "user_data",
            "short": "Information about the user and the device the event occurred on.",
            "type": "`$OBJECT`",
          },
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": "application/json",
                      "kind": "header",
                      "name": "content_type",
                      "orig": "content_type",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": "198.51.100.42",
                      "kind": "header",
                      "name": "x_ip_override",
                      "orig": "x_ip_override",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/event/custom",
                "segments": [
                  {
                    "lit": "event",
                  },
                  {
                    "lit": "custom",
                  },
                ],
                "select": {
                  "exist": [
                    "accept",
                    "content_type",
                    "x_ip_override",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "event",
                  "custom",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "standard": {
        "fields": [
          {
            "name": "ascending_only",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "branch_key",
            "req": True,
            "short": "The Branch Key of the originating app obtained in your [Account Settings](https://help.branch.io/using-branch/docs/profile-settings)",
            "type": "`$STRING`",
          },
          {
            "name": "coarse_key",
            "type": "`$STRING`",
          },
          {
            "name": "content_items",
            "type": "`$ARRAY`",
          },
          {
            "name": "custom_data",
            "short": "Additional custom key-value pairs that you want attached to the event.",
            "type": "`$OBJECT`",
          },
          {
            "name": "customer_event_alias",
            "short": "The event alias as defined by you; used in addition to the event name defined above.",
            "type": "`$STRING`",
          },
          {
            "name": "event_data",
            "type": "`$OBJECT`",
          },
          {
            "name": "locked",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "name",
            "req": True,
            "short": "The name of the event to log.",
            "type": "`$STRING`",
          },
          {
            "name": "update_conversion_value",
            "type": "`$INTEGER`",
          },
          {
            "name": "user_data",
            "req": True,
            "short": "Information about the user and the device the event occurred on.",
            "type": "`$OBJECT`",
          },
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": "application/json",
                      "kind": "header",
                      "name": "content_type",
                      "orig": "content_type",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": "198.51.100.42",
                      "kind": "header",
                      "name": "x_ip_override",
                      "orig": "x_ip_override",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/event/standard",
                "segments": [
                  {
                    "lit": "event",
                  },
                  {
                    "lit": "standard",
                  },
                ],
                "select": {
                  "exist": [
                    "accept",
                    "content_type",
                    "x_ip_override",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "event",
                  "standard",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
