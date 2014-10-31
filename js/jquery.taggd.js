/*
 * jQuery Taggd
 * A helpful plugin that helps you adding 'tags' on images.
 *
 * Copyright (C) 2014 Tim Severien
 * License: MIT
 */

(function($) {
    var defaults = {
        align: {
            x: 'center',
            y: 'center'
        },

        handlers: {},

        offset: {
            left: 0,
            top: 0
        }
    };
<<<<<<< HEAD
	
	var methods = {
		show: function() {
			var $this = $(this);
			
			$this.addClass('active');
			$this.next().addClass('show');
		},
		
		hide: function() {
			var $this = $(this);
			
			$this.removeClass('active');
			$this.next().removeClass('show');
		},
		
		toggle: function() {
			var $hover = $(this).next();
			
			if($hover.hasClass('show')) {
				methods.hide.call(this);
			} else {
				methods.show.call(this);
			}
		}
	};
	
	var Taggd = function(element, options, data) {
		var _this = this;
		
		this.element = $(element);
		this.options = $.extend(true, {}, defaults, options);
		this.data = data;
		
		this.initWrapper();
		
		this.addDOM();
		this.updateDOM();
		
		$(window).resize(function() {
			_this.updateDOM();
		});
	};
	
	Taggd.prototype.initWrapper = function() {
		var wrapper = $('<div class="taggd-wrapper" />');
		this.element.wrap(wrapper);
		
		this.wrapper = this.element.parent('.taggd-wrapper');
	};
	
	Taggd.prototype.addData = function(data) {
		if($.isArray(data)) {
			this.data = $.merge(this.data, data);
		} else {
			this.data.push(data);
		}
		
		this.addDOM();
		this.updateDOM();
	};
	
	Taggd.prototype.setData = function(data) {
		this.data = data;
		
		this.addDOM();
		this.updateDOM();
	};
	
	Taggd.prototype.clear = function() {
		this.wrapper.find('.taggd-item, .taggd-item-hover').remove();
	};
	
	Taggd.prototype.dispose = function() {
		this.clear();
		this.element.unwrap(this.wrapper);
	};
	
	Taggd.prototype.addDOM = function() {
		var _this = this;
		
		this.clear();
		this.element.css({ height: 'auto', width: 'auto' });
		
		var height = this.element.height();
		var width = this.element.width();
		
		$.each(this.data, function(i, v) {
			var $item = $('<span class="taggd-item" style="position: absolute;" />');
			var $hover;
			
			if(
				v.x > 1 && v.x % 1 === 0 &&
				v.y > 1 && v.y % 1 === 0
			) {
				v.x = v.x / width;
				v.y = v.y / height;
			}
			
			$item.attr({
				'data-x': v.x,
				'data-y': v.y
			});
			
			_this.wrapper.append($item);
			
			if(typeof v.text === 'string' && v.text.length > 0) {
				$hover = $('<span class="taggd-item-hover" style="position: absolute;" />').html(v.text);
				
				$hover.attr({
					'data-x': v.x,
					'data-y': v.y
				});
				
				_this.wrapper.append($hover);
			}
			
			if(typeof _this.options.handlers === 'object') {
				$.each(_this.options.handlers, function(event, func) {
					var handler;
					
					if(typeof func === 'string' && methods[func]) {
						handler = methods[func];
					} else if(typeof func === 'function') {
						handler = func;
					}
					
					$item.on(event, function(e) {
						if(!handler) return;
						handler.call($item, e, _this.data[i]);
					});
				});
			}
		});
		
		this.element.removeAttr('style');
	};
	
	Taggd.prototype.updateDOM = function() {
		var _this = this;
		
		this.wrapper.removeAttr('style').css({
			height: this.element.height(),
			width: this.element.width()
		});
		
		this.wrapper.find('span').each(function(i, e) {
			var $el = $(e);
			
			var left = $el.attr('data-x') * _this.element.width();
			var top = $el.attr('data-y') * _this.element.height();
			
			if($el.hasClass('taggd-item')) {
				$el.css({
					left: left - $el.outerWidth(true) / 2,
					top: top - $el.outerHeight(true) / 2
				});
			} else if($el.hasClass('taggd-item-hover')) {
				if(_this.options.align.x === 'center') {
					left -= $el.outerWidth(true) / 2;
				} else if(_this.options.align.x === 'right') {
					left -= $el.outerWidth(true);
				}
				
				if(_this.options.align.y === 'center') {
					top -= $el.outerHeight(true) / 2;
				} else if(_this.options.align.y === 'bottom') {
					top -= $el.outerHeight(true);
				}
				
				$el.attr('data-align', $el.outerWidth(true));
				
				$el.css({
					left: left + _this.options.offset.left,
					top: top + _this.options.offset.top
				});
			}
		});
	};
	
	$.fn.taggd = function(options, data) {
		return new Taggd(this, options, data);
	};
})(jQuery);
=======

    var methods = {
        'init': function(opt) {
            var wrapper = $('<div class="taggd-wrapper" />');
            var $this = this;

            $this.wrap(wrapper);
            
            $this._data = [];

            $this.settings = {};
            $.extend(true, $this.settings, settings);
            $.extend(true, $this.settings, opt);

            $(window).resize(function() {
                methods.draw.call($this);
            });

            return this;
        },

        'items': function(items) {
        	var $this = this;
            $this._data = items;
            
            var $wrapper = $this.parent('.taggd-wrapper');
	        $wrapper.find('.taggd-item').remove();

            $this.css({ 'height': 'auto', 'width': 'auto' });

            var height = this.height;
            var width = this.width;

            $.each(items, function(i, v) {
                var item = $('<span class="taggd-item" style="position: absolute;" />');

                if(v.x > 1 && v.x % 1 === 0 && v.y > 1 && v.y % 1 === 0) {
                    v.x = v.x / width;
                    v.y = v.y / height;
                }

                item.attr('data-x', v.x);
                item.attr('data-y', v.y);

                $wrapper.append(item);

                if(typeof v.text === 'string' && v.text.length > 0) {
                    var hover = $('<span class="taggd-item-hover" />').html(v.text);

                    hover.attr('data-x', v.x);
                    hover.attr('data-y', v.y);

                    $wrapper.append(hover);
                }

                if(typeof $this.settings.handlers === 'object') {
                    for(var h in $this.settings.handlers) {
                        var f = $this.settings.handlers[h];

                        if(typeof f === 'string') {
                            switch(f) {
                                case 'show':
                                    item.on(h, methods.show);
                                    break;
                                case 'hide':
                                    item.on(h, methods.hide);
                                    break;
                                case 'toggle':
                                    item.on(h, methods.toggle);
                                    break;
                            }
                        } else if(typeof f === 'function') {
                            item.on(h, v, $this.settings.handlers[h]);
                        }
                    }
                }
            });

            $this.removeAttr('style');
            methods.draw.call($this);
        },
        
        'data':function(){
            return this._data;
        },

        'show': function() {
            var $this = $(this);
            $this.addClass('active');
            $this.next().addClass('show');
        },

        'hide': function() {
            var $this = $(this);
            $this.removeClass('active');
            $this.next().removeClass('show');
        },

        'toggle': function() {
            var hover = $(this).next();

            if(hover.hasClass('show')) methods.hide.call(this);
            else methods.show.call(this);
        },
	'clear':function(){
            var $this = this;
            var $wrapper = $this.parent('.taggd-wrapper');
            $wrapper.find('.taggd-item').remove();
            $wrapper.find('.taggd-item-hover').remove();
            $this.unwrap($('<div class="taggd-wrapper" />'));
        },
        'draw': function() {
            var $this = this;
            var $parent = $this.parent('.taggd-wrapper');

            $parent.removeAttr('style').css({
                'height': $this.height(),
                'width': $this.width()
            });

            $parent.find('span').each(function(i, e) {
                var $el = $(e);

                var left = $el.attr('data-x') * $this.width();
                var top = $el.attr('data-y') * $this.height();

                if($el.hasClass('taggd-item')) {
                    $el.css({
                        'left': left - $el.outerWidth(true) / 2,
                        'top': top - $el.outerHeight(true) / 2
                    });
                } else if($el.hasClass('taggd-item-hover')) {
                    if($this.settings.align.x === 'center') {
                        left -= $el.outerWidth(true) / 2;
                    } else if($this.settings.align.x === 'right') {
                        left -= $el.outerWidth(true)
                    }

                    if($this.settings.align.y === 'center') {
                        top -= $el.outerHeight(true) / 2;
                    } else if($this.settings.align.y === 'bottom') {
                        top -= $el.outerHeight(true)
                    }

                    $el.css({
                        'left': left + $this.settings.offset.left,
                        'top': top + $this.settings.offset.top
                    });
                }
            });
        }
    };

    $.fn.taggd = function(opt) {
        if(methods[opt]) {
            return methods[opt].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof opt === 'object' || !opt) {
            return methods.init.apply(this, arguments);
        }

        return this;
    };
})(jQuery);
>>>>>>> FETCH_HEAD
