<?php
declare(strict_types=1);

// BranchEvents SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/DebugFeature.php';
require_once __DIR__ . '/feature/IdempotencyFeature.php';
require_once __DIR__ . '/feature/MetricsFeature.php';
require_once __DIR__ . '/feature/PagingFeature.php';
require_once __DIR__ . '/feature/RatelimitFeature.php';
require_once __DIR__ . '/feature/RetryFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';
require_once __DIR__ . '/feature/TimeoutFeature.php';


class BranchEventsFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new BranchEventsBaseFeature();
            case "debug":
                return new BranchEventsDebugFeature();
            case "idempotency":
                return new BranchEventsIdempotencyFeature();
            case "metrics":
                return new BranchEventsMetricsFeature();
            case "paging":
                return new BranchEventsPagingFeature();
            case "ratelimit":
                return new BranchEventsRatelimitFeature();
            case "retry":
                return new BranchEventsRetryFeature();
            case "test":
                return new BranchEventsTestFeature();
            case "timeout":
                return new BranchEventsTimeoutFeature();
            default:
                return new BranchEventsBaseFeature();
        }
    }

    /**
     * Does a generated feature class back this name? False for a name only
     * an options extend instance can supply (the station adopt path) - the
     * constructor uses this to skip make_feature for such names instead of
     * adding a stray BaseFeature.
     */
    public static function has_feature(string $name): bool
    {
        switch ($name) {
            case "base":
            case "debug":
            case "idempotency":
            case "metrics":
            case "paging":
            case "ratelimit":
            case "retry":
            case "test":
            case "timeout":
                return true;
            default:
                return false;
        }
    }
}
