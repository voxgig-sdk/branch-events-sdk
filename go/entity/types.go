// Typed models for the BranchEvents SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/branch-events-sdk/go/core"
)

// Custom is the typed data model for the custom entity.
type Custom struct {
}

// CustomCreateData is the typed request payload for Custom.CreateTyped.
type CustomCreateData struct {
	AscendingOnly *bool `json:"ascending_only,omitempty"`
	BranchKey string `json:"branch_key"`
	CoarseKey *string `json:"coarse_key,omitempty"`
	CustomData *map[string]any `json:"custom_data,omitempty"`
	EventData *map[string]any `json:"event_data,omitempty"`
	Locked *bool `json:"locked,omitempty"`
	MetaData *map[string]any `json:"meta_data,omitempty"`
	Name string `json:"name"`
	UpdateConversionValue *int `json:"update_conversion_value,omitempty"`
	UserData *map[string]any `json:"user_data,omitempty"`
}

// Standard is the typed data model for the standard entity.
type Standard struct {
}

// StandardCreateData is the typed request payload for Standard.CreateTyped.
type StandardCreateData struct {
	AscendingOnly *bool `json:"ascending_only,omitempty"`
	BranchKey string `json:"branch_key"`
	CoarseKey *string `json:"coarse_key,omitempty"`
	ContentItems *[]any `json:"content_items,omitempty"`
	CustomData *map[string]any `json:"custom_data,omitempty"`
	CustomerEventAlias *string `json:"customer_event_alias,omitempty"`
	EventData *map[string]any `json:"event_data,omitempty"`
	Locked *bool `json:"locked,omitempty"`
	Name string `json:"name"`
	UpdateConversionValue *int `json:"update_conversion_value,omitempty"`
	UserData map[string]any `json:"user_data"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
