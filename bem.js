/* jshint devel:true */
/* exported BEM */

// ============================================================
//
// suit: http://suitcss.github.io/
// -------------------------------------
// BlockName
// BlockName--modifierName
// BlockName-elementName
// BlockName-elementName--modifierName
//
// inuit: http://inuitcss.com/
// ---------------------------
// block-name
// block-name--modifier-name
// block-name__element-name
// block-name__element-name--modifier-name
//
// yandex: http://bem.info/
// ------------------------
// block-name
// block-name__elemement-name
// block-name_modifier_name
// block-name__element-name_modifier_name
//
// ============================================================

var BEM = (function() {
  'use strict';

  var methodologies = {
	  "suit": {
	    modifier: /^([A-Z][a-zA-Z]*(?:\-[a-zA-Z]+)?)\-\-[a-zA-Z]+$/,
	    element: /^([A-Z][a-zA-Z]*)\-[a-zA-Z]+$/
	  },
	  "inuit": {
	    modifier: /^((?:[a-z]+\-)*[a-z]+(?:__(?:[a-z]+\-)*[a-z]+)?)\-\-(?:[a-z]+\-)*[a-z]+$/,
	    element: /^((?:[a-z]+\-)*[a-z]+)__(?:[a-z]+\-)*[a-z]+$/
	  },
	  "yandex": {
	    modifier: /^((?:[a-z]+\-)*[a-z]+(?:__(?:[a-z]+\-)*[a-z]+)?)_(?:[a-z]+_)*[a-z]+$/,
	    element: /^((?:[a-z]+\-)*[a-z]+)__(?:[a-z]+\-)*[a-z]+$/
	  }
	};


  function get_random_color() {
    var letters = '0123456789ABCDEF'.split(''),
    	color = '#';

    for (var i = 0; i < 6; i++) {
      color += letters[Math.round(Math.random() * 15)];
    }

    return color;
  }

  var BEM = {
  	matchAllMethodologies: function(){
      var result = [];

      for (var method in methodologies) { 
        result = BEM.matchAllType(method, result);
      }
      
      return result;
  	},

    matchAllType: function(methedology, startingArray){
      var allClasses = BEM.getAllClassNames(),
          BEMList = startingArray || [];

      for (var i = 0, len = allClasses.length; i < len; i++) {
        var result = BEM.getBlockName(allClasses[i], methedology);

        if (result !== false && BEMList.indexOf(result) === -1) {
          BEMList.push(result);
        }
      }

      return BEMList
    },

  	getBlockName: function(elementOrModifier, methodology) {
	    var block
	      , methodology = methodologies[methodology]

	    if (methodology.modifier.test(elementOrModifier))
	      return block = RegExp.$1
	    if (methodology.element.test(elementOrModifier))
	      return block = RegExp.$1

	    return block || false
	  },

  	isElement: function(cls, methodology) {
	    return methodologies[methodology].element.test(cls)
	  },

  	isModifier: function(cls, methodology) {
	    return methodologies[methodology].modifier.test(cls)
	  },

    getAllClassNames: function() {
      var allTags = document.body.getElementsByTagName('*');

      // Fastest http://jsperf.com/fastest-array-loops-in-javascript/133
      var len = allTags.length,
        classNames = {},
        classList = [],
        i = 0,
        tag;

      // Loop through all tags
      while (i < len) {
        tag = allTags[i];

        if (tag.className) {
          var classes = tag.classList, //tag.className.split(" "),
            classLen = classes.length,
            j = 0;

          // Loop through all class names on the tag
          while (j < classLen) {

            var className = classes[j];

            if (!classNames[className]) {
              classNames[className] = true;
            }

            j++;
          }
        }

        i++;
      }

      // Now that we have an object of unique names we an turn to an array
      for (var name in classNames) classList.push(name);

      return classList;
    },
    highlightClass: function( className ) {
      var randColor = get_random_color();

      var matched = document.getElementsByClassName(className);

      var i = 0;
      while (i < matched.length) {
        matched[i].style.boxShadow = '0 0 0 4px ' + randColor;
        i++;
      }

    },
    highlightMatched: function( classesArray ){
      var i = 0;
      while (i < classesArray.length) {
        BEM.highlightClass( classesArray[i] );
        i++;
      }
    },

    highlightBEMElements: function() {
      var results = BEM.matchAllMethodologies();
      BEM.highlightMatched(results);
    }
  };

  return BEM;
})();