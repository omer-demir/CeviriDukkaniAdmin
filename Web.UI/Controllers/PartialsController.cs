﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Web.UI.Controllers
{
    public class PartialsController : Controller
    {
        // GET: Partials
        public PartialViewResult InnerLeftMenu()
        {
            return PartialView();
        }

        public ActionResult InnerTopBar(string header)
        {
            ViewBag.Header = header;
            return View();
        }
    }
}