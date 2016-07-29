using System.Web.Mvc;
using Tangent.CeviriDukkani.Domain.Common;
using Tangent.CeviriDukkani.Domain.Dto.Enums;
using Tangent.CeviriDukkani.Domain.Dto.System;
using Web.Business.Services.Interfaces;
using Web.UI.Areas.Admin.Helpers;

namespace Web.UI.Areas.Admin.Controllers
{
    [SessionControl(new[] { UserRoleTypeEnum.Admin })]
    public class UserController : Controller
    {
        private readonly IUserService _userService;

        private readonly ICommonService _commonService;
        public UserController(IUserService userService, ICommonService commonService)
        {
            _userService = userService;
            _commonService = commonService;
        }

        void GetUserRoleTypes()
        {
            var serviceResult = _commonService.GetUserRoleTypes();
            if (serviceResult.ServiceResultType == ServiceResultType.Success)
            {
                ViewBag.UserRoleTypes = serviceResult.Data;
            }
        }
        void GetTerminologies()
        {
            var serviceResult = _commonService.GetTerminologies();
            if (serviceResult.ServiceResultType == ServiceResultType.Success)
            {
                ViewBag.Terminologies = serviceResult.Data;
            }
        }
        void GetSoftwares()
        {
            var serviceResult = _commonService.GetSoftwares();
            if (serviceResult.ServiceResultType == ServiceResultType.Success)
            {
                ViewBag.Softwares = serviceResult.Data;
            }
        }
        void GetCountries()
        {
            var serviceResult = _commonService.GetCountries();
            if (serviceResult.ServiceResultType == ServiceResultType.Success)
            {
                ViewBag.Countries = serviceResult.Data;
            }
        }
        void GetBankAccountTypes()
        {
            var serviceResult = _commonService.GetBankAccountTypes();
            if (serviceResult.ServiceResultType == ServiceResultType.Success)
            {
                ViewBag.BankAccountTypes = serviceResult.Data;
            }
        }
        void GetCurrencies()
        {
            var serviceResult = _commonService.GetCurrencies();
            if (serviceResult.ServiceResultType == ServiceResultType.Success)
            {
                ViewBag.Currencies = serviceResult.Data;
            }
        }
        void GetWorkingTypes()
        {
            var serviceResult = _commonService.GetWorkingTypes();
            if (serviceResult.ServiceResultType == ServiceResultType.Success)
            {
                ViewBag.WorkingTypes = serviceResult.Data;
            }
        }
        void GetServiceTypes()
        {
            var serviceResult = _commonService.GetServiceTypes();
            if (serviceResult.ServiceResultType == ServiceResultType.Success)
            {
                ViewBag.ServiceTypes = serviceResult.Data;
            }
        }
        void GetLanguages()
        {
            var serviceResult = _commonService.GetLanguages();
            if (serviceResult.ServiceResultType == ServiceResultType.Success)
            {
                ViewBag.Languages = serviceResult.Data;
            }
        }
        // GET: User
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Create()
        {
            GetUserRoleTypes();
            return View();
        }

        [HttpPost]
        public JsonResult Create(UserDto user)
        {
            var serviceResult = _userService.CreateUser(user);
            if (serviceResult.ServiceResultType != ServiceResultType.Success)
            {
                return Json("Error", JsonRequestBehavior.AllowGet);
            }
            return Json("Ok", JsonRequestBehavior.AllowGet);            
        }

        public ActionResult Edit(int id)
        {
            GetUserRoleTypes();
            GetTerminologies();
            GetSoftwares();
            GetCountries();
            GetBankAccountTypes();
            GetCurrencies();
            GetWorkingTypes();
            GetServiceTypes();
            GetLanguages();
            var serviceResult = _userService.GetUser(id);
            if (serviceResult.ServiceResultType != ServiceResultType.Success)
            {
                return View("Index");
            }

            return View((UserDto)serviceResult.Data);
        }

        public ActionResult Detail()
        {
            return View();
        }
    }
}