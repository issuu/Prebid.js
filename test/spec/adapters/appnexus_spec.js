import { expect } from 'chai';
import * as bidmanager from 'src/bidmanager';
import adapter from 'src/adapters/ut';

const ENDPOINT = 'http://ib.adnxs.com/ut/v2';
const params = {
  "bidderCode": "ut",
  "requestId": "d3e07445-ab06-44c8-a9dd-5ef9af06d2a6",
  "bidderRequestId": "7101db09af0db2",
  "bids": [
    {
      "bidder": "ut",
      "params": {
        "foo": "bar"
      },
      "placementCode": "/19968336/header-bid-tag1",
      "sizes": [
        [728, 90],
        [970, 90]
      ],
      "bidId": "84ab500420319d",
      "bidderRequestId": "7101db09af0db2",
      "requestId": "d3e07445-ab06-44c8-a9dd-5ef9af06d2a6"
    }
  ],
  "start": 1469479810130,
  "timeout": 3000
};

describe('AppNexusAdapter', () => {

    let xhr;
    let requests;

    beforeEach(() => {
      xhr = sinon.useFakeXMLHttpRequest();
      requests = [];
      xhr.onCreate = request => requests.push(request);
    });

    afterEach(() => {
      xhr.restore();
    });


  it('exists and is a function', () => {
    expect(adapter).to.exist.and.to.be.a('function');
  });

  it('sends bid request to ENDPOINT via POST', () => {
    adapter().callBids(params);
    expect(requests[0].url).to.equal(ENDPOINT);
    expect(requests[0].method).to.equal('POST');
  });

  xit('registers a bid response', () => {
    const addBidResponse = sinon.stub(bidmanager, 'addBidResponse');
    adapter().callBids(params);
    // sinon.assert.calledOnce(addBidResponse);
    bidmanager.addBidResponse.restore();
  });

});
