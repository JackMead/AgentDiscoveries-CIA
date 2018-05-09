import {expect} from 'chai';
import {apiGet, getTokenHeader} from '../src/components/utilities/request-helper';
import * as UserHelper from '../src/components/utilities/user-helper';
import * as sinon from 'sinon';

const token = 'test-request-helper-token';

describe('request helper', () => {

    // Stub UserHelper methods

    before(() => {
        sinon.stub(UserHelper, 'currentAuthToken').returns(token);
        sinon.stub(UserHelper, 'clearUserInfo');
    });

    after(() => {
        UserHelper.currentAuthToken.restore();
        UserHelper.clearUserInfo.restore();
    });

    // Tests

    it('should use users token as authorisation', () => {
        expect(getTokenHeader()).to.equal(`Bearer ${token}`);
    });

    it('should respond with JSON for successful requests', () => {
        const body = { foo: 'bar' };

        mockNextFetch({
            status: 200,
            headers: { get: (header) => header === 'Content-Type' ? 'application/json' : null },
            json: () => Promise.resolve(body)
        });

        return apiGet('/test').then(response =>
            expect(response).to.equal(body));
    });

    it('should clear user data for unauthorized requests', () => {
        mockNextFetch({
            status: 401
        });

        return apiGet('/test').catch(err =>
            expect(UserHelper.clearUserInfo.called).to.be.true);
    });

    it('should respond with an error for failed requests', () => {
        mockNextFetch({
            status: 500,
            statusText: 'Internal Server Error' });

        return apiGet('/test').catch(err =>
            expect(err.message).to.include('Received 500 Internal Server Error from the API'));
    });
});

function mockNextFetch(response) {
    global.fetch = () => Promise.resolve(response);
}
