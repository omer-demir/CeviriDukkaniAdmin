using System;
using System.Configuration;
using System.Web;
using System.Web.Hosting;
using System.Web.Mvc;
using Tangent.CeviriDukkani.Domain.Dto.Enums;
using Web.UI.Areas.Admin.Helpers;

namespace Web.UI.Areas.Admin.Controllers
{
    [SessionControl(new[] { UserRoleTypeEnum.Admin })]

    public class HomeController : BaseController
    {
        
        // GET: Admin/Home
        public ActionResult Index()
        {
            return View();
        }

        public string UploadFile()
        {
            var rootPath = HostingEnvironment.MapPath(ConfigurationManager.AppSettings["UploadDocumentPath"]);
            if (Request.Files.Count > 0)
            {
                var postedFile = Request.Files[0];
                if (postedFile == null)
                {
                    return "";
                }

                var fileNameAsGuid = Guid.NewGuid();
                var splittedFileName = postedFile.FileName.Split('.');

                var newFileName = $"{fileNameAsGuid}.{splittedFileName[splittedFileName.Length - 1]}";

                postedFile.SaveAs(rootPath + newFileName);
                return ConfigurationManager.AppSettings["UploadDocumentPath"] + newFileName;
            }

            return "";
        }

        public ActionResult ChangeCulture(string cultureName)
        {
            var langCode = Request.Cookies["_culture"];
            var implementedCulture = cultureName;
            if (langCode == null)
            {
                //there is no language cookie so add it
                langCode = new HttpCookie("_culture", implementedCulture)
                {
                    Expires = DateTime.Now.AddYears(7),
                    HttpOnly = true,
                    Path = "/"
                };
            }
            else
            {
                langCode.Value = implementedCulture;
            }

            Response.Cookies.Add(langCode);

            return RedirectToAction("Index");
        }
    }
}