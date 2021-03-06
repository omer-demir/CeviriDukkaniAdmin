﻿using System.Configuration;
using System.Web.Mvc;
using Tangent.CeviriDukkani.Domain.Common;
using Tangent.CeviriDukkani.Domain.Dto.Request;
using Tangent.CeviriDukkani.Domain.Exceptions.ExceptionCodes;
using Web.Business.Extensions;
using Web.Business.Services.Interfaces;

namespace Web.UI.Controllers {
    public class HomeController : Controller {

        // GET: Admin/Account
        private readonly ICommonService _commonService;
        private readonly IUserService _userService;

        public HomeController(ICommonService commonService,IUserService userService) {
            _commonService = commonService;
            _userService = userService;
        }

        [Route("")]
        public ActionResult Index() {
            return View();
        }

        [Route("tercume")]
        public ActionResult Translation() {
            return View();
        }

        [Route("Ceviri-Burosu")]
        public ActionResult TranslatingOffice() {
            return View();
        }

        [Route("Ingilizce-Turkce-Tercume")]
        public ActionResult EnglishTurkishTranslation() {
            return View();
        }

        [Route("Turkce-Ingilizce-Ceviri")]
        public ActionResult TurkishEnglishTranslation() {
            return View();
        }

        [Route("Profesyonel-Ceviri")]
        public ActionResult ProfessionalTranslation() {
            return View();
        }

        [Route("Hizli-Ceviri")]
        public ActionResult QuickTranslation() {
            return View();
        }

        [Route("Kaliteli-Ceviri")]
        public ActionResult QualityTranslation() {
            return View();
        }

        [Route("Ingilizce-Ceviri")]
        public ActionResult EnglishTranslation() {
            return View();
        }

        [Route("Turkce-Ceviri")]
        public ActionResult TurkishTranslation() {
            return View();
        }

        [Route("Ceviri-Yaptir")]
        public ActionResult MakeTranslating() {
            return View();
        }

        [Route("Dil-Cevirisi")]
        public ActionResult LanguageTranslation() {
            return View();
        }

        [Route("Guvenlik-ve-Gizlilik")]
        public ActionResult SecurityAndPrivacy() {
            return View();
        }

        [Route("Banka-hesap-bilgileri")]
        public ActionResult BillingInfo() {
            return View();
        }

        [Route("Hizmet-Sozlesmesi")]
        public ActionResult ServiceAggrement() {
            return View();
        }

        [Route("Hakkimizda")]
        public ActionResult About() {
            return View();
        }

        [Route("Nasil-Calisiyor")]
        public ActionResult HowItWorks() {
            return View();
        }

        [Route("iletisim")]
        public ActionResult Contact() {
            return View();
        }

        [Route("is-firsatlari")]
        public ActionResult Career() {
            var jobResult = _commonService.GetCareerItems();
            if (jobResult.ServiceResultType != ServiceResultType.Success) {
                ViewBag.Error = jobResult.ExceptionCode;
                return View();
            }

            return View(jobResult.Data);
        }

        [Route("Basvur")]
        public ActionResult ApplyForAJob(int jid) {
            return View();
        }

        [Route("isDetaylari")]
        public ActionResult JobDetail(int jid) {
            var jobResult = _commonService.GetCareerItem(jid);
            if (jobResult.ServiceResultType != ServiceResultType.Success) {
                ViewBag.Error = jobResult.ExceptionCode;
                return View();
            }

            return View(jobResult.Data);
        }

        [Route("Tercuman-Ol")]
        public ActionResult TranslatorSignUp(string leftOffHash) {
            return View();
        }

        [Route("Uye-Ol")]
        public ActionResult SignUp()
        {
            return View();
        }

        [HttpPost]
        public ActionResult SignUp(LoginRequestDto model)
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
                        var passwordRetryCount = int.Parse(ConfigurationManager.AppSettings["PasswordRetryCount"]);
                        ViewBag.Error = $"Parola hatalı. {passwordRetryCount - result.Data.PasswordRetryCount} defa daha yanlış girdiğiniz takdirde kullanıcınız kilitlenecektir.";
                        break;
                    default:
                        ViewBag.Error = "Kullanıcı adı hatalı";
                        break;
                }
                return View();
            }

            Session["user"] = result.Data;

            return RedirectToAction("Index", "Home", new { Area = "Admin" });
        }


    }
}