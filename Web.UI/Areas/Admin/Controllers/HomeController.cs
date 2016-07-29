using System;
using System.Configuration;
using System.Web.Hosting;
using System.Web.Mvc;
using Tangent.CeviriDukkani.Domain.Dto.Enums;
using Web.UI.Areas.Admin.Helpers;

namespace Web.UI.Areas.Admin.Controllers
{
    [SessionControl(new[] { UserRoleTypeEnum.Admin })]

    public class HomeController : Controller
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
    }
}