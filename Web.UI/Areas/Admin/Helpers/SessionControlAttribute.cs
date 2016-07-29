using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Tangent.CeviriDukkani.Domain.Dto.Enums;

namespace Web.UI.Areas.Admin.Helpers
{
    public class SessionControlAttribute : ActionFilterAttribute
    {
        private readonly List<UserRoleTypeEnum> _userRoles;

        public SessionControlAttribute(UserRoleTypeEnum[] arraysEnums)
        {
            _userRoles = arraysEnums.ToList();
        }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var sessionMember = SessionUser.User;
            if (sessionMember == null)
            {
                filterContext.Result = new RedirectResult("/Admin/Account/Login");
            }
            else if (!sessionMember.UserRoles.Any(x => _userRoles.Any(y => (int)y == x.UserRoleTypeId)))
            {
                if (filterContext.ActionDescriptor.ControllerDescriptor.ControllerName == "Home"
                    && filterContext.ActionDescriptor.ActionName == "Index")
                    filterContext.Result = new RedirectResult("/Admin/Account/Login");

                filterContext.Result = new RedirectResult("/Admin/Home/Index");
            }
        }
    }
}