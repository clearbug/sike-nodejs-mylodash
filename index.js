//index.js
var _ = {
	//once
	once: function(argFun){
		var isFirst = true;
		var result;
		if(typeof argFun !== 'function'){
			throw new TypeError('Expected a function');
		}
		return function(){
			if(isFirst){
				isFirst = false;
				result = argFun.apply(this, arguments);
			}
			return result;
		};
	},
	memoize: function(argFun, resolver){
		if(typeof argFun !== 'function'|| (resolver && typeof resolver != 'function')){
			throw new TypeError('Expected a function');
		}	
		var cache = {};
		var memoized = function(){
			var key = resolver ? resolver.apply(this, arguments):arguments[0];
			if(cache.hasOwnProperty(key)){
				return cache[key];
			}
			var value = argFun.apply(this, arguments);
			cache[key] = value;
			return value;
		};
		return memoized;
	},
	bind: function(fn, context){
		return function(){
			return fn.apply(context, arguments);
		};
	}
};
module.exports = _;
