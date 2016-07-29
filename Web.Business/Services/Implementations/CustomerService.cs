using Tangent.CeviriDukkani.Domain.Common;
using Tangent.CeviriDukkani.Domain.Dto.Sale;
using Web.Business.Services.Interfaces;

namespace Web.Business.Services.Implementations {
    public class CustomerService:ICustomerService {
        #region Implementation of ICustomerService

        public ServiceResult AddCustomer(CustomerDto customerDto, int createdBy) {
            throw new System.NotImplementedException();
        }

        public ServiceResult GetCustomer(int userId) {
            throw new System.NotImplementedException();
        }

        public ServiceResult EditCustomer(CustomerDto customerDto, int createdBy) {
            throw new System.NotImplementedException();
        }

        public ServiceResult GetCustomers() {
            throw new System.NotImplementedException();
        }

        public ServiceResult GetCustomersByCompanyId(int companyId) {
            throw new System.NotImplementedException();
        }

        #endregion
    }
}