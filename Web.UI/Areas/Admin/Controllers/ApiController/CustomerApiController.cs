using System.Net;
using System.Net.Http;
using System.Web.Http;
using Tangent.CeviriDukkani.Domain.Common;
using Tangent.CeviriDukkani.Domain.Dto.Sale;
using Web.Business.Services.Interfaces;

namespace Web.UI.Areas.Admin.Controllers.ApiController
{
    [RoutePrefix("api/v1/customerapi")]
    public class CustomerApiController : BaseApiController
    {
        private readonly ICustomerService _customerService;

        public CustomerApiController(ICustomerService userService)
        {
            _customerService = userService;
        }
        [HttpPost, Route("addCustomer")]
        public HttpResponseMessage AddCustomer(CustomerDto customerDto)
        {
            var response = new HttpResponseMessage();
            var serviceResult = _customerService.AddCustomer(customerDto, 1);
            if (serviceResult.ServiceResultType != ServiceResultType.Success)
            {
                response.StatusCode = HttpStatusCode.InternalServerError;
                return response;
            }


            response.StatusCode = HttpStatusCode.OK;
            response.Content = new ObjectContent(serviceResult.Data.GetType(), serviceResult.Data, Formatter);
            return response;
        }

        [HttpPost, Route("editCustomer")]
        public HttpResponseMessage EditCustomer(CustomerDto customerDto)
        {
            var response = new HttpResponseMessage();
            var serviceResult = _customerService.EditCustomer(customerDto, 1);
            if (serviceResult.ServiceResultType != ServiceResultType.Success)
            {
                response.StatusCode = HttpStatusCode.InternalServerError;
                return response;
            }


            response.StatusCode = HttpStatusCode.OK;
            response.Content = new ObjectContent(serviceResult.Data.GetType(), serviceResult.Data, Formatter);
            return response;
        }

        [HttpGet, Route("getCustomers")]
        public HttpResponseMessage GetCustomers(int? companyId)
        {
            var response = new HttpResponseMessage();
            ServiceResult serviceResult = companyId.HasValue ?
                _customerService.GetCustomersByCompanyId(companyId.Value) :
                _customerService.GetCustomers();
            if (serviceResult.ServiceResultType != ServiceResultType.Success)
            {
                response.StatusCode = HttpStatusCode.InternalServerError;
                return response;
            }

            response.StatusCode = HttpStatusCode.OK;
            response.Content = new ObjectContent(serviceResult.Data.GetType(), serviceResult.Data, Formatter);
            return response;
        }

        [HttpGet, Route("getCustomersByCompanyId")]
        public HttpResponseMessage GetCustomersByCompanyId([FromUri]int companyId)
        {
            var response = new HttpResponseMessage();
            var serviceResult = _customerService.GetCustomersByCompanyId(companyId);
            if (serviceResult.ServiceResultType != ServiceResultType.Success)
            {
                response.StatusCode = HttpStatusCode.InternalServerError;
                return response;
            }

            response.StatusCode = HttpStatusCode.OK;
            response.Content = new ObjectContent(serviceResult.Data.GetType(), serviceResult.Data, Formatter);
            return response;
        }
    }
}
