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
        case "summary":
            //startSummaryPage();
            break;
        case "viewclient":
        //startViewClient();
        default:
            break;
    }

    window.socketTopic = io('http://35.161.159.36:8888/topic');
    window.socketTopic.on('disconnect', function () {
        setTimeout(function () {
            console.log('reconnecting socket topic');
            window.socketTopic = io('http://35.161.159.36:8888/topic');
        }, 4000);
    });
    window.socketTopic.on('connect', function (){
        console.log('Connecting socket topic');
    });
});
