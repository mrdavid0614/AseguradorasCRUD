using Aseguradoras.Core.Models;

namespace Aseguradoras.Repo.Interfaces
{
    public interface IBaseRepository<TEntity> where TEntity : class
    {
        public IEnumerable<TEntity> GetAll();
        public TEntity? GetById(string id);
        public void Save(Aseguradora entity);
        public void Update(Aseguradora entity);
        public void DeleteById(string id);
    }
}
