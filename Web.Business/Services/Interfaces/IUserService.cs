using System.Collections.Generic;
using Tangent.CeviriDukkani.Domain.Common;
using Tangent.CeviriDukkani.Domain.Dto.Enums;
using Tangent.CeviriDukkani.Domain.Dto.Request;
using Tangent.CeviriDukkani.Domain.Dto.System;

namespace Web.Business.Services.Interfaces {
    public interface IUserService {
        ServiceResult<UserDto> AddUser(UserDto user, int createdBy);
        ServiceResult<UserDto> GetUser(int userId);
        ServiceResult<UserDto> EditUser(UserDto userDto, int createdBy);
        ServiceResult<List<UserDto>> GetUsers();
        ServiceResult<List<UserDto>> GetUsersByUserRoleTypes(List<int> userRoleTypeEnums);
        ServiceResult<List<UserDto>> GetTranslatorsAccordingToOrderTranslationQuality(int orderId);
        ServiceResult<UserDto> AddOrUpdateUserContact(UserDto userDto, int createdBy);
        ServiceResult<UserDto> AddOrUpdateUserAbility(UserDto userDto, int createdBy);
        ServiceResult<UserDto> AddOrUpdateUserPayment(UserDto userDto, int createdBy);
        ServiceResult<UserDto> AddOrUpdateUserRate(UserDto userDto, int createdBy);
        ServiceResult<List<TechnologyKnowledgeDto>> GetTechnologyKnowledgesByUserAbilityId(int userAbilityId);
        ServiceResult<List<RateItemDto>> GetRateItemsByUserRateId(int userRateId);
        ServiceResult<UserDto> UpdateUserRegistration(UpdateUserStepRequestDto request);
        ServiceResult<UpdateUserStepRequestDto> GetUserRegistration(int id);
        ServiceResult<UserDto> SetActive(int id,bool active,int? updatedBy);
        ServiceResult<UserDto> SetActive(UserDto userDto);
    }
}