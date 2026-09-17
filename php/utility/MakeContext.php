<?php
declare(strict_types=1);

// BranchEvents SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class BranchEventsMakeContext
{
    public static function call(array $ctxmap, ?BranchEventsContext $basectx): BranchEventsContext
    {
        return new BranchEventsContext($ctxmap, $basectx);
    }
}
