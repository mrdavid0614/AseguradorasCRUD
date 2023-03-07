using Aseguradoras.Core.Dtos;
using Aseguradoras.Core.Models;
using Aseguradoras.Repo.Repositories;
using Aseguradoras.Service.Interfaces;
using Aseguradoras.Service.Mappers;

namespace Aseguradoras.Service.Services
{
    public class AseguradoraService : IBaseService<Aseguradora>
    {
        private readonly AseguradoraRepository _repository;
        public AseguradoraService(AseguradoraRepository repository)
        {
            _repository = repository;
        }

        public IEnumerable<Aseguradora> GetAll()
        {
            return _repository.GetAll();
        }

        public Aseguradora? GetById(string id)
        {
            return _repository.GetById(id);
        }

        public void Create(AseguradoraCreateRequestDto entity)
        {
            var aseguradora = AseguradoraMapper.AseguradoraCreateRequestDtoToAseguradora(entity);
            _repository.Save(aseguradora);
        }

        public void Update(AseguradoraUpdateRequestDto entity)
        {
            var aseguradora = AseguradoraMapper.AseguradoraUpdateRequestDtoToAseguradora(entity);
            _repository.Update(aseguradora);
        }

        public void DeleteById(string id)
        {
            _repository.DeleteById(id);
        }
    }
}