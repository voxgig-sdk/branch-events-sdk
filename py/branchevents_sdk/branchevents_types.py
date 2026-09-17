# Typed models for the BranchEvents SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class CustomRequired(TypedDict):
    branch_key: str
    name: str


class Custom(CustomRequired, total=False):
    ascending_only: bool
    coarse_key: str
    custom_data: dict
    event_data: dict
    locked: bool
    meta_data: dict
    update_conversion_value: int
    user_data: dict


class CustomCreateDataRequired(TypedDict):
    branch_key: str
    name: str


class CustomCreateData(CustomCreateDataRequired, total=False):
    ascending_only: bool
    coarse_key: str
    custom_data: dict
    event_data: dict
    locked: bool
    meta_data: dict
    update_conversion_value: int
    user_data: dict


class StandardRequired(TypedDict):
    branch_key: str
    name: str
    user_data: dict


class Standard(StandardRequired, total=False):
    ascending_only: bool
    coarse_key: str
    content_items: list
    custom_data: dict
    customer_event_alias: str
    event_data: dict
    locked: bool
    update_conversion_value: int


class StandardCreateDataRequired(TypedDict):
    branch_key: str
    name: str
    user_data: dict


class StandardCreateData(StandardCreateDataRequired, total=False):
    ascending_only: bool
    coarse_key: str
    content_items: list
    custom_data: dict
    customer_event_alias: str
    event_data: dict
    locked: bool
    update_conversion_value: int
