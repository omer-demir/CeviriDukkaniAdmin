require(['../../common'],
    function (common) {
        require(['utility', 'dxdatagrid'],
            function (utility) {
                $(function () {
                    //variables
                    var utilityObj = new utility();
                    var dataGrid;
                    var resources = null;

                    //private funcs
                    var getCompanies = function () {
                        return $.ajax({
                            url: '/api/v1/commonapi/getCompanies'
                        });
                    };
                    var setActive = function (id, active) {
                        var userDto = {
                            Id: id,
                            Active: active
                        };

                        return $.ajax({
                            url: '/api/v1/commonapi/setCompanyActive',
                            type: 'POST',
                            data: userDto
                        });
                    };
                    var initPage = function () {
                        getCompanies()
                            .success(function(list) {
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
                                                cellTemplate: function(container, e) {
                                                    var index =
                                                        dataGrid.pageIndex() * dataGrid.pageSize() + e.rowIndex + 1;
                                                    container.text(index);
                                                }
                                            },
                                            {
                                                dataField: 'name',
                                                caption: resources.sirketAdi
                                            }, {
                                                dataField: 'authorizedEmail',
                                                caption: resources.yetkiliEmail
                                            }, {
                                                dataField: 'authorizedFullName',
                                                caption: resources.yetkiliAdsoyad
                                            }, {
                                                dataField: 'authorizedMobilePhone',
                                                caption: resources.yetkiliCepTelefonu
                                            }, {
                                                dataField: 'taxOffice',
                                                caption: resources.vergiDairesi
                                            }, {
                                                dataField: 'taxNumber',
                                                caption: resources.vergiNumarasi
                                            }, {
                                                dataField: 'address',
                                                caption: resources.adres
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

                                                    var actions =
                                                        '<a class="custom-link" href="/Admin/Customer/Index/{companyId}" title="{showTitle}"><i class="mdi-social-group-add"></i></a>  ' +
                                                            '<a class="custom-link" href="/Admin/Company/Edit/{companyId}" title="editTitle"><i class="mdi-editor-mode-edit"></i></a>' +
                                                '<a id="btnPassive{companyId}" class="custom-link btnPassive ' + hiddenPassive + '" href="javascript:void(0)" title="Şirket bilgilerini pasif et" data-id="{companyId}"><i class="mdi-action-delete"></i></a>' +
                                                '<a id="btnActive{companyId}" class="custom-link btnActive ' + hiddenActive + '" href="javascript:void(0)" title="Şirket bilgilerini aktif et" data-id="{companyId}"><i class="mdi-content-undo"></i></a>';
                                                    $(actions.supplant({ companyId: cellInfo.value, showTitle: resources.sirketUyeleriniGoruntule, editTitle: resources.sirketBilgileriniDuzenle }))
                                                        .appendTo(container);
                                                }
                                            }
                                        ],
                                        editing: {
                                            insertEnabled: true
                                        },
                                        onInitNewRow: function(e) {
                                            window.location.href = "/Admin/Company/Create";
                                        }
                                    },
                                    utilityObj.baseGridOptions);


                                $('#companyListGrid').dxDataGrid(gridOpts);
                                dataGrid = $('#companyListGrid').dxDataGrid('instance');
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
                            'SirketAdi',
                            'YetkiliEmail',
                            'YetkiliAdsoyad',
                            'YetkiliCepTelefonu',
                            'VergiDairesi',
                            'VergiNumarasi',
                            'Aksiyon',
                            'SirketUyeleriniGoruntule',
                            'SirketBilgileriniDuzenle'
                        ];
                        var resourceName = 'terminologyManage';
                        $.when(utilityObj.initResources(keyList, resourceName)).then(function () {
                            resources = JSON.parse(localStorage.getItem(resourceName));
                            initPage();
                        });
                    };
                    getResources();
                });
            });
    });