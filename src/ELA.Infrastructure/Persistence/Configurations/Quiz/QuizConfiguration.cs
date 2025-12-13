namespace ELA;

public class QuizConfiguration : IEntityTypeConfiguration<Quiz>
{
    public void Configure(EntityTypeBuilder<Quiz> builder)
    {
        builder.HasKey(q => q.Id);

        builder.Property(q => q.Name)
            .IsRequired()
            .HasMaxLength(256);

        builder.Property(q => q.Description)
            .HasMaxLength(1024);

        builder.HasMany(q => q.Questions)
            .WithOne()
            .HasForeignKey("QuizId")
            .OnDelete(DeleteBehavior.Cascade);
    }
}

