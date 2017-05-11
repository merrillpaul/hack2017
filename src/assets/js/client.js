/**
 * AssessmentAdministered - BDI-II, PHQ-9
AssessmentStatus - initiated, complete, invitation sent
QuickResult - minimal, mild, moderate, severe
AssessmentResult - score calculated in Qualtrics.
 */


(function () {
window.clients = {};


clients.savePatient = function () {
    var 
    patientName = $('#newPatientForm input[name="patientName"]').val(),
    htmlAlert = ''.concat(
            '<div id="patientSuccess" data-closable="hinge-out-from-top" data-closable class="callout alert-callout-border success">',
                '<span class="fa fa-check-circle"></span>     ',
                    '<span class="content">',
                        '<strong>',
                        ' Patient ', patientName , ' saved to system',
                   ' </span>',
                    '<button class="close-button" aria-label="Dismiss alert" type="button" data-close>',
                '<span aria-hidden="true">&times;</span>',
                '</button>',
            '</div>'
            )
    dpd.patients.post({"PatientName":patientName}, function(result, err) {
            if(err) {
                return console.log(err);
            }
            addNotification(htmlAlert);
            setTimeout(function () {
                Foundation.Motion.animateOut($('#patientSuccess'), 'hinge-out-from-top');
                $('#patientSuccess').remove();
            }, 1500);
            setTimeout(function () {
                self.location = 'patients.html';
            }, 2000);
    });
    
};

clients.startClients = function () {        


        var clients = [], 
            
            badgeCreator = function(assessmentStatus) {
                var badgeHtml = '', badges = {}, badgeList = [];
                
                if (assessmentStatus && $.isArray(assessmentStatus) && assessmentStatus.length > 0) {

                    assessmentStatus.forEach(function (it) {
                        var type = it;
                        switch (it) {
                            case 'initiated': type = 'warning'; break;
                            case 'completed': type = 'success'; break;
                            case 'invitation sent': type = 'primary'; break;
                            default: type = 'secondary'; break;
                        }
                        if (!badges[type]) {
                            badges[type] = 0;
                        } 
                        badges[type] += 1;
                    });
                    Object.keys(badges).forEach( function (it) {
                        badgeList.push ({type: it, val: badges[it]});
                    });
                    badgeHtml = '<span class="badge-ctr">';
                    badgeList.forEach(function(badge) {
                        badgeHtml += '  <span class="badge ' + badge.type + '">' + badge.val + '</span>';
                        
                    });
                    badgeHtml += '</span>';
                    
                }
                
                return badgeHtml;
            },
            prepClients = function () {
            var clientContainer = $('#client-ctr'),
                client,
                html = '',
                i = 0,
                latestQuickResult,
                searchBox = $('#search-client'),
                paintClients = function (_clients) {
                    clientContainer.html('');
                    html = '';
                    for (i = 0; i < _clients.length; i++) {
                        client = _clients[i];
                        
                        client.gender = i%2 === 0 ? 'male': 'female';
                        latestQuickResult = (client.QuickResult || [''])[0];

                        html += ''.concat(
                            '<div class="medium-6 small-12 large-4 columns ' + (i === _clients.length - 1 ? 'float-left' : '') + '">',
                            badgeCreator(client.AssessmentStatus),
                            //(client.badge ? '  <span class="badge ' + client.badge.type + '">' + client.badge.val + '</span>' : ''),
                            '    <div class="card">',
                            '    <div class="card-divider">',
                            client.PatientName,
                            '      <i class="fa fa-pencil float-right" aria-hidden="true" onClick="localStorage.setItem(\'selClient\', \'' + client.id + '\');self.location=\'view_client.html\'"></i>',
                            '    </div>',
                            '    <div class="card-section emotion ' + latestQuickResult + '">',
                            '      <h6>Client Id: XXXX' + client.id + '</h6>',
                            '      <h5>DOB: ' + (client.DOB || '') + '</h5>',
                            '      <h5>Gender : <i class="fa fa-' + (client.gender) + '" aria-hidden="true"></i></h5>',

                            '              <a onClick="localStorage.setItem(\'selClient\', \'' + client.id + '\');self.location=\'assessments.html\'"  class="button primary expanded">',
                            '                <i class="fa fa-plus-circle" aria-hidden="true"></i> Assessment',
                            '      </a>',

                            '    </div>',
                            '  </div>',
                            '</div>',
                        );

                    }
                    clientContainer.html(html);
                }
            dpd.patients.get(function (result, err) {
            if(err) return console.log(err);
                 paintClients(result);
                 clients = result;
            });    
            
            searchBox.on('keyup', function () {
                setTimeout(function () {
                    paintClients(clients.filter(function (it) {
                        return it.PatientName.toLowerCase().indexOf(searchBox.val().toLowerCase()) >= 0;
                    }));
                }, 400);
            })
        };
        prepClients();

    };

})();    