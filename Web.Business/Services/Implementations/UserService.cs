using Tangent.CeviriDukkani.Domain.Common;
using Tangent.CeviriDukkani.Domain.Dto.System;
using Web.Business.Services.Interfaces;

namespace Web.Business.Services.Implementations {
    public class UserService:IUserService {
        #region Implementation of IUserService

        public ServiceResult AddUser(UserDto user, int createdBy) {
            throw new System.NotImplementedException();
        }

        public ServiceResult GetUser(int userId) {
            throw new System.NotImplementedException();
        }

        public ServiceResult EditUser(UserDto userDto, int createdBy) {
            throw new System.NotImplementedException();
        }

        public ServiceResult GetUsers() {
            throw new System.NotImplementedException();
        }

        public ServiceResult GetTranslatorsAccordingToOrderTranslationQuality(int orderId) {
            throw new System.NotImplementedException();
        }

        public ServiceResult CreateUser(UserDto user) {
            throw new System.NotImplementedException();
        }

        public ServiceResult AddOrUpdateUserContact(UserDto userDto, int createdBy) {
            throw new System.NotImplementedException();
        }

        public ServiceResult AddOrUpdateUserAbility(UserDto userDto, int createdBy) {
            throw new System.NotImplementedException();
        }

        public ServiceResult AddOrUpdateUserPayment(UserDto userDto, int createdBy) {
            throw new System.NotImplementedException();
        }

        public ServiceResult AddOrUpdateUserRate(UserDto userDto, int createdBy) {
            throw new System.NotImplementedException();
        }

        public ServiceResult GetTechnologyKnowledgesByUserAbilityId(int userAbilityId) {
            throw new System.NotImplementedException();
        }

        public ServiceResult GetRateItemsByUserRateId(int userRateId) {
            throw new System.NotImplementedException();
        }

        #endregion
    }
}