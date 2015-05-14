describe("dummyExtend", function() {
	it("should add defaults", function() {
		expect(dummyExtend({x: 1})).toEqual(jasmine.objectContaining({
			y: -2,
			z: -3
		})); 
	});

	it("should redefine values", function() {
		expect(dummyExtend({x: 1})).toEqual(jasmine.objectContaining({
			x: 1
		})); 
	});

	it("should redefine nested values", function() {
		expect(dummyExtend({meta: {desc: "New desc"}})).toEqual(jasmine.objectContaining({
			meta: {
				desc: "New desc"
			}
		})); 
	});

	it("should execute $.extend", function() {
		var spy = sinon.spy($, "extend");
		dummyExtend({});
		expect(spy.called).toBe(true);
		spy.restore();
	});
});
