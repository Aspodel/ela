using ELA;

namespace ELA.Infrastructure.Persistence.Seed;

public interface ISeeder
{
    Task SeedAsync(ApplicationDbContext context);
}
