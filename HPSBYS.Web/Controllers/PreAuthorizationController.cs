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
    [NoDirectAccess]
    [SessionTimeOutFilter]
    [Authorize]
    public class PreAuthorizationController : Controller
    {
        ILogger log = LogManager.GetCurrentClassLogger();
        string ServiceURL = ConfigurationManager.AppSettings["ServiceURL"];
        HttpClient client;
        string result = string.Empty;
        // GET: PreAuthorization
        [NonAction]
        private static string GetTimestamp(DateTime value)
        {
            return value.ToString("yyyyMMddHHmmssffff");
        }
        [HttpGet]
        public ViewResult PreAuthorizationDetails()
        {
            return View();
        }
        [HttpGet]
        public ViewResult AddPreAuthorizationDetails()
        {
            return View();
        }
        [ValidateAntiForgeryToken]
        [HttpPost]
        public JsonResult AddPreAuthorizationDetails(FormCollection PreAuthReqInfo)
        {
            string fname = string.Empty;
            string ActFileName = string.Empty;
            string fileExtention = string.Empty;
            if (Request.Files.Count > 0)
            {
                try
                {
                    string PreAuthDoc = string.Empty;
                    HttpFileCollectionBase files = Request.Files;
                    for (int i = 0; i < files.Count; i++)
                    {
                        HttpPostedFileBase file = files[i];
                        fname = file.FileName;
                        fileExtention = System.IO.Path.GetExtension(file.FileName);
                        int Year = DateTime.Now.Year;
                        string Month = DateTime.Now.ToString("MMMM");
                        string HopitalCode = Session["HospitalCode"].ToString();
                        string dirUrl = "~/UploadDocument/" + HopitalCode + "/" + Year + "/" + Month + "/PreAuthDocument";
                        string dirPath = Server.MapPath(dirUrl);
                        if (!Directory.Exists(dirPath))
                        {
                            Directory.CreateDirectory(dirPath);
                        }
                        var newGuid = Guid.NewGuid();
                        string subGuid = newGuid.ToString().Substring(0, 15);
                        ActFileName = "PREAUTH_" + PreAuthReqInfo["URN"] + "_" + GetTimestamp(DateTime.Now)+fileExtention;
                        //ActFileName = subGuid + "_" + fname;
                        PreAuthDoc = ActFileName;
                        fname = Path.Combine(Server.MapPath(dirUrl), ActFileName);
                        file.SaveAs(fname);

                    }
                }
                catch (Exception ex)
                {
                    log.Error(ex);
                }
            }
            if (PreAuthReqInfo != null)
            {
                string VchFileName = string.Empty;
                if (!string.IsNullOrEmpty(ActFileName))
                {
                    VchFileName = ActFileName;
                }
                else
                {
                    VchFileName = "";
                }
                PreAuthApprovedPackageBlock patientInfo = new PreAuthApprovedPackageBlock
                {
                    ACTION= PreAuthReqInfo["ACTIONCODE"]
                   ,TransactionID= PreAuthReqInfo["TransactionID"]
                   ,URN= PreAuthReqInfo["URN"]                   
                   ,HospitalAuthorityCode = Session["HospitalCode"].ToString()
                   ,HospitalCode = Session["HospitalCode"].ToString()
                   ,BlockingInvoiceNo = PreAuthReqInfo["BlockingInvoiceNo"]
                   ,BlockinguserDate= PreAuthReqInfo["BlockinguserDate"]
                   ,VchFileName= VchFileName
                };
                using (PatientDataServices dataServices = new PatientDataServices())
                {
                    result = dataServices.PreAuthPackageBlock(patientInfo);
                }
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult InsertPreAuthRequestDetails(HttpPostedFileBase file, FormCollection PreAuthReqInfo)
        {
            try
            {
                if (file.ContentLength > 0)
                {
                    var fileName = Path.GetFileName(file.FileName);
                    var path = Path.Combine(Server.MapPath("~/UploadDocument/AdmissionSlip"), fileName);
                    file.SaveAs(path);
                    var PreAuthReqInfoD = new
                    {
                        Action = "R",
                        VCHURNNO= PreAuthReqInfo["urnNo"],
                        intMemberId= Convert.ToInt32(PreAuthReqInfo["MemberId"]),
                        vchMemberName= PreAuthReqInfo["MemberNm"],
                        BlockingInvoiceNo= PreAuthReqInfo["InvoiceNum"],
                        vchPackageCategory= PreAuthReqInfo["PackageHeader"],
                        VchPackageDetail=PreAuthReqInfo["PackageDetail"],
                        DEC_AMOUNT= PreAuthReqInfo["TreatmentCost"],
                        INT_SCHEME_ID = PreAuthReqInfo["SchemeCode"],
                        VchFile = fileName
                    };
                    client = new HttpClient();
                    client.BaseAddress = new Uri(ServiceURL);
                    client.DefaultRequestHeaders.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    var sucSender = client.PostAsJsonAsync("/api/Registration/PreAuthRequest", PreAuthReqInfoD).Result;
                    if (sucSender.IsSuccessStatusCode == true)
                    {
                        result = sucSender.Content.ReadAsAsync<string>().Result;
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
        [HttpGet]
        public ViewResult WardPreAuthorizationDetails()
        {
            return View();
        }
        [HttpGet]
        public ViewResult AddWardPreAuthorizationDetails()
        {
            return View();
        }
        [HttpGet]
        public ViewResult AddWardPreAuthCancellation()
        {
            return View();
        }
        [HttpGet]
        public ViewResult AddAddOnPreAuthCancellation()
        {
            return View();
        }
        [ValidateAntiForgeryToken]
        [HttpPost]
        public JsonResult AddWardPreAuthorizationDetails(FormCollection PreAuthReqInfo)
        {
            string fname = string.Empty;
            string ActFileName = string.Empty;
            string fileExtention = string.Empty;
            if (Request.Files.Count > 0)
            {
                try
                {
                    string PreAuthDoc = string.Empty;
                    HttpFileCollectionBase files = Request.Files;
                    for (int i = 0; i < files.Count; i++)
                    {
                        HttpPostedFileBase file = files[i];
                        fname = file.FileName;
                        fileExtention = System.IO.Path.GetExtension(file.FileName);
                        int Year = DateTime.Now.Year;
                        string Month = DateTime.Now.ToString("MMMM");
                        string HopitalCode = Session["HospitalCode"].ToString();
                        string dirUrl = "~/UploadDocument/" + HopitalCode + "/" + Year + "/" + Month + "/PreAuthDocument";
                        string dirPath = Server.MapPath(dirUrl);
                        if (!Directory.Exists(dirPath))
                        {
                            Directory.CreateDirectory(dirPath);
                        }
                        var newGuid = Guid.NewGuid();
                        string subGuid = newGuid.ToString().Substring(0, 15);
                        ActFileName = "WARD_" + PreAuthReqInfo["URN"] + "_" + GetTimestamp(DateTime.Now)+fileExtention;
                       // ActFileName = subGuid + "_" + fname;
                        PreAuthDoc = ActFileName;
                        fname = Path.Combine(Server.MapPath(dirUrl), ActFileName);
                        file.SaveAs(fname);

                    }
                }
                catch (Exception ex)
                {
                    log.Error(ex);
                }
            }
            if (PreAuthReqInfo != null)
            {
                string VchFileName = string.Empty;
                if (!string.IsNullOrEmpty(ActFileName))
                {
                    VchFileName = ActFileName;
                }
                else
                {
                    VchFileName = "";
                }
                PreAuthApprovedPackageBlock patientInfo = new PreAuthApprovedPackageBlock
                {
                    ACTION = PreAuthReqInfo["ACTIONCODE"],
                    BlockinguserDate= PreAuthReqInfo["BlockinguserDate"],
                    VchFileName = VchFileName,
                    WardLogId= Convert.ToInt32(PreAuthReqInfo["WardLogId"]),
                    Amount="",
                    TransactionID=""
                };
                using (PatientDataServices dataServices = new PatientDataServices())
                {
                    result = dataServices.PreWardAuthPackageBlock(patientInfo);
                }
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ViewResult PackageChangePreAuthorizationDetails()
        {
            return View();
        }
        [HttpGet]
        public ViewResult AddOnPreAuthorizationDetails()
        {
            return View();
        }
        [HttpGet]
        public ViewResult AddAddOnPreAuthorizationDetails()
        {
            return View();
        }
        [ValidateAntiForgeryToken]
        [HttpPost]
        public JsonResult AddAddOnPreAuthorizationDetails(FormCollection PreAuthReqInfo)
        {
            string fname = string.Empty;
            string ActFileName = string.Empty;
            string fileExtention = string.Empty;
            if (Request.Files.Count > 0)
            {
                try
                {
                    string PreAuthDoc = string.Empty;
                    HttpFileCollectionBase files = Request.Files;
                    for (int i = 0; i < files.Count; i++)
                    {
                        HttpPostedFileBase file = files[i];
                        fname = file.FileName;
                        fileExtention = System.IO.Path.GetExtension(file.FileName);
                        int Year = DateTime.Now.Year;
                        string Month = DateTime.Now.ToString("MMMM");
                        string HopitalCode = Session["HospitalCode"].ToString();
                        string dirUrl = "~/UploadDocument/" + HopitalCode + "/" + Year + "/" + Month + "/PreAuthDocument";
                        string dirPath = Server.MapPath(dirUrl);
                        if (!Directory.Exists(dirPath))
                        {
                            Directory.CreateDirectory(dirPath);
                        }
                        var newGuid = Guid.NewGuid();
                        string subGuid = newGuid.ToString().Substring(0, 15);
                        ActFileName = "ADDON_"+ PreAuthReqInfo["URN"] + "_" + GetTimestamp(DateTime.Now)+fileExtention;
                        PreAuthDoc = ActFileName;
                        fname = Path.Combine(Server.MapPath(dirUrl), ActFileName);
                        file.SaveAs(fname);

                    }
                }
                catch (Exception ex)
                {
                    log.Error(ex);
                }
            }
            if (PreAuthReqInfo != null)
            {
                string VchFileName = string.Empty;
                if (!string.IsNullOrEmpty(ActFileName))
                {
                    VchFileName = ActFileName;
                }
                else
                {
                    VchFileName = "";
                }
                PreAuthApprovedPackageBlock patientInfo = new PreAuthApprovedPackageBlock
                {
                    ACTION = PreAuthReqInfo["ACTIONCODE"],
                    BlockinguserDate = PreAuthReqInfo["BlockinguserDate"],
                    VchFileName = VchFileName,
                    WardLogId = Convert.ToInt32(PreAuthReqInfo["WardLogId"]),
                    Amount = "",
                    TransactionID = ""
                };
                using (PatientDataServices dataServices = new PatientDataServices())
                {
                    result = dataServices.AddOnPreAuthPackageBlock(patientInfo);
                }
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}