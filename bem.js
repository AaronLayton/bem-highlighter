/* jshint devel:true */
/* exported BEM */
var BEM = (function() {
  'use strict';

  function get_random_color() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';

    for (var i = 0; i < 6; i++) {
      color += letters[Math.round(Math.random() * 15)];
    }

    return color;
  }

  var BEM = {
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

    getBEMClassNames: function() {
      var uniqueClassNames = BEM.getAllClassNames(),
        len = uniqueClassNames.length,
        BEMNames = {},
        BEMList = [],
        i = 0;

      // Loop through all tags
      while (i < len) {
        var className = uniqueClassNames[i],
          BEMName;

        if (className.indexOf('__') != -1) {
          BEMName = className.split('__')[0];

          if (!BEMNames[BEMName]) {
            BEMNames[BEMName] = true;
          }
        } else if (className.indexOf('--') != -1) {
          BEMName = className.split('--')[0];

          if (!BEMNames[BEMName]) {
            BEMNames[BEMName] = true;
          }
        }

        i++;
      }

      // Now that we have an object of unique names we an turn to an array
      for (var name in BEMNames) BEMList.push(name);

      return BEMList;
    },


    highlightBEMElements: function() {
      var BEMClasses = BEM.getBEMClassNames(),
        len = BEMClasses.length,
        i = 0;

      while (i < len) {
        var elements = document.getElementsByClassName(BEMClasses[i]),
          len2 = elements.length,
          BEMColor = get_random_color(),
          j = 0;

        while (j < len2) {
          console.log(elements[j]);
          elements[j].style.boxShadow = '0 0 0 4px ' + BEMColor;

          j++;
        }

        i++;
      }
    }
  };

  return BEM;
})();