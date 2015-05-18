var expect = chai.expect;
describe("dummyExtend", function() {
	it("should include defaults", function() {
		expect(dummyExtend({x: 1})).to.have.property("z", -3);
	});

	it("should redefine values", function() {
		expect(dummyExtend({x: 1})).to.have.property("x", 1);
	});

	it("should redefine nested values", function() {
		expect(dummyExtend({meta: {desc: "New desc"}}))
			.to.have.deep.property("meta.desc", "New desc");
	});

	it("should execute $.extend", function() {
		var spy = sinon.spy($, "extend");
		dummyExtend({});
		expect(spy.called).to.be.true;
		spy.restore();
	});
});
