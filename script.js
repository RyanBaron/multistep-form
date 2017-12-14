(function( $ ) {
	'use strict';

	$(function() {

		$.InsightlyMultStep = function (element) {
			//store the passed element as a property of the created instance.
			this.element = (element instanceof $) ? element : $(element);
			this.multistep_data = {
				'multistep_ready': false,
				'is_multistep': false,
				'current_page' : 0,
				'next_page': 0,
				'prev_page': 0,
				'last_page': 0
			};
			this.page_array = [];
			this.form_controls = this.element.find('.form-controls');
			this.form_control_navigate = this.form_controls.find('.form-navigate');
			this.form_control_submit = this.form_controls.find('.form-submit');
			this.form_control_prev = this.form_control_navigate.find('[data-nav-prev]');
			this.form_control_submit_prev = this.form_control_submit.find('[data-nav-prev]');
			this.form_control_next = this.form_control_navigate.find('[data-nav-next]');
		};

		$.InsightlyMultStep.prototype = {

			init: function () {
				//`this` references the instance object inside of an instace's method,
				//however `this` is set to reference a DOM element inside jQuery event
				//handler functions' scope. So we take advantage of JS's lexical scope
				//and assign the `this` reference to another variable that we can access
				//inside the jQuery handlers
				var that = this;

				// Set the page data.
				that.setPageData();

				// After the page data is set, run the start function!
				var run = setInterval(function(){ startMultistep() }, 500);
				function startMultistep() {
					if ( that.isMultiStepReady() ) {
						that.start();
						stopStartMultstepLoop();
					}
				}
				function stopStartMultstepLoop() {
					clearInterval(run);
				}

				// Listen for previous navigation clicks
				this.form_control_prev.on( 'click', function( e ) {
					e.preventDefault();
					that.goToPrevPage();
				});

				// Listen for previous navigation clicks
				this.form_control_submit_prev.on( 'click', function( e ) {
					e.preventDefault();
					that.goToPrevPage();
				});

				// Listen for next navigation clicks
				this.form_control_next.on( 'click', function( e ) {
					e.preventDefault();
					/**
					 * ToDo: add some basic form filed validation, prevting the user from moving to the next page if it fails.
					 */
					that.goToNextPage();
				});
			},
			start: function() {
				var that = this;
				that.showCurrentPage();
				that.updatePageControls();
			},
			goToNextPage: function() {
				var that = this;
				var next_page = that.getNextPage();
				var page_updated = false;

				$.each( that.page_array, function( key, value ) {
					if ( key === next_page ) {
						that.page_array[key].removeClass('hide-page').addClass('show-page');
						page_updated = true;
					}
					else {
						that.page_array[key].removeClass('show-page').addClass('hide-page');
					}
				});

				if( page_updated ) {
					that.setNextPage( ( next_page + 1 ) );
					that.setPrevPage( ( next_page - 1 ) );
					that.setCurrentPage( next_page );
					that.updatePageControls();
				}
			},
			goToPrevPage: function() {
				var that = this;
				var prev_page = that.getPrevPage();
				var page_updated = false;

				$.each( that.page_array, function( key, value ) {
					if ( key === prev_page ) {
						that.page_array[key].removeClass('hide-page').addClass('show-page');
						page_updated = true;
					}
					else {
						that.page_array[key].removeClass('show-page').addClass('hide-page');
					}
				});

				if( page_updated ) {
					that.setNextPage( ( prev_page + 1 ) );
					that.setPrevPage( ( prev_page - 1 ) );
					that.setCurrentPage( prev_page );
					that.updatePageControls();
				}
			},
			showCurrentPage: function() {
				var that = this;
				var current_page = that.getCurrentPage();

				$.each( that.page_array, function( key, value ) {
					if ( key === current_page ) {
						that.page_array[key].removeClass('hide-page').addClass('show-page');
					}
					else {
						that.page_array[key].removeClass('show-page').addClass('hide-page');
					}
				});
			},
			updatePageControls: function() {
				var that = this;
				var current_page = that.getCurrentPage();
				var current_page_item = that.getPageArrayItem(current_page);
				var next_text = current_page_item.attr('data-next-text') || 'Next';
				var prev_text = current_page_item.attr('data-prev-text') || 'Back';

				if (that.multistep_data.last_page === current_page ) {
					// If we are on the last page, show the submit controls
					that.updatePrevPageSubmitControl(prev_text);
					this.form_control_navigate.removeClass('show-controls').addClass('hide-controls');
					this.form_control_submit.removeClass('hide-controls').addClass('show-controls');
				}
				else if ( current_page === 0 ) {
					// If we are on the first page, only show the next button
					that.updatePrevPageControl('');
					that.updateNextPageControl(next_text);
					this.form_control_navigate.removeClass('hide-controls').addClass('show-controls');
					this.form_control_submit.removeClass('show-controls').addClass('hide-controls');
				}
				else {
					// If we are not on the first/last page, show the prev and next buttons
					that.updatePrevPageControl(prev_text);
					that.updateNextPageControl(next_text);
					this.form_control_navigate.removeClass('hide-controls').addClass('show-controls');
					this.form_control_submit.removeClass('show-controls').addClass('hide-controls');
				}
			},
			updatePrevPageSubmitControl: function(text) {
				this.form_control_submit_prev.html(text);
			},
			updatePrevPageControl: function(text) {
				this.form_control_prev.html(text);
			},
			updateNextPageControl: function(text) {
				this.form_control_next.html(text);
			},
			getCurrentPage: function() {
				return this.multistep_data.current_page;
			},
			getNextPage: function() {
				return this.multistep_data.next_page;
			},
			getPrevPage: function() {
				return this.multistep_data.prev_page;
			},
			setNextPage: function(num) {
				this.multistep_data.next_page = num;
			},
			setCurrentPage: function(num) {
				this.multistep_data.current_page = num;
			},
			setPrevPage: function(num) {
				this.multistep_data.prev_page = num;
			},
			isMultiStepReady: function() {
				//console.log('multistep ready returns this: ', this.multistep_data.multistep_ready);
				return this.multistep_data.multistep_ready;
			},
			addToPageArray: function(item) {
				this.page_array.push(item);
			},
			getPageArrayItem: function(i) {
				if( i <= this.page_array.length ) {
					return this.page_array[i];
				}
				return '';
			},
			setPageData: function() {
				var that = this;
				var form_pages =  this.element.find('fieldset');

				if( form_pages.length > 1) {
					this.multistep_data.is_multistep = true;
					this.multistep_data.page_count = ( form_pages.length - 1 );
					this.multistep_data.last_page = ( form_pages.length - 1 );
					this.multistep_data.next_page = 1;

					form_pages.each(function() {
						$(this).addClass('hide-page');
						that.addToPageArray($(this));
					});

					that.form_controls.find('.form-navigate').addClass('hide-controls');
					that.form_controls.find('.form-submit').addClass('hide-controls');

					this.multistep_data.multistep_ready = true;
				}
			}
		};

		if ( $( '[data-insightly="multistep"]' ).length ) {
			$( '[data-insightly="multistep"]' ).each( function() {
				var InsightlyMultStep = new $.InsightlyMultStep($('[data-insightly="multistep"]'));
				InsightlyMultStep.init();
			});
		}
	});
})( jQuery );
