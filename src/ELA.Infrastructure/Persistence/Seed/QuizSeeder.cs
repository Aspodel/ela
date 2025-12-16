namespace ELA;

public sealed class QuizSeeder : IDataSeeder
{
    public async Task SeedAsync(ApplicationDbContext context)
    {
        var quizzes = new[]
        {
            CreateBasicGrammarQuiz(),
            CreateIntermediateGrammarQuiz(),
            CreateBusinessEnglishQuiz(),
            CreateTravelQuiz(),
            CreateIdiomsQuiz()
        };

        foreach (var quiz in quizzes)
        {
            if (!await context.Quizzes.AnyAsync(q => q.Name == quiz.Name))
            {
                context.Quizzes.Add(quiz);
            }
        }

        await context.SaveChangesAsync();
    }

    #region Quiz Definitions

    private static Quiz CreateBasicGrammarQuiz()
    {
        var quiz = new Quiz(
            "Basic Grammar Essentials",
            "Test your knowledge of fundamental grammar rules including tenses, articles, and prepositions."
        );

        AddQuestion(quiz,
            "Which sentence is grammatically correct?",
            "\"She\" is a third-person singular subject, so it requires \"doesn't\".",
            ("She don't like apples.", false),
            ("She doesn't like apples.", true),
            ("She don't like apple.", false),
            ("She doesn't like apple.", false)
        );

        AddQuestion(quiz,
            "What is the past tense of 'go'?",
            "\"Go\" is an irregular verb. The past tense is \"went\".",
            ("go", false),
            ("went", true),
            ("gone", false),
            ("going", false)
        );

        AddQuestion(quiz,
            "Which article correctly completes the sentence: \"She bought ___ umbrella.\"",
            "\"An\" is used before words that start with a vowel sound.",
            ("a", false),
            ("an", true),
            ("the", false),
            ("no article", false)
        );

        AddQuestion(quiz,
            "Choose the correct sentence using a preposition.",
            "\"On\" is used for specific days.",
            ("I will see you in Monday.", false),
            ("I will see you on Monday.", true),
            ("I will see you at Monday.", false),
            ("I will see you by Monday.", false)
        );

        AddQuestion(quiz,
            "Which sentence is in the present continuous tense?",
            "Formed using am/is/are + verb-ing.",
            ("She works at a bank.", false),
            ("She is working at a bank.", true),
            ("She worked at a bank.", false),
            ("She has worked at a bank.", false)
        );

        AddQuestion(quiz,
            "Which word correctly completes the sentence: \"There ___ many books on the table.\"",
            "\"There are\" is used with plural nouns.",
            ("is", false),
            ("are", true),
            ("was", false),
            ("be", false)
        );

        AddQuestion(quiz,
            "Which sentence uses the comparative form correctly?",
            "Short adjectives usually add \"-er\".",
            ("This test is more easy than the last one.", false),
            ("This test is easier than the last one.", true),
            ("This test is easiest than the last one.", false),
            ("This test is most easy than the last one.", false)
        );

        AddQuestion(quiz,
            "Choose the correct sentence using the possessive form.",
            "Singular possession usually uses \"'s\".",
            ("This is the book of Sarah.", false),
            ("This is Sarah's book.", true),
            ("This is Sarah book.", false),
            ("This is the Sarahs' book.", false)
        );

        AddQuestion(quiz,
            "Which sentence is correctly punctuated?",
            "Commas separate items in a list.",
            ("I bought apples oranges bananas.", false),
            ("I bought apples, oranges, bananas.", true),
            ("I bought, apples oranges bananas.", false),
            ("I bought apples oranges, bananas.", false)
        );

        AddQuestion(quiz,
            "Which sentence correctly uses a modal verb?",
            "Modal verbs are followed by the base form of the verb.",
            ("She can to swim very well.", false),
            ("She can swim very well.", true),
            ("She cans swim very well.", false),
            ("She can swimming very well.", false)
        );

        return quiz;
    }

    private static Quiz CreateIntermediateGrammarQuiz()
    {
        var quiz = new Quiz(
            "Intermediate Grammar Challenge",
            "Improve your grammar skills with questions on verb tenses, conditionals, and sentence structure."
        );

        AddQuestion(quiz,
            "Which sentence uses the present perfect tense correctly?",
            "Have/has + past participle.",
            ("I have seen that movie yesterday.", false),
            ("I saw that movie yesterday.", false),
            ("I have seen that movie.", true),
            ("I am seeing that movie.", false)
        );

        AddQuestion(quiz,
            "Choose the correct first conditional sentence.",
            "If + present simple, will + base verb.",
            ("If it will rain, we stay at home.", false),
            ("If it rains, we will stay at home.", true),
            ("If it rained, we would stay at home.", false),
            ("If it will rain, we will stay at home.", false)
        );

        AddQuestion(quiz,
            "Which sentence correctly uses reported speech?",
            "Verb tense usually moves one step back.",
            ("She said that she is tired.", false),
            ("She said that she was tired.", true),
            ("She said she tired.", false),
            ("She said that tired she was.", false)
        );

        return quiz;
    }

    private static Quiz CreateBusinessEnglishQuiz()
    {
        var quiz = new Quiz(
            "Business English Vocabulary",
            "Master common terms and phrases used in professional settings."
        );

        AddQuestion(quiz,
            "What does \"ASAP\" stand for?",
            "\"ASAP\" means \"As Soon As Possible\".",
            ("As Soon As Possible", true),
            ("Always Stay At Place", false),
            ("All Systems Are Perfect", false),
            ("Ask Some Awesome People", false)
        );

        AddQuestion(quiz,
            "Which word means \"to work together\"?",
            "\"Collaborate\" means to work jointly.",
            ("Compete", false),
            ("Collaborate", true),
            ("Calculate", false),
            ("Communicate", false)
        );

        return quiz;
    }

    private static Quiz CreateTravelQuiz()
    {
        var quiz = new Quiz(
            "Travel & Tourism",
            "Essential vocabulary and phrases for traveling."
        );

        AddQuestion(quiz,
            "Where do you check in at an airport?",
            "You check in at the check-in counter.",
            ("Gate", false),
            ("Terminal", false),
            ("Check-in counter", true),
            ("Runway", false)
        );

        AddQuestion(quiz,
            "What is a boarding pass?",
            "It gives permission to board the plane.",
            ("A ticket to enter the plane", true),
            ("A passport", false),
            ("A visa", false),
            ("A luggage tag", false)
        );

        return quiz;
    }

    private static Quiz CreateIdiomsQuiz()
    {
        var quiz = new Quiz(
            "Idioms and Phrasal Verbs",
            "Learn common English idioms and phrasal verbs."
        );

        AddQuestion(quiz,
            "What does \"break a leg\" mean?",
            "It means good luck.",
            ("Get hurt", false),
            ("Good luck", true),
            ("Stop working", false),
            ("Run fast", false)
        );

        AddQuestion(quiz,
            "To \"give up\" means to:",
            "It means to stop trying.",
            ("Start something new", false),
            ("Stop trying", true),
            ("Give a gift", false),
            ("Go up", false)
        );

        return quiz;
    }

    #endregion

    private static void AddQuestion(Quiz quiz, string text, string explanation, params (string text, bool isCorrect)[] answers)
    {
        var question = quiz.AddQuestion(text, explanation: explanation);
        foreach (var (answerText, isCorrect) in answers)
        {
            question.AddAnswer(answerText, isCorrect);
        }
    }
}