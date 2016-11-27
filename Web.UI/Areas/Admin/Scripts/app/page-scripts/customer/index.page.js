require(['../../common'],
    function (common) {
        require(['utility', 'dxdatagrid'],
            function (utility) {
                
                $(function () {

                    //variables
                    var companies;
                    var utilityObj = new utility();
                    var companyId;
                    var dataGrid;
                    var resources = null;

                    //private funcs
                    var getCustomers = function (companyId) {
                        return $.ajax({
                            url: '/api/v1/customerapi/getCustomers?companyId=' + companyId
                        });
                    };
                    var getCompanies = function () {
                        return $.ajax({
                            url: '/api/v1/commonapi/getCompanies',
                            async: false
                        });
                    };
                    var setCompanies = function () {
                        getCompanies()
                            .success(function (data) {
                                companies = data;
                            });
                    };

                    var setActive = function (id, active) {
                        var userDto = {
                            Id: id,
                            Active: active
                        };

                        return $.ajax({
                            url: '/api/v1/customerapi/setActive',
                            type: 'POST',
                            data: userDto
                        });
                    };

                    var initPage = function () {
                        setCompanies();
                        companyId = $('#hdnCompanyId').val();
                        getCustomers(companyId)
                            .success(function (list) {

                                var gridOpts = $.extend(true,
                                {
                                    filterRow: {
                                        visible: true,
                                        applyFilter: "auto"
                                    },
                                    headerFilter: {
                                        visible: true
                                    },
                                    dataSource: list,
                                    paging: { pageSize: 10 },
                                    columns: [
                                        {
                                            width: "auto",
                                            caption: "#",
                                            alignment: 'center',
                                            cellTemplate: function (container, e) {
                                                var index = dataGrid.pageIndex() * dataGrid.pageSize() + e.rowIndex + 1;
                                                container.text(index);
                                            }
                                        },
                                        {
                                            dataField: 'name',
                                            caption: resources.adi
                                        }, {
                                            dataField: 'surname',
                                            caption: resources.soyadi
                                        }, {
                                            dataField: 'email',
                                            caption: resources.email
                                        }, {
                                            dataField: 'mobilePhone',
                                            caption: resources.telefon
                                        }, {
                                            dataField: 'institutionCode',
                                            caption: resources.sirketKodu
                                        }, {
                                            dataField: 'companyId',
                                            caption: resources.firma,
                                            lookup: {
                                                dataSource: companies,
                                                displayExpr: 'name',
                                                valueExpr: 'id'
                                            }
                                        }, {
                                            dataField: 'membershipTypeId',
                                            caption: resources.musteriTipi,
                                            lookup: {
                                                dataSource: utilityObj.membershipTypes,
                                                displayExpr: 'text',
                                                valueExpr: 'id'
                                            }
                                        }, {
                                            dataField: 'id',
                                            caption: resources.aksiyon,
                                            alignment: 'left',
                                            cellTemplate: function (container, cellInfo) {
                                                var hiddenActive = "";
                                                var hiddenPassive = "";
                                                if (cellInfo.data.active) {
                                                    hiddenActive = "hide";
                                                } else {
                                                    hiddenPassive = "hide";
                                                }
                                                var actions = '<a class="custom-link" href="/Admin/Customer/Edit/{customerId}" title="{title}"><i class="mdi-editor-mode-edit"></i></a>'+
                                                '<a id="btnPassive{customerId}" class="custom-link btnPassive ' + hiddenPassive + '" href="javascript:void(0)" title="Müşteri bilgilerini pasif et" data-id="{customerId}"><i class="mdi-action-delete"></i></a>' +
                                                '<a id="btnActive{customerId}" class="custom-link btnActive ' + hiddenActive + '" href="javascript:void(0)" title="Müşteri bilgilerini aktif et" data-id="{customerId}"><i class="mdi-content-undo"></i></a>';
                                                $(actions.supplant({ customerId: cellInfo.value, title: resources.musteriBilgileriniDuzenle })).appendTo(container);
                                            }
                                        }
                                    ], editing: {
                                        insertEnabled: true,
                                    },
                                    onInitNewRow: function (e) {
                                        window.location.href = "/Admin/Customer/Create";
                                    }
                                }, utilityObj.baseGridOptions);

                                
                                $('#customerListGrid').dxDataGrid(gridOpts);
                                dataGrid = $('#customerListGrid').dxDataGrid('instance');
                            });
                    };

                    $(document).on('click', '.btnPassive', function () {
                        var userId = $(this).attr("data-id");

                        setActive(userId, false).success(function (user) {
                            $("#btnPassive" + user.id).addClass("hide");
                            $("#btnActive" + user.id).removeClass("hide");
                            Materialize.toast('Kayıt pasif edildi.', 3000);
                        }).fail(function (err) {
                            Materialize.toast('Hata Oluştu.', 3000);
                            console.log(err);
                        });
                    });

                    $(document).on('click', '.btnActive', function () {
                        var userId = $(this).attr("data-id");
                        setActive(userId, true).success(function (user) {
                            $("#btnActive" + user.id).addClass("hide");
                            $("#btnPassive" + user.id).removeClass("hide");
                            Materialize.toast('Kayıt aktif edildi.', 3000);

                        }).fail(function (err) {
                            Materialize.toast('Hata Oluştu.', 3000);
                            console.log(err);
                        });
                    });

                    var getResources = function () {
                        var keyList = [
                            'Adi',
                            'Soyadi',
                            'EMail',
                            'Telefon',
                            'SirketKodu',
                            'Firma',
                            'MusteriTipi',
                            'Aksiyon',
                            'MusteriBilgileriniDuzenle'
                        ];
                        var resourceName = 'customerIndex';
                        $.when(utilityObj.initResources(keyList, resourceName)).then(function () {
                            resources = JSON.parse(localStorage.getItem(resourceName));
                            initPage();
                        });
                    };
                    getResources();
                });
            });
    });