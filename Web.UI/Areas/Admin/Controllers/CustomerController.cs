using System.Collections.Generic;
using System.Web.Mvc;
using Tangent.CeviriDukkani.Domain.Common;
using Tangent.CeviriDukkani.Domain.Dto.Common;
using Tangent.CeviriDukkani.Domain.Dto.Enums;
using Tangent.CeviriDukkani.Domain.Dto.Sale;
using Web.Business.Services.Interfaces;
using Web.UI.Areas.Admin.Helpers;

namespace Web.UI.Areas.Admin.Controllers
{
    [SessionControl(new[] { UserRoleTypeEnum.Admin })]
    public class CustomerController : Controller
    {
        private readonly ICustomerService _customerService;
        private readonly ICommonService _commonService;

        public CustomerController(ICustomerService customerService, ICommonService commonService)
        {
            _customerService = customerService;
            _commonService = commonService;
        }

        void GetCompanies()
        {
            var serviceResult = _commonService.GetCompanies();
            if (serviceResult.ServiceResultType == ServiceResultType.Success)
            {
                ViewBag.Companies = serviceResult.Data as List<CompanyDto>;
            }
        }

        // GET: Admin/Customer
        public ActionResult Index(int? id)
        {
            if (id.HasValue)
            {
                var serviceResult = _commonService.GetCompany(id.Value);
                return View(serviceResult.Data as CompanyDto);
            }
            return View();
        }
        public ActionResult Create()
        {
            GetCompanies();
            return View();
        }

        public ActionResult Detail()
        {
            return View();
        }

        public ActionResult Edit(int id)
        {
            GetCompanies();
            var serviceResult = _customerService.GetCustomer(id);
            if (serviceResult.ServiceResultType != ServiceResultType.Success)
            {
                return View("Index");
            }

            return View((CustomerDto)serviceResult.Data);
        }
    }
}