<?php
declare(strict_types=1);

// BranchEvents SDK base feature

class BranchEventsBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(BranchEventsContext $ctx, array $options): void {}
    public function PostConstruct(BranchEventsContext $ctx): void {}
    public function PostConstructEntity(BranchEventsContext $ctx): void {}
    public function SetData(BranchEventsContext $ctx): void {}
    public function GetData(BranchEventsContext $ctx): void {}
    public function GetMatch(BranchEventsContext $ctx): void {}
    public function SetMatch(BranchEventsContext $ctx): void {}
    public function PrePoint(BranchEventsContext $ctx): void {}
    public function PreSpec(BranchEventsContext $ctx): void {}
    public function PreRequest(BranchEventsContext $ctx): void {}
    public function PreResponse(BranchEventsContext $ctx): void {}
    public function PreResult(BranchEventsContext $ctx): void {}
    public function PreDone(BranchEventsContext $ctx): void {}
    public function PreUnexpected(BranchEventsContext $ctx): void {}
}
