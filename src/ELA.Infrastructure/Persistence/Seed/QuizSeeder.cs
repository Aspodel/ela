using ELA;
using Microsoft.EntityFrameworkCore;

namespace ELA.Infrastructure.Persistence.Seed;

public class QuizSeeder : ISeeder
{
    public async Task SeedAsync(ApplicationDbContext context)
    {
        await SeedQuiz1(context);
        await SeedQuiz2(context);
        await SeedQuiz3(context);
        await SeedQuiz4(context);
        await SeedQuiz5(context);

        await context.SaveChangesAsync();
    }

    private async Task SeedQuiz1(ApplicationDbContext context)
    {
        if (await context.Quizzes.AnyAsync(q => q.Name == "Basic Grammar Essentials")) return;

        var quiz = new Quiz("Basic Grammar Essentials", "Test your knowledge of fundamental grammar rules including tenses, articles, and prepositions.");
        AddQuestion(quiz, "Which sentence is grammatically correct?",
            "\"She\" is a third-person singular subject, so it requires \"doesn't\" (does not) instead of \"don't\" (do not).",
            ("She don't like apples.", false),
            ("She doesn't like apples.", true),
            ("She don't like apple.", false),
            ("She doesn't like apple.", false)
        );

        AddQuestion(quiz, "What is the past tense of 'go'?", "\"Go\" is an irregular verb. The past tense is \"Went\". \"Gone\" is the past participle.",
            ("go", false),
            ("went", true),
            ("gone", false),
            ("going", false));

        AddQuestion(quiz, "Which article correctly completes the sentence: \"She bought ___ umbrella.\"",
            "The article \"an\" is used before words that start with a vowel sound, such as \"umbrella\".",
            ("a", false),
            ("an", true),
            ("the", false),
            ("no article", false));

        AddQuestion(quiz, "Choose the correct sentence using a preposition.",
            "We use \"on\" for specific days, such as days of the week.",
            ("I will see you in Monday.", false),
            ("I will see you on Monday.", true),
            ("I will see you at Monday.", false),
            ("I will see you by Monday.", false));

        AddQuestion(quiz, "Which sentence is in the present continuous tense?",
            "The present continuous tense is formed using \"am/is/are + verb-ing\".",
            ("She works at a bank.", false),
            ("She is working at a bank.", true),
            ("She worked at a bank.", false),
            ("She has worked at a bank.", false));

        AddQuestion(quiz, "Which word correctly completes the sentence: \"There ___ many books on the table.\"",
            "\"There are\" is used with plural nouns such as \"books\".",
            ("is", false),
            ("are", true),
            ("was", false),
            ("be", false));

        AddQuestion(quiz, "Which sentence uses the comparative form correctly?",
            "For short adjectives, the comparative form is usually made by adding \"-er\".",
            ("This test is more easy than the last one.", false),
            ("This test is easier than the last one.", true),
            ("This test is easiest than the last one.", false),
            ("This test is most easy than the last one.", false));

        AddQuestion(quiz, "Choose the correct sentence using the possessive form.",
            "To show possession with a singular noun, we usually add \"'s\".",
            ("This is the book of Sarah.", false),
            ("This is Sarah's book.", true),
            ("This is Sarah book.", false),
            ("This is the Sarahs' book.", false));

        AddQuestion(quiz, "Which sentence is correctly punctuated?",
            "A comma is used to separate items in a list.",
            ("I bought apples oranges bananas.", false),
            ("I bought apples, oranges, bananas.", true),
            ("I bought, apples oranges bananas.", false),
            ("I bought apples oranges, bananas.", false));

        AddQuestion(quiz, "Which sentence correctly uses a modal verb?",
            "Modal verbs like \"can\" are followed by the base form of the verb.",
            ("She can to swim very well.", false),
            ("She can swim very well.", true),
            ("She cans swim very well.", false),
            ("She can swimming very well.", false));

        context.Quizzes.Add(quiz);
    }

