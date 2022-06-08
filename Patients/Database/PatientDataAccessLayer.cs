
using Patients.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Patients.Database
{
    public class PatientDataAccessLayer
    {

        private readonly DbContextOptionsBuilder<PatientContext> _dbContextOptionsBuilder;
        public PatientDataAccessLayer()
        {

            _dbContextOptionsBuilder = new DbContextOptionsBuilder<PatientContext>();
        }
        public List<Patient> GetAllPatients()
        {
            using (var _context = new PatientContext(_dbContextOptionsBuilder.Options))
            {
                try
                {
                    return _context.Patients.ToList<Patient>();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                    return null;
                }
            }
        }
        public void CreatePatient(Patient[] newPatients)
        {
            try
            {
                using (var _context = new PatientContext(_dbContextOptionsBuilder.Options))
                {
                    List<Patient> patients = newPatients.ToList<Patient>();
                    foreach (Patient patient in patients)
                    {
                        _context.Add(patient);
                    }

                    _context.SaveChangesAsync();
                }
            }
            catch (Exception e)
            {

            }

        }

        public void UpdatePatient(Patient patientToUpdate)
        {
            try
            {
                using (var _context = new PatientContext(_dbContextOptionsBuilder.Options))
                {
                    Patient patientFromDb = _context.Patients.Find(patientToUpdate.Id);
                    if (patientFromDb != null)
                    {
                        patientFromDb.FirstName = patientToUpdate.FirstName;
                        patientFromDb.LastName = patientToUpdate.LastName;
                        patientFromDb.Birthday = patientToUpdate.Birthday;
                        patientFromDb.Gender = patientToUpdate.Gender;
                        _context.SaveChangesAsync();
                    }
                    else
                    {
                        throw new Exception("This patient does not exist in the database!");
                    }
                }
            }
            catch (Exception e)
            {

            }

        }

        public void DeletePatient(Patient patientToDelete)
        {
            using (var _context = new PatientContext(_dbContextOptionsBuilder.Options))
            {
                _context.Patients.Remove(patientToDelete);
                _context.SaveChangesAsync();
            }
        }
    }
}
