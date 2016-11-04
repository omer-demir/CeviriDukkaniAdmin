using System.Collections.Generic;
using Tangent.CeviriDukkani.Domain.Common;
using Tangent.CeviriDukkani.Domain.Dto.Sale;

namespace Web.Business.Services.Interfaces {
    public interface ICustomerService {
        ServiceResult<CustomerDto> AddCustomer(CustomerDto customerDto, int createdBy);
        ServiceResult<CustomerDto> GetCustomer(int userId);
        ServiceResult<CustomerDto> EditCustomer(CustomerDto customerDto, int createdBy);
        ServiceResult<List<CustomerDto>> GetCustomers();
        ServiceResult<List<CustomerDto>> GetCustomersByCompanyId(int companyId);
        ServiceResult<CustomerDto> SetActive(CustomerDto customerDto);
    }
}