(function () {
    $(document).ready(function () {
        $('#validationExample .form-fld').each(function (idx, formFld) {
            $(formFld).find('input').focus(function () {
                var fldCtr = $(formFld).find('.fld-error-ctr');
                if (!fldCtr) {
                    return;
                }
                
                if (!$(fldCtr).is(':visible')) {
                    //Foundation.Motion.animateIn(fldCtr, 'hinge-in-from-top', function () {
                        $(formFld).addClass('invalid');
                    //});
                }
            });

            $(formFld).find('input').blur(function () {
                var fldCtr = $(formFld).find('.fld-error-ctr');
                if (!fldCtr) {
                    return;
                }
                if ($(fldCtr).is(':visible')) {
                   // Foundation.Motion.animateOut(fldCtr, 'hinge-out-from-top');
                    $(formFld).removeClass('invalid');
                }
            });
        });
        
    });
})();
function changeState(el) {
        if (el.readOnly) el.checked=el.readOnly=false;
        else if (!el.checked) el.readOnly=el.indeterminate=true;
    }