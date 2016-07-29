using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Autofac;
using Autofac.Core;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;
using Web.Business.Services.Implementations;
using Web.Business.Services.Interfaces;

namespace Web.UI {
    public class WebApiApplication : System.Web.HttpApplication {
        protected void Application_Start() {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            
            Bootstrapper();
        }

        private void Bootstrapper() {
            var containerBuilder = new ContainerBuilder();
            containerBuilder.RegisterType<DocumentService>().As<IDocumentService>().InstancePerLifetimeScope();
            containerBuilder.RegisterType<TranslationService>().As<ITranslationService>().InstancePerLifetimeScope();
            containerBuilder.RegisterType<CommonService>().As<ICommonService>().InstancePerLifetimeScope();
            containerBuilder.RegisterType<CustomerService>().As<ICustomerService>().InstancePerLifetimeScope();
            containerBuilder.RegisterType<OrderService>().As<IOrderService>().InstancePerLifetimeScope();
            containerBuilder.RegisterType<UserService>().As<IUserService>().InstancePerLifetimeScope();
            containerBuilder.RegisterWebApiFilterProvider(GlobalConfiguration.Configuration);
            containerBuilder.RegisterControllers(Assembly.GetExecutingAssembly());
            containerBuilder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            var container=containerBuilder.Build();
            GlobalConfiguration.Configuration.DependencyResolver = new AutofacWebApiDependencyResolver(container);
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
        }
    }
}
