using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Web.UI.Areas.Admin.Controllers.ApiController
{
    public class BaseApiController : System.Web.Http.ApiController
    {
        public JsonMediaTypeFormatter Formatter = new JsonMediaTypeFormatter
        {
            SerializerSettings = new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            }
        };

        public HttpResponseMessage OK(object data)
        {
            HttpResponseMessage response = new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.OK,
                Content = new ObjectContent(data.GetType(), data, Formatter)
            };
            return response;
        }
        public HttpResponseMessage OK()
        {
            HttpResponseMessage response = new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.OK
            };
            return response;
        }

        public HttpResponseMessage Error(object data)
        {
            HttpResponseMessage response = new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.InternalServerError,
                Content = new ObjectContent(data.GetType(), data, Formatter)
            };
            return response;
        }

        public HttpResponseMessage Error()
        {
            HttpResponseMessage response = new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.InternalServerError
            };
            return response;
        }

        public HttpResponseMessage CustomResponse(HttpStatusCode statusCode, object data)
        {
            HttpResponseMessage response = new HttpResponseMessage
            {
                StatusCode = statusCode,
                Content = new ObjectContent(data.GetType(), data, Formatter)
            };
            return response;
        }
    }
}
