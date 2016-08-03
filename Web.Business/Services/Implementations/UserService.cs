using System;
using Tangent.CeviriDukkani.Domain.Common;
using Tangent.CeviriDukkani.Domain.Dto.System;
using Web.Business.Services.Interfaces;

namespace Web.Business.Services.Implementations {
    public class UserService : BaseService, IUserService {
        #region Implementation of IUserService

        public ServiceResult AddUser(UserDto user, int createdBy) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync(httpClient, "api/userapi/addUser", user, userId: createdBy);
        }

        public ServiceResult GetUser(int userId) {
            //var httpClient = GetClient(ServiceUrl.System);
            //return GetAsAsync(httpClient, $"api/userapi/login?userId={userId}");
            throw new NotImplementedException();

        }

        public ServiceResult EditUser(UserDto userDto, int createdBy) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync(httpClient, "api/userapi/editUser", userDto, userId: createdBy);
        }

        public ServiceResult GetUsers() {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync(httpClient, "api/userapi/getUsers");
        }

        public ServiceResult GetTranslatorsAccordingToOrderTranslationQuality(int orderId) {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync(httpClient, "api/userapi/getTranslatorsAccordingToOrderTranslationQuality?userId={userId}");
        }

        public ServiceResult CreateUser(UserDto user) {
            //var httpClient = GetClient(ServiceUrl.System);
            //return PostAsAsync(httpClient, "api/userapi/login", loginRequest);
            throw new NotImplementedException();
        }

        public ServiceResult AddOrUpdateUserContact(UserDto userDto, int createdBy) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync(httpClient, "api/userapi/editUserContact", userDto, userId: createdBy);
        }

        public ServiceResult AddOrUpdateUserAbility(UserDto userDto, int createdBy) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync(httpClient, "api/userapi/editUserAbility", userDto, userId: createdBy);
        }

        public ServiceResult AddOrUpdateUserPayment(UserDto userDto, int createdBy) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync(httpClient, "api/userapi/editUserPayment", userDto, userId: createdBy);
        }

        public ServiceResult AddOrUpdateUserRate(UserDto userDto, int createdBy) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync(httpClient, "api/userapi/editUserRate", userDto, userId: createdBy);
        }

        public ServiceResult GetTechnologyKnowledgesByUserAbilityId(int userAbilityId) {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync(httpClient, "api/userapi/getTechnologyKnowledgesByUserAbilityId?userAbilityId={userAbilityId}");
        }

        public ServiceResult GetRateItemsByUserRateId(int userRateId) {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync(httpClient, "api/userapi/getRateItemsByUserRateId?userRateId={userRateId}");
        }

        #endregion
    }
}