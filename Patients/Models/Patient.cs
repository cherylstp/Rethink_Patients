using System.ComponentModel.DataAnnotations.Schema;

namespace Patients.Models
{
    public class Patient
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }


        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Birthday { get; set; }
        public char Gender { get; set; }
    }
}
