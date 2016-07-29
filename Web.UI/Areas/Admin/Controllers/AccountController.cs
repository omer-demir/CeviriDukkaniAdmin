using System.Web.Mvc;
using Tangent.CeviriDukkani.Domain.Common;
using Tangent.CeviriDukkani.Domain.Dto.Request;
using Tangent.CeviriDukkani.Domain.Exceptions.ExceptionCodes;
using Web.Business.Services.Interfaces;

namespace Web.UI.Areas.Admin.Controllers
{
    public class AccountController : Controller
    {
        // GET: Admin/Account
        private readonly ICommonService _commonService;

        public AccountController(ICommonService commonService)
        {
            _commonService = commonService;
        }

        // GET: Admin/Account
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Login(LoginRequestDto model)
        {
            var result = _commonService.Login(model);
            if (result.ServiceResultType != ServiceResultType.Success)
            {
                switch (result.ExceptionCode)
                {
                    case ExceptionCodes.UserLockedOut:
                        ViewBag.Error = "Parolanızı yanlış girme limitine ulaştığınızdan giriş yapamazsınız.";
                        break;
                    case ExceptionCodes.PassiveUser:
                        ViewBag.Error = "Kullanıcınız kilitlenmiştir.";
                        break;
                    case ExceptionCodes.WrongPasswordForUser:
                        ViewBag.Error = $"Parola hatalı. {result.Data} defa daha yanlış girdiğiniz takdirde kullanıcınız kilitlenecektir.";
                        break;
                    default:
                        ViewBag.Error = "Kullanıcı adı hatalı";
                        break;
                }
                return View();
            }

            Session["user"] = result.Data;

            return RedirectToAction("Index", "Home");
        }

        public ActionResult Logout()
        {
            Session.Clear();
            Session.Abandon();

            return RedirectToAction("Login", "Account");
        }
    }
}