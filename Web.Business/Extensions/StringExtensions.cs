using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Business.Extensions {
    public static class StringExtensions {
        public static int GetHashAsId(this string value) {
            var chiperedData = StringCipher.Decrypt(value);
            return int.Parse(chiperedData);
        }

        public static string GetIdAsHash(this string value) {
            return StringCipher.Encrypt(value);
        }
    }
}
