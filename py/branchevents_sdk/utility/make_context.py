# BranchEvents SDK utility: make_context

from branchevents_sdk.core.context import BranchEventsContext


def make_context_util(ctxmap, basectx):
    return BranchEventsContext(ctxmap, basectx)
