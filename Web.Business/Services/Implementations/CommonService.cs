using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Net.Http;
using System.Net.Http.Headers;
using Tangent.CeviriDukkani.Domain.Common;
using Tangent.CeviriDukkani.Domain.Dto.Common;
using Tangent.CeviriDukkani.Domain.Dto.Request;
using Tangent.CeviriDukkani.Domain.Dto.Sale;
using Tangent.CeviriDukkani.Domain.Dto.System;
using Tangent.CeviriDukkani.Domain.Dto.Translation;
using Tangent.CeviriDukkani.Domain.Entities.Common;
using Web.Business.Services.Interfaces;

namespace Web.Business.Services.Implementations {
    public class CommonService : BaseService, ICommonService {
        #region Implementation of ICommonService

        public ServiceResult<UserDto> Login(LoginRequestDto loginRequest) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync<UserDto>(httpClient, "api/commonapi/login", loginRequest);
        }

        public ServiceResult<UserDto> ChangePassword(ChangePasswordRequestDto changePasswordRequest) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync<UserDto>(httpClient, "api/commonapi/changePassword", changePasswordRequest);
        }

        public ServiceResult<MessageDto> AddMessage(MessageRequestDto messageDto, int createdBy) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync<MessageDto>(httpClient, "api/commonapi/addMessage", messageDto);
        }

        public ServiceResult<List<MessageDto>> GetIncomingMessagesByUser(int userId) {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync<List<MessageDto>>(httpClient, $"api/commonapi/getIncomingMessagesByUser?userId={userId}");
        }

        public ServiceResult<List<MessageDto>> GetSentMessagesByUser(int userId) {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync<List<MessageDto>>(httpClient, $"api/commonapi/getSentMessagesByUser?userId={userId}");
        }

        public ServiceResult<MessageDto> GetMessage(int messageId) {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync<MessageDto>(httpClient, $"api/commonapi/getMessage?messageId={messageId}");
        }

        public ServiceResult<List<MessageDto>> GetMessageByQuery(Expression<Func<Message, bool>> expression) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync<List<MessageDto>>(httpClient, "api/commonapi/getMessageByQuery", expression);
        }

        public ServiceResult<MessageDto> UpdateMessageForReadDate(int messageId) {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync<MessageDto>(httpClient, $"api/commonapi/updateMessageForReadDate?messageId={messageId}");
        }

        public ServiceResult<MessageDto> DeleteSentMessage(int messageId) {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync<MessageDto>(httpClient, $"api/commonapi/deleteSentMessage?messageId={messageId}");
        }

        public ServiceResult<MessageDto> DeleteIncomingMessage(int messageId) {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync<MessageDto>(httpClient, $"api/commonapi/deleteIncomingMessage?messageId={messageId}");
        }

        public ServiceResult<List<CompanyDto>> GetCompanies() {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync<List<CompanyDto>>(httpClient, $"api/commonapi/getCompanies");
        }

        public ServiceResult<CompanyDto> AddCompany(CompanyDto companyDto, int userId) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync<CompanyDto>(httpClient, "api/commonapi/addCompany", companyDto, userId);
        }

        public ServiceResult<CompanyDto> UpdateCompany(CompanyDto companyDto, int userId) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync<CompanyDto>(httpClient, "api/commonapi/editCompany", companyDto, userId);
        }

        public ServiceResult<CompanyDto> GetCompany(int companyId) {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync<CompanyDto>(httpClient, $"api/commonapi/getCompany?companyId={companyId}");
        }

        public ServiceResult<List<LanguageDto>> GetLanguages() {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync<List<LanguageDto>>(httpClient, $"api/commonapi/getLanguages");
        }

        public ServiceResult<LanguageDto> AddLanguage(LanguageDto languageDto, int createdBy) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync<LanguageDto>(httpClient, "api/commonapi/addLanguage", languageDto, createdBy);
        }

        public ServiceResult<LanguageDto> UpdateLanguage(LanguageDto languageDto, int createdBy) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync<LanguageDto>(httpClient, "api/commonapi/editLanguage", languageDto, createdBy);
        }

        public ServiceResult<LanguageDto> GetLanguage(int languageId) {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync<LanguageDto>(httpClient, $"api/commonapi/getLanguage?languageId={languageId}");
        }

        public ServiceResult<List<SourceTargetLanguageDto>> GetTargetLanguages(int sourceLanguageId) {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync<List<SourceTargetLanguageDto>>(httpClient, $"api/commonapi/getTargetLanguages?sourceLanguageId={sourceLanguageId}");
        }

        public ServiceResult<SourceTargetLanguageDto> AddSourceTargetLanguages(SourceTargetLanguageDto sourceTargetLanguageDto, int createdBy) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync<SourceTargetLanguageDto>(httpClient, "api/commonapi/addSourceTargetLanguages", sourceTargetLanguageDto, createdBy);
        }

        public ServiceResult DeleteSourceTargetLanguages(SourceTargetLanguageDto sourceTargetLanguageDto) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync(httpClient, $"api/commonapi/deleteSourceTargetLanguages", sourceTargetLanguageDto);
        }

        public ServiceResult<List<TerminologyDto>> GetTerminologies() {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync<List<TerminologyDto>>(httpClient, $"api/commonapi/getTerminologies");
        }

        public ServiceResult<TerminologyDto> AddTerminology(TerminologyDto terminologyDto, int createdBy) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync<TerminologyDto>(httpClient, "api/commonapi/addTerminology", terminologyDto, createdBy);
        }

        public ServiceResult<TerminologyDto> UpdateTerminology(TerminologyDto terminologyDto, int createdBy) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync<TerminologyDto>(httpClient, "api/commonapi/editTerminology", terminologyDto, createdBy);
        }

        public ServiceResult<TerminologyDto> GetTerminology(int terminologyId) {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync<TerminologyDto>(httpClient, $"api/commonapi/getTerminologies?terminologyId={terminologyId}");
        }

        public ServiceResult<List<PriceListDto>> GetPriceLists() {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync<List<PriceListDto>>(httpClient, $"api/commonapi/getPriceLists");
        }

        public ServiceResult<PriceListDto> AddPriceList(PriceListDto priceListDto, int createdBy) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync<PriceListDto>(httpClient, $"api/commonapi/addPriceList", priceListDto, createdBy);
        }

        public ServiceResult<PriceListDto> UpdatePriceList(PriceListDto priceListDto, int createdBy) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync<PriceListDto>(httpClient, "api/commonapi/editPriceList", priceListDto, createdBy);
        }

        public ServiceResult<PriceListDto> GetPriceList(int priceListId) {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync<PriceListDto>(httpClient, $"api/commonapi/getPriceList?priceListId={priceListId}");
        }

        public ServiceResult<List<CompanyTerminologyDto>> GetCompanyTerminologies() {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync<List<CompanyTerminologyDto>>(httpClient, $"api/commonapi/getCompanyTerminologies");
        }

        public ServiceResult<CompanyTerminologyDto> AddCompanyTerminology(CompanyTerminologyDto companyTerminologyDto, int createdBy) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync<CompanyTerminologyDto>(httpClient, "api/commonapi/addCompanyTerminology", companyTerminologyDto, createdBy);
        }

        public ServiceResult<CompanyTerminologyDto> UpdateCompanyTerminology(CompanyTerminologyDto companyTerminologyDto, int createdBy) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync<CompanyTerminologyDto>(httpClient, "api/commonapi/editCompanyTerminology", companyTerminologyDto, createdBy);
        }

        public ServiceResult<CompanyTerminologyDto> DeleteCompanyTerminology(int companyTerminologyId) {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync<CompanyTerminologyDto>(httpClient, $"api/commonapi/deleteCompanyTerminology?companyTerminologyId={companyTerminologyId}");
        }

        public ServiceResult<CompanyTerminologyDto> GetCompanyTerminology(int companyTerminologyId) {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync<CompanyTerminologyDto>(httpClient, $"api/commonapi/getCompanyTerminology?companyTerminologyId={companyTerminologyId}");
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

        public ServiceResult<List<TongueDto>> GetTongues() {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync<List<TongueDto>>(httpClient, "api/commonapi/getTongues");
        }

        public ServiceResult<List<SpecializationDto>> GetSpecializations() {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync<List<SpecializationDto>>(httpClient, "api/commonapi/getSpecializations");
        }

        public ServiceResult<List<SoftwareDto>> GetSoftwares() {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync<List<SoftwareDto>>(httpClient, "api/commonapi/getSoftwares");
        }

        public ServiceResult<List<BankAccountTypeDto>> GetBankAccountTypes() {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync<List<BankAccountTypeDto>>(httpClient, "api/commonapi/getBankAccountTypes");
        }

        public ServiceResult<List<CurrencyDto>> GetCurrencies() {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync<List<CurrencyDto>>(httpClient, "api/commonapi/getCurrencies");
        }

        public ServiceResult<List<WorkingTypeDto>> GetWorkingTypes() {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync<List<WorkingTypeDto>>(httpClient, "api/commonapi/getWorkingTypes");
        }

        public ServiceResult<List<ServiceTypeDto>> GetServiceTypes() {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync<List<ServiceTypeDto>>(httpClient, "api/commonapi/getServiceTypes");
        }

        public ServiceResult<List<TranslationQualityDto>> GetTranslationQualities() {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync<List<TranslationQualityDto>>(httpClient, "api/commonapi/getTranslationQualities");
        }

        public ServiceResult<CareerItemDto> SaveCareerItem(CareerItemDto careerItem) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync<CareerItemDto>(httpClient, "api/commonapi/saveCareerItem", careerItem, 1);
        }

        public ServiceResult<List<CareerItemDto>> GetCareerItems() {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync<List<CareerItemDto>>(httpClient, "api/commonapi/getCareerItems");
        }

        public ServiceResult<CareerItemDto> GetCareerItem(int id) {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync<CareerItemDto>(httpClient, "api/commonapi/getCareerItem?id=" + id);
        }

        public ServiceResult<CareerItemDto> UpdateCareerItem(CareerItemDto careerItem) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync<CareerItemDto>(httpClient, "api/commonapi/updateCareerItem", careerItem, 1);
        }

        #endregion
    }
}