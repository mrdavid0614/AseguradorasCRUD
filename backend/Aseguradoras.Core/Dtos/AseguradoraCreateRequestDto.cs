namespace Aseguradoras.Core.Dtos
{
    public class AseguradoraCreateRequestDto
    {
        public string Nombre { get; set; }
        public double Comision { get; set; }
        public bool Estado { get; set; }
    }
}
