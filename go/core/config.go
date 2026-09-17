package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "BranchEvents",
			"slug": "branch-events",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"debug": map[string]any{
				"options": map[string]any{
					"active": false,
					"max": 100,
					"redact": []any{
						"authorization",
						"cookie",
						"set-cookie",
						"api-key",
						"apikey",
						"x-api-key",
						"idempotency-key",
					},
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"onEntry": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"idempotency": map[string]any{
				"options": map[string]any{
					"active": false,
					"header": "Idempotency-Key",
					"methods": []any{
						"POST",
						"PUT",
						"PATCH",
						"DELETE",
					},
					"ops": []any{
						"create",
						"update",
						"remove",
					},
				},
				"optspec": map[string]any{
					"keygen": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"metrics": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"paging": map[string]any{
				"options": map[string]any{
					"active": false,
					"afterVar": "after",
					"cursorParam": "cursor",
					"firstVar": "first",
					"limitParam": "limit",
					"pageParam": "page",
					"startPage": 1,
				},
				"optspec": map[string]any{
					"limit": "`$NUMBER`",
					"ops": "`$LIST`",
				},
				"strict": false,
				"transport": "none",
			},
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://api2.branch.io/v2",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"custom": map[string]any{},
				"standard": map[string]any{},
			},
		},
		"entity": map[string]any{
			"custom": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "ascending_only",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "branch_key",
						"req": true,
						"short": "The Branch Key of the originating app obtained in your [Account Settings](https://help.branch.io/using-branch/docs/profile-settings)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "coarse_key",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "custom_data",
						"short": "Additional custom key-value pairs that you want attached to the event.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "event_data",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "locked",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "meta_data",
						"short": "Additional metadata for the event.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"short": "The name of the event to log.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "update_conversion_value",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "user_data",
						"short": "Information about the user and the device the event occurred on.",
						"type": "`$OBJECT`",
					},
				},
				"name": "custom",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"example": "application/json",
											"kind": "header",
											"name": "accept",
											"orig": "accept",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "application/json",
											"kind": "header",
											"name": "content_type",
											"orig": "content_type",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "198.51.100.42",
											"kind": "header",
											"name": "x_ip_override",
											"orig": "x_ip_override",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/event/custom",
								"segments": []any{
									map[string]any{
										"lit": "event",
									},
									map[string]any{
										"lit": "custom",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"accept",
										"content_type",
										"x_ip_override",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"event",
									"custom",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"standard": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "ascending_only",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "branch_key",
						"req": true,
						"short": "The Branch Key of the originating app obtained in your [Account Settings](https://help.branch.io/using-branch/docs/profile-settings)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "coarse_key",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "content_items",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "custom_data",
						"short": "Additional custom key-value pairs that you want attached to the event.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "customer_event_alias",
						"short": "The event alias as defined by you; used in addition to the event name defined above.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "event_data",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "locked",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"short": "The name of the event to log.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "update_conversion_value",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "user_data",
						"req": true,
						"short": "Information about the user and the device the event occurred on.",
						"type": "`$OBJECT`",
					},
				},
				"name": "standard",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"example": "application/json",
											"kind": "header",
											"name": "accept",
											"orig": "accept",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "application/json",
											"kind": "header",
											"name": "content_type",
											"orig": "content_type",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "198.51.100.42",
											"kind": "header",
											"name": "x_ip_override",
											"orig": "x_ip_override",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/event/standard",
								"segments": []any{
									map[string]any{
										"lit": "event",
									},
									map[string]any{
										"lit": "standard",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"accept",
										"content_type",
										"x_ip_override",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"event",
									"standard",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "debug":
		if NewDebugFeatureFunc != nil {
			return NewDebugFeatureFunc()
		}
	case "idempotency":
		if NewIdempotencyFeatureFunc != nil {
			return NewIdempotencyFeatureFunc()
		}
	case "metrics":
		if NewMetricsFeatureFunc != nil {
			return NewMetricsFeatureFunc()
		}
	case "paging":
		if NewPagingFeatureFunc != nil {
			return NewPagingFeatureFunc()
		}
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
