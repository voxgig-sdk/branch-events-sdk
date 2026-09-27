
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { BranchEventsSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = BranchEventsSDK.test()
    equal(testsdk instanceof BranchEventsSDK, true,
      'BranchEventsSDK.test() must return a client synchronously')
  })

})