    private async Task SeedQuiz2(ApplicationDbContext context)
    {
        if (await context.Quizzes.AnyAsync(q => q.Name == "Intermediate Grammar Challenge")) return;

        var quiz = new Quiz(
            "Intermediate Grammar Challenge",
            "Improve your grammar skills with questions on verb tenses, conditionals, and sentence structure."
        );

        AddQuestion(quiz, "Which sentence uses the present perfect tense correctly?",
            "The present perfect is formed using \"have/has + past participle\" and is used for actions with relevance to the present.",
            ("I have seen that movie yesterday.", false),
            ("I saw that movie yesterday.", false),
            ("I have seen that movie.", true),
            ("I am seeing that movie.", false));

        AddQuestion(quiz, "Choose the correct first conditional sentence.",
            "The first conditional uses \"if + present simple\" and \"will + base verb\" to talk about real future possibilities.",
            ("If it will rain, we stay at home.", false),
            ("If it rains, we will stay at home.", true),
            ("If it rained, we would stay at home.", false),
            ("If it will rain, we will stay at home.", false));

        AddQuestion(quiz, "Which sentence correctly uses reported speech?",
            "In reported speech, the verb tense usually moves one step back (present → past).",
            ("She said that she is tired.", false),
            ("She said that she was tired.", true),
            ("She said she tired.", false),
            ("She said that tired she was.", false));

        AddQuestion(quiz, "Choose the correct sentence using a relative clause.",
            "Relative clauses often use \"who,\" \"which,\" or \"that\" to give more information about a noun.",
            ("This is the book who I told you about.", false),
            ("This is the book which I told you about.", true),
            ("This is the book what I told you about.", false),
            ("This is the book I told about you.", false));

        AddQuestion(quiz, "Which sentence correctly uses the passive voice?",
            "The passive voice is formed using \"be + past participle\".",
            ("They built the bridge in 2010.", false),
            ("The bridge was built in 2010.", true),
            ("The bridge has built in 2010.", false),
            ("The bridge was build in 2010.", false));

        AddQuestion(quiz, "Choose the correct sentence using an adverb.",
            "Adverbs often end in \"-ly\" and modify verbs.",
            ("She sings beautiful.", false),
            ("She sings beautifully.", true),
            ("She beautifully sings song.", false),
            ("She sings beauty.", false));

        AddQuestion(quiz, "Which sentence uses the correct word order?",
            "In English, adverbs of frequency usually come before the main verb but after \"to be.\"",
            ("She always is late.", false),
            ("She is always late.", true),
            ("Always she is late.", false),
            ("She late is always.", false));

        AddQuestion(quiz, "Choose the correct sentence using \"used to.\"",
            "\"Used to\" is used to describe past habits or states that no longer happen.",
            ("I use to live in Paris.", false),
            ("I used to live in Paris.", true),
            ("I am used to live in Paris.", false),
            ("I was used live in Paris.", false));

        AddQuestion(quiz, "Which sentence correctly uses a gerund?",
            "Gerunds are verbs ending in \"-ing\" that function as nouns.",
            ("Swim is good for your health.", false),
            ("Swimming is good for your health.", true),
            ("To swimming is good for your health.", false),
            ("Swam is good for your health.", false));

        AddQuestion(quiz, "Choose the correct sentence using \"so\" and \"such.\"",
            "\"So\" is used before adjectives and adverbs, while \"such\" is used before nouns.",
            ("It was so a difficult exam.", false),
            ("It was such a difficult exam.", true),
            ("It was so difficult exam.", false),
            ("It was such difficult.", false));

        context.Quizzes.Add(quiz);
    }

