﻿using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Mvc;
using HPSBYS.Data.Model;
using HPSBYS.Data.Services;
using HPSBYS.Web.Fiilters;
using HPSBYS.Web.Models;
using NLog;

namespace HPSBYS.Web.Controllers
{
    [Authorize]
    [SessionTimeOutFilter]
    [NoDirectAccess]
    public class ExtensionOfStayController : Controller
    {
        ILogger log = LogManager.GetCurrentClassLogger();
        string ServiceURL = ConfigurationManager.AppSettings["ServiceURL"];
        //HttpClient client;
        string result = string.Empty;
        // GET: ExtensionOfStay
        [HttpGet]
        public ViewResult ViewExtensionOfStay()
        {
            return View();
        }
        [HttpGet]
        public ViewResult AddExtensionOfStayDetails()
        {
            return View();
        }
        [HttpPost]
        public JsonResult InsertExtensionInfoDetails(HttpPostedFileBase file, FormCollection ExtnStayInfo)
        {
            try
            {
                if (file.ContentLength > 0)
                {
                    int Year = DateTime.Now.Year;
                    string Month = DateTime.Now.ToString("MMMM");
                    string HopitalCode = Session["HospitalCode"].ToString();
                    string dirUrl = "~/UploadDocument/" + HopitalCode + "/" + Year + "/" + Month + "/PrescriptionSlip";
                    //var fileName = Path.GetFileName(file.FileName);
                    //var path = Path.Combine(Server.MapPath("~/UploadDocument/PrescriptionSlip"), fileName);
                    string dirPath = Server.MapPath(dirUrl);
                    if (!Directory.Exists(dirPath))
                    {
                        Directory.CreateDirectory(dirPath);
                    }
                    var fileName = Path.GetFileName(file.FileName);
                    var newGuid = Guid.NewGuid();
                    string SubGuid = newGuid.ToString().Substring(0, 15);
                    string ActFileName = SubGuid + "_" + fileName;
                    var path = Path.Combine(Server.MapPath(dirUrl), ActFileName);
                    file.SaveAs(path);
                    PackageExtension obj = new PackageExtension
                    {
                        URN = ExtnStayInfo["urnNo"],
                        TransactionId = Convert.ToInt32(ExtnStayInfo["TransactionId"]),
                        HospitalCode = ExtnStayInfo["HospitalCd"],
                        BlockingInvoiceNo = ExtnStayInfo["InvoiceNum"],
                        //vchPackageCategory = ExtnStayInfo["PackageHeader"],
                        //VchPackageDetail = ExtnStayInfo["PackageDetail"],
                        NoofextendDays = ExtnStayInfo["NoOfExtDays"],
                        //INT_SCHEME_ID = ExtnStayInfo["SchemeCode"],
                        VchFile = ActFileName
                    };
                    using (PatientDataServices dataServices = new PatientDataServices())
                    {
                        result = dataServices.AddExtensionOfStayRequest(obj);
                    }
                }
                if (result == "1")
                {
                    return Json("sucess");
                }
                else
                {
                    return Json("failed");
                }
            }
            catch (Exception ex)
            {
                log.Error(ex);
                return Json("failed");
            }
        }
    }
}