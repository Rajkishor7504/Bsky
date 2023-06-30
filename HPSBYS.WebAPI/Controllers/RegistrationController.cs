﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using HPSBYS.Data.Model;
using HPSBYS.Data.Services;

namespace HPSBYS.WebAPI.Controllers
{
    public class RegistrationController : ApiController
    {
        [HttpPost]
        public async Task<string> PatientRegistration(PatientInfo obj)
        {
            using (var PatientDataServices = new PatientDataServices())
            {
                return await Task.FromResult(PatientDataServices.ManagePatientRegistration(obj));
            }

        }
        //Used For Pre Autherisation Request
        [HttpPost]
        public async Task<string> PreAuthRequest(PreAuth obj)
        {
            using (var PatientDataServices = new PatientDataServices())
            {
                return await Task.FromResult(PatientDataServices.AddPreAuthRequest(obj));
            }
        }
        //Used For Admission Page
        // [HttpGet]

        //public async Task<IList<Registration>> GetRegistrationformation(string Action,string HospitalCode)
        //{
        //    using (var hospitalDetailsDataServices = new HospitalDetailsDataServices())
        //    {
        //        return await Task.FromResult(hospitalDetailsDataServices.GetRegistrationInformation(Action,HospitalCode));
        //    }
        //}
        [HttpGet]
        public async Task<IList<PatientRegistrationInformation>> GetRegistrationformation(string Action, string HospitalCode, string URN, string BlockingINVOICENO, string TransactionID)
        {
            using (var hospitalDetailsDataServices = new HospitalDetailsDataServices())
            {
                return await Task.FromResult(hospitalDetailsDataServices.GetRegistrationInformation(Action, HospitalCode, URN, BlockingINVOICENO, TransactionID));
            }
        }
        [HttpGet]
        public async Task<IList<Registration>> GetRegistrationInformationByInvoiceNo(string Action, string HospitalCode, string URN, string BlockingINVOICENO, string TransactionID)
        {
            using (var hospitalDetailsDataServices = new HospitalDetailsDataServices())
            {
                return await Task.FromResult(hospitalDetailsDataServices.GetRegistrationInformationByInvoiceNo(Action, HospitalCode, URN, BlockingINVOICENO, TransactionID));
            }
        }
        //Used For Unblocking Page
        [HttpGet]
        public async Task<IList<UnblockingInfo>> GetUnblockingformation(string HospitalCode, string URN)
        {
            using (var hospitalDetailsDataServices = new HospitalDetailsDataServices())
            {
                return await Task.FromResult(hospitalDetailsDataServices.GetUnblockingInformation(HospitalCode, URN));
            }
        }
        [HttpGet] 
        public async Task<IList<DischargeSummary>> GetDischargeSummary(string Action, string HospitalCode, string URN)
        {
            using (var hospitalDetailsDataServices = new HospitalDetailsDataServices())
            {
                return await Task.FromResult(hospitalDetailsDataServices.GetDischargeInformation(Action, HospitalCode, URN));
            }
        }
        [HttpGet]
        public async Task<IList<DischargeInformation>> GetDischargeDetail(string Action, string HospitalCode, string URN, string BlockingInVoiceNo)
        {
            using (var hospitalDetailsDataServices = new HospitalDetailsDataServices())
            {
                return await Task.FromResult(hospitalDetailsDataServices.GetDischargeDetail(Action, HospitalCode, URN, BlockingInVoiceNo));
            }
        }
        [HttpGet]
        public async Task<IList<PackageExtension>> GetPackageExtension(string Scheme, string HospitalCode, string URN)
        {
            using (var hospitalDetailsDataServices = new HospitalDetailsDataServices())
            {
                return await Task.FromResult(hospitalDetailsDataServices.GetPackageExtensionDetail(Scheme, HospitalCode, URN));
            }
        }
        //Used For EXTENSION Of Stay Request
        //[HttpPost]
        //public async Task<string> ExtensionOfStayRequest(PackageExtension obj)
        //{
        //    using (var PatientDataServices = new PatientDataServices())
        //    {
        //        return await Task.FromResult(PatientDataServices.AddExtensionOfStayRequest(obj));
        //    }

        //}
        [HttpGet]
        public async Task<IList<PatientInfo>> GetPatientStatus(string Action, string URN)
        {
            using (CommonDataServices service = new CommonDataServices())
            {
                return await Task.FromResult(service.getPatientStatus(Action, URN));
            }
        }
        [HttpGet]
        public async Task<IList<PatientRegistrationInformation>> GetWardBlockPackageInformation(string Action, string HospitalCode, string URN, string BlockingINVOICENO, string TransactionID)
        {
            using (var hospitalDetailsDataServices = new HospitalDetailsDataServices())
            {
                return await Task.FromResult(hospitalDetailsDataServices.GetWardBlockPackageInformation(Action, HospitalCode, URN, BlockingINVOICENO, TransactionID));
            }
        }
        [HttpGet]
        public async Task<IList<PatientRegistrationInformation>> GetPackageChangeInformation(string Action, string HospitalCode, string URN, string BlockingINVOICENO, string TransactionID)
        {
            using (var hospitalDetailsDataServices = new HospitalDetailsDataServices())
            {
                return await Task.FromResult(hospitalDetailsDataServices.GetPackageChangeInformation(Action, HospitalCode, URN, BlockingINVOICENO, TransactionID));
            }
        }
        [HttpGet]
        public async Task<IList<WardInfo>> GetPreviousWardDetailsByTranId(string Action, string TransactionID, string DischargeDate)
        {
            using (var hospitalDetailsDataServices = new HospitalDetailsDataServices())
            {
                return await Task.FromResult(hospitalDetailsDataServices.GetPreviousWardDetailsByTranId(Action,TransactionID, DischargeDate));
            }
        }
        [HttpGet]
        public async Task<IList<AddOnInfo>> GetPreviousAddOnPackageDetailsByInvoiceNo(string Action, string InvoiceNo)
        {
            using (var hospitalDetailsDataServices = new HospitalDetailsDataServices())
            {
                return await Task.FromResult(hospitalDetailsDataServices.GetPreviousAddOnPackageDetailsByInvoiceNo(Action, InvoiceNo));
            }
        }
        [HttpGet]
        public async Task<IList<PatientRegistrationInformation>> GetWardPreAuthInformation(string Action, string HospitalCode, string URN)
        {
            using (var hospitalDetailsDataServices = new HospitalDetailsDataServices())
            {
                return await Task.FromResult(hospitalDetailsDataServices.GetWardPreAuthInformation(Action, HospitalCode, URN));
            }
        }
        [HttpGet]
        public async Task<IList<PatientRegistrationInformation>> GetPackageChangePreAuthInformation(string Action, string HospitalCode, string URN)
        {
            using (var hospitalDetailsDataServices = new HospitalDetailsDataServices())
            {
                return await Task.FromResult(hospitalDetailsDataServices.GetPackageChangePreAuthInformation(Action, HospitalCode, URN));
            }
        }
        [HttpGet]
        public async Task<IList<PatientRegistrationInformation>> GetAddOnPreAuthInformation(string Action, string HospitalCode, string URN)
        {
            using (var hospitalDetailsDataServices = new HospitalDetailsDataServices())
            {
                return await Task.FromResult(hospitalDetailsDataServices.GetAddOnPreAuthInformation(Action, HospitalCode, URN));
            }
        }
    }
}