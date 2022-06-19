import {createShortLink, confirmAndCallShortLink} from './apiCalls';

describe("Test creation of a short link", () => {
    let originalFetch;

    beforeEach(() => {
        originalFetch = global.fetch;
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve({
                _id: "62ae7af95424e15a9c8d18b5",
                full: "https://www.instagram.com/",
                short: "Cmq1KTYoi",
                __v: 0
            })
        }));
    });

    afterEach(() => {
        global.fetch = originalFetch;
    });

    it("Creates a short link and returns it", async () => {
        const url = 'https://www.andydurette.com/';
        const call = await createShortLink(url);
        expect(call).toEqual({
            _id: "62ae7af95424e15a9c8d18b5",
            full: "https://www.instagram.com/",
            short: "Cmq1KTYoi",
            __v: 0
        })
    });

    it("Calls and retrieves a short link by it's id", async () => {
        const id = '62ae7af95424e15a9c8d18b5';
        const call = await confirmAndCallShortLink(id);
        expect(call).toEqual({
            _id: "62ae7af95424e15a9c8d18b5",
            full: "https://www.instagram.com/",
            short: "Cmq1KTYoi",
            __v: 0
        })
    });
});