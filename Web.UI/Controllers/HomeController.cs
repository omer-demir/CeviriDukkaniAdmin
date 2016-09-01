using System.Web.Mvc;

namespace Web.UI.Controllers {
    public class HomeController : Controller {
        // GET: Home
        [Route("")]
        public ActionResult Index() {
            return View();
        }

        [Route("Kaliteli-Ceviri")]
        public ActionResult QualityTranslation() {
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

        [Route("tercume")]
        public ActionResult Translation()
        {
            return View();
        }

        [Route("Tercuman-Ol-1")]
        public ActionResult TranslatorSignUp()
        {
            return View();
        }
    }
}