using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactPeopleBackend.Data
{
    public class PersonRepository
    {
        private readonly string _connectionString;
        public PersonRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public List<Person> GetAll()
        {
            using var context = new PeopleDataContext(_connectionString);
            return context.People.ToList();
        }
        public void Add(Person person)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.People.Add(person);
            context.SaveChanges();
        }
        public void Update(Person person)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.People.Update(person);
            context.SaveChanges();
        }
        public void Delete(int id)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM People WHERE Id = {id}");
        }
        public void Delete(List<int> ids)
        {
            using var context = new PeopleDataContext(_connectionString);
            var peopleToDelete = context.People.Where(peopleToDelete => ids.Contains(peopleToDelete.Id));
            context.People.RemoveRange(peopleToDelete);
            context.SaveChanges();
        }
        public Person Get(int id)
        {
            using var context = new PeopleDataContext(_connectionString);
            return context.People.FirstOrDefault(p => p.Id == id);
        }
    }
}
