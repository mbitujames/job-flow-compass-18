import { useState } from "react";
import Header from "@/components/JobBoard/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Play, RotateCcw, Trophy, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

interface Assessment {
  id: string;
  title: string;
  description: string;
  duration: string;
  questions: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;
}

const SkillAssessment = () => {
  const { toast } = useToast();
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const assessments: Assessment[] = [
    {
      id: "javascript",
      title: "JavaScript Fundamentals",
      description: "Test your knowledge of JavaScript basics, ES6+, and modern practices",
      duration: "30 minutes",
      questions: 25,
      difficulty: "Intermediate",
      category: "Programming"
    },
    {
      id: "react",
      title: "React Development",
      description: "Evaluate your React skills including hooks, state management, and best practices",
      duration: "45 minutes",
      questions: 30,
      difficulty: "Intermediate",
      category: "Frontend"
    },
    {
      id: "nodejs",
      title: "Node.js Backend",
      description: "Assess your backend development skills with Node.js and Express",
      duration: "40 minutes",
      questions: 28,
      difficulty: "Advanced",
      category: "Backend"
    },
    {
      id: "python",
      title: "Python Programming",
      description: "Test your Python knowledge from basics to advanced concepts",
      duration: "35 minutes",
      questions: 25,
      difficulty: "Beginner",
      category: "Programming"
    },
    {
      id: "sql",
      title: "Database & SQL",
      description: "Evaluate your database design and SQL query skills",
      duration: "25 minutes",
      questions: 20,
      difficulty: "Intermediate",
      category: "Database"
    },
    {
      id: "devops",
      title: "DevOps Practices",
      description: "Test your knowledge of CI/CD, Docker, and cloud platforms",
      duration: "50 minutes",
      questions: 35,
      difficulty: "Advanced",
      category: "DevOps"
    }
  ];

  const sampleQuestions: Question[] = [
    {
      id: 1,
      question: "What is the output of console.log(typeof null) in JavaScript?",
      options: ["null", "undefined", "object", "string"],
      correct: 2
    },
    {
      id: 2,
      question: "Which method is used to add elements to the end of an array?",
      options: ["push()", "pop()", "shift()", "unshift()"],
      correct: 0
    },
    {
      id: 3,
      question: "What does the 'let' keyword do in JavaScript?",
      options: ["Creates a global variable", "Creates a block-scoped variable", "Creates a function-scoped variable", "Creates a constant"],
      correct: 1
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500";
      case "Intermediate": return "bg-yellow-500";
      case "Advanced": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const startAssessment = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setIsStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setIsCompleted(false);
    setScore(0);
  };

  const selectAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeAssessment();
    }
  };

  const completeAssessment = () => {
    // Calculate score
    let correctAnswers = 0;
    sampleQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct) {
        correctAnswers++;
      }
    });
    
    const finalScore = Math.round((correctAnswers / sampleQuestions.length) * 100);
    setScore(finalScore);
    setIsCompleted(true);
    
    toast({
      title: "Assessment Completed!",
      description: `You scored ${finalScore}% on the ${selectedAssessment?.title} assessment.`,
    });
  };

  const resetAssessment = () => {
    setSelectedAssessment(null);
    setIsStarted(false);
    setIsCompleted(false);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setScore(0);
  };

  if (isCompleted && selectedAssessment) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Assessment Complete!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">{selectedAssessment.title}</h3>
                <div className="text-4xl font-bold text-primary mb-2">{score}%</div>
                <p className="text-muted-foreground">
                  You answered {selectedAnswers.filter((answer, index) => answer === sampleQuestions[index]?.correct).length} out of {sampleQuestions.length} questions correctly
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{score >= 70 ? "Pass" : "Needs Improvement"}</div>
                  <div className="text-sm text-muted-foreground">Result</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{selectedAssessment.difficulty}</div>
                  <div className="text-sm text-muted-foreground">Level</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{selectedAssessment.category}</div>
                  <div className="text-sm text-muted-foreground">Category</div>
                </div>
              </div>
              
              <div className="flex gap-4 justify-center">
                <Button onClick={resetAssessment} variant="outline">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Take Another Assessment
                </Button>
                <Button>
                  View Certificate
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isStarted && selectedAssessment) {
    const currentQ = sampleQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100;

    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">{selectedAssessment.title}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{selectedAssessment.duration}</span>
              </div>
            </div>
            <Progress value={progress} className="mb-2" />
            <div className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {sampleQuestions.length}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {currentQ?.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentQ?.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswers[currentQuestion] === index ? "default" : "outline"}
                  className="w-full text-left justify-start h-auto p-4"
                  onClick={() => selectAnswer(index)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                  </div>
                </Button>
              ))}
              
              <div className="flex justify-between pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </Button>
                <Button 
                  onClick={nextQuestion}
                  disabled={selectedAnswers[currentQuestion] === undefined}
                >
                  {currentQuestion === sampleQuestions.length - 1 ? "Complete" : "Next"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Skill Assessment</h1>
          <p className="text-muted-foreground">Evaluate your skills and identify growth opportunities</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assessments.map((assessment) => (
            <Card key={assessment.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <Badge 
                    variant="secondary" 
                    className={`${getDifficultyColor(assessment.difficulty)} text-white`}
                  >
                    {assessment.difficulty}
                  </Badge>
                  <Badge variant="outline">{assessment.category}</Badge>
                </div>
                <CardTitle className="text-xl">{assessment.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{assessment.description}</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{assessment.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Target className="h-4 w-4" />
                    <span>{assessment.questions} questions</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full"
                  onClick={() => startAssessment(assessment)}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Start Assessment
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">Assessment Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Instant Results</h3>
              <p className="text-muted-foreground">Get immediate feedback on your performance with detailed explanations.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Skill Certification</h3>
              <p className="text-muted-foreground">Earn certificates to showcase your verified skills to employers.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Personalized Learning</h3>
              <p className="text-muted-foreground">Get recommendations for improving based on your assessment results.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillAssessment;