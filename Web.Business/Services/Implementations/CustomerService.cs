using System.Collections.Generic;
using Tangent.CeviriDukkani.Domain.Common;
using Tangent.CeviriDukkani.Domain.Dto.Sale;
using Tangent.CeviriDukkani.Domain.Dto.Translation;
using Web.Business.Services.Interfaces;

namespace Web.Business.Services.Implementations {
    public class CustomerService : BaseService, ICustomerService {
        #region Implementation of ICustomerService

        public ServiceResult<CustomerDto> AddCustomer(CustomerDto customerDto, int createdBy) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync<CustomerDto>(httpClient, $"api/customerapi/addCustomer", customerDto, createdBy);
        }

        public ServiceResult<CustomerDto> GetCustomer(int customerId) {
            var httpClient = GetClient(BaseService.ServiceUrl.System);
            return GetAsAsync<CustomerDto>(httpClient, $"api/customerapi/getCustomer?customerId={customerId}");
        }

        public ServiceResult<CustomerDto> EditCustomer(CustomerDto customerDto, int createdBy) {
            var httpClient = GetClient(ServiceUrl.System);
            return PostAsAsync<CustomerDto>(httpClient, $"api/customerapi/editCustomer", customerDto, createdBy);
        }

        public ServiceResult<List<CustomerDto>> GetCustomers() {
            var httpClient = GetClient(BaseService.ServiceUrl.System);
            return GetAsAsync<List<CustomerDto>>(httpClient, $"api/customerapi/getCustomers");
        }

        public ServiceResult<List<CustomerDto>> GetCustomersByCompanyId(int companyId) {
            var httpClient = GetClient(BaseService.ServiceUrl.System);
            return GetAsAsync<List<CustomerDto>>(httpClient, $"api/customerapi/getCustomersByCompanyId?companyId={companyId}");
        }

        #endregion
    }
}