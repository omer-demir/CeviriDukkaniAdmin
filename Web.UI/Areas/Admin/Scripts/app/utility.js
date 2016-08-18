define([],
    function () {
        function utility() {

        };
        //enums
        utility.prototype.USERROLETYPE = {
            admin: { id: 1, text: "Translator" },
            translator: { id: 2, text: "Editor" },
            editor: { id: 3, text: "Admin" },
            proofReader: { id: 4, text: "ProofReader" },
            freelanceTranslator: { id: 5, text: "FreelanceTranslator" }
        };
        utility.prototype.MEMBERSHIPTYPE = {
            singular: { id: 1, text: "Bireysel" },
            corporate: { id: 2, text: "Kurumsal" }
        };
        utility.prototype.genders = [{ id: 1, text: 'Bay' }, { id: 2, text: 'Bayan' }];
        utility.prototype.userRoleTypes = [{ id: 1, text: 'Translator' }, { id: 2, text: 'Editor' }, { id: 3, text: 'Admin' }, { id: 4, text: 'ProofReader' }, { id: 5, text: 'FreelanceTranslator' }];
        utility.prototype.membershipTypes = [{ id: 1, text: 'Bireysel' }, { id: 2, text: 'Kurumsal' }];
        utility.prototype.baseGridOptions = {
            pager: {
                showPageSizeSelector: true,
                allowedPageSizes: [10, 50, 100],
                showInfo: true
            },
            paging: {
                pageSize: 10
            },
            "export": {
                enabled: true,
                fileName: "Exported",
                allowExportSelectedData: true
            }
            //,editing: {
            //    insertEnabled: true,
            //    editEnabled: true,
            //    texts: {
            //        editRow: 'Düzenle',
            //        saveRowChanges: 'Kaydet',
            //        cancelRowChanges: 'İptal',
            //    }
            //}
        };
        utility.prototype.fillOptionSelect = function (selectId, data, selectedValue) {
            var $select = $(selectId);
            $select
                .empty()
                .append('<option value="" disabled selected>Lütfen seçiniz.</option>');
            $.each(data,
                function (i, e) {
                    $("<option>", { text: e.name, val: e.id }).appendTo($select);
                });
            if (selectedValue) {
                $select.val(selectedValue);
                $select.trigger("change");
            }
            $select.material_select();
        };
        utility.prototype.clearSelect = function (selectId) {
            $(selectId)
                .empty().append('<option value="" disabled selected>Lütfen seçiniz.</option>')
                .material_select();
        };
        utility.prototype.setValueMultiSelect = function (selectId, data, ulItem) {
            var $select = $(selectId);
            if (data && jQuery.type(data) === "array") {

                $select
                .val(data)
                .material_select();

                $.each(data, function (i, e) {
                    $select.find('option[value="' + e + '"]').index();
                    $(ulItem).find("li").eq($select.find('option[value="' + e + '"]').index()).click();
                    $(".dvUserRoles ul li span:contains('" + e.trim() + "')").eq(0).find('input[type="checkbox"]').prop('checked', true).trigger('click');

                });
            }
        };
        utility.prototype.blockElement = function(element) {
            var block = $(element).parent();
            $(block).block({
                message: '<span class="text-semibold"><i class="icon-spinner4 spinner position-left"></i>&nbsp; Lütfen bekleyiniz</span>',
                timeout: 2000, //unblock after 2 seconds
                overlayCSS: {
                    backgroundColor: '#fff',
                    opacity: 0.8,
                    cursor: 'wait'
                },
                css: {
                    border: 0,
                    padding: '10px 15px',
                    color: '#fff',
                    width: 'auto',
                    '-webkit-border-radius': 2,
                    '-moz-border-radius': 2,
                    backgroundColor: '#333'
                }
            });
        };
        utility.prototype.unblockElement = function(element) {
            var block = $(element).parent();
            $(block).unblock();
        };
        utility.prototype.getResources = function (keyList) {
            if (!keyList) {
                throw new Error('No key or keys defined');
            }
            var promise = $.ajax({
                url: '/api/v1/commonapi/getResources',
                data: JSON.stringify(keyList),
                contentType: 'application/json',
                type: 'POST',
                async: false
            });

            return promise;
        };
        utility.prototype.initResources = function (keyList, resourceName) {
            localStorage.clear();//TODO: Güncellemelerin yansıması için şimdilik kalsın.
            var tempResources = localStorage.getItem(resourceName);
            if (tempResources == null) {
                this.getResources(keyList).then(function (data) {
                    localStorage.setItem(resourceName, JSON.stringify(data));
                });
            }
        }
        return utility;
    });