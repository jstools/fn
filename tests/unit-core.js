describe('jstool-core (fn)', function () {

	it('basic definition', function () {
		function fn1 () {};

		fn.define('fn1', function () {
			return fn1;
		});

		expect(fn('fn1')).toBe(fn1);
	});

	it('fn.define with dependence', function (done) {
		function fn3 () {};

		function fn4 () {};

		fn.define('fn3', function () {
			return fn3;
		});

		fn.define('fn4', ['fn3', function (fn3) {
			return fn4;
		}]);

		fn.defer(function () {
			expect(fn('fn4')).toBe(fn4);
			done();
		});
	});

	it('fn.require', function (done) {
		function fn2 () {};

		fn.require(['fn2'], function (f2) {
			expect(f2).toBe(fn2);
			done();
		});

		fn.define('fn2', function () {
			return fn2;
		});

	});

	it('fn.defer', function (done) {
		var order = '';

		(function () { order += '1'; })();

		fn.defer(function () { order += '2'; });

		fn(function () { order += '3'; });

		fn.defer(function () {
			expect(order).toBe('132');
			done();
		});
	});

	it('fn.define sandbox', function (done) {

		function fn5 () {};

		fn.defer(function () {
			expect(fn('fn5')).toBe(fn5);
			done();
		});

		fn.define('fn5', ['fn1', 'fn2', 'fn3', 'fn4', function (fn1, fn2, fn3, fn4) {
			return fn5;
		}]);

	});

	it('fn.define injection', function (done) {

		function fn6 () {};

		fn.define('nothing', ['fn6', function (f6) {
			expect(f6).toBe(fn6);
			done();
			return 'nothing';
		}]);

		fn.define('fn6', function () {
			return fn6;
		});
	});

	it('fn.define implicit injection', function (done) {

		function fn7 () {};

		fn.define('nothing', function (f7) {
			expect(f7).toBe(fn7);
			done()
			return 'nothing';
		});

		fn.define('f7', function () {
			return fn7;
		});
	});

	it('fn.define implicit injection (2)', function (done) {

		function fn8 () {};
		function fn9 () {};

		fn.define('nothing', function (f8, f9) {
			console.log('fn.define implicit injection (2)', f8, f9);
			expect(f9).toBe(fn9);
			done();
			return 'nothing';
		});

		fn.define('f8', function () {
			return fn8;
		});

		fn.define('f9', function () {
			return fn9;
		});
	});
});
