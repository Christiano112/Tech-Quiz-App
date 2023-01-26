import { useState, useEffect } from "react";
import Quiz from "./quiz";

const category = [
    {
        id: 1,
        name: 'Linux',
        img: '/linux-min.png'
    },
    {
        id: 2,
        name: 'DevOps',
        img: '/devops-min.png'
    },
    {
        id: 3,
        name: 'Code',
        img: '/code-min.jpg'
    },
    {
        id: 4,
        name: 'SQL',
        img: '/sql.jpeg'
    },
]

let myScore: any;

const Home = () => {
    const [quizCategory, setQuizCategory] = useState("");
    const [show, setShow] = useState(true);
    const [score, setScore] = useState(0);

    useEffect(() => {
        myScore = localStorage.getItem('score');
        setScore(myScore);
    }, [])

    return (
        <>
            {show ?
                <main>
                    <div className="flex items-center justify-between px-4 pt-4">
                        <div className="flex items-center gap-2">
                            <p>Level 1</p>
                            <p>{`Score ${score}`}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <img src="/coin-min.jpeg" alt="coins" className="w-8 h-8 rounded-full" />
                            <span className="font-bold">300</span>
                        </div>
                    </div>

                    <section className="mx-4">
                        <h1 className="text-2xl font-bold mt-4">Start Playing Now!</h1>
                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white justify-center items-center my-12 mx-2"
                        >
                            {category.map((type) => (
                                <div key={type.id}
                                    onClick={() => { setQuizCategory(type.name); setShow(false) }}
                                    className="border-2 shadow-md flex justify-center items-center flex-col py-2 h-72"
                                >
                                    <img src={type.img} alt='quiz-img'
                                        className="object-contain h-60 w-60" />
                                    <p className="text-center py-2">{type.name}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
                :
                <Quiz quizCategory={quizCategory} />
            }
        </>
    )
}

export default Home;
