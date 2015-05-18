"use strict";

export default function dummyExtend(obj) {
	return $.extend(true, {
		x: -1,
		y: -2,
		z: -3,
		meta: {
			desc: "Random point"
		}
	}, obj);
}
