import {expect} from 'chai';
import * as UserHelper from '../src/components/utilities/user-helper';

let events = [];

before(() => {
    global.window.dispatchEvent = (event) => {
        events.push(event.name);
    };
});

describe('User Helper', () => {
    it('should store user info', () => {
        const userInfo = { token: 'a Token', userId: '2' };
        UserHelper.storeUserInfo(userInfo);

        expect(UserHelper.currentAuthToken()).to.equal(userInfo.token);
        expect(UserHelper.currentUserId()).to.equal(userInfo.userId);
        expect(UserHelper.isAdmin()).to.be.false;
    });

    it('should recognise admin status after logging in', () => {
        const adminInfo = { token: 'aToken', userId: '2', isAdmin: true };
        UserHelper.storeUserInfo(adminInfo);

        expect(UserHelper.isAdmin()).to.be.true;
    });

    it('should detect logged in users', () => {
        UserHelper.clearUserInfo();
        const userInfo = { token: 'a Token', userId: '2' };
        UserHelper.storeUserInfo(userInfo);

        expect(UserHelper.isLoggedIn()).to.be.true;
    });

    it('should detect logged out users', () => {
        const userInfo = { token: 'a Token', userId: '2' };
        UserHelper.storeUserInfo(userInfo);
        UserHelper.clearUserInfo();

        expect(UserHelper.isLoggedIn()).to.be.false;
        expect(UserHelper.currentAuthToken()).to.be.undefined;
    });

    it('should fire a login event when user info is updated', () => {
        events = [];

        // Updated
        const userInfo = { token: 'a Token', userId: '2' };
        UserHelper.storeUserInfo(userInfo);
        expect(events).to.have.members(['login']);

        // Cleared
        UserHelper.clearUserInfo();
        expect(events).to.have.members(['login', 'login']);
    });
});
