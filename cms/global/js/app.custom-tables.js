(function(){

    var $table = $('.rte-container table');

    $table.each(function(){
        var $this = $(this);
        var hasHeaders = $this.find('th').length !== 0;
        if($this.find('th').length === 0){
            $table.attr('data-sorting','false');
            $this.find('tbody tr').first().find('td').each(function(){
                $(this).attr('data-breakpoints', 'xs');
            });
            $this.addClass('no-header');
        } else {
            var $thead = $('<thead><tr></tr></thead>').prependTo($this);
            $table.attr('data-sorting','true');
            $thead = $this.find('thead tr');

            $this.find('th').each(function(index){
                $(this).appendTo($thead);
            });
            $this.find('tbody tr').first().remove();
            $this.find('th').each(function(index){
                $(this).attr('data-breakpoints', 'xs');
            });
        }



        $this.addClass('table');



        $this.find('tbody tr').each(function(index){
            $(this).attr('data-expanded', 'true');

        });

        $this.footable({
            'getWidth': function(ft){
                return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            }
        });
        function addStyles() {
            if(!hasHeaders && (APP.configs.viewport.size === 'small' || APP.configs.viewport.size === 'xsmall')){
                $this.find('.footable-detail-row').each(function(index){
                    if(index % 2 !== 0){
                        $(this).addClass('odd')
                    }
                });
            } else{
                $this.find('tbody tr').each(function(index){
                    if(index % 2 !== 0){
                        $(this).addClass('odd')
                    }
                });
            }
        }
        addStyles();
        $this.on('click', 'th', function (index, value) {
            $this.find('tr').removeClass('odd');
            addStyles();
        })
    });

})();

