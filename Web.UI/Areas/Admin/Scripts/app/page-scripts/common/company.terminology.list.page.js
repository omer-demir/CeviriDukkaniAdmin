require(['../../common'],
    function (common) {
        require(['utility', 'dxdatagrid'],
            function (utility) {
                $(function () {

                    //variables
                    var utilityObj = new utility();
                    var dataGrid;
                    var companies;
                    var resources = null;
                    //private funcs
                    var getCompanyTerminologies = function () {
                        return $.ajax({
                            url: '/api/v1/commonapi/getCompanyTerminologies'
                        });
                    };
                    var getCompanies = function () {
                        return $.ajax({
                            url: '/api/v1/commonapi/getCompanies',
                            async: false
                        });
                    };
                    var deleteCompanyTerminology = function (companyTerminologyId) {
                        swal({
                            title: resources.uyari,
                            text: resources.terminolojiyiSilmekIstediginizeEminmisiniz,
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: resources.evet,
                            cancelButtonText: resources.hayir,
                            closeOnConfirm: false,
                            closeOnCancel: true
                        },
                         function (isConfirm) {
                             if (isConfirm) {
                                 $.ajax({
                                     url: '/api/v1/commonapi/deleteCompanyTerminology?id=' + companyTerminologyId
                                 }).success(function (data) {
                                     swal(resources.bilgi, resources.terminolojiBasariylaSilindi, "success");
                                     window.location.href = '/Admin/Common/CompanyTerminologies';
                                 }).fail(function () {
                                     swal(resources.hata, resources.terminolojiSilinirkenHataOlustu, "error");
                                 });
                             }
                         });

                    };
                    var setCompanies = function () {
                        getCompanies()
                            .success(function (data) {
                                companies = data;
                            });
                    };
                    var initPage = function () {
                        setCompanies();
                        getCompanyTerminologies()
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
                                                var index =
                                                    dataGrid.pageIndex() * dataGrid.pageSize() + e.rowIndex + 1;
                                                container.text(index);
                                            }
                                        },
                                        {
                                            dataField: 'companyId',
                                            caption: resources.sirketAdi,
                                            lookup: { dataSource: companies, valueExpr: 'id', displayExpr: 'name' }
                                        }, {
                                            dataField: 'name',
                                            caption: resources.dosyaAdi,
                                            cellTemplate: function (container, cellInfo) {
                                                var actions =
                                                    '<a class="custom-link" href="{fileUrl}" title="' + resources.indirmekIcinTiklayin + '">{fileName}</a>';
                                                $(actions
                                                        .supplant({
                                                            fileUrl: cellInfo.data.fileUrl.replace('~', ''),
                                                            fileName: cellInfo.value
                                                        }))
                                                    .appendTo(container);
                                            }
                                        }, {
                                            dataField: 'createdBy',
                                            caption: resources.ekleyen
                                        }, {
                                            dataField: 'createdAt',
                                            caption: resources.eklenmeTarihi
                                        }
                                        , {
                                            dataField: 'id',
                                            caption: resources.aksiyon,
                                            alignment: 'left',
                                            cellTemplate: function (container, cellInfo) {
                                                var actions = '<a class="custom-link deleteTerminology" href="javascript:void(0);" data-id="{id}" title="{title}"><i class="mdi-action-delete"></i></a>';
                                                $(actions.supplant({ id: cellInfo.value, title: resources.terminolojiSil })).appendTo(container);
                                            }
                                        }
                                    ],
                                    editing: {
                                        insertEnabled: true
                                    },
                                    onInitNewRow: function (e) {
                                        window.location.href = "/Admin/Common/CompanyTerminologyCreate";
                                    }
                                }, utilityObj.baseGridOptions);


                                $('#terminologyListGrid').dxDataGrid(gridOpts);
                                dataGrid = $('#terminologyListGrid').dxDataGrid('instance');
                            });
                    };
                    var getResources = function () {
                        var keyList = [
                            'TerminolojiyiSilmekIstediginizeEminmisiniz',
                            'Uyari',
                            'Evet',
                            'Hayir',
                            'Bilgi',
                            'TerminolojiBasariylaSilindi',
                            'TerminolojiSilinirkenHataOlustu',
                            'DosyaAdi',
                            'IndirmekIcinTiklayin',
                            'Ekleyen',
                            'EklenmeTarihi',
                            'Aksiyon',
                            'TerminolojiSil',
                            'Hata',
                            'SirketAdi'
                        ];
                        var resourceName = 'companyTerminologyCreateList';
                        $.when(utilityObj.initResources(keyList, resourceName)).then(function () {
                            resources = JSON.parse(localStorage.getItem(resourceName));
                            initPage();
                        });
                    };
                    //events
                    $(document).on('click', 'a.deleteTerminology', function () {
                        var terminologyId = $(this).attr('data-id');
                        deleteCompanyTerminology(terminologyId);
                    });

                    getResources();
                });
            });
    });