// Typed models for the BranchEvents SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Custom {
  ascending_only?: boolean
  branch_key: string
  coarse_key?: string
  custom_data?: Record<string, any>
  event_data?: Record<string, any>
  locked?: boolean
  meta_data?: Record<string, any>
  name: string
  update_conversion_value?: number
  user_data?: Record<string, any>
}

export interface CustomCreateData {
  ascending_only?: boolean
  branch_key: string
  coarse_key?: string
  custom_data?: Record<string, any>
  event_data?: Record<string, any>
  locked?: boolean
  meta_data?: Record<string, any>
  name: string
  update_conversion_value?: number
  user_data?: Record<string, any>
}

export interface Standard {
  ascending_only?: boolean
  branch_key: string
  coarse_key?: string
  content_items?: any[]
  custom_data?: Record<string, any>
  customer_event_alias?: string
  event_data?: Record<string, any>
  locked?: boolean
  name: string
  update_conversion_value?: number
  user_data: Record<string, any>
}

export interface StandardCreateData {
  ascending_only?: boolean
  branch_key: string
  coarse_key?: string
  content_items?: any[]
  custom_data?: Record<string, any>
  customer_event_alias?: string
  event_data?: Record<string, any>
  locked?: boolean
  name: string
  update_conversion_value?: number
  user_data: Record<string, any>
}

