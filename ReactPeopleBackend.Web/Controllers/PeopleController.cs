using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using ReactPeopleBackend.Data;
using ReactPeopleBackend.Web.Models;

namespace ReactPeopleBackend.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private string _connectionString;

        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("getall")]
        public List<Person> GetPeople()
        {
            var repo = new PersonRepository(_connectionString);
            return repo.GetAll();
        }

        [HttpPost]
        [Route("add")]
        public void Add(Person person)
        {
            var repo = new PersonRepository(_connectionString);
            repo.Add(person);
        }

        [HttpPost]
        [Route("update")]
        public void Update(Person person)
        {
            var repo = new PersonRepository(_connectionString);
            repo.Update(person);
        }

        [HttpPost]
        [Route("delete")]
        public void Delete(Person p)
        {
            var repo = new PersonRepository(_connectionString);
            repo.Delete(p.Id);
        }

        [HttpPost]
        [Route("deletemany")]
        public void DeleteMany(DeleteManyViewModel vm)
        {
            var repo = new PersonRepository(_connectionString);
            repo.Delete(vm.Ids);
        }

        [HttpGet]
        [Route("get")]
        public Person GetById(int id)
        {
            var repo = new PersonRepository(_connectionString);
            return repo.Get(id);
        }
    }
}