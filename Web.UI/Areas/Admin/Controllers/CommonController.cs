using System.Web.Mvc;
using Tangent.CeviriDukkani.Domain.Common;
using Tangent.CeviriDukkani.Domain.Dto.Enums;
using Web.Business.Services.Interfaces;
using Web.UI.Areas.Admin.Helpers;

namespace Web.UI.Areas.Admin.Controllers
{
    [SessionControl(new[] { UserRoleTypeEnum.Admin })]

    public class CommonController : BaseController
    {
        // GET: Admin/Common
        private readonly ICommonService _commonService;

        public CommonController(ICommonService commonService)
        {
            _commonService = commonService;
        }

        void GetCompanies()
        {
            var serviceResult = _commonService.GetCompanies();
            if (serviceResult.ServiceResultType == ServiceResultType.Success)
            {
                ViewBag.Companies = serviceResult.Data;
            }
        }

        public ActionResult Languages()
        {
            return View();
        }

        public ActionResult Terminologies()
        {
            return View();
        }

        public ActionResult SourceTargetLanguages()
        {
            var serviceResult = _commonService.GetLanguages();
            if (serviceResult.ServiceResultType != ServiceResultType.Success)
            {
                return Redirect("/Admin/Home");
            }

            return View(serviceResult.Data);
        }

        public ActionResult PriceList()
        {
            return View();
        }

        public ActionResult CompanyTerminologies()
        {
            return View();
        }

        public ActionResult CompanyTerminologyCreate()
        {
            GetCompanies();
            return View();
        }
    }
}