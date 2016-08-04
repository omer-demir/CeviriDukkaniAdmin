using System;
using System.Collections.Generic;
using Tangent.CeviriDukkani.Domain.Common;
using Tangent.CeviriDukkani.Domain.Dto.Enums;
using Tangent.CeviriDukkani.Domain.Dto.System;
using Web.Business.Services.Interfaces;

namespace Web.Business.Services.Implementations {
    public class UserService : BaseService, IUserService {
        #region Implementation of IUserService

        public ServiceResult<UserDto> AddUser(UserDto user, int createdBy) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync<UserDto>(httpClient, "api/userapi/addUser", user, userId: createdBy);
        }

        public ServiceResult<UserDto> GetUser(int userId) {
            //var httpClient = GetClient(ServiceUrl.System);
            //return GetAsAsync(httpClient, $"api/userapi/login?userId={userId}");
            throw new NotImplementedException();

        }

        public ServiceResult<UserDto> EditUser(UserDto userDto, int createdBy) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync<UserDto>(httpClient, "api/userapi/editUser", userDto, userId: createdBy);
        }

        public ServiceResult<List<UserDto>> GetUsers() {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync<List<UserDto>>(httpClient, "api/userapi/getUsers");
        }

        public ServiceResult<List<UserDto>> GetUsersByUserRoleTypes(List<int> userRoleTypeEnums)
        {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync<List<UserDto>>(httpClient, "api/userapi/GetUsersByUserRoleTypes", userRoleTypeEnums);
        }

        public ServiceResult<List<UserDto>> GetTranslatorsAccordingToOrderTranslationQuality(int orderId) {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync< List<UserDto>>(httpClient, $"api/userapi/getTranslatorsAccordingToOrderTranslationQuality?orderId={orderId}");
        }

        public ServiceResult CreateUser(UserDto user) {
            //var httpClient = GetClient(ServiceUrl.System);
            //return PostAsAsync(httpClient, "api/userapi/login", loginRequest);
            throw new NotImplementedException();
        }

        public ServiceResult<UserDto> AddOrUpdateUserContact(UserDto userDto, int createdBy) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync<UserDto>(httpClient, "api/userapi/editUserContact", userDto, userId: createdBy);
        }

        public ServiceResult<UserDto> AddOrUpdateUserAbility(UserDto userDto, int createdBy) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync<UserDto>(httpClient, "api/userapi/editUserAbility", userDto, userId: createdBy);
        }

        public ServiceResult<UserDto> AddOrUpdateUserPayment(UserDto userDto, int createdBy) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync<UserDto>(httpClient, "api/userapi/editUserPayment", userDto, userId: createdBy);
        }

        public ServiceResult<UserDto> AddOrUpdateUserRate(UserDto userDto, int createdBy) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync<UserDto>(httpClient, "api/userapi/editUserRate", userDto, userId: createdBy);
        }

        public ServiceResult<List<TechnologyKnowledgeDto>> GetTechnologyKnowledgesByUserAbilityId(int userAbilityId) {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync<List<TechnologyKnowledgeDto>>(httpClient, $"api/userapi/getTechnologyKnowledgesByUserAbilityId?userAbilityId={userAbilityId}");
        }

        public ServiceResult<List<RateItemDto>> GetRateItemsByUserRateId(int userRateId) {
            var httpClient = GetClient(ServiceUrl.System);
            return GetAsAsync<List<RateItemDto>>(httpClient, $"api/userapi/getRateItemsByUserRateId?userRateId={userRateId}");
        }

        #endregion
    }
}