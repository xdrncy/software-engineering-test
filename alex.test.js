const { expect, it } = require("@jest/globals");

describe("date check", () => {
    it("two consecutive days", () => {
        var check = oneDayBigger('2021-01-01', '2021-01-02');

        expect(check).toEqual(true);
    });

    it("not consecutive days", () => {
        var check = oneDayBigger('2021-05-05', '2021-05-07');
        expect(check).toEqual(false);
    })
})

function oneDayBigger(start, end) {
    var startSplit = start.split('-');
    var startYear = startSplit[0];
    var startMonth = startSplit[1];
    var startDate = parseInt(startSplit[2]);
    
    var endSplit = end.split('-');
    var endYear = endSplit[0];
    var endMonth = endSplit[1];
    var endDate = parseInt(endSplit[2]);

    return ((startYear == endYear)
        && (startMonth == endMonth)
        && ((startDate + 1) == endDate));
}