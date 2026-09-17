# BranchEvents SDK feature factory

from branchevents_sdk.feature.base_feature import BranchEventsBaseFeature
from branchevents_sdk.feature.debug_feature import BranchEventsDebugFeature
from branchevents_sdk.feature.idempotency_feature import BranchEventsIdempotencyFeature
from branchevents_sdk.feature.metrics_feature import BranchEventsMetricsFeature
from branchevents_sdk.feature.paging_feature import BranchEventsPagingFeature
from branchevents_sdk.feature.ratelimit_feature import BranchEventsRatelimitFeature
from branchevents_sdk.feature.retry_feature import BranchEventsRetryFeature
from branchevents_sdk.feature.test_feature import BranchEventsTestFeature
from branchevents_sdk.feature.timeout_feature import BranchEventsTimeoutFeature


_FEATURES = {
    "base": lambda: BranchEventsBaseFeature(),
    "debug": lambda: BranchEventsDebugFeature(),
    "idempotency": lambda: BranchEventsIdempotencyFeature(),
    "metrics": lambda: BranchEventsMetricsFeature(),
    "paging": lambda: BranchEventsPagingFeature(),
    "ratelimit": lambda: BranchEventsRatelimitFeature(),
    "retry": lambda: BranchEventsRetryFeature(),
    "test": lambda: BranchEventsTestFeature(),
    "timeout": lambda: BranchEventsTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
