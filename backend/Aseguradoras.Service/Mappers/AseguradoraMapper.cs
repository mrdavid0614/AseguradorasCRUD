using Aseguradoras.Core.Dtos;
using Aseguradoras.Core.Models;

namespace Aseguradoras.Service.Mappers
{
    public class AseguradoraMapper
    {
        public static Aseguradora AseguradoraCreateRequestDtoToAseguradora (AseguradoraCreateRequestDto dto)
        {
            return new Aseguradora()
            {
                Nombre = dto.Nombre,
                Comision = dto.Comision,
                Estado = dto.Estado,
            };
        }

        public static Aseguradora AseguradoraUpdateRequestDtoToAseguradora(AseguradoraUpdateRequestDto dto)
        {
            return new Aseguradora()
            {
                Id = dto.Id,
                Nombre = dto.Nombre,
                Comision = dto.Comision,
                Estado = dto.Estado,
            };
        }
    }
}
