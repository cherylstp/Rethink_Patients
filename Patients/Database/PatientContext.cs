
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Patients.Models;
using System.IO;

namespace Patients.Database
{
    public class PatientContext : DbContext
    {
        public PatientContext(DbContextOptions<PatientContext> options) : base(options)
        {
            this.Database.EnsureCreated();
        }

        public DbSet<Patient> Patients { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Patient>().HasKey(table => new {
                table.FirstName,
                table.LastName,
                table.Birthday
            });
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                IConfigurationRoot configuration = new ConfigurationBuilder()
                   .SetBasePath(Directory.GetCurrentDirectory())
                   .AddJsonFile("appsettings.json")
                   .Build();
                string connectionString = configuration.GetConnectionString("Patients");
                optionsBuilder.UseSqlServer(connectionString);

            }

        }

    }
}
