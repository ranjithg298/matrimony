import React, { useState } from 'react';
import { Profile, Quiz } from '../types';
import PuzzlePieceIcon from '../components/icons/PuzzlePieceIcon';
import SparklesIcon from '../components/icons/SparklesIcon';

interface QuizzesPageProps {
    currentUser: Profile;
    allProfiles: Profile[];
    quizzes: Quiz[];
    onAnswerQuiz: (quizId: string, answers: string[]) => void;
}

type QuizTab = 'pending' | 'sent' | 'completed';

const QuizzesPage: React.FC<QuizzesPageProps> = ({ currentUser, allProfiles, quizzes, onAnswerQuiz }) => {
    const [activeTab, setActiveTab] = useState<QuizTab>('pending');
    const [takingQuiz, setTakingQuiz] = useState<Quiz | null>(null);
    const [currentAnswers, setCurrentAnswers] = useState<string[]>([]);
    const [viewingResult, setViewingResult] = useState<Quiz | null>(null);

    const pendingQuizzes = quizzes.filter(q => q.challengedId === currentUser.id && q.status === 'pending' && !q.answers[currentUser.id]);
    const sentQuizzes = quizzes.filter(q => q.challengerId === currentUser.id && q.status === 'pending');
    const completedQuizzes = quizzes.filter(q => (q.challengerId === currentUser.id || q.challengedId === currentUser.id) && q.status === 'completed');

    const handleAnswerSelect = (questionIndex: number, answer: string) => {
        const newAnswers = [...currentAnswers];
        newAnswers[questionIndex] = answer;
        setCurrentAnswers(newAnswers);
    };

    const handleSubmitQuiz = () => {
        if (takingQuiz && currentAnswers.length === takingQuiz.questions.length) {
            onAnswerQuiz(takingQuiz.id, currentAnswers);
            setTakingQuiz(null);
            setCurrentAnswers([]);
        } else {
            alert('Please answer all questions.');
        }
    };

    const renderQuizTaker = (quiz: Quiz) => (
        <div className="bg-theme-bg/50 p-6 rounded-lg border border-theme-border">
            <h3 className="text-xl font-bold mb-4">Quiz with {allProfiles.find(p => p.id === quiz.challengerId)?.name}</h3>
            <div className="space-y-6">
                {quiz.questions.map((q, qIndex) => (
                    <div key={qIndex}>
                        <p className="font-semibold">{qIndex + 1}. {q.question}</p>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            {q.options.map((option, oIndex) => (
                                <button
                                    key={oIndex}
                                    onClick={() => handleAnswerSelect(qIndex, option)}
                                    className={`p-3 text-sm rounded-md text-left transition-colors ${currentAnswers[qIndex] === option ? 'bg-theme-accent-primary text-white' : 'bg-theme-border hover:bg-theme-border/80'}`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-6 flex justify-end gap-2">
                <button onClick={() => setTakingQuiz(null)} className="font-semibold py-2 px-4 rounded-lg bg-theme-border">Cancel</button>
                <button onClick={handleSubmitQuiz} className="font-bold py-2 px-4 rounded-lg bg-theme-accent-primary text-white">Submit Answers</button>
            </div>
        </div>
    );

    const renderQuizResult = (quiz: Quiz) => {
        const otherUserId = quiz.challengerId === currentUser.id ? quiz.challengedId : quiz.challengerId;
        const otherUser = allProfiles.find(p => p.id === otherUserId);
        if (!otherUser) return null;

        return (
             <div className="bg-theme-bg/50 p-6 rounded-lg border border-theme-border">
                <h3 className="text-xl font-bold mb-1">Quiz Result with {otherUser.name}</h3>
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-theme-gradient mb-4">Compatibility Score: {quiz.score}%</p>
                {quiz.summary && (
                    <div className="mb-6 bg-theme-accent-primary/10 border-l-4 border-theme-accent-primary p-3 rounded-r-lg">
                        <h4 className="font-semibold text-sm text-theme-accent-primary flex items-center gap-1"><SparklesIcon className="w-4 h-4" /> AI Summary:</h4>
                        <p className="text-sm text-theme-text-primary italic">"{quiz.summary}"</p>
                    </div>
                )}
                <div className="space-y-4">
                    {quiz.questions.map((q, i) => (
                        <div key={i} className="border-t border-theme-border pt-4">
                            <p className="font-semibold text-sm">{q.question}</p>
                            <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                                <p><span className="font-semibold">You chose:</span> {quiz.answers[currentUser.id]?.[i]}</p>
                                <p><span className="font-semibold">{otherUser.name} chose:</span> {quiz.answers[otherUserId]?.[i]}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={() => setViewingResult(null)} className="font-semibold py-2 px-4 rounded-lg bg-theme-border mt-6">Back to List</button>
            </div>
        );
    }
    
    if (takingQuiz) return renderQuizTaker(takingQuiz);
    if (viewingResult) return renderQuizResult(viewingResult);

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-theme-text-primary mb-2">AI Compatibility Quizzes</h1>
                <p className="text-theme-text-secondary">Take fun quizzes with your matches to see how compatible you are.</p>
            </div>
            
            <div className="border-b border-theme-border mb-6">
                <nav className="-mb-px flex space-x-6">
                    <button onClick={() => setActiveTab('pending')} className={`py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'pending' ? 'border-theme-accent-primary text-theme-accent-primary' : 'border-transparent text-theme-text-secondary'}`}>Pending Invites ({pendingQuizzes.length})</button>
                    <button onClick={() => setActiveTab('sent')} className={`py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'sent' ? 'border-theme-accent-primary text-theme-accent-primary' : 'border-transparent text-theme-text-secondary'}`}>Sent Invites ({sentQuizzes.length})</button>
                    <button onClick={() => setActiveTab('completed')} className={`py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'completed' ? 'border-theme-accent-primary text-theme-accent-primary' : 'border-transparent text-theme-text-secondary'}`}>Completed ({completedQuizzes.length})</button>
                </nav>
            </div>
            
            <div className="space-y-4">
                {activeTab === 'pending' && (pendingQuizzes.length > 0 ? pendingQuizzes.map(quiz => {
                    const challenger = allProfiles.find(p => p.id === quiz.challengerId);
                    if (!challenger) return null;
                    return (
                        <div key={quiz.id} className="bg-theme-surface p-4 rounded-lg border border-theme-border flex items-center justify-between">
                            <p>Quiz challenge from <span className="font-semibold">{challenger.name}</span></p>
                            <button onClick={() => { setTakingQuiz(quiz); setCurrentAnswers(new Array(quiz.questions.length).fill('')); }} className="font-bold py-2 px-4 rounded-lg bg-theme-accent-primary text-white">Take Quiz</button>
                        </div>
                    )
                }) : <p className="text-center text-theme-text-secondary py-8">No pending quiz invites.</p>)}

                 {activeTab === 'sent' && (sentQuizzes.length > 0 ? sentQuizzes.map(quiz => {
                    const challenged = allProfiles.find(p => p.id === quiz.challengedId);
                    if (!challenged) return null;
                    return (
                        <div key={quiz.id} className="bg-theme-surface p-4 rounded-lg border border-theme-border flex items-center justify-between">
                            <p>Waiting for <span className="font-semibold">{challenged.name}</span> to complete the quiz.</p>
                            <span className="text-sm text-yellow-500 font-semibold">Pending</span>
                        </div>
                    )
                }) : <p className="text-center text-theme-text-secondary py-8">You haven't sent any quiz invites yet.</p>)}

                {activeTab === 'completed' && (completedQuizzes.length > 0 ? completedQuizzes.map(quiz => {
                    const otherUser = allProfiles.find(p => p.id === (quiz.challengerId === currentUser.id ? quiz.challengedId : quiz.challengerId));
                    if (!otherUser) return null;
                    return (
                        <div key={quiz.id} className="bg-theme-surface p-4 rounded-lg border border-theme-border flex items-center justify-between">
                            <div>
                                <p>Quiz with <span className="font-semibold">{otherUser.name}</span></p>
                                <p className="text-sm font-bold text-theme-accent-primary">Score: {quiz.score}%</p>
                            </div>
                            <button onClick={() => setViewingResult(quiz)} className="font-bold py-2 px-4 rounded-lg bg-theme-border">View Results</button>
                        </div>
                    )
                }) : <p className="text-center text-theme-text-secondary py-8">No quizzes completed yet.</p>)}

            </div>
        </div>
    );
};

export default QuizzesPage;