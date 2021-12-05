
$(document).ready(function () {
    $(function () {
        $("#search").autocomplete({
            source: function (request, response) {
                $.ajax({
                    url: "/api/Product/GetAutoComplete/",
                    type: "GET",
                    data: {
                        name: request.term
                    },
                    dataType: "json",
                    success: function (data) {
                        response(data);
                    }
                });
            }
        });
    });
});