﻿using System.Web.Mvc;
using Web.Business.Services.Interfaces;

namespace Web.UI.Controllers {
    public class HomeController : Controller {

        // GET: Admin/Account
        private readonly ICommonService _commonService;

        public HomeController(ICommonService commonService)
        {
            _commonService = commonService;
        }

        // GET: Home
        [Route("")]
        public ActionResult Index() {
            return View();
        }

        [Route("tercume")]
        public ActionResult Translation()
        {
            return View();
        }

        [Route("Ceviri-Burosu")]
        public ActionResult TranslatingOffice()
        {
            return View();
        }

        [Route("Ingilizce-Turkce-Tercume")]
        public ActionResult EnglishTurkishTranslation()
        {
            return View();
        }

        [Route("Turkce-Ingilizce-Ceviri")]
        public ActionResult TurkishEnglishTranslation()
        {
            return View();
        }

        [Route("Profesyonel-Ceviri")]
        public ActionResult ProfessionalTranslation()
        {
            return View();
        }

        [Route("Hizli-Ceviri")]
        public ActionResult QuickTranslation()
        {
            return View();
        }

        [Route("Kaliteli-Ceviri")]
        public ActionResult QualityTranslation()
        {
            return View();
        }

        [Route("Ingilizce-Ceviri")]
        public ActionResult EnglishTranslation()
        {
            return View();
        }

        [Route("Turkce-Ceviri")]
        public ActionResult TurkishTranslation()
        {
            return View();
        }

        [Route("Ceviri-Yaptir")]
        public ActionResult MakeTranslating()
        {
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

            return View();
        }

        [Route("Basvur")]
        public ActionResult ApplyForAJob(int jid) {
            return View();
        }

        [Route("isDetaylari")]
        public ActionResult JobDetail(int jid) {
            return View();
        }
        
        [Route("Tercuman-Ol-1")]
        public ActionResult TranslatorSignUp()
        {
            return View();
        }
    }
}