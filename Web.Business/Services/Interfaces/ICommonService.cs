using System.Collections.Generic;
using Tangent.CeviriDukkani.Domain.Common;
using Tangent.CeviriDukkani.Domain.Dto.Common;
using Tangent.CeviriDukkani.Domain.Dto.Request;
using Tangent.CeviriDukkani.Domain.Dto.Sale;
using Tangent.CeviriDukkani.Domain.Dto.System;
using Tangent.CeviriDukkani.Domain.Dto.Translation;

namespace Web.Business.Services.Interfaces {
    public interface ICommonService {
        ServiceResult Login(LoginRequestDto loginRequest);
        ServiceResult ChangePassword(ChangePasswordRequestDto changePasswordRequest);
        ServiceResult AddMessage(MessageDto messageDto, int createdBy);
        ServiceResult GetIncomingMessages(int userId);
        ServiceResult GetSentMessages(int userId);
        ServiceResult GetMessage(int messageId);
        ServiceResult UpdateMessageForReadDate(int messageId);
        ServiceResult DeleteSentMessage(int messageId);
        ServiceResult DeleteIncomingMessage(int messageId);
        ServiceResult GetCompanies();
        ServiceResult AddCompany(CompanyDto companyDto, int userId);
        ServiceResult UpdateCompany(CompanyDto companyDto, int userId);
        ServiceResult GetCompany(int companyId);
        ServiceResult GetLanguages();
        ServiceResult AddLanguage(LanguageDto languageDto, int createdBy);
        ServiceResult UpdateLanguage(LanguageDto languageDto, int createdBy);
        ServiceResult GetLanguage(int languageId);
        ServiceResult GetTargetLanguages(int sourceLanguageId);
        ServiceResult AddSourceTargetLanguages(SourceTargetLanguageDto sourceTargetLanguageDto, int createdBy);
        ServiceResult DeleteSourceTargetLanguages(SourceTargetLanguageDto sourceTargetLanguageDto);
        ServiceResult GetTerminologies();
        ServiceResult AddTerminology(TerminologyDto terminologyDto, int createdBy);
        ServiceResult UpdateTerminology(TerminologyDto terminologyDto, int createdBy);
        ServiceResult GetTerminology(int terminologyId);
        ServiceResult GetPriceLists();
        ServiceResult AddPriceList(PriceListDto priceListDto, int createdBy);
        ServiceResult UpdatePriceList(PriceListDto priceListDto, int createdBy);
        ServiceResult GetPriceList(int priceListId);
        ServiceResult GetCompanyTerminologies();
        ServiceResult AddCompanyTerminology(CompanyTerminologyDto companyTerminologyDto, int createdBy);
        ServiceResult UpdateCompanyTerminology(CompanyTerminologyDto companyTerminologyDto, int createdBy);
        ServiceResult DeleteCompanyTerminology(int companyTerminologyId);
        ServiceResult GetCompanyTerminology(int companyTerminologyId);
        ServiceResult<List<UserRoleTypeDto>> GetUserRoleTypes();
        ServiceResult<List<CountryDto>> GetCountries();
        ServiceResult<List<CityDto>> GetCitiesByCountryId(int countryId);
        ServiceResult<List<DistrictDto>> GetDistrictByCityId(int cityId);
        ServiceResult GetTongues();
        ServiceResult GetSpecializations();
        ServiceResult GetSoftwares();
        ServiceResult GetBankAccountTypes();
        ServiceResult GetCurrencies();
        ServiceResult GetWorkingTypes();
        ServiceResult GetServiceTypes();
    }
}