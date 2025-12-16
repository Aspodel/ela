namespace ELA;

public interface IDataSeeder
{
    Task SeedAsync(ApplicationDbContext context);
}
