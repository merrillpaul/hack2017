/**
 * AssessmentAdministered - BDI-II, PHQ-9
AssessmentStatus - initiated, complete, invitation sent
QuickResult - minimal, mild, moderate, severe
AssessmentResult - score calculated in Qualtrics.
 */


(function () {
window.referrals = {};

referrals.startReferrals = function () {        


        var referrals = [],            
          
            prepReferrals = function () {
            var referralContainer = $('#referrals-ctr'),
                referral,
                html = '',
                i = 0,
                searchBox = $('#search-referral'),
                paintReferrals = function (_referrals) {
                    referralContainer.html('');
                    html = '';
                    for (i = 0; i < _referrals.length; i++) {
                        referral = _referrals[i];              
                     

                        html += ''.concat(
                            '<div class="medium-6 small-12 large-4 columns ' + (i === _referrals.length - 1 ? 'float-left' : '') + '">',
                            '    <div class="card">',
                            '    <div class="card-divider">',
                                    referral.PhysicianName,  
                            '     <i class="primary float-right fa fa-user-md" aria-hidden="true""></i>',                       
                            '    </div>',
                            '    <div class="card-section emotion ">',
                            '      <h5>Speciality: ' + referral.Specialty + '</h5>',
                            '      <h6>Address: ' + (referral.Address || '') + '</h6>',
                            '      <h6>Phone: ' + (referral.Contact || '') + '</h6>',
                            '      <h6>Email: ' + (referral.email || '') + '</h6>',
                            '    </div>',
                            '  </div>',
                            '</div>',
                        );

                    }
                    referralContainer.html(html);
                };


            dpd.referrals.get(function (result, err) {
                if(err) { return console.log(err); }
                referrals = result;                
                paintReferrals(referrals);
            });
            
            searchBox.on('keyup', function () {
                setTimeout(function () {
                    paintReferrals(referrals.filter(function (it) {
                        return it.PhysicianName.toLowerCase().indexOf(searchBox.val().toLowerCase()) >= 0;
                    }));
                }, 400);
            })
        };
        prepReferrals();

    };

})();    