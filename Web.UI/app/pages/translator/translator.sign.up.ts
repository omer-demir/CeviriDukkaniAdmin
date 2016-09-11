/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../services/common.data.service.ts" />
/// <reference path="../../classes/util.ts" />
/// <reference path="../../../typings/globals/toastr/index.d.ts" />
/// <reference path="../../classes/ceviri.classes.ts" />
declare var $: JQueryStatic;


((() => {
    var dataService = new DataService;
    var countriesCities: any = [];
    var technologyKnowledges: Array<TechnologyKnowledge> = new Array<TechnologyKnowledge>();
    var rateItems: Array<RateItem> = new Array<RateItem>();
    function getAsData(data: any) {
        var result: any = [];
        var i: number = 1;
        for (var prop in data) {
            if (data.hasOwnProperty(prop)) {
                result.push({
                    id: i,
                    text: prop,
                    cities: data[prop]
                });
            }
        }
        return result;
    }
    function initCityWithData(data: any[]) {
        $('#City').select2(Util.extendOptions(data, { placeholder: 'Please select your city' }));
        $("#City").select2("val", "-1");
    }
    function changeVisibleByClassName(className: string, visible: boolean) {
        let elements: NodeListOf<HTMLElement> = document.getElementsByClassName(className) as NodeListOf<HTMLElement>;

        for (var i = 0; i < elements.length; i++) {
            let element: HTMLElement = elements[i];
            element.hidden = !visible;
        }
    }
    function initializeDropdowns() {
        $('select').select2({ placeholder: 'Please select any option' });

        dataService.getCountries((data: any) => {

            $("#Nationality").select2(Util.extendOptions(Util.getAsSelectData(data)));
            $("#Nationality2").select2(Util.extendOptions(Util.getAsSelectData(data)));
        });

        dataService.getTongues((data: any) => {
            $("#MotherTongue").select2(Util.extendOptions(Util.getAsSelectData(data)));
            $("#Tongue").select2(Util.extendOptions(Util.getAsSelectData(data)));

        });

        dataService.getCountriesAndCity((data: any) => {
            countriesCities = getAsData(data);
            var opt = Util.extendOptions(countriesCities, { placeholder: 'Please select country' });
            $('#country').select2(opt);
            $('#Resident').select2(opt);


            $("#country").select2("val", "-1");
            $("#Resident").select2("val", "-1");
        });

        dataService.getSoftwares((data: any) => {
            $("#Software").select2(Util.extendOptions(Util.getAsSelectData(data), { placeholder: 'Please select software' }));
        });

        dataService.getSpecialization((data: any) => {
            $("#Specialization").select2(Util.extendOptions(Util.getAsSelectData(data), { multiple: true }));
        });

        dataService.getLanguages((data: any) => {
            $("#SourceLanguageId").select2(Util.extendOptions(Util.getAsSelectData(data), { placeholder: 'Please select source language' }));
        });

        $('#WorkingDays').select2(Util.extendOptions(Constants.Days, { multiple: true }));
    }

    function addSoftware() {
        var software = $('#Software').select2('data')[0].text;
        var softwareVersion = $('#Version').val();
        var operatingSystem = $('#OperatingSystem').val();
        var rating = $('#Rating').val();
        if (!software && !rating) {
            toastr.error('Please enter software and rating information', 'Error');
            return;
        }

        var technologyKnowledge = new TechnologyKnowledge();
        technologyKnowledge.softwareId = software.id;
        technologyKnowledge.softwareVersion = softwareVersion;
        technologyKnowledge.operatingSystem = operatingSystem;
        technologyKnowledge.rating = rating;
        technologyKnowledges.push(technologyKnowledge);

        var $table = $('#softwareKnowledge');
        var $tableBody = $table.find('tbody');

        var itemTemplate = `<tr><td>${software}</td><td>${technologyKnowledge.softwareVersion}</td><td>${technologyKnowledge.operatingSystem}</td><td>${technologyKnowledge.rating}</td></tr>`;
        $(itemTemplate).appendTo($tableBody);
    }
    function addRate() {
        var $table = $('#translatorRate');
        var $tableBody = $table.find('tbody');

        

        var service = $('#ServiceTypeId').select2('data')[0];
        var sourceLanguage = $('#SourceLanguageId').select2('data')[0];
        var targetLanguage = $('#TargetLanguageId').select2('data')[0];
        var price = $('#Price').val();
        var sworn = $('#SwornOrCertified').prop('checked');

        if (!service && !sourceLanguage && !targetLanguage && !price) {
            toastr.error('Please enter service,language information', 'Error');
            return;
        }

        var rate = new RateItem();
        rate.serviceTypeId = service.id;
        rate.sourceLanguageId = sourceLanguage.id;
        rate.targetLanguageId = targetLanguage.id;
        rate.price = price;
        rate.swornOrCertified = sworn;
        rateItems.push(rate);

        var itemTemplate = `<tr><td>${service.text}</td><td>${sourceLanguage.text}</td><td>${targetLanguage.text}</td><td>${price}</td><td>${sworn}</td></tr>`;
        $(itemTemplate).appendTo($tableBody);
    }
    $(() => {
        $('ul.tabs').tabs();
        initializeDropdowns();

        /**
         * Events
         */
        $('#country').on({
            'select2:select': (e: any) => {
                var country = countriesCities.find((item: any) => (item.id == e.params.data.id));
                initCityWithData(country.cities);
            },
            'select2:unselect': () => {
                $('#City').select2("val", "-1");
            }
        });
        $('#SourceLanguageId').on({
            'select2:select': (e: any) => {
                dataService.getTargetLanguages(e.params.data.id, (data: any) => {
                    $("#TargetLanguageId").select2(Util.extendOptions(Util.getAsSelectData(data), { placeholder: 'Please select target language' }));
                });
            },
            'select2:unselect': () => {
                $('#TargetLanguageId').select2("val", "-1");
            }
        });
        $('#addSoftware').on('click', addSoftware);
        $('#addRate').on('click', addRate);
        $(document).on('select2:select', (e: any, args: any) => {
            var $elem = $(e.target).siblings('.select2');
            $elem.css('border', 'none');
        });

        /**
         * Wizard events
         */
        $('#nextTo2').on('click', () => {
            var rules = {
                name: { required: true },
                surname: { required: true },
                email: { required: true, email: true },
                mobilePhone: { required: true },
                password: { required: true, minlength: 4, maxlength: 8 },
                repassword: { required: true, minlength: 4, maxlength: 8, equalTo: '#password' },
                agreement: { checkbox: true }
            };

            Util.handleValidationForm('#form1', rules, (a: any) => { $('ul.tabs').tabs('select_tab', 'tab2'); });
            if ($('#form1').valid()) {
                $('ul.tabs').tabs('select_tab', 'tab2');
            }
        });
        $('#nextTo3').on('click', () => {
            var rules = {
                country: { required: true },
                City: { required: true },
                district: { required: true },
                address: { required: true }
            };

            Util.handleValidationForm('#form2', rules, (a: any) => { $('ul.tabs').tabs('select_tab', 'tab3'); });
            if ($('#form2').valid()) {
                $('ul.tabs').tabs('select_tab', 'tab3');
            }
        });
        $('#nextTo4').on('click', () => {
            var rules = {
                motherTongue: { required: true },
                tongue: { required: true },
                translation: { required: true },
                reviews: { required: true },
                proofReading: { required: true },
                qualityEnsureDescription: { required: true },
                qualifications: { required: true },
                Specialization: { required: true }
            };

            Util.handleValidationForm('#form3', rules, (a: any) => { $('ul.tabs').tabs('select_tab', 'tab4'); });
            if ($('#form3').valid()) {
                $('ul.tabs').tabs('select_tab', 'tab4');
            }
        });
        $('#nextTo5').on('click', () => {
            $('ul.tabs').tabs('select_tab', 'tab5');
        });
        $('#nextTo6').on('click', () => {
            if ($('#bankAccountType0').prop('checked')) {
                var rules = {
                    bankName: { required: true },
                    accountHolderFullName: { required: true },
                    IBAN: { required: true },
                    minimumChargeAmount: { required: true }
                };
                Util.handleValidationForm('#form5', rules, (a: any) => { $('ul.tabs').tabs('select_tab', 'nextTo6'); });
                if ($('#form5').valid()) {
                    $('ul.tabs').tabs('select_tab', 'tab6');
                }
            } else if ($('#bankAccountType1').prop('checked')) {
                var rules2 = {
                    bankName: { required: true },
                    accountHolderFullName: { required: true },
                    beneficiaryAddress: { required: true },
                    accountNumber: { required: true },
                    swiftBicCode: { required: true },
                    cityCountryBank: { required: true },
                    bankAddress: { required: true },
                    minimumChargeAmount: { required: true }
                };
                Util.handleValidationForm('form5', rules2, (a: any) => { $('ul.tabs').tabs('select_tab', 'nextTo6'); });
                if ($('#form5').valid()) {
                    $('ul.tabs').tabs('select_tab', 'tab6');
                }
            } else if ($('#bankAccountType2').prop('checked')) {
                var rules3 = {
                    paypalEmailAddress: { required: true, email: true },
                    minimumChargeAmount: { required: true }
                };
                Util.handleValidationForm('form5', rules3, (a: any) => { $('ul.tabs').tabs('select_tab', 'nextTo6'); });
                if ($('#form5').valid()) {
                    $('ul.tabs').tabs('select_tab', 'tab6');
                }
            } else {
                //show message
            }






        });
        $('#nextTo7').on('click', () => {
            var rules = {
                ServiceType: { required: true },
                SourceLanguage: { required: true },
                TargetLanguage: { required: true },
                minimumChargeAmount: { required: true }
            };

            Util.handleValidationForm('#form6', rules, (a: any) => { $('ul.tabs').tabs('select_tab', 'tab7'); });
            if ($('#form6').valid()) {
                $('ul.tabs').tabs('select_tab', 'tab7');
            }
        });


        $('input[type=radio][name=bankAccountType]').change(function () {

            changeVisibleByClassName("Turkish", false);
            changeVisibleByClassName("European", false);
            changeVisibleByClassName("PayPal", false);

            $('#spnAccountTypeHeader').text(this.value);

            if (this.value == 'Turkish') {
                changeVisibleByClassName("Turkish", true);
            }
            else if (this.value == 'European') {
                changeVisibleByClassName("European", true);
            } else if (this.value == 'PayPal') {
                changeVisibleByClassName("PayPal", true);
            }
        });
        $("#btnSave").on("click", (data: any) => {
            if ($('#TranslationResult').val().length < 1) {
                toastr.error('Please translate the test content', 'Error');
                return;
            }


            var user = new User();
            user.name = $('#name').val();
            user.surname = $('#surname').val();
            user.email = $('#email').val();
            user.genderId = $('input[name="gender"]:checked').val();
            user.mobilePhone = $('#mobilePhone').val();
            user.password = $('#password').val();

            var defaultUserRole = new UserRole();
            defaultUserRole.userRoleTypeId = 1;
            user.userRoles.push(defaultUserRole);


            var userContact = new UserContact();
            userContact.address = $('#address').val();
            userContact.postalCode = $('#postalCode').val();
            userContact.alternativeEmail = $('#alternativeEmail').val();
            userContact.alternativePhone1 = $('#alternativePhone1').val();
            userContact.alternativePhone2 = $('#alternativePhone2').val();
            userContact.fax = $('#fax').val();
            userContact.skype = $('#skype').val();
            userContact.districtId = $('#district').val();
            user.userContact = userContact;

            var userAbility = new UserAbility();
            userAbility.motherTongueId = $('#motherTongue').val();
            userAbility.tongueId = $('#tongue').val();
            userAbility.bilingualTongueId = $('#bilingualTongue').val();
            userAbility.yearsOfExperience = $('#yearsOfExperience').val();
            userAbility.technologyKnowledges = technologyKnowledges;

            var capacity = new Capacity();
            capacity.translation = $('#translation').val();
            capacity.reviews = $('#reviews').val();
            capacity.proofReading = $('#proofReading').val();

            userAbility.capacity = capacity;
            userAbility.qualityEnsureDescription = $('#qualityEnsureDescription').val();
            userAbility.qualifications = $('#qualifications').val();
            userAbility.mainClients = $('#mainClients').val();

            var specializations =<Array<any>> $('#Specialization').val();
            var arrayOfSpecs = new Array<Specialization>();
            specializations.forEach((item: any) => {
                var spec = new Specialization();
                spec.terminologyId = item.id;
                arrayOfSpecs.push(spec);
            });
            userAbility.specializations = arrayOfSpecs;
            user.userAbility = userAbility;

            var userPayment = new UserPayment();
            var bankAccount = new BankAccount();

            if ($('#bankAccountType0').prop('checked')) {
                bankAccount.bankAccountTypeId =1;    
            }else if ($('#bankAccountType1').prop('checked')) {
                bankAccount.bankAccountTypeId = 2;
            }else if ($('#bankAccountType2').prop('checked')) {
                bankAccount.bankAccountTypeId = 3;
            }

            
            switch (bankAccount.bankAccountTypeId) {
                case 1:
                    bankAccount.bankName = $('#bankName').val();
                    bankAccount.accountHolderFullName = $('#accountHolderFullName').val();
                    bankAccount.IBAN = $('#IBAN').val();
                    break;
                case 2:
                    bankAccount.bankName = $('#bankName').val();
                    bankAccount.accountHolderFullName = $('#accountHolderFullName').val();
                    bankAccount.IBAN = $('#IBAN').val();
                    bankAccount.beneficiaryAddress = $('#beneficiaryAddress').val();
                    bankAccount.accountNumber = $('#accountNumber').val();
                    bankAccount.swiftBicCode = $('#swiftBicCode').val();
                    bankAccount.cityCountryBank = $('#cityCountryBank').val();
                    bankAccount.bankAddress = $('#bankAddress').val();
                    break;
                case 3:
                    bankAccount.paypalEmailAddress = $('#paypalEmailAddress').val();
                    break;
                default:
            }
            userPayment.bankAccount = bankAccount;
            userPayment.vatTaxNo = $('#vatTaxNo').val();
            userPayment.currencyId = $('#currency').val();
            userPayment.workingTypeId = $('#workingType').val();
            userPayment.minimumChargeAmount = $('#minimumChargeAmount').val();
            user.userPayment = userPayment;

            var rate = new Rate();
            rate.rateItems = rateItems;
            user.userRate = rate;


            dataService.saveUser(user, (data: any) => {
                toastr.info('Your registration saved. We will get in touch with you soon.', 'Information');
            });
        });




    });

})());

