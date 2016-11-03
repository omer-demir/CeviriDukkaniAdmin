using System.Linq;
using System.Web;
using Tangent.CeviriDukkani.Domain.Dto.Enums;
using Tangent.CeviriDukkani.Domain.Dto.System;

namespace Web.UI.Areas.Admin.Helpers
{
    public class SessionUser
    {
        public static UserDto User
        {
            get
            {
                var sessionUser = HttpContext.Current.Session["user"];
               
                return sessionUser as UserDto;
            }
        }

        public static bool IsAdmin => User != null && User.UserRoles.Any(x => x.UserRoleTypeId == (int)UserRoleTypeEnum.Admin);
        public static bool IsEditor => User != null && User.UserRoles.Any(x => x.UserRoleTypeId == (int)UserRoleTypeEnum.Editor);
        public static bool IsFreelanceTranslator => User != null && User.UserRoles.Any(x => x.UserRoleTypeId == (int)UserRoleTypeEnum.FreelanceTranslator);
        public static bool IsProofReader => User != null && User.UserRoles.Any(x => x.UserRoleTypeId == (int)UserRoleTypeEnum.ProofReader);
        public static bool IsTranslator => User != null && User.UserRoles.Any(x => x.UserRoleTypeId == (int)UserRoleTypeEnum.Translator);
    }
}