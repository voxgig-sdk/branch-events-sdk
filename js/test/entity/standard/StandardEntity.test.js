
const envlocal = __dirname + '/../../../.env.local'
require('../../utility').loadEnvLocal(envlocal)

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe, afterEach } = require('node:test')
const assert = require('node:assert')
const { createLiveTransport } = require('../../live-runner')
const { runLiveEntity } = require('../../live-entity')


const { BranchEventsSDK, BaseFeature, stdutil, config } = require('../../..')

const {
  envOverride,
  liveClientOptions,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
} = require('../../utility')


describe('StandardEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when BRANCH_EVENTS_TEST_LIVE=TRUE.
  afterEach(liveDelay('BRANCH_EVENTS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = BranchEventsSDK.test()
    const ent = testsdk.Standard()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"ascending_only","req":false,"type":"`$BOOLEAN`","index$":0},{"active":true,"name":"branch_key","req":true,"short":"The Branch Key of the originating app obtained in your [Account Settings](https://help.branch.io/using-branch/docs/profile-settings)","type":"`$STRING`","index$":1},{"active":true,"name":"coarse_key","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"content_items","req":false,"type":"`$ARRAY`","index$":3},{"active":true,"name":"custom_data","req":false,"short":"Additional custom key-value pairs that you want attached to the event.","type":"`$OBJECT`","index$":4},{"active":true,"name":"customer_event_alias","req":false,"short":"The event alias as defined by you; used in addition to the event name defined above.","type":"`$STRING`","index$":5},{"active":true,"name":"event_data","req":false,"type":"`$OBJECT`","index$":6},{"active":true,"name":"locked","req":false,"type":"`$BOOLEAN`","index$":7},{"active":true,"name":"name","req":true,"short":"The name of the event to log.","type":"`$STRING`","index$":8},{"active":true,"name":"update_conversion_value","req":false,"type":"`$INTEGER`","index$":9},{"active":true,"name":"user_data","req":true,"short":"Information about the user and the device the event occurred on.","type":"`$OBJECT`","index$":10}],"name":"standard","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"header":[{"active":true,"example":"application/json","kind":"header","name":"accept","orig":"accept","reqd":true,"type":"`$STRING`"},{"active":true,"example":"application/json","kind":"header","name":"content_type","orig":"content_type","reqd":true,"type":"`$STRING`"},{"active":true,"example":"198.51.100.42","kind":"header","name":"x_ip_override","orig":"x_ip_override","reqd":true,"type":"`$STRING`"}]},"contract":{"id":"POST /event/standard","json":"{\"operationId\":\"logStandardEvents\",\"parameters\":[{\"description\":\"Recommended. The media type of the request body. Should be `application/json`.\",\"in\":\"header\",\"name\":\"Content-Type\",\"required\":\"false\",\"schema\":{\"example\":\"application/json\",\"type\":\"string\"}},{\"description\":\"Recommended. The media type the client expects in the response. Should be `application/json`.\",\"in\":\"header\",\"name\":\"Accept\",\"required\":\"false\",\"schema\":{\"example\":\"application/json\",\"type\":\"string\"}},{\"description\":\"Optional. Override the IP address Branch uses for the event (for example, when forwarding events server-to-server from your own backend).\\n\\n**Two requirements must be met for this header to function:**\\n\\n1. **Your app ID must be allowlisted by Branch.** The header is ignored until allowlisting is enabled. [Open a support request](https://support.branch.io/) to have your app ID allowlisted before sending this header in production.\\n2. **You must also include `user_data.ip` in the request body** with the same IP value. Sending the header alone is not sufficient — the body field is what Branch persists for attribution.\\n\",\"in\":\"header\",\"name\":\"X-IP-Override\",\"required\":\"false\",\"schema\":{\"example\":\"198.51.100.42\",\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"branch_key\":{\"description\":\"The Branch Key of the originating app obtained in your [Account Settings](https://help.branch.io/using-branch/docs/profile-settings)\",\"example\":\"key_live_xxxx\",\"type\":\"string\"},\"content_items\":{\"items\":{\"properties\":{\"$address_city\":{\"description\":\"Commerce and Content Reports only. The street address for a restaurant, business, room (hotel), etc.\",\"example\":\"city1\",\"type\":\"string\"},\"$address_country\":{\"description\":\"Commerce and Content Reports only. The country code for a restaurant, business, room (hotel), etc.\",\"example\":\"Country1\",\"type\":\"string\"},\"$address_postal_code\":{\"description\":\"Commerce and Content Reports only. The postal/zip code for a restaurant, business, room (hotel), etc.\",\"example\":\"postal_code\",\"type\":\"string\"},\"$address_region\":{\"description\":\"Commerce and Content Reports only. The state or region for a restaurant, business, room (hotel), etc.\",\"example\":\"Region1\",\"type\":\"string\"},\"$address_street\":{\"description\":\"Commerce and Content Reports only. The street address for a restaurant, business, room (hotel), etc.\",\"example\":\"Street_name1\",\"type\":\"string\"},\"$canonical_identifier\":{\"description\":\"Commerce and Content Reports only. Used to allow Branch to unify content/messages for Content Analytics\",\"example\":\"item12345\",\"type\":\"string\"},\"$condition\":{\"description\":\"Commerce and Content Reports only. For auctions, whether the item is new, good, acceptable, etc.\",\"enum\":[\"OTHER\",\"NEW\",\"EXCELLENT\",\"GOOD\",\"FAIR\",\"POOR\",\"USED\",\"REFURBISHED\"],\"type\":\"string\"},\"$content_schema\":{\"description\":\"Category / Schema for a piece of content.\",\"enum\":[\"COMMERCE_AUCTION\",\"COMMERCE_BUSINESS\",\"COMMERCE_OTHER\",\"COMMERCE_PRODUCT\",\"COMMERCE_RESTAURANT\",\"COMMERCE_SERVICE\",\"COMMERCE_TRAVEL_FLIGHT\",\"COMMERCE_TRAVEL_HOTEL\",\"COMMERCE_TRAVEL_OTHER\",\"GAME_STATE\",\"MEDIA_IMAGE\",\"MEDIA_MIXED\",\"MEDIA_MUSIC\",\"MEDIA_OTHER\",\"MEDIA_VIDEO\",\"OTHER\",\"TEXT_ARTICLE\",\"TEXT_BLOG\",\"TEXT_OTHER\",\"TEXT_RECIPE\",\"TEXT_REVIEW\",\"TEXT_SEARCH_RESULTS\",\"TEXT_STORY\",\"TEXT_TECHNICAL_DOC\"],\"example\":\"COMMERCE_PRODUCT\",\"type\":\"string\"},\"$creation_timestamp\":{\"description\":\"Commerce and Content Reports only. The time the content was created (Unix timestamp, typically in milliseconds).\",\"example\":\"1499892854966\",\"format\":\"int64\",\"type\":\"integer\"},\"$custom_fields\":{\"additionalProperties\":\"true\",\"description\":\"Commerce and Content Reports only. key-value pairs that the app developer would like attached to the content item. Values may be of any JSON type. Attached to events that are retrieved via Exports and sent via Webhooks.\",\"type\":\"object\"},\"$exp_date\":{\"description\":\"Commerce and Content Reports only. The last time after which this content is no longer valid. null / 0 mean no limit. Should rarely be set.\",\"example\":\"0\",\"format\":\"int64\",\"type\":\"integer\"},\"$image_captions\":{\"description\":\"Commerce and Content Reports only.  The captions associated with the image.\",\"items\":{\"example\":\"my_img_caption1\",\"type\":\"string\"},\"type\":\"array\"},\"$keywords\":{\"description\":\"Commerce and Content Reports only. keywords\",\"example\":[\"sneakers\",\"shoes\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"$latitude\":{\"description\":\"Commerce and Content Reports only. The latitude for a restaurant, business, room (hotel), etc.\",\"example\":\"12.07\",\"type\":\"number\"},\"$locally_indexable\":{\"description\":\"Commerce and Content Reports only. true- content can be indexed for local (device) use. false- cannot index for local use\",\"example\":\"true\",\"type\":\"boolean\"},\"$longitude\":{\"description\":\"Commerce and Content Reports only. The longitude for a restaurant, business, room (hotel), etc.\",\"example\":\"-97.5\",\"type\":\"number\"},\"$og_image_url\":{\"description\":\"Commerce and Content Reports only. The image URL (for the individual content item).\",\"example\":\"valid URL\",\"type\":\"string\"},\"$og_title\":{\"description\":\"Commerce and Content Reports only. The title (for the individual content item).\",\"example\":\"My Content Title\",\"type\":\"string\"},\"$price\":{\"description\":\"Commerce and Content Reports only. The price for the product/content.\",\"example\":\"23.2\",\"type\":\"number\"},\"$product_brand\":{\"description\":\"Commerce and Content Reports only. The product's brand.\",\"example\":\"my_prod_Brand1\",\"type\":\"string\"},\"$product_category\":{\"description\":\"Commerce and Content Reports only. The product's category, if it's a product\",\"enum\":[\"ANIMALS_AND_PET_SUPPLIES\",\"APPAREL_AND_ACCESSORIES\",\"ARTS_AND_ENTERTAINMENT\",\"BABY_AND_TODDLER\",\"BUSINESS_AND_INDUSTRIAL\",\"CAMERAS_AND_OPTICS\",\"ELECTRONICS\",\"FOOD_BEVERAGES_AND_TOBACCO\",\"FURNITURE\",\"HARDWARE\",\"HEALTH_AND_BEAUTY\",\"HOME_AND_GARDEN\",\"LUGGAGE_AND_BAGS\",\"MATURE\",\"MEDIA\",\"OFFICE_SUPPLIES\",\"RELIGIOUS_AND_CEREMONIAL\",\"SOFTWARE\",\"SPORTING_GOODS\",\"TOYS_AND_GAMES\",\"VEHICLES_AND_PARTS\"],\"example\":\"BABY_AND_TODDLER\",\"type\":\"string\"},\"$product_name\":{\"description\":\"Commerce and Content Reports only. The product's name.\",\"example\":\"my_product_name1\",\"type\":\"string\"},\"$product_variant\":{\"description\":\"Commerce and Content Reports only. The product's variant (e.g. XL, red).\",\"example\":\"3T\",\"type\":\"string\"},\"$publicly_indexable\":{\"description\":\"Commerce and Content Reports only. true-  content can be seen by anyone. false- cannot index for public use\",\"example\":\"false\",\"type\":\"boolean\"},\"$quantity\":{\"description\":\"Commerce and Content Reports only. The quantity of the item to be ordered (for PURCHASE, ADD_TO_CART, etc).\",\"example\":\"2\",\"type\":\"number\"},\"$rating_average\":{\"description\":\"Commerce and Content Reports only. The average rating of the item.\",\"example\":\"4.2\",\"type\":\"number\"},\"$rating_count\":{\"description\":\"Commerce and Content Reports only. The number of ratings for the item.\",\"example\":\"5\",\"type\":\"number\"},\"$rating_max\":{\"description\":\"Commerce and Content Reports only. The maximum possible rating for the item (e.g. 5.0 if 5 stars is highest possible rating).\",\"example\":\"5\",\"type\":\"number\"},\"$sku\":{\"description\":\"Commerce and Content Reports only. The product sku or product ID.\",\"example\":\"1994320302\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"custom_data\":{\"additionalProperties\":\"true\",\"description\":\"Additional custom key-value pairs that you want attached to the event. Values may be of any JSON type. Attached to events retrieved via Exports and sent via Webhooks.\",\"type\":\"object\"},\"customer_event_alias\":{\"description\":\"The event alias as defined by you; used in addition to the event name defined above.\",\"example\":\"my custom alias\",\"type\":\"string\"},\"event_data\":{\"properties\":{\"affiliation\":{\"description\":\"Store or affiliation from which this transaction occurred (e.g. Google Store)\",\"example\":\"test_affiliation\",\"type\":\"string\"},\"coupon\":{\"description\":\"Transaction coupon redeemed with the transaction (e.g. \\\"SPRING2017\\\")\",\"example\":\"coupon\",\"type\":\"string\"},\"currency\":{\"description\":\"Currency that revenue, price, shipping, tax were originally reported in by the partner\",\"example\":\"USD\",\"type\":\"string\"},\"description\":{\"description\":\"Description associated with the event, not necessarily specific to any individual content items (see below)\",\"example\":\"Event_description\",\"type\":\"string\"},\"revenue\":{\"description\":\"The partner-specified reported revenue for the event.\",\"example\":\"1.5\",\"type\":\"number\"},\"search_query\":{\"description\":\"Additional search queries.\",\"example\":\"Test Search query\",\"type\":\"string\"},\"shipping\":{\"description\":\"Shipping cost associated with the transaction.\",\"example\":\"10.2\",\"type\":\"number\"},\"tax\":{\"description\":\"Total tax associated with the transaction.\",\"example\":\"12.3\",\"type\":\"number\"},\"transaction_id\":{\"description\":\"The partner-specified transaction id for their internal use\",\"example\":\"00000000\",\"type\":\"string\"}},\"type\":\"object\"},\"name\":{\"description\":\"The name of the event to log. Must be one of the following standard Branch Event names:\\n  * Commerce:\\n    * ADD_TO_CART\\n    * ADD_TO_WISHLIST\\n    * VIEW_CART\\n    * INITIATE_PURCHASE\\n    * ADD_PAYMENT_INFO\\n    * CLICK_AD\\n    * PURCHASE\\n    * SPEND_CREDITS\\n    * VIEW_AD\\n  * Content:\\n    * SEARCH\\n    * VIEW_ITEM\\n    * VIEW_ITEMS\\n    * RATE\\n    * SHARE\\n    * INITIATE_STREAM\\n    * COMPLETE_STREAM\\n  * User Lifecycle:\\n    * COMPLETE_REGISTRATION\\n    * COMPLETE_TUTORIAL\\n    * ACHIEVE_LEVEL\\n    * UNLOCK_ACHIEVEMENT\\n    * INVITE\\n    * LOGIN\\n    * START_TRIAL\\n    * SUBSCRIBE\\n\",\"enum\":[\"ADD_TO_CART\",\"ADD_TO_WISHLIST\",\"VIEW_CART\",\"INITIATE_PURCHASE\",\"ADD_PAYMENT_INFO\",\"CLICK_AD\",\"PURCHASE\",\"SPEND_CREDITS\",\"VIEW_AD\",\"SEARCH\",\"VIEW_ITEM\",\"VIEW_ITEMS\",\"RATE\",\"SHARE\",\"INITIATE_STREAM\",\"COMPLETE_STREAM\",\"COMPLETE_REGISTRATION\",\"COMPLETE_TUTORIAL\",\"ACHIEVE_LEVEL\",\"UNLOCK_ACHIEVEMENT\",\"INVITE\",\"LOGIN\",\"START_TRIAL\",\"SUBSCRIBE\"],\"example\":\"PURCHASE\",\"type\":\"string\"},\"user_data\":{\"description\":\"Information about the user and the device the event occurred on.\\n\\n**Required identifiers**: You must include at least one of the following in `user_data`:\\n  * `developer_identity`, or\\n  * `browser_fingerprint_id`, or\\n  * `os=iOS` AND `idfa`, or\\n  * `os=iOS` AND `idfv`, or\\n  * `os=Android` AND `android_id`, or\\n  * `os=Android` AND `aaid`\\n\",\"properties\":{\"aaid\":{\"description\":\"The Android/Google advertising ID.\",\"example\":\"abcdabcd-0123-0123-00f0-000000000000\",\"type\":\"string\"},\"advertising_ids\":{\"description\":\"Wrapper object for advertising identifiers. Use this in addition to the flat aaid, idfa, and idfv fields above to future-proof your integration for non-standard IDs (for example, OAID on Huawei devices). Additional advertising ID keys may be supported as new platforms emerge — contact Branch Support if you need to send an identifier that is not listed here.\",\"properties\":{\"oaid\":{\"description\":\"Open Advertising ID, used on Huawei devices and other Android devices without Google Play Services.\",\"example\":\"00aa00a0-0000-0a00-a000-aaa0000a0aaa\",\"type\":\"string\"}},\"type\":\"object\"},\"android_id\":{\"description\":\"Android hardware ID\",\"example\":\"a12300000000\",\"type\":\"string\"},\"anon_id\":{\"description\":\"The Facebook anonymous user ID. **Required** when running Facebook campaigns using Aggregated Event Measurement (AEM) on iOS.\",\"example\":\"fbanon_abc123def456\",\"type\":\"string\"},\"app_version\":{\"description\":\"The app version downloaded by the user.\",\"example\":\"1.0.0\",\"type\":\"string\"},\"brand\":{\"description\":\"The brand of the device\",\"example\":\"LGE\",\"type\":\"string\"},\"browser_fingerprint_id\":{\"description\":\"Branch internal-only field for tracking browsers.\",\"example\":\"857675855146829999\",\"type\":\"string\"},\"country\":{\"description\":\"The country code of the user, usually based on device settings or user agent string.\",\"example\":\"US\",\"type\":\"string\"},\"developer_identity\":{\"description\":\"The developer-specified identity for a user.\",\"example\":\"user123\",\"type\":\"string\"},\"dma_ad_personalization\":{\"description\":\"Whether end user has granted or denied ads personalization consent. **Required** if `dma_eea` is set to `true` (i.e., EU regulations apply to this user). Failure to include user consent signals may result in attribution or campaign performance degradation.\",\"example\":\"true\",\"type\":\"boolean\"},\"dma_ad_user_data\":{\"description\":\"Whether end user has granted or denied consent for 3P transmission of user level data for ads. **Required** if `dma_eea` is set to `true` (i.e., EU regulations apply to this user). Failure to include user consent signals may result in attribution or campaign performance degradation.\",\"example\":\"true\",\"type\":\"boolean\"},\"dma_eea\":{\"description\":\"Whether European regulations, including the DMA, apply to this user and conversion. **Required** if EU regulations apply to this user. Failure to include user consent signals may result in attribution or campaign performance degradation.\",\"example\":\"true\",\"type\":\"boolean\"},\"environment\":{\"description\":\"usually FULL_APP\",\"example\":\"FULL_APP\",\"type\":\"string\"},\"google_analytics_id\":{\"description\":\"The Google Analytics client ID, useful for cross-platform stitching with Google Analytics. Include where applicable to improve attribution coverage and downstream analytics.\",\"example\":\"GA1.2.123456789.1234567890\",\"type\":\"string\"},\"http_origin\":{\"description\":\"The current page url where Web SDK logged web session start.\",\"example\":\"https://example.com/landing\",\"type\":\"string\"},\"http_referrer\":{\"description\":\"The referral url that led to the current page where Web SDK logged web session start.\",\"example\":\"https://referrer.example.com/path\",\"type\":\"string\"},\"idfa\":{\"description\":\"iOS advertising ID\",\"example\":\"00000000-0000-0000-0000-000000000001\",\"type\":\"string\"},\"idfv\":{\"description\":\"iOS vendor ID\",\"example\":\"00000000-0000-0000-0000-000000000002\",\"type\":\"string\"},\"ip\":{\"description\":\"The IP address for the device where the event occurred. Required if using the `X-IP-Override` request header.\",\"example\":\"198.51.100.42\",\"type\":\"string\"},\"language\":{\"description\":\"The language code of the user, usually based on device settings or user agent string.\",\"example\":\"en\",\"type\":\"string\"},\"limit_ad_tracking\":{\"description\":\"true if the partner has opted to not be tracked by advertisers\",\"example\":\"false\",\"type\":\"boolean\"},\"local_ip\":{\"description\":\"Android only - local ip of the device\",\"example\":\"192.0.2.1\",\"type\":\"string\"},\"model\":{\"description\":\"The model of the device.\",\"example\":\"Nexus 5X\",\"type\":\"string\"},\"os\":{\"description\":\"One of the following operating system e.g. Android, iOS,MAC_OS,LINUX,WINDOWS etc.\",\"example\":\"Android\",\"type\":\"string\"},\"os_version\":{\"description\":\"The version of the operating system. Strongly recommended for all paid traffic to ensure accurate attribution. **Required** for Facebook campaigns on iOS.\\n\",\"example\":\"12.4.0\",\"type\":\"string\"},\"randomized_device_token\":{\"description\":\"Branch internal-only field for tracking devices.\",\"example\":\"857675855146829998\",\"type\":\"string\"},\"screen_dpi\":{\"description\":\"The screen's DPI.\",\"example\":\"420\",\"type\":\"integer\"},\"screen_height\":{\"description\":\"The screen's height.\",\"example\":\"1794\",\"type\":\"integer\"},\"screen_width\":{\"description\":\"The screen's width.\",\"example\":\"1080\",\"type\":\"integer\"},\"user_agent\":{\"description\":\"The user agent of the browser or app where the event occurred. Usually associated with a webview.\",\"example\":\"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko)\",\"type\":\"string\"}},\"type\":\"object\"}},\"required\":[\"branch_key\",\"name\",\"user_data\"],\"type\":\"object\"}}}},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Successful event ingestion. The response carries SKAdNetwork-relevant fields that the app can use to update its native SKAN conversion value.\",\"properties\":{\"ascending_only\":{\"example\":\"false\",\"type\":\"boolean\"},\"coarse_key\":{\"example\":\"high\",\"type\":\"string\"},\"locked\":{\"example\":\"false\",\"type\":\"boolean\"},\"update_conversion_value\":{\"example\":\"3\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Ok\"},\"400\":{\"content\":{\"application/json\":{\"examples\":{\"Result\":{\"value\":\"{\\n    \\\"error\\\": {\\n        \\\"message\\\": \\\"Authentication failed !\\\",\\n        \\\"code\\\": 400\\n    }\\n}\"}},\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"example\":\"400\",\"type\":\"integer\"},\"message\":{\"example\":\"Authentication failed !\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Authentication Failed\"},\"429\":{\"content\":{\"application/json\":{\"examples\":{\"Result\":{\"value\":\"{\\n    \\\"error\\\": {\\n        \\\"code\\\": 429,\\n        \\\"message\\\": \\\"Rate limit reached.\\\"\\n    }\\n}\"}},\"schema\":{\"properties\":{\"$ref\":\"#/responses/400/content/application~1json/schema/properties\"},\"type\":\"object\"}}},\"description\":\"Rate Limit Reached\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/event/standard","segments":[{"lit":"event"},{"lit":"standard"}],"select":{"exist":["accept","content_type","x_ip_override"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"standard","name__orig":"standard","Name":"Standard","name_":"standard","name-":"standard","NAME":"STANDARD","index$":1}, {"active":true,"entity":"standard","key$":"BasicStandardFlow","kind":"basic","name":"BasicStandardFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"standard_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'Standard')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const standard_ref01_ent = client.Standard()
    let standard_ref01_data = setup.data.new.standard['standard_ref01']

    standard_ref01_data = (await standard_ref01_ent.create(standard_ref01_data)).data()
    assert(null != standard_ref01_data)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/standard/StandardTestData.json')

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
    ['standard01','standard02','standard03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'BRANCH_EVENTS_TEST_STANDARD_ENTID': idmap,
    'BRANCH_EVENTS_TEST_LIVE': 'FALSE',
    'BRANCH_EVENTS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['BRANCH_EVENTS_TEST_STANDARD_ENTID']

  const live = 'TRUE' === env.BRANCH_EVENTS_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['BRANCH_EVENTS_TEST_STANDARD_ENTID']
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
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when
      // the last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey and
      // server values above and handed the SDK undefined.
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
  