    private async Task SeedQuiz3(ApplicationDbContext context)
    {
        if (await context.Quizzes.AnyAsync(q => q.Name == "Business English Vocabulary")) return;

        var quiz = new Quiz(
            "Business English Vocabulary",
            "Master common terms and phrases used in professional settings and corporate environments."
        );

        AddQuestion(quiz, "What does \"ASAP\" stand for?", "ASAP is a common business acronym meaning \"As Soon As Possible\".",
            ("As Soon As Possible", true),
            ("Always Stay At Place", false),
            ("All Systems Are Perfect", false),
            ("Ask Some Awesome People", false)
        );

        AddQuestion(quiz, "Which word means \"to work together\"?", "\"Collaborate\" means to work jointly on an activity, especially to produce or create something.",
            ("Compete", false),
            ("Collaborate", true),
            ("Calculate", false),
            ("Communicate", false)
        );

        AddQuestion(quiz, "A \"deadline\" is:", "A deadline is the time limit for completing a task.",
            ("A line that is dead", false),
            ("The latest time or date by which something should be completed", true),
            ("A boring meeting", false),
            ("A type of phone call", false)
        );

        AddQuestion(quiz, "To \"brainstorm\" means to:", "Brainstorming is a group creativity technique by which efforts are made to find a conclusion for a specific problem by gathering a list of ideas.",
            ("Have a headache", false),
            ("Generate ideas in a group discussion", true),
            ("Criticize someone's work", false),
            ("Take a break", false)
        );

        AddQuestion(quiz, "What is an \"agenda\"?", "An agenda is a list of meeting activities in the order in which they are to be taken up.",
            ("A list of items to be discussed at a meeting", true),
            ("A secret plan", false),
            ("A type of calendar", false),
            ("A business card", false)
        );

        context.Quizzes.Add(quiz);
    }

    private async Task SeedQuiz4(ApplicationDbContext context)
    {
        if (await context.Quizzes.AnyAsync(q => q.Name == "Travel & Tourism")) return;

        var quiz = new Quiz(
            "Travel & Tourism",
            "Essential vocabulary and phrases for navigating airports, hotels, and tourist attractions."
        );

        AddQuestion(quiz, "Where do you check in at an airport?", "You go to the check-in counter to get your boarding pass and drop off bags.",
            ("Gate", false),
            ("Terminal", false),
            ("Check-in counter", true),
            ("Runway", false)
        );

        AddQuestion(quiz, "What is a \"boarding pass\"?", "A boarding pass is the document that gives you permission to board the airplane.",
            ("A ticket to enter the plane", true),
            ("A passport", false),
            ("A visa", false),
            ("A luggage tag", false)
        );

        AddQuestion(quiz, "What does \"itinerary\" mean?", "An itinerary is a detailed plan for a journey, including a list of places to visit.",
            ("A planned route or journey", true),
            ("A type of food", false),
            ("A travel agent", false),
            ("A suitcase", false)
        );

        context.Quizzes.Add(quiz);
    }

    private async Task SeedQuiz5(ApplicationDbContext context)
    {
        if (await context.Quizzes.AnyAsync(q => q.Name == "Idioms and Phrasal Verbs")) return;

        var quiz = new Quiz(
            "Idioms and Phrasal Verbs",
            "Learn to speak like a native by mastering common English idioms and phrasal verbs."
        );

        AddQuestion(quiz, "What does \"break a leg\" mean?", "\"Break a leg\" is a common idiom used to wish someone good luck, especially before a performance.",
            ("Get hurt", false),
            ("Good luck", true),
            ("Stop working", false),
            ("Run fast", false)
        );

        AddQuestion(quiz, "To \"give up\" means to:", "\"Give up\" is a phrasal verb meaning to cease making an effort; resign; surrender.",
            ("Start something new", false),
            ("Stop trying", true),
            ("Give a gift", false),
            ("Go up", false)
        );

        AddQuestion(quiz, "What does \"piece of cake\" mean?", "\"Piece of cake\" is an idiom used to describe something that is very easy to do.",
            ("Something very easy", true),
            ("A delicious dessert", false),
            ("Something hard", false),
            ("A party", false)
        );

        context.Quizzes.Add(quiz);
    }

    private void AddQuestion(Quiz quiz, string text, string explanation, params (string text, bool isCorrect)[] answers)
    {
        var question = quiz.AddQuestion(text, explanation: explanation);
        foreach (var (answerText, isCorrect) in answers)
        {
            question.AddAnswer(answerText, isCorrect);
        }
    }
}
