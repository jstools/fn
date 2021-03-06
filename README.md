jEngine: fn [![wercker status](https://app.wercker.com/status/2675049afb0e2dc763867d5d6bcde848/s "wercker status")](https://app.wercker.com/project/bykey/2675049afb0e2dc763867d5d6bcde848)
==================================
[![npm version](https://badge.fury.io/js/jengine-fn.svg)](http://badge.fury.io/js/jengine-fn)
[![Bower version](https://badge.fury.io/bo/jengine-fn.svg)](http://badge.fury.io/bo/jengine-fn)
[![Build Status](https://travis-ci.org/jstools/fn.svg?branch=master)](https://travis-ci.org/jstools/fn)
> [MIT License](LICENSE)

> global function 'fn' to sandbox all other definitions

Old Browsers
------------
> it's recomended to add this code before scripts to ensure compatibility with old browsers

``` html
<!--[if lt IE 9]>
    <script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/4.0.5/es5-shim.min.js"></script>
<![endif]-->
<!--[if lt IE 12]>
    <script src="//cdnjs.cloudflare.com/ajax/libs/es6-shim/0.21.1/es6-shim.min.js"></script>
<![endif]-->
```

Installation
------------
``` sh
npm install jengine-fn --save
```
  or
``` sh
bower install jengine-fn --save
```

Usage
-----
### fn.define(moduleName, dependencies?, definition)

``` js
fn.define('moduleName', [ 'dependence_1', 'dependence_2', ..., function ( dependence_1, dependence_1, ...) {

	// your code

	return definition;
} ]);
```

### example
``` js
fn.define('isLargeString', [ '_', function ( _ ) {

	function isLargeString (str) {
		return _.isString(str) && str.length > 45;
	}

	return isLargeString;
} ]);
```

### fn.require(dependencies, callback)
``` js
fn.require(['dependence_1', 'dependence_2'], function ( dependence_1, dependence_1 ) {

	// your code

} ]);
```

### fn.run(dependencies || function)
> or just **fn(dependencies || function)**

> explicit injection mode

``` js
fn.run(['dependence_1', 'dependence_2', function ( dependence_1, dependence_1 ) {

	// your code

} ]);
```

> implicit injection mode (dependencies will be automatically detected -not recomended when uglifying code- )

``` js
fn.run(function ( dependence_1, dependence_1 ) {

	// your code

});
```

### fn.defer(function, timeout? (0) )

``` js
fn(function () { console.log('test 1'); });
fn.defer(function () { console.log('test 2'); });
fn(function () { console.log('test 3'); });
```

> output:
```
test 1
test 3
test 2
```
