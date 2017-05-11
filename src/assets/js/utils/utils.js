(function () {
    var utils = {};

    utils.getCurrentSelectedClient = function (callback) {
        if (localStorage.getItem('selClient')) {
            dpd.patients.get(localStorage.getItem('selClient'), function (result) {
                // $('#asmt-patient-name').html(result.PatientName);
                callback(result);
            });
        }
    };

    window.hackUtils = utils;
})();