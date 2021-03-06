﻿using System.Web.Mvc;
using System.Web.Routing;
using Web.UI.Helpers;

namespace Web.UI {
    public class RouteConfig {
        public static void RegisterRoutes(RouteCollection routes) {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            //routes.MapMvcAttributeRoutes();
            //routes.MapRoute(
            //    name: "Default",
            //    url: "{controller}/{action}/{id}",
            //    defaults: new { controller = "Home", action = "TranslatorSignUp", id = UrlParameter.Optional },
            //    namespaces: new[] { "Web.UI.Controllers" }
            //);

            routes.Add(new CustomRoute("{controller}/{action}/{id}",
                new RouteValueDictionary(new {
                    controller = "Home", action = "Index", id = UrlParameter.Optional
                }), new CustomRouteHandler()
                , new[] { "Web.UI.Controllers" }));
        }
    }
}
