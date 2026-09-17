-- Typed models for the BranchEvents SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Custom
---@field ascending_only? boolean
---@field branch_key string
---@field coarse_key? string
---@field custom_data? table
---@field event_data? table
---@field locked? boolean
---@field meta_data? table
---@field name string
---@field update_conversion_value? number
---@field user_data? table

---@class CustomCreateData
---@field ascending_only? boolean
---@field branch_key string
---@field coarse_key? string
---@field custom_data? table
---@field event_data? table
---@field locked? boolean
---@field meta_data? table
---@field name string
---@field update_conversion_value? number
---@field user_data? table

---@class Standard
---@field ascending_only? boolean
---@field branch_key string
---@field coarse_key? string
---@field content_items? table
---@field custom_data? table
---@field customer_event_alias? string
---@field event_data? table
---@field locked? boolean
---@field name string
---@field update_conversion_value? number
---@field user_data table

---@class StandardCreateData
---@field ascending_only? boolean
---@field branch_key string
---@field coarse_key? string
---@field content_items? table
---@field custom_data? table
---@field customer_event_alias? string
---@field event_data? table
---@field locked? boolean
---@field name string
---@field update_conversion_value? number
---@field user_data table

local M = {}

return M
