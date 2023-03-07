namespace Aseguradoras.Core.Dtos
{
    public class AseguradoraUpdateRequestDto
    {
        public string Id { get; set; }
        public string Nombre { get; set; }
        public double Comision { get; set; }
        public bool Estado { get; set; }
    }
}
