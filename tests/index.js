"use strict";

import dummyExtend from "../src/index";
import chai from "chai";
import sinon from "sinon";

let expect = chai.expect;

describe("dummyExtend", () => {
	it("should include defaults", () => {
		expect(dummyExtend({x: 1})).to.have.property("z", -3);
	});

	it("should redefine values", () => {
		expect(dummyExtend({x: 1})).to.have.property("x", 1);
	});

	it("should redefine nested values", () => {
		expect(dummyExtend({meta: {desc: "New desc"}}))
			.to.have.deep.property("meta.desc", "New desc");
	});

	it("should execute $.extend", () => {
		var spy = sinon.spy($, "extend");
		dummyExtend({});
		expect(spy.called).to.equal(true);
		spy.restore();
	});
});
