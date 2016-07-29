using Tangent.CeviriDukkani.Domain.Common;
using Tangent.CeviriDukkani.Domain.Dto.System;

namespace Web.Business.Services.Interfaces {
    public interface IUserService {
        ServiceResult AddUser(UserDto user, int createdBy);
        ServiceResult GetUser(int userId);
        ServiceResult EditUser(UserDto userDto, int createdBy);
        ServiceResult GetUsers();
        ServiceResult GetTranslatorsAccordingToOrderTranslationQuality(int orderId);
        ServiceResult CreateUser(UserDto user);
        ServiceResult AddOrUpdateUserContact(UserDto userDto, int createdBy);
        ServiceResult AddOrUpdateUserAbility(UserDto userDto, int createdBy);
        ServiceResult AddOrUpdateUserPayment(UserDto userDto, int createdBy);
        ServiceResult AddOrUpdateUserRate(UserDto userDto, int createdBy);
        ServiceResult GetTechnologyKnowledgesByUserAbilityId(int userAbilityId);
        ServiceResult GetRateItemsByUserRateId(int userRateId);
    }
}