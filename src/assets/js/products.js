(function () {

    $(document).ready(function () {
        var products = {};
        products.startBdi2 = function () {
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

        };

        window.products = products;
    });

})();