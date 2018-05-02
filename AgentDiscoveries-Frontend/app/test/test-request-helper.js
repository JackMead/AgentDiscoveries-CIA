import {expect} from 'chai'
import {getTokenHeader, prepareForm} from '../src/components/utilities/request-helper';
import * as utilities from '../src/components/utilities/search-utilities';

describe('request helper', () => {
    it('should use users token as authorisation', () => {
        window.localStorage.setItem('Token', 'myToken');
        const expectedTokenHeader = 'Bearer myToken';

        expect(getTokenHeader()).to.equal(expectedTokenHeader);
    });

    it('should reduce non-location data to JSON form', () => {
        const aValue = 'some value';
        const submitForm = { notLocation: { value: aValue } };

        expect(prepareForm(submitForm)).to.deep.equal({ notLocation: aValue });
    });

    it('should separate locations into series of integers', () => {
        const aValue = '10 2 14';
        const submitForm = { locations: { value: aValue } };

        expect(prepareForm(submitForm)).to.deep.equal({ locations: [10, 2, 14] });
    });

    it('should be able to combine locations with non-locations', () => {
        const submitForm = {
            notLocation: { value: 'someValue' },
            name: { value: 'myName' },
            locations: { value: '17 12 41 1' },
            status: { value: '' }
        };

        const expectedResponse = {
            notLocation: 'someValue',
            name: 'myName',
            locations: [17,12,41,1],
            status: ''
        };

        expect(prepareForm(submitForm)).to.deep.equal(expectedResponse);
    });

    it('should add timezone identifier Z to `toTime` and `fromTime` keys, and add one to the day for `toTime`', () => {
        const searchForm = {
            fromTime: [2000, 12, 1],
            toTime: [2000, 12, 1],
            notTime: [2000, 12, 1]
        };

        const expectedResponse = {
            fromTime: '2000-12-1Z',
            toTime: '2000-12-2Z',
            notTime: [2000, 12, 1]
        };

        expect(prepareForm(searchForm)).to.deep.equal(expectedResponse);
    });
});
