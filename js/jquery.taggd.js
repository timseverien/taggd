(function($) {
    var settings = {
        'offset': { 'left': 0, 'top': 0 },
        'align': {
            'x': 'center',
            'y': 'center'
        }
    };

    var methods = {
        'init': function(opt) {
            var wrapper = $('<div class="taggd" style="position: relative;" />');
            var $this = this;

            $this.wrap(wrapper);
            $.extend(settings, opt);

            $(window).resize(function() {
                methods.draw.call($this);
            });
        },

        'items': function(items) {
            var $wrapper = this.parent('.taggd');
            var $this = this;

            $this.on('load', function() {
                $this.css({ 'height': 'auto', 'width': 'auto' });

                var height = this.height;
                var width = this.width;

                $.each(items, function(i, v) {
                    var hover = $('<span class="taggd-item-hover" style="display: none; position: absolute;" />').html(v.text);
                    var item = $('<span class="taggd-item" style="position: absolute;" />');

                    if(v.x > 1 && v.y > 1) {
                        v.x = v.x / width;
                        v.y = v.y / height;
                    }

                    hover.attr('data-x', v.x);
                    hover.attr('data-y', v.y);
                    item.attr('data-x', v.x);
                    item.attr('data-y', v.y);

                    $wrapper.append(hover);
                    $wrapper.append(item);

                    item.hover(
                        function() { hover.show(); },
                        function() { hover.hide(); }
                    );
                });

                $this.removeAttr('style');
                methods.draw.call($this);
            });
        },

        'draw': function() {
            var $this = this;
            var $parent = $this.parent('.taggd');

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
                    if(settings.align.x === 'center') {
                        left -= $el.outerWidth(true) / 2;
                    } else if(settings.align.x === 'right') {
                        left -= $el.outerWidth(true)
                    }

                    if(settings.align.y === 'center') {
                        top -= $el.outerHeight(true) / 2;
                    } else if(settings.align.y === 'bottom') {
                        top -= $el.outerHeight(true)
                    }

                    $el.css({
                        'left': left + settings.offset.left,
                        'top': top + settings.offset.top
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
