require(['../../common'], function (common) {
    require(['utility', 'css!../../../Scripts/dx/css/dx.common.css', 'css!../../../Scripts/dx/css/dx.light.css', 'jquery', '../../../Scripts/dx/js/dx.webappjs'], function (utility) {
        var utilityObj = new utility();

        function updateCampaign(data) {
            $.ajax({
                    type: 'POST',
                    url: '/api/v1/orderapi/updateCampaign',
                    data: data
                })
                .success(function(result) {
                    Materialize.toast('Kayıt başarıyla güncellendi', 3000);
                })
                .error(function(result) {
                    Materialize.toast('Kayıt Güncellemede hata oluştu', 4000);
                });
        }


        $('#action').on('click', function () {
            var data = {
                id:$('#itemId').val(),
                code: $('#code').val(),
                description: $('#description').val(),
                discountRate: $('#discount').val(),
                startTime: $('#startTime').val(),
                endTime: $('#endTime').val(),
                used: $('#isUsed').prop('checked')
            };
            updateCampaign(data);
        });

        $(function() {
            $('#description').val($('#description').attr('value'));
        });
    });
});