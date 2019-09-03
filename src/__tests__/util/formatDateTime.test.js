import formatDateTime from "../../util/formatDateTime";

describe("formatDateTime", () => {
  it("should format a date object properly", () => {
    const dt = new Date(2019, 7, 31, 9, 48, 30);
    const res = formatDateTime(dt);
    expect(res).toBe("2019-08-31 09:48");
  });
});
