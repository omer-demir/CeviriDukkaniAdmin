using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using Tangent.CeviriDukkani.Domain.Common;
using Tangent.CeviriDukkani.Domain.Dto.Common;
using Tangent.CeviriDukkani.Domain.Dto.Request;
using Tangent.CeviriDukkani.Domain.Dto.Sale;
using Tangent.CeviriDukkani.Domain.Dto.Translation;
using Web.Business.Services.Interfaces;

namespace Web.Business.Services.Implementations {
    public class CommonService : BaseService,ICommonService {
        #region Implementation of ICommonService

        public ServiceResult Login(LoginRequestDto loginRequest) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync(httpClient, "api/commonapi/login", loginRequest);
        }

        public ServiceResult ChangePassword(ChangePasswordRequestDto changePasswordRequest) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync(httpClient, "api/commonapi/changePassword", changePasswordRequest);
        }

        public ServiceResult AddMessage(MessageDto messageDto, int createdBy) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync(httpClient, "api/commonapi/addMessage", messageDto);
        }

        public ServiceResult GetIncomingMessages(int userId) {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync(httpClient, $"api/commonapi/getIncomingMessages?userId={userId}");
        }

        public ServiceResult GetSentMessages(int userId) {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync(httpClient, $"api/commonapi/getSentMessages?userId={userId}");
        }

        public ServiceResult GetMessage(int messageId) {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync(httpClient, $"api/commonapi/getMessage?messageId={messageId}");
        }

        public ServiceResult UpdateMessageForReadDate(int messageId) {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync(httpClient, $"api/commonapi/updateMessageForReadDate?messageId={messageId}");
        }

        public ServiceResult DeleteSentMessage(int messageId) {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync(httpClient, $"api/commonapi/deleteSentMessage?messageId={messageId}");
        }

        public ServiceResult DeleteIncomingMessage(int messageId) {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync(httpClient, $"api/commonapi/deleteIncomingMessage?messageId={messageId}");
        }

        public ServiceResult GetCompanies() {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync(httpClient, $"api/commonapi/getCompanies");
        }

        public ServiceResult AddCompany(CompanyDto companyDto, int userId) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync(httpClient, "api/commonapi/addCompany", companyDto,userId);
        }

        public ServiceResult UpdateCompany(CompanyDto companyDto, int userId) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync(httpClient, "api/commonapi/editCompany", companyDto,userId);
        }

        public ServiceResult GetCompany(int companyId) {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync(httpClient, $"api/commonapi/getCompany?companyId={companyId}");
        }

        public ServiceResult GetLanguages() {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync(httpClient, $"api/commonapi/getLanguages");
        }

        public ServiceResult AddLanguage(LanguageDto languageDto, int createdBy) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync(httpClient, "api/commonapi/addLanguage", languageDto,createdBy);
        }

        public ServiceResult UpdateLanguage(LanguageDto languageDto, int createdBy) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync(httpClient, "api/commonapi/editLanguage", languageDto, createdBy);
        }

        public ServiceResult GetLanguage(int languageId) {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync(httpClient, $"api/commonapi/getLanguage?languageId={languageId}");
        }

        public ServiceResult GetTargetLanguages(int sourceLanguageId) {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync(httpClient, $"api/commonapi/getTargetLanguages?sourceLanguageId={sourceLanguageId}");
        }

        public ServiceResult AddSourceTargetLanguages(SourceTargetLanguageDto sourceTargetLanguageDto, int createdBy) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync(httpClient, "api/commonapi/addSourceTargetLanguages", sourceTargetLanguageDto, createdBy);
        }

        public ServiceResult DeleteSourceTargetLanguages(SourceTargetLanguageDto sourceTargetLanguageDto) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync(httpClient, $"api/commonapi/deleteSourceTargetLanguages", sourceTargetLanguageDto);
        }

        public ServiceResult GetTerminologies() {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync(httpClient, $"api/commonapi/getTerminologies");
        }

        public ServiceResult AddTerminology(TerminologyDto terminologyDto, int createdBy) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync(httpClient, "api/commonapi/addTerminology", terminologyDto, createdBy);
        }

        public ServiceResult UpdateTerminology(TerminologyDto terminologyDto, int createdBy) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync(httpClient, "api/commonapi/editTerminology", terminologyDto, createdBy);
        }

        public ServiceResult GetTerminology(int terminologyId) {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync(httpClient, $"api/commonapi/getTerminologies?terminologyId={terminologyId}");
        }

        public ServiceResult GetPriceLists() {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync(httpClient, $"api/commonapi/getPriceLists");
        }

        public ServiceResult AddPriceList(PriceListDto priceListDto, int createdBy) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync(httpClient, $"api/commonapi/addPriceList", priceListDto, createdBy);
        }

        public ServiceResult UpdatePriceList(PriceListDto priceListDto, int createdBy) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync(httpClient, "api/commonapi/editPriceList", priceListDto, createdBy);
        }

        public ServiceResult GetPriceList(int priceListId) {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync(httpClient, $"api/commonapi/getPriceList?priceListId={priceListId}");
        }

        public ServiceResult GetCompanyTerminologies() {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync(httpClient, $"api/commonapi/getCompanyTerminologies");
        }

        public ServiceResult AddCompanyTerminology(CompanyTerminologyDto companyTerminologyDto, int createdBy) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync(httpClient, "api/commonapi/addCompanyTerminology", companyTerminologyDto, createdBy);
        }

        public ServiceResult UpdateCompanyTerminology(CompanyTerminologyDto companyTerminologyDto, int createdBy) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync(httpClient, "api/commonapi/editCompanyTerminology", companyTerminologyDto, createdBy);
        }

        public ServiceResult DeleteCompanyTerminology(int companyTerminologyId) {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync(httpClient, $"api/commonapi/deleteCompanyTerminology?companyTerminologyId={companyTerminologyId}");
        }

        public ServiceResult GetCompanyTerminology(int companyTerminologyId) {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync(httpClient, $"api/commonapi/getCompanyTerminology?companyTerminologyId={companyTerminologyId}");
        }

        public ServiceResult<List<UserRoleTypeDto>> GetUserRoleTypes() {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync<List<UserRoleTypeDto>>(httpClient, $"api/commonapi/getUserRoleTypes");
        }

        public ServiceResult<List<CountryDto>> GetCountries() {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync<List<CountryDto>>(httpClient, $"api/commonapi/getCountries");
        }

        public ServiceResult<List<CityDto>> GetCitiesByCountryId(int countryId) {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync<List<CityDto>>(httpClient, $"api/commonapi/getCitiesByCountryId?countryId={countryId}");
        }

        public ServiceResult<List<DistrictDto>> GetDistrictByCityId(int cityId) {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync<List<DistrictDto>>(httpClient, $"api/commonapi/getDistrictByCityId?cityId={cityId}");
        }

        public ServiceResult GetTongues() {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync(httpClient, "api/commonapi/getTongues");
        }

        public ServiceResult GetSpecializations() {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync(httpClient, "api/commonapi/getSpecializations");
        }

        public ServiceResult GetSoftwares() {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync(httpClient, "api/commonapi/getSoftwares");
        }

        public ServiceResult GetBankAccountTypes() {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync(httpClient, "api/commonapi/getBankAccountTypes");
        }

        public ServiceResult GetCurrencies() {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync(httpClient, "api/commonapi/getCurrencies");
        }

        public ServiceResult GetWorkingTypes() {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync(httpClient, "api/commonapi/getWorkingTypes");
        }

        public ServiceResult GetServiceTypes() {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync(httpClient, "api/commonapi/getServiceTypes");
        }

        #endregion
    }
}