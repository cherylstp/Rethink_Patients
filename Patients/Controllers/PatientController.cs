using Microsoft.AspNetCore.Mvc;
using Patients.Database;
using Patients.Models;
using System.Collections.Generic;

namespace Patients.Controllers
{
    [ApiController]
    [Route("api/Patient")]
    public class PatientController : ControllerBase
    {
        private readonly PatientDataAccessLayer _dataAccessLayer;

        public PatientController()
        {
            // _dataAccessLayer = patientDataAccess;
            _dataAccessLayer = new PatientDataAccessLayer();
        }

        [HttpGet]
        public IEnumerable<Patient> GetAllPatients()
        {
            return _dataAccessLayer.GetAllPatients();
        }

        // maybe return ID here later so we know this was successful?
        [HttpPost]
        [Route("Create")]
        public void CreatePatients([FromBody] Patient[] patients)
        {
            _dataAccessLayer.CreatePatient(patients);
        }

        // Put because we're replacing the entire entity here, and not just one field (in which case we'd use Patch)
        [HttpPut]
        [Route("Update")]
        public void UpdatePatient(Patient patient)
        {
            _dataAccessLayer.UpdatePatient(patient);
        }

        [HttpDelete]
        [Route("Delete")]
        public void DeletePatient(Patient patient)
        {
            _dataAccessLayer.DeletePatient(patient);
        }

    }
}
