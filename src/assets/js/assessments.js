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
        var holder =  $('#bdi2Holder');
            hackUtils.getCurrentSelectedClient(function (client) {
                var url = hackUtils.getBdi2Url();// + "&patient_id=" + client.id;
                
                holder.html(''.concat(
                    '<iframe width="420" height="auto" src="' ,
                        url,
                       '" frameborder="0" allowfullscreen></iframe>'   
                )  
                );
            });
        $('#bd2Modal').foundation('open')
    } else {
        self.location = url;
    }
};

hackUtils.getCurrentSelectedClient(function (client) {
    $('#asmt-patient-name').html(client.PatientName);
});

window.assessments = assessments;

})();    