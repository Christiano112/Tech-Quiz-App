import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from './modal';

const Quiz = (quizCategory: any) => {
    const [questions, setQuestions]: any = React.useState("");
    const [loading, setLoading] = React.useState(true);
    const [page, setPage] = React.useState(1);
    const [answerValue, setAnswerValue] = React.useState("");
    const [score, setScore] = React.useState(0);
    const [modalMessage, setModalMessage] = React.useState('');
    const [showModal, setShowModal] = React.useState(false);

    const navigate = useNavigate();
    const quizSection = React.useRef<HTMLDivElement>(null);

    let myLinuxScore: any;
    let myDevOpsScore: any;
    let myCodeScore: any;
    let mySQLScore: any;
    let myCurrentScore: any;
    let quizObj: any;

    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const res = await axios({
                method: "get",
                url: "https://quizapi.io/api/v1/questions",
                headers: { 'X-Api-Key': 'w8AhRTbzgEAygUFee8Tjd6MoZNQ2TpwtNdpnoJun' },
                params: {
                    'category': quizCategory
                }
            })
            const data = await res.data
            // console.log(data);
            setQuestions(data);
            setTimeout(() => {
                setLoading(false);
            }, 1000)
        }

        fetchData()
            .catch(console.error)

        myLinuxScore = Number(localStorage.getItem('Linux-score'));
        myDevOpsScore = Number(localStorage.getItem('DevOps-score'));
        myCodeScore = Number(localStorage.getItem('Code-score'));
        mySQLScore = Number(localStorage.getItem('SQL-score'));
        // myTotalScore = Number(myLinuxScore) + Number(myDevOpsScore) + Number(myCodeScore) + Number(mySQLScore);
        // setTotalScore(myTotalScore);

        quizObj = Object.values(quizCategory).toString();
        // console.log(quizObj)

        if (quizObj === 'Linux' && myLinuxScore !== null) {
            myCurrentScore = myLinuxScore;
        } else if (quizObj === 'DevOps' && myDevOpsScore !== null) {
            myCurrentScore = myDevOpsScore;
        } else if (quizObj === 'Code' && myCodeScore !== null) {
            myCurrentScore = myCodeScore;
        } else if (quizObj === 'SQL' && mySQLScore !== null) {
            myCurrentScore = mySQLScore;
        } else {
            myCurrentScore = 0;
        }

        localStorage.setItem(`${Object.values(quizCategory)}-score`, JSON.stringify(myCurrentScore));

    }, []);

    let skip: number = page * 1 - 1;

    const handleModal = () => {
        setModalMessage(`Your Score is ${score}`);
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
            navigate('/dashboard');
        }, 5000)
    }

    return (
        <React.Fragment>
            {loading ?
                <div className="flex justify-center items-center my-8">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-pink-800" />
                </div>
                :
                <div>
                    <div className='p-4 shadow-md bg-pink-700 text-white select-none' ref={quizSection}>
                        <h2 className='text-white font-bold text-xl'>{`Score: ${score}`}</h2>

                        {questions && questions.slice(skip, skip + 1).map((q: {
                            id: React.Key;
                            question: string;
                            answers: any;
                            correct_answer: any;
                            answer_a: string;
                        }) => {
                            let id = `${q.id}`;
                            let questions = `${q.question}`;
                            let optionA = `${q.answers.answer_a}`;
                            let optionB = `${q.answers.answer_b}`;
                            let optionC = `${q.answers.answer_c}`;
                            let optionD = `${q.answers.answer_d}`;
                            let optionE = "Bonus Question";
                            let correctAnswer = `${q.correct_answer}`;
                            let correctAnswerValue: any;

                            console.log(optionA, optionB, optionC, optionD, correctAnswer);

                            if (correctAnswer === "answer_a") {
                                correctAnswerValue = optionA;
                            } else if (correctAnswer === "answer_b") {
                                correctAnswerValue = optionB;
                            } else if (correctAnswer === "answer_c") {
                                correctAnswerValue = optionC;
                            } else if (correctAnswer === "answer_d") {
                                correctAnswerValue = optionD;
                            } else if (correctAnswer === null) {
                                correctAnswerValue = optionE;
                            } else {
                                correctAnswerValue = "Bonus Question";
                            }

                            console.log(correctAnswerValue);

                            return (
                                <div key={id} className='p-4 mb-8'>
                                    <h3 className='font-bold text-xl my-8 text-center'>{questions}</h3>
                                    <div className='flex flex-col gap-4 w-full'>
                                        <button onClick={() => setAnswerValue(optionA)}
                                            className='options'
                                        >{optionA}</button>
                                        <button onClick={() => setAnswerValue(optionB)}
                                            className='options'
                                        >{optionB}</button>
                                        <button onClick={() => setAnswerValue(optionC)}
                                            className='options'
                                            style={{ display: optionC === "null" ? "none" : "block" }}
                                        >{optionC !== "null" && optionC}</button>
                                        <button onClick={() => setAnswerValue(optionD)}
                                            className='options'
                                            style={{ display: optionD === "null" ? "none" : "block" }}
                                        >{optionD !== "null" && optionD}</button>
                                        <button onClick={() => setAnswerValue(optionE)}
                                            className='options'
                                        >{`No Answer`}</button>
                                    </div>

                                    <p className='text-center font-bold text-xl mt-8'>{`Question ${page}`}</p>

                                    <div className='flex justify-center items-center gap-4 mt-4'>
                                        <button disabled={page <= 1} onClick={() => {
                                            setPage(page => page - 1);
                                            setScore((score) => score - 1);
                                            setAnswerValue("");
                                        }}
                                            className='py-1 px-4 rounded-full bg-sky-600 shadow-lg font-bold m-2 select-none'>Prev</button>
                                        <button onClick={() => {
                                            if (page < 20) {
                                                setPage(page => page + 1);
                                            }
                                            else if (page === 20) {
                                                handleModal();
                                            }
                                            if (answerValue === correctAnswerValue) {
                                                setScore((score) => score + 1);
                                            };

                                            localStorage.setItem(`${Object.values(quizCategory)}-score`, JSON.stringify(score));
                                        }}
                                            className='py-1 px-4 rounded-full bg-sky-600 shadow-lg font-bold m-2 select-none'>Next</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            }
            {showModal &&
                <Modal>
                    {modalMessage}
                </Modal>}
        </React.Fragment>
    )
}

export default Quiz;