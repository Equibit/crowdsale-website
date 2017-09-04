$(function() {

    document.token = "";

    $('.button').click(function(){
        var url = $(this).data('url');
        var method = $(this).data('method');
        var resultsID = $(this).data('results');
        var rawData = $(this).data('api-data');
        var data;
        if (typeof rawData !== 'undefined') {
            data = JSON.parse($('#' + rawData).val());
        } else {
            data = {};
        }
        var extraVar = $(this).data('url-data');
        if (typeof extraVar !== 'undefined') {
            var value = $('#' + extraVar).val();
            if (value !== '') url = url + value + '/';
        }

        if (typeof $(this).data('unsigned') !== 'undefined') {
            requestUnsigned(method, url, data,
                function (res) {
                    $('#' + resultsID).val(JSON.stringify(res));
                    if (typeof res.accessToken !== 'undefined') document.token = res.accessToken;
                },
                function (res) {
                    $('#' + resultsID).val(JSON.stringify(res));
                });
        } else {
            requestSigned(method, url, data,
                function (res) {
                    $('#' + resultsID).val(JSON.stringify(res));
                },
                function (res) {
                    $('#' + resultsID).val(JSON.stringify(res));
                });
        }
    });

    function requestUnsigned (type, endPoint, paramObj, successFunc, errorFunc) {

        console.log("unsinged");

        $.ajax({
            url: endPoint,
            data: paramObj,
            headers: {
                "X-Requested-With": "XMLHttpRequest"
            },
            type: type.toUpperCase(),
            success: function(res) {
                if (typeof successFunc === 'function') {
                    if (typeof res.success !== 'undefined') successFunc(res.success);
                    else successFunc(res);
                }
            },
            error: function(xhr){
                if (xhr.responseText) {
                    if (typeof errorFunc === 'function') errorFunc(JSON.parse(xhr.responseText));
                } else {
                    if (typeof errorFunc === 'function') errorFunc({});
                }
            }
        });
    }

    function requestSigned (type, endPoint, paramObj, successFunc, errorFunc) {

        console.log("singed", document.token);

        $.ajax({
            url: endPoint,
            data: paramObj,
            headers: {
                "Authorization": 'Bearer ' + document.token + '',
                "X-Requested-With": "XMLHttpRequest"
            },
            type: type.toUpperCase(),
            success: function(res) {
                if (typeof successFunc === 'function') {
                    if (typeof res.success !== 'undefined') successFunc(res.success);
                    else successFunc(res);
                }
            },
            error: function(xhr){
                if (xhr.responseText) {
                    if (typeof errorFunc === 'function') errorFunc(JSON.parse(xhr.responseText));
                } else {
                    if (typeof errorFunc === 'function') errorFunc({});
                }
            }
        });
    }
});