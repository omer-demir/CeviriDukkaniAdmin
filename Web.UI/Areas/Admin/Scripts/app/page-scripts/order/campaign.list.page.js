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
                    var getCampaigns = function () {
                        return $.ajax({
                            url: '/api/v1/orderapi/getCampaigns'
                        });
                    };
                    var initPage = function () {
                        getCampaigns().success(function (orderList) {

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
                                            dataField: 'code',
                                            caption: 'Kampany Kodu'
                                        }, {
                                            dataField: 'description',
                                            caption: 'Açıklama'
                                        }, {
                                            dataField: 'discountRate',
                                            caption: 'İndirim Oranı'
                                        }, {
                                            dataField: 'used',
                                            caption: 'Kullanılma Durumu'
                                        }, {
                                            dataField: 'startTime',
                                            caption: 'Başlangıç Tarihi'
                                        }, {
                                            dataField: 'endTime',
                                            caption: 'Bitiş Tarihi'
                                        }, {
                                            dataField: 'active',
                                            caption: 'Aktif'
                                        }, {
                                            dataField: 'id',
                                            caption: 'Aksiyon',
                                            alignment: 'left',
                                            cellTemplate: function(container, cellInfo) {
                                                var actions = '<a class="custom-link" href="/Admin/Order/UpdateCampaign/{Id}" title="Kampanya düzenle"><i class="mdi-editor-mode-edit"></i></a>' +
                                                    '<a class="custom-link" href="/Admin/Order/CampaignDetail/{Id}" title="Kampanya Detay"><i class="mdi-action-info-outline"></i></a>';
                                                $(actions.supplant({ Id: cellInfo.value })).appendTo(container);
                                            }
                                        }
                                    ],
                                    editing: {
                                        insertEnabled: true
                                    },
                                    onInitNewRow: function (e) {
                                        window.location.href = "Create";
                                    }
                                }, utilityObj.baseGridOptions);


                                $('#campaignListGrid').dxDataGrid(gridOpts);
                                $('#campaignListGrid').dxDataGrid('instance');
                            });
                    };

                    initPage();
                });
            });
    });