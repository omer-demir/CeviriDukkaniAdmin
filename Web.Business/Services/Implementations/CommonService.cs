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
    public class CommonService : ICommonService {
        #region Implementation of ICommonService

        public ServiceResult Login(LoginRequestDto loginRequest) {
            var serviceEndpoint = "http://localhost:8001/";
            var httpClient = new HttpClient {
                BaseAddress = new Uri(serviceEndpoint)
            };
            httpClient.DefaultRequestHeaders.Accept.Clear();
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var response = httpClient.PostAsJsonAsync("api/commonapi/login", loginRequest).Result;
            return response.Content.ReadAsAsync<ServiceResult>().Result;
        }

        public ServiceResult ChangePassword(string email, string oldPassword, string newPassword) {
            throw new System.NotImplementedException();
        }

        public ServiceResult AddMessage(MessageDto messageDto, int createdBy) {
            throw new System.NotImplementedException();
        }

        public ServiceResult GetIncomingMessages(int userId) {
            throw new System.NotImplementedException();
        }

        public ServiceResult GetSentMessages(int userId) {
            throw new System.NotImplementedException();
        }

        public ServiceResult GetMessage(int messageId) {
            throw new System.NotImplementedException();
        }

        public ServiceResult UpdateMessageForReadDate(int messageId) {
            throw new System.NotImplementedException();
        }

        public ServiceResult DeleteSentMessage(int messageId) {
            throw new System.NotImplementedException();
        }

        public ServiceResult DeleteIncomingMessage(int messageId) {
            throw new System.NotImplementedException();
        }

        public ServiceResult GetCompanies() {
            throw new System.NotImplementedException();
        }

        public ServiceResult AddCompany(CompanyDto companyDto, int userId) {
            throw new System.NotImplementedException();
        }

        public ServiceResult UpdateCompany(CompanyDto companyDto, int userId) {
            throw new System.NotImplementedException();
        }

        public ServiceResult GetCompany(int companyId) {
            throw new System.NotImplementedException();
        }

        public ServiceResult GetLanguages() {
            throw new System.NotImplementedException();
        }

        public ServiceResult AddLanguage(LanguageDto languageDto, int createdBy) {
            throw new System.NotImplementedException();
        }

        public ServiceResult UpdateLanguage(LanguageDto languageDto, int createdBy) {
            throw new System.NotImplementedException();
        }

        public ServiceResult GetLanguage(int languageId) {
            throw new System.NotImplementedException();
        }

        public ServiceResult GetTargetLanguages(int sourceLanguageId) {
            throw new System.NotImplementedException();
        }

        public ServiceResult AddSourceTargetLanguages(SourceTargetLanguageDto sourceTargetLanguageDto, int createdBy) {
            throw new System.NotImplementedException();
        }

        public ServiceResult DeleteSourceTargetLanguages(SourceTargetLanguageDto sourceTargetLanguageDto) {
            throw new System.NotImplementedException();
        }

        public ServiceResult GetTerminologies() {
            throw new System.NotImplementedException();
        }

        public ServiceResult AddTerminology(TerminologyDto terminologyDto, int createdBy) {
            throw new System.NotImplementedException();
        }

        public ServiceResult UpdateTerminology(TerminologyDto terminologyDto, int createdBy) {
            throw new System.NotImplementedException();
        }

        public ServiceResult GetTerminology(int terminologyId) {
            throw new System.NotImplementedException();
        }

        public ServiceResult GetPriceLists() {
            throw new System.NotImplementedException();
        }

        public ServiceResult AddPriceList(PriceListDto priceListDto, int createdBy) {
            throw new System.NotImplementedException();
        }

        public ServiceResult UpdatePriceList(PriceListDto priceListDto, int createdBy) {
            throw new System.NotImplementedException();
        }

        public ServiceResult GetPriceList(int priceListId) {
            throw new System.NotImplementedException();
        }

        public ServiceResult GetCompanyTerminologies() {
            throw new System.NotImplementedException();
        }

        public ServiceResult AddCompanyTerminology(CompanyTerminologyDto companyTerminologyDto, int createdBy) {
            throw new System.NotImplementedException();
        }

        public ServiceResult UpdateCompanyTerminology(CompanyTerminologyDto companyTerminologyDto, int createdBy) {
            throw new System.NotImplementedException();
        }

        public ServiceResult DeleteCompanyTerminology(int companyTerminologyId) {
            throw new System.NotImplementedException();
        }

        public ServiceResult GetCompanyTerminology(int companyTerminologyId) {
            throw new System.NotImplementedException();
        }

        public ServiceResult<List<UserRoleTypeDto>> GetUserRoleTypes() {
            throw new System.NotImplementedException();
        }

        public ServiceResult<List<CountryDto>> GetCountries() {
            throw new System.NotImplementedException();
        }

        public ServiceResult<List<CityDto>> GetCitiesByCountryId(int countryId) {
            throw new System.NotImplementedException();
        }

        public ServiceResult<List<DistrictDto>> GetDistrictByCityId(int cityId) {
            throw new System.NotImplementedException();
        }

        public ServiceResult GetTongues() {
            throw new System.NotImplementedException();
        }

        public ServiceResult GetSpecializations() {
            throw new System.NotImplementedException();
        }

        public ServiceResult GetSoftwares() {
            throw new System.NotImplementedException();
        }

        public ServiceResult GetBankAccountTypes() {
            throw new System.NotImplementedException();
        }

        public ServiceResult GetCurrencies() {
            throw new System.NotImplementedException();
        }

        public ServiceResult GetWorkingTypes() {
            throw new System.NotImplementedException();
        }

        public ServiceResult GetServiceTypes() {
            throw new System.NotImplementedException();
        }

        #endregion
    }
}