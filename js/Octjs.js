/*
*	OctJs JavaScript Toolkit v1.0
*	https://github.com/younglaker/octjs
*	Description: Contains many usual functions for web devolepment.
*	Copyright 2013, Laker Huang
*	Released under the MIT Licenses.
*	Date: 2013-05-27 to one day
*/

(function() {

	window.O = Oct = function(selector) {
	    return new Octobj(selector);
	};

	Oct.version = "1.0";

	//  selector: the elements you want.
	//  root_id: the root's id of the elements you want.
	//  tag: point out the specific tag of the selector. If none, it's document.
	var Octobj = function(selector, root_id, tag) {
		// agrs: the specific tag of the selector.
		// type: id("#"), class(".") or tag("&")
		var agrs, type, eles;
		var selector_exp = /^(?:#(\w-_)+|\.(\w-_)+|(\w)+)$/;
		this.elements = [];

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if (!selector) {
			return this;
		}

		if (root_id) {
			root_id = typeof root_id == "string" ? document.getElementById(root_id) : root_id;
		} else {
			root_id = document.body;
		}

		tag = tag || "*";

		//去掉开头的空格，再已空格串分割
		selector = selector.replace(/^\s+/, "").split(/\s+/);
		args = root_id.getElementsByTagName(tag);
		// type = selector.charAt(0);
		type = selector[0].charAt(0);
		console.log(type);

		eles = selector[0].slice(1);

		if (type == ".") {
			for (var i = 0; i < args.length; i++) {
				if (args[i].className == eles) {
					var a  = args[i];
					this.elements.push(a);
					console.log(a);
				}
			}
		}

		if (type == "#") {
			this.elements.push(document.getElementById(eles));
		}
/*
		for (var i = 0, n = args.length; i < n; i++) {
			for (var j = 0, k = args[i].className.split(""), l = k.length; j < l; j++) {
				if (k[j] == selector) {
					this.elements.push(args[i]);
					break;
				}
			}
		}*/


		return this;
	};

/*	var Octobj = function(selector) {
		this.elements = document.getElementById(selector);
		return this;
	};
*/
	Octobj.prototype = {

		each: function(d) {
			for (var c = 0; c < this.elements.length; c++) {
				d.call(this, this.elements[c])
			}
			return this;
		},

		html: function(text) {
			this.each(function(e) {
	    	console.dir(e);
				e.innerHTML = text;
			});
	    return this;
		},

		setCss: function(property_list) {

			this.each(function(e) {
				// "name" stores the index of "property_list"
				for (var name in property_list) {
					this.elements.style[name] = property_list[name];
				}
			});

			return this;
		},

		getCss: function(property) {
			var pro_val = [];

			// IE
			if (document.documentElement.currentStyle) {

				this.each(function(e) {
					for (var i in arguments){
						pro_val.push(this.elements.currentStyle[arguments[i]]);	
					}
				});


			// not IE
			} else if (window.getComputedStyle) {

				this.each(function(e) {
					for (var i in arguments){
						pro_val.push(window.getComputedStyle(this.elements, null).getPropertyValue(arguments[i]));
					}
				});


			}

			return pro_val.join(",");
		},

		a: function() {
			alert("message");;
		}

	};


	Oct.stopBubble = function() {

	  e = window.event || event;

		// IE
	  if(document.all) {
	  	e.cancelBubble = true;
	  }

		// not IE
	  else {
	  	e.stopPropagation();
	  }

	};

	Oct.alert = function(msg) {
		alert(msg);
	};

}());