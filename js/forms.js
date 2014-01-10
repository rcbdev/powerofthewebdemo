$(function () {
    $('#checkSupport').click(function () {
        $('.form-item').each(function () {
            var $this = $(this),
            $input = $this.find('input'),
            $tag = $this.find('.form-tag');

            if ($input.attr('type') == $input.prop('type')) {
                $tag.css('color', '#3b3');
            }
            else {
                $tag.css('color', '#b33');
            }
        });
    });
})