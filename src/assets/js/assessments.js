/**
 * AssessmentAdministered - BDI-II, PHQ-9
AssessmentStatus - initiated, complete, invitation sent
QuickResult - minimal, mild, moderate, severe
AssessmentResult - score calculated in Qualtrics.
 */


(function () {
var assessments = {};    

assessments.startAssessments = function () {        


};

assessments.administerBdi = function (url, id) {
    if ( Foundation.MediaQuery.current === 'small') {
        $('#bd2Modal').foundation('open')
    } else {
        self.location = url;
    }
};

window.assessments = assessments;
})();    