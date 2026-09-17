<?php
declare(strict_types=1);

// Typed models for the BranchEvents SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Custom entity data model. */
class Custom
{
    public ?bool $ascending_only = null;
    public string $branch_key;
    public ?string $coarse_key = null;
    public ?array $custom_data = null;
    public ?array $event_data = null;
    public ?bool $locked = null;
    public ?array $meta_data = null;
    public string $name;
    public ?int $update_conversion_value = null;
    public ?array $user_data = null;
}

/** Request payload for Custom#create. */
class CustomCreateData
{
    public ?bool $ascending_only = null;
    public string $branch_key;
    public ?string $coarse_key = null;
    public ?array $custom_data = null;
    public ?array $event_data = null;
    public ?bool $locked = null;
    public ?array $meta_data = null;
    public string $name;
    public ?int $update_conversion_value = null;
    public ?array $user_data = null;
}

/** Standard entity data model. */
class Standard
{
    public ?bool $ascending_only = null;
    public string $branch_key;
    public ?string $coarse_key = null;
    public ?array $content_items = null;
    public ?array $custom_data = null;
    public ?string $customer_event_alias = null;
    public ?array $event_data = null;
    public ?bool $locked = null;
    public string $name;
    public ?int $update_conversion_value = null;
    public array $user_data;
}

/** Request payload for Standard#create. */
class StandardCreateData
{
    public ?bool $ascending_only = null;
    public string $branch_key;
    public ?string $coarse_key = null;
    public ?array $content_items = null;
    public ?array $custom_data = null;
    public ?string $customer_event_alias = null;
    public ?array $event_data = null;
    public ?bool $locked = null;
    public string $name;
    public ?int $update_conversion_value = null;
    public array $user_data;
}

