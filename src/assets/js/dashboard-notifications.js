(function () {
    $(document).ready(function () {
        var addNotification = function (elem) {
            notifications.append(elem);
            Foundation.Motion.animateIn(elem, 'slide-in-down');
        },
        notifications = $('.notifications.dashboard'),
            yayHtml = `
            <div id="success" data-closable="hinge-out-from-top" data-closable class="callout alert-callout-border success">
                <span class="fa fa-check-circle"></span>     
                    <span class="content">
                        <strong>Yay!</strong> - You accomplished a simple task!
                    </span>
                    <button class="close-button" aria-label="Dismiss alert" type="button" data-close>
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            `,
        warnHtml = `
        <div id="warning" data-closable="hinge-out-from-top" class="callout alert-callout-border warning">
            <span class="fa fa-exclamation-triangle"></span>
            <span class="content">
                <strong>Caution</strong> - A word I don't understand.
            </span>
            <button class="close-button" aria-label="Dismiss alert" type="button" data-close>
        <span aria-hidden="true">&times;</span>
        </button>
        </div>
        `,
        alertHtml = `
        <div id="alert" data-closable="hinge-out-from-top" class="hidden callout alert-callout-border alert">
            <span class="fa fa-times-circle"></span>
            <span class="content">
                <strong>Error</strong> - You are the error.
            </span>
            <button class="close-button" aria-label="Dismiss alert" type="button" data-close>
        <span aria-hidden="true">&times;</span>
        </button>
        </div>`,
        infoHtml = `
            <div id="info" data-closable="hinge-out-from-top" class="callout alert-callout-border info">
                <span class="fa fa-info-circle"></span>
                <span class="content"><strong>Whoops!</strong> - You clearly did that wrong.</span>
                <button class="close-button" aria-label="Dismiss alert" type="button" data-close>
            <span aria-hidden="true">&times;</span>
            </button>
            </div>
        `;
        $('#yay').click(function () {
            addNotification($(yayHtml));           
        });
        $('#warn').click(function () {
            addNotification($(warnHtml));
        });
        $('#danger').click(function () {
            addNotification($(alertHtml));
        });
        $('#info').click(function () {
            addNotification($(infoHtml));
        });
        $('#combo').click(function () {
            addNotification($(infoHtml));
            addNotification($(alertHtml));
            addNotification($(warnHtml));
        });
        window.addNotification = function (html) {
            addNotification($(html));
        };
    });
})();
