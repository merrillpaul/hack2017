(function () {

    $(document).ready(function () {
        var products = {};
        products.startBdi2 = function () {
            var holder =  $('#bdi2Holder');
            hackUtils.getCurrentSelectedClient(function (client) {
                var url = hackUtils.getBdi2Url() + "?patientID=" + client.id;
                
                holder.html(''.concat(
                    '<iframe width="420" height="auto" src="' ,
                        url,
                       '" frameborder="0" allowfullscreen></iframe>'   
                )  
                );
                products.listenForBdi(client);
            });

            

        };

        products.listenForBdi = function (client) {
            socketTopic.on('bdi', function (data) {
                var patientID = data.patientID,
                    score = data.score,
                    quickResult = data.clazz;
                    socketTopic.off('bdi'); 
                    $('#bdi2Holder').html('');
                    products.showNotification(client, score, quickResult)
            })
        };

        products.showNotification = function (client, score, quickResult) {
            var 
            clazz,
            yayHtml ;
            
            switch(quickResult.toLowerCase()) {
                case 'minimal':
                    clazz = 'success';
                    break;
                case 'mild': 
                    clazz = 'secondary';
                    break;
                case 'moderate':
                    clazz = 'warning';
                    break;
                case 'severe':
                    clazz = 'alert';
                    break;        
                default:
                    clazz = 'primary';
                    break;      
            }
            yayHtml = ''.concat(
            '<div id="bdiResultNotification" data-closable="hinge-out-from-top" data-closable class="callout ' + clazz +'-callout-border ' +  clazz + '">',
             '   <span class="fa fa-check-circle"></span>     ',
              '      <span class="content">',
               '         <h4>',
               client.PatientName,
               '  scores ',
               score,
               '</h4>',             
                '    </span>',
                 '   <button class="close-button" aria-label="Dismiss alert" type="button" data-close>',
                '<span aria-hidden="true">&times;</span>',
               ' </button>',
            '</div>'
            );
            addNotification(yayHtml);
            products.saveClientScore(client, score, quickResult);
        };

        products.saveClientScore =  function (client, score, quickresult) {
            var updateObject = {},
            quickResult = client.QuickResult || [],
            assessmentStatus = client.AssessmentStatus || [],
            assessmentAdministered = client.AssessmentAdministered || [],
            assessmentResult = client.AssessmentResult || [];

            quickResult.unshift(quickresult.toLowerCase());
            assessmentStatus.unshift('completed');
            assessmentAdministered.unshift('BDI-II');
            assessmentResult.unshift(score);
            updateObject = {

                QuickResult: quickResult,
                AssessmentStatus: assessmentStatus,
                AssessmentAdministered: assessmentAdministered,
                AssessmentResult: assessmentResult
            };
           
            dpd.patients.put(client.id, updateObject, function (result, err) {
                if (err) { return console.log(err); }
                console.log(result, result.id);
                setTimeout(function () {
                    Foundation.Motion.animateOut($('#bdiResultNotification'), 'hinge-out-from-top');
                    $('#bdiResultNotification').remove();
                }, 1500);
                setTimeout(function () {
                    self.location = 'patients.html';
                }, 2000);
            });
        };

        window.products = products;
    });

})();