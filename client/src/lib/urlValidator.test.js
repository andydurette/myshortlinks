import urlValidator from './urlValidator';

describe("Test for proper url formatting", () => {
    it("Should return true", () => {
        const httpsUrl = urlValidator('https://www.andydurette.com/');
        expect(httpsUrl).toBe(true);
    });
    it("Should return false", () => {
        const httpsUrl = urlValidator('andydurette');
        expect(httpsUrl).toBe(false);
    });
});