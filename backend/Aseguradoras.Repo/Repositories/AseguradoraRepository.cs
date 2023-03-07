using Aseguradoras.Repo.Interfaces;
using Aseguradoras.Core.Models;
using Aseguradoras.Core;

namespace Aseguradoras.Repo.Repositories
{
    public class AseguradoraRepository : IBaseRepository<Aseguradora>
    {
        private readonly AseguradorasDBContext context;

        public AseguradoraRepository (AseguradorasDBContext context)
        {
            this.context = context;
        }

        public IEnumerable<Aseguradora> GetAll()
        {
            return context.Aseguradoras;
        }

        public Aseguradora? GetById(string id)
        {
            return context.Aseguradoras.Find(id);
        }

        public void Save(Aseguradora entity)
        {
            context.Aseguradoras.Add(entity);
            context.SaveChanges();
        }

        public void Update(Aseguradora entity)
        {
            var aseguradora = GetById(entity.Id);

            if (aseguradora != null)
            {
                aseguradora.Nombre = entity.Nombre ?? aseguradora.Nombre;
                aseguradora.Comision = entity.Comision > 0 ? entity.Comision : aseguradora.Comision;
                aseguradora.Estado = entity.Estado;

                context.Aseguradoras.Update(aseguradora);
                context.SaveChanges();
            }
        }

        public void DeleteById(string id)
        {
            var aseguradora = GetById(id);

            if (aseguradora != null)
            {
                context.Aseguradoras.Remove(aseguradora);
                context.SaveChanges();
            }
        }
    }
}