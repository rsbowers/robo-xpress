'use strict';

module.exports = function(grunt) {

	grunt.registerMultiTask('robo', 'Robo', function() {
		var roboTasks = (function(robo, options) {

			return robo = {

				//task init
				init: function() {
					//register tasks
					grunt
						.registerTask('robo:compile', robo.compile)

					//run tasks
					grunt
						.task.run([
							'robo:compile'
						])
				},

				compile: function() {
					var r = require('../lib/robo').compile();
				}
			}

		})(roboTasks || {}, this.data).init()
	})
}
