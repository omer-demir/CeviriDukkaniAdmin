require(['../../common'],
    function (common) {
        require(['utility', 'dxdatagrid'],
            function (utility) {
                $(function () {

                    //variables
                    var utilityObj = new utility();
                    var dataGrid;

                    //private funcs
                    var getSelectedUserRoles = function () {
                        var userRoles = [];
                        $.each($('#ddlUserRole').val(),
                            function (i, e) {
                                userRoles.push(e);
                            });
                        return userRoles;
                    };
                    var getUsers = function (userRoleTypeEnums) {
                        return $.ajax({
                            url: '/api/v1/userapi/getUsersByUserRoleTypes',
                            type: 'POST',
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            data: JSON.stringify(userRoleTypeEnums)
                        });
                    };
                    //events
                    $('#btnFilter').click(function () {
                        if ($('#ddlUserRole').val() === '') return;
                        getUsers(getSelectedUserRoles())
                            .success(function (userList) {

                                var gridOpts = $.extend(true,
                                    {
                                        filterRow: {
                                            visible: true,
                                            applyFilter: "auto"
                                        },
                                        headerFilter: {
                                            visible: true
                                        },
                                        dataSource: userList,
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
                                                caption: 'Adı'
                                            }, {
                                                dataField: 'surName',
                                                caption: 'Soyadı'
                                            }, {
                                                dataField: 'email',
                                                caption: 'Email'
                                            }, {
                                                dataField: 'mobilePhone',
                                                caption: 'Telefon'
                                            }, {
                                                dataField: 'genderId',
                                                caption: 'Cinsiyet',
                                                lookup: {
                                                    dataSource: utilityObj.genders,
                                                    displayExpr: 'text',
                                                    valueExpr: 'id'
                                                }
                                            }, {
                                                dataField: 'userRoleTypeString',
                                                caption: 'Kullanıcı Tipi'
                                            }, {
                                                dataField: 'createdAt',
                                                caption: 'Oluş. Tarihi'
                                            }, {
                                                dataField: 'id',
                                                caption: 'Aksiyon',
                                                alignment: 'left',
                                                cellTemplate: function (container, cellInfo) {
                                                    var actions = '<a class="custom-link" href="/Admin/User/Edit/{userId}" title="Kullanıcı bilgilerini düzenle"><i class="mdi-editor-mode-edit"></i></a>';
                                                    $(actions.supplant({ userId: cellInfo.value })).appendTo(container);
                                                }
                                            }
                                        ], editing: {
                                            insertEnabled: true
                                        },
                                        onInitNewRow: function (e) {
                                            window.location.href = "/Admin/User/Create";
                                        }
                                    }, utilityObj.baseGridOptions);


                                $('#userListGrid').dxDataGrid(gridOpts);
                                dataGrid = $('#userListGrid').dxDataGrid('instance');
                            }).fail(function (ex) {
                                console.log(ex);
                            });
                    });
                });
            });
    });