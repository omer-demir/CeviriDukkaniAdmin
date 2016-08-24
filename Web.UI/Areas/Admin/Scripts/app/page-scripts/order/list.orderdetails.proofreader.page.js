require(['../../common'],
    function (common) {
        require(
            [
                'utility',
                'css!../../../Scripts/dx/css/dx.common.css',
                'css!../../../Scripts/dx/css/dx.light.css',
                'jquery',
                '../../../Scripts/dx/js/dx.webappjs'
            ],
            function (utility) {
                var utilityObj = new utility();
                $(function () {
                    //private funcs
                    var getOrderDetails = function () {
                        var orderId = $('#orderId').val();

                        return $.ajax({
                            url: '/api/v1/orderapi/getOrderDetailsByOrderId',
                            data: { orderId: orderId },
                            type: 'GET'
                        });
                    };
                    var initPage = function () {
                        //utilityObj.blockElement('#orderListGrid');
                        getOrderDetails().success(function (orderList) {

                            var gridOpts = $.extend(true,
                            {
                                filterRow: {
                                    visible: true,
                                    applyFilter: "auto"
                                },
                                headerFilter: {
                                    visible: true
                                },
                                dataSource: orderList.data,
                                paging: { pageSize: 10 },
                                columns: [{
                                    dataField: 'order.sourceLanguage.name',
                                    caption: 'Kaynak Dili'
                                }, {
                                    dataField: 'order.targetLanguagesAsString',
                                    caption: 'Sipariş İstek Dili'
                                }, {
                                    dataField: 'order.terminology.name',
                                    caption: 'Terminoloji Adı'
                                }, {
                                    dataField: 'translationOperation.documentPart.charCount',
                                    caption: 'Çevirilecek Karakter Sayısı'
                                }, {
                                    dataField: 'translationOperation.proofReaderId',
                                    caption: 'Müsaitlik Durumu',
                                    cellTemplate: function (container, cellInfo) {
                                        if (cellInfo.value) {
                                            $('<i class="mdi-action-assignment-late"></i>').appendTo(container);
                                        } else {
                                            $('<i class="mdi-action-assignment-turned-in"></i>').appendTo(container);
                                        }
                                    }
                                }, {
                                    dataField: 'id',
                                    caption: 'Aksiyon',
                                    alignment: 'left',
                                    cellTemplate: function (container, cellInfo) {
                                        var enabled = cellInfo.data.translationOperation.proofReaderId;
                                        if (!enabled) {
                                            var actions = '<a class="custom-link" href="/Admin/Order/AcceptOrderDetail/{Id}" title="Teklifi Kabul Et"><i class="mdi-action-info-outline"></i></a>';
                                            $(actions.supplant({ Id: cellInfo.value })).appendTo(container);
                                        } else {
                                            $('<i class="mdi-action-assignment-late"></i>').appendTo(container);
                                        }
                                    }
                                }
                                ],
                                editing: {
                                    insertEnabled: true
                                }
                            }, utilityObj.baseGridOptions);


                            $('#orderDetailListGrid').dxDataGrid(gridOpts);
                            $('#orderDetailListGrid').dxDataGrid('instance');
                        });
                    };

                    initPage();
                });
            });
    });