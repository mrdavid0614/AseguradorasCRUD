using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aseguradoras.Service.Interfaces
{
    public interface IBaseService<TEntity> where TEntity : class
    {
        public IEnumerable<TEntity> GetAll();
        public TEntity? GetById(string id);
        public void DeleteById(string id);
    }
}
