using System.Web.Mvc;
using Tangent.CeviriDukkani.Domain.Common;
using Tangent.CeviriDukkani.Domain.Dto.Enums;
using Web.Business.Services.Interfaces;
using Web.UI.Areas.Admin.Helpers;

namespace Web.UI.Areas.Admin.Controllers
{
    [SessionControl(new[] { UserRoleTypeEnum.Admin })]
    public class CompanyController : Controller {
        private readonly ICommonService _commonService;

        public CompanyController(ICommonService commonService)
        {
            _commonService = commonService;
        }

        // GET: Admin/Company
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Create()
        {
            return View();
        }
        public ActionResult Edit(int id)
        {
            var serviceResult = _commonService.GetCompany(id);
            if (serviceResult.ServiceResultType != ServiceResultType.Success)
            {
                return View("Index");
            }

            return View(serviceResult.Data);
        }
        public ActionResult Detail()
        {
            return View();
        }
    }
}