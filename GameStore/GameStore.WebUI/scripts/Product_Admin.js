$().ready(function () {
    //Load Categories when the page is loaded
    loadList(0);

    //Enable filter
    $("#categoryFilter").on('change', function (e) {
        loadList(this.value);
    });

    $('#AddModal').on('show.bs.modal', function () {
        $('#AddModal').find('#ProductName').val("");
        $('#AddModal').find('#CategoryId').val("");
        $('#AddModal').find('#Price').val("");
        $('#AddModal').find('#Image').val("");
        $('#AddModal').find('#Condition').val("");
        $('#AddModal').find('#Discount').val("");
        clearMessage();
    })
    //Add a function to reload the list when the dialog closes
    $('#AddModal').on('hidden.bs.modal', function () {
        loadList($("#categoryFilter").val());
    })

    $('#EditModal').on('show.bs.modal', function () {
        clearMessage();
    })

    $('#EditModal').on('hidden.bs.modal', function () {
        loadList($("#categoryFilter").val());
    })
});

//Make an ajax call to load the categories
function loadList(categoryid) {
    $("#modelList").find('tbody').empty();
    var url = '/api/Product/?CategoryId=' + categoryid + '&CategoryName=AAA';
    $.getJSON(url, function (data) {
        $.each(data, function (i, product) {
            $('#modelList tbody').append("<tr><td>" + product.ProductId + "</td><td>" + product.ProductName + "</td><td>" + product.CategoryName + "</td><td>" + product.Price + "</td><td>" + product.Image + "</td><td>" + product.Condition + "</td><td>" + product.Discount + "</td><td><span><a class='btn btn-success' href='javascript:editModel(\"" + product.ProductId + "\");'> Edit</a></span><span style='padding-left: 5px'><a class='btn btn-danger' href='javascript:deleteModel(\"" + product.ProductId + "\");'> Delete</a></span></td></tr>");
        });
    });
}

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
});

//Make an ajax call to delete a model object
function deleteModel(id) {
    var result = confirm("Are you sure to delete?");
    if (result) {
        $.ajax({
            url: '/api/Product/' + id,
            type: 'DELETE',
            success: function (result) {
                if (result == "Okay") {
                    loadList();
                } else {
                    alert(result);
                }
            },
            error: function (result) {
                alert("Unable to delete product. Error:" + result);
            }
        });
    }
}

function editModel(id) {
    $.ajax({
        url: '/api/Product/' + id,
        type: 'GET',
        success: function (result) {
            $('#EditModal').find('#ProductId').val(result.ProductId);
            $('#EditModal').find('#ProductName').val(result.ProductName);
            $('#EditModal').find('#CategoryId').val(result.CategoryId);
            $('#EditModal').find('#Price').val(result.Price);
            $('#EditModal').find('#Image').val(result.Image);
            $('#EditModal').find('#Condition').val(result.Condition);
            $('#EditModal').find('#Discount').val(result.Discount);
            $('#EditModal').find('#UserId').val(result.UserId);
            $('#EditModal').modal('show');
        },
        error: function (result) {
            alert("Unable to edit category.")
        }
    });
}

function onSuccess(data) {
    if (data == "Okay") {
        $('#AddModal').modal('hide');
        $('#EditModal').modal('hide');
    } else {
        clearMessage();
        $('.text-danger ul').append("<li>" + data + "</li>")
    }
}

function clearMessage() {
    $(".text-danger").addClass("validation-summary-errors");
    $(".text-danger").removeClass("validation-summary-valid");
    $('.text-danger ul').children().remove();
}

function onFailure(data) {
    alert('An error occurred, please try again.');
    //alert('Error:' + data.responseText);
}