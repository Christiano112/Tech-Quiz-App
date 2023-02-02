import React from "react";
import Quiz from "./quiz";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './config/firebase';
import { useNavigate } from "react-router-dom";

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

let myLinuxScore: any;
let myDevOpsScore: any;
let myCodeScore: any;
let mySQLScore: any;
let myTotalScore: any;

const Home = () => {
    const [quizCategory, setQuizCategory] = React.useState("");
    const [show, setShow] = React.useState(true);
    const [score, setScore] = React.useState(0);
    const [userName, setUserName] = React.useState("");
    const navigate = useNavigate();

    React.useEffect(() => {
        myLinuxScore = localStorage.getItem('Linux-score');
        myDevOpsScore = localStorage.getItem('DevOps-score');
        myCodeScore = localStorage.getItem('Code-score');
        mySQLScore = localStorage.getItem('SQL-score');
        myTotalScore = Number(myLinuxScore) + Number(myDevOpsScore) + Number(myCodeScore) + Number(mySQLScore);
        setScore(myTotalScore);

        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user)
                if (user.displayName) {
                    setUserName(user.displayName)
                }
            } else {
                // User is signed out
                navigate('/signin')
            }
        });
    }, [])

    return (
        <React.Fragment>
            {show ?
                <main>
                    <div className="flex items-center justify-between px-4 pt-4">
                        <div className="flex items-center gap-2">
                            <p>Welcome</p>
                            <p className="font-bold">{userName && userName}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <img src="/coin-min.jpeg" alt="coins" className="w-8 h-8 rounded-full" />
                            <span className="font-bold">{`${score}`}</span>
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
        </React.Fragment>
    )
}

export default Home;
