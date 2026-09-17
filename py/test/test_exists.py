# BranchEvents SDK exists test

import pytest
from branchevents_sdk import BranchEventsSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = BranchEventsSDK.test(None, None)
        assert testsdk is not None
