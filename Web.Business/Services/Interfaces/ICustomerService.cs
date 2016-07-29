using Tangent.CeviriDukkani.Domain.Common;
using Tangent.CeviriDukkani.Domain.Dto.Sale;

namespace Web.Business.Services.Interfaces {
    public interface ICustomerService {
        ServiceResult AddCustomer(CustomerDto customerDto, int createdBy);
        ServiceResult GetCustomer(int userId);
        ServiceResult EditCustomer(CustomerDto customerDto, int createdBy);
        ServiceResult GetCustomers();
        ServiceResult GetCustomersByCompanyId(int companyId);
    }
}