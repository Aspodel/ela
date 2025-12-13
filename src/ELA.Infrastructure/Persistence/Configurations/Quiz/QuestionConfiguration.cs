namespace ELA;

public class QuestionConfiguration : IEntityTypeConfiguration<Question>
{
    public void Configure(EntityTypeBuilder<Question> builder)
    {
        builder.HasKey(q => q.Id);

        builder.Property(q => q.Text)
            .IsRequired()
            .HasMaxLength(1024);

        builder.Property(q => q.Explanation)
            .HasMaxLength(1024);

        builder.Property(q => q.QuestionType)
            .IsRequired();

        builder.HasMany(q => q.Answers)
            .WithOne()
            .HasForeignKey("QuestionId")
            .OnDelete(DeleteBehavior.Cascade);
    }
}