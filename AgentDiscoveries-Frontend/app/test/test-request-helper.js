import {expect} from 'chai';
import {getTokenHeader} from '../src/components/utilities/request-helper';
import * as UserHelper from '../src/components/utilities/user-helper';

describe('request helper', () => {
    it('should use users token as authorisation', () => {
        const token = 'myToken';

        UserHelper.storeUserInfo({
            userId: 123,
            token: token
        });

        expect(getTokenHeader()).to.equal(`Bearer ${token}`);
    });
});
