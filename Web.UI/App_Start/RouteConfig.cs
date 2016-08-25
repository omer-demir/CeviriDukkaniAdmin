using System.Web.Mvc;
using System.Web.Routing;

namespace Web.UI
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            //routes.MapMvcAttributeRoutes();
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "TranslatorSignUp", id = UrlParameter.Optional },
                namespaces: new[] { "Web.UI.Controllers" }
            );
        }
    }
}
