using Microsoft.EntityFrameworkCore;

namespace ReactPeopleBackend.Data
{
    public class PeopleDataContext : DbContext
    {
        private readonly string _connectionString;

        public PeopleDataContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        public DbSet<Person> People { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }
    }
}
