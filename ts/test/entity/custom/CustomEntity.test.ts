

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { BranchEventsSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('CustomEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when BRANCH_EVENTS_TEST_LIVE=TRUE.
  afterEach(liveDelay('BRANCH_EVENTS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = BranchEventsSDK.test()
    const ent = testsdk.Custom()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.BRANCH_EVENTS_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'custom.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"ascending_only":{"a":true,"h":"Ascending Only","n":"ascending_only","r":false,"t":"`$BOOLEAN`","key$":"ascending_only","index$":0},"branch_key":{"a":true,"h":"Branch Key","n":"branch_key","r":true,"sh":"The Branch Key of the originating app obtained in your [Account Settings](https://help.branch.io/using-branch/docs/profile-settings)","t":"`$STRING`","key$":"branch_key","index$":1},"coarse_key":{"a":true,"h":"Coarse Key","n":"coarse_key","r":false,"t":"`$STRING`","key$":"coarse_key","index$":2},"custom_data":{"a":true,"h":"Custom Data","n":"custom_data","r":false,"sh":"Additional custom key-value pairs that you want attached to the event.","t":"`$OBJECT`","key$":"custom_data","index$":3},"event_data":{"a":true,"h":"Event Data","n":"event_data","r":false,"t":"`$OBJECT`","key$":"event_data","index$":4},"locked":{"a":true,"h":"Locked","n":"locked","r":false,"t":"`$BOOLEAN`","key$":"locked","index$":5},"meta_data":{"a":true,"h":"Meta Data","n":"meta_data","r":false,"sh":"Additional metadata for the event.","t":"`$OBJECT`","key$":"meta_data","index$":6},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"The name of the event to log.","t":"`$STRING`","key$":"name","index$":7},"update_conversion_value":{"a":true,"h":"Update Conversion Value","n":"update_conversion_value","r":false,"t":"`$INTEGER`","key$":"update_conversion_value","index$":8},"user_data":{"a":true,"h":"User Data","n":"user_data","r":false,"sh":"Information about the user and the device the event occurred on.","t":"`$OBJECT`","key$":"user_data","index$":9}},"name":"custom","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /event/custom","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"application/json","k":"header","n":"accept","or":"accept","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"application/json","k":"header","n":"content_type","or":"content_type","r":true,"t":"`$STRING`","index$":1},{"a":true,"ex":"198.51.100.42","k":"header","n":"x_ip_override","or":"x_ip_override","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"POST","o":"/event/custom","q":{"exist":["accept","content_type","x_ip_override"]},"r":{},"s":[{"lit":"event"},{"lit":"custom"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"custom","name__orig":"custom","Name":"Custom","name_":"custom","name-":"custom","NAME":"CUSTOM","index$":0}, {"active":true,"entity":"custom","key$":"BasicCustomFlow","kind":"basic","name":"BasicCustomFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"custom_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'Custom', {"POST /event/custom":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","required":["branch_key","name"],"properties":{"branch_key":{"description":"The Branch Key of the originating app obtained in your [Account Settings](https://help.branch.io/using-branch/docs/profile-settings)","type":"string","example":"key_live_xxxx","key$":"branch_key"},"name":{"type":"string","description":"The name of the event to log. Can be a string of custom event name. For instance \"picture swiped\".\n","example":"CustomEventTest","key$":"name"},"user_data":{"type":"object","description":"Information about the user and the device the event occurred on.\n\n**Required identifiers**: You must include at least one of the following in `user_data`:\n  * `developer_identity`, or\n  * `browser_fingerprint_id`, or\n  * `os=iOS` AND `idfa`, or\n  * `os=iOS` AND `idfv`, or\n  * `os=Android` AND `android_id`, or\n  * `os=Android` AND `aaid`\n","properties":{"os":{"type":"string","description":"One of the following operating system e.g. Android, iOS,MAC_OS,LINUX,WINDOWS etc.","example":"Android"},"os_version":{"type":"string","description":"The version of the operating system. Strongly recommended for all paid traffic to ensure accurate attribution. **Required** for Facebook campaigns on iOS.\n","example":"12.4.0"},"environment":{"type":"string","description":"usually FULL_APP","example":"FULL_APP"},"aaid":{"type":"string","description":"The Android/Google advertising ID.","example":"abcdabcd-0123-0123-00f0-000000000000"},"android_id":{"type":"string","description":"Android hardware ID","example":"a12300000000"},"idfa":{"type":"string","description":"iOS advertising ID","example":"00000000-0000-0000-0000-000000000001"},"idfv":{"type":"string","description":"iOS vendor ID","example":"00000000-0000-0000-0000-000000000002"},"anon_id":{"type":"string","description":"The Facebook anonymous user ID. **Required** when running Facebook campaigns using Aggregated Event Measurement (AEM) on iOS.","example":"fbanon_abc123def456"},"advertising_ids":{"type":"object","description":"Wrapper object for advertising identifiers. Use this in addition to the flat aaid, idfa, and idfv fields above to future-proof your integration for non-standard IDs (for example, OAID on Huawei devices). Additional advertising ID keys may be supported as new platforms emerge — contact Branch Support if you need to send an identifier that is not listed here.","properties":{"oaid":{}}},"google_analytics_id":{"type":"string","description":"The Google Analytics client ID, useful for cross-platform stitching with Google Analytics. Include where applicable to improve attribution coverage and downstream analytics.","example":"GA1.2.123456789.1234567890"},"limit_ad_tracking":{"type":"boolean","description":"true if the partner has opted to not be tracked by advertisers","example":"false"},"user_agent":{"type":"string","description":"The user agent of the browser or app where the event occurred. Usually associated with a webview.","example":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko)"},"browser_fingerprint_id":{"type":"string","description":"Branch internal-only field for tracking browsers.","example":"857675855146829999"},"http_origin":{"type":"string","description":"The current page url where Web SDK logged web session start.","example":"https://example.com/landing"},"http_referrer":{"type":"string","description":"The referral url that led to the current page where Web SDK logged web session start.","example":"https://referrer.example.com/path"},"developer_identity":{"type":"string","description":"The developer-specified identity for a user.","example":"user123"},"country":{"type":"string","description":"The country code of the user, usually based on device settings or user agent string.","example":"US"},"language":{"type":"string","description":"The language code of the user, usually based on device settings or user agent string.","example":"en"},"ip":{"type":"string","description":"The IP address for the device where the event occurred. Required if using the `X-IP-Override` request header.","example":"198.51.100.42"},"local_ip":{"type":"string","description":"Android only - local ip of the device","example":"192.0.2.1"},"brand":{"type":"string","description":"The brand of the device","example":"LGE"},"randomized_device_token":{"type":"string","description":"Branch internal-only field for tracking devices.","example":"857675855146829998"},"app_version":{"type":"string","description":"The app version downloaded by the user.","example":"1.0.0"},"model":{"type":"string","description":"The model of the device.","example":"Nexus 5X"},"screen_dpi":{"type":"integer","description":"The screen's DPI.","example":"420"},"screen_height":{"type":"integer","description":"The screen's height.","example":"1794"},"screen_width":{"type":"integer","description":"The screen's width.","example":"1080"},"dma_eea":{"type":"boolean","description":"Whether European regulations, including the DMA, apply to this user and conversion. **Required** if EU regulations apply to this user. Failure to include user consent signals may result in attribution or campaign performance degradation.","example":"true"},"dma_ad_personalization":{"type":"boolean","description":"Whether end user has granted or denied ads personalization consent. **Required** if `dma_eea` is set to `true` (i.e., EU regulations apply to this user). Failure to include user consent signals may result in attribution or campaign performance degradation.","example":"true"},"dma_ad_user_data":{"type":"boolean","description":"Whether end user has granted or denied consent for 3P transmission of user level data for ads. **Required** if `dma_eea` is set to `true` (i.e., EU regulations apply to this user). Failure to include user consent signals may result in attribution or campaign performance degradation.","example":"true"}},"x-ref":"#/components/schemas/user_data_standard","key$":"user_data"},"custom_data":{"type":"object","description":"Additional custom key-value pairs that you want attached to the event. Values may be of any JSON type. Attached to events retrieved via Exports and sent via Webhooks.","additionalProperties":"true","key$":"custom_data"},"meta_data":{"type":"object","description":"Additional metadata for the event.","additionalProperties":"true","key$":"meta_data"},"event_data":{"type":"object","properties":{"transaction_id":{"type":"string","description":"The partner-specified transaction id for their internal use","example":"00000000"},"revenue":{"type":"number","description":"The partner-specified reported revenue for the event.","example":"1.5"},"currency":{"type":"string","description":"Currency that revenue, price, shipping, tax were originally reported in by the partner","example":"USD"},"shipping":{"type":"number","description":"Shipping cost associated with the transaction.","example":"10.2"},"tax":{"type":"number","description":"Total tax associated with the transaction.","example":"12.3"},"coupon":{"type":"string","description":"Transaction coupon redeemed with the transaction (e.g. \"SPRING2017\")","example":"coupon"},"affiliation":{"type":"string","description":"Store or affiliation from which this transaction occurred (e.g. Google Store)","example":"test_affiliation"},"description":{"type":"string","description":"Description associated with the event, not necessarily specific to any individual content items (see below)","example":"Event_description"},"search_query":{"type":"string","description":"Additional search queries.","example":"Test Search query"}},"x-ref":"#/components/schemas/event_data_standard","key$":"event_data"}},"x-ref":"#/components/schemas/log_custom_request_body","index$":1}}}},"parameters":[{"in":"header","name":"Content-Type","schema":{"type":"string","example":"application/json"},"required":"false","description":"Recommended. The media type of the request body. Should be `application/json`.","index$":0},{"in":"header","name":"Accept","schema":{"type":"string","example":"application/json"},"required":"false","description":"Recommended. The media type the client expects in the response. Should be `application/json`.","index$":1},{"in":"header","name":"X-IP-Override","schema":{"type":"string","example":"198.51.100.42"},"required":"false","description":"Optional. Override the IP address Branch uses for the event (for example, when forwarding events server-to-server from your own backend).\n\n**Two requirements must be met for this header to function:**\n\n1. **Your app ID must be allowlisted by Branch.** The header is ignored until allowlisting is enabled. [Open a support request](https://support.branch.io/) to have your app ID allowlisted before sending this header in production.\n2. **You must also include `user_data.ip` in the request body** with the same IP value. Sending the header alone is not sufficient — the body field is what Branch persists for attribution.\n","index$":2}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const custom_ref01_ent = client.Custom()
    let custom_ref01_data = setup.data.new.custom['custom_ref01']

    custom_ref01_data = (await custom_ref01_ent.create(custom_ref01_data)).data()
    assert(null != custom_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/custom/CustomTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = BranchEventsSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['custom01','custom02','custom03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'BRANCH_EVENTS_TEST_CUSTOM_ENTID': idmap,
    'BRANCH_EVENTS_TEST_LIVE': 'FALSE',
    'BRANCH_EVENTS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['BRANCH_EVENTS_TEST_CUSTOM_ENTID']

  const live = 'TRUE' === env.BRANCH_EVENTS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['BRANCH_EVENTS_TEST_CUSTOM_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new BranchEventsSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.BRANCH_EVENTS_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
