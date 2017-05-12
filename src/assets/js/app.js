$(document).foundation();

$(document).ready(function () {
    var pageName = window.PAGE_NAME || '';   
  

    switch (pageName) {
        case "clients":
            clients.startClients();
            break;
        case "assessments":
            assessments.startAssessments();
            break;
        case "bdi2":
            products.startBdi2();
            break;
        case "bai":
        products.startBai();
        break;
        case "viewclient":
        //startViewClient();
        break;
        case "referrals":
            referrals.startReferrals();
            break;
        default:
            break;
    }

    window.socketTopic = io('https://35.161.159.36:8443/topic');
    window.socketTopic.on('disconnect', function () {
        setTimeout(function () {
            console.log('reconnecting socket topic');
            window.socketTopic = io('https://35.161.159.36:8443/topic');
        }, 4000);
    });
    window.socketTopic.on('connect', function (){
        console.log('Connecting socket topic');
    });
});
