using System.ComponentModel.DataAnnotations;

namespace Aseguradoras.Core.Models
{
    public class Aseguradora
    {
        [Key]
        public string Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public double Comision { get; set; }
        public bool Estado { get; set; }

        public Aseguradora()
        {
            Id = Guid.NewGuid().ToString();
        }
    }
}