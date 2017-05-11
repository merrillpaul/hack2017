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

    utils.getBdi2Url = function () {
        return 'https://pearsonclinical.eu.qualtrics.com/jfe/form/SV_1IikSYAFbJJX7Vj';
    };

     utils.getBaiUrl = function () {
        return 'https://pearsonclinical.eu.qualtrics.com/jfe/form/SV_etlcN7yN4rxZvwh';
    };

    window.hackUtils = utils;
})();