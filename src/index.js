"use strict";

window.dummyExtend = function(obj) {
	return $.extend(true, {
		x: -1,
		y: -2,
		z: -3,
		meta: {
			desc: "Random point"
		}
	}, obj);
};
