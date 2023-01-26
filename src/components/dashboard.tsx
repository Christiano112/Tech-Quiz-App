import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    Filler,
    ArcElement
} from 'chart.js';
import {
    Chart,
    getDatasetAtEvent,
    getElementAtEvent,
    getElementsAtEvent,
} from 'react-chartjs-2';
import React, { MouseEvent, useRef } from 'react';
import type { InteractionItem } from 'chart.js'
import { Pie } from 'react-chartjs-2';

let myLinuxScore: any;
let myDevOpsScore: any;
let myCodeScore: any;
let mySQLScore: any;
let myTotalScore: any;

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    Filler,
    ArcElement
);


export const options = {
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};

const labels = ['Linux', 'DevOps', 'Code', 'SQL'];


const DashBoard = () => {
    const [totalScore, setTotalScore] = React.useState(0);
    const [showChart, setShowChart] = React.useState("")

    React.useEffect(() => {
        myLinuxScore = localStorage.getItem('Linux-score');
        myDevOpsScore = localStorage.getItem('DevOps-score');
        myCodeScore = localStorage.getItem('Code-score');
        mySQLScore = localStorage.getItem('SQL-score');
        myTotalScore = Number(myLinuxScore) + Number(myDevOpsScore) + Number(myCodeScore) + Number(mySQLScore);
        setTotalScore(myTotalScore);
    }, []);

    const pieData = {
        labels: ['Linux', 'DevOps', 'Code', 'SQL'],
        datasets: [
            {
                label: 'Scores',
                data: [myLinuxScore, myDevOpsScore, myCodeScore, mySQLScore],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const barData = {
        labels,
        datasets: [
            {
                type: 'bar' as const,
                label: 'Scores',
                backgroundColor: 'rgb(234, 72, 153)',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 2,
                fill: true,
                // data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
                data: [myLinuxScore, myDevOpsScore, myCodeScore, mySQLScore],
            },
        ],
    };

    const printDatasetAtEvent = (dataset: InteractionItem[]) => {
        if (!dataset.length) return;

        // const datasetIndex = dataset[0].datasetIndex;

        // console.log(data.datasets[datasetIndex].label);
    };

    const printElementAtEvent = (element: InteractionItem[]) => {
        if (!element.length) return;

        const { datasetIndex, index } = element[0];

        console.log(barData.labels[index], barData.datasets[datasetIndex].data[index]);
    };

    const printElementsAtEvent = (elements: InteractionItem[]) => {
        if (!elements.length) return;

        console.log(elements.length);
    };

    const chartRef = useRef<ChartJS>(null);

    const onClick = (event: MouseEvent<HTMLCanvasElement>) => {
        const { current: chart } = chartRef;

        if (!chart) {
            return;
        }

        printDatasetAtEvent(getDatasetAtEvent(chart, event));
        printElementAtEvent(getElementAtEvent(chart, event));
        printElementsAtEvent(getElementsAtEvent(chart, event));
    };



    return (
        <div className='mt-8'>
            <h1 className='text-center font-bold text-2xl text-pink-500 mb-8'>This is your Dashboard</h1>
            <h2 className='text-center font-bold text-xl mb-4 text-pink-500'>Your Total Score is: <span className='text-pink-500 font-black'>{totalScore}</span></h2>

            <div className='flex flex-col gap-4'>
                <h3 className='font-bold text-xl'>Which Chart Format Would You Like To See?</h3>
                <button onClick={() => setShowChart("bar")}
                    className='cursor-pointer text-white rounded-lg shadow-lg select-none p-2 bg-pink-500 w-[25%] mt-2 mb-2'>
                    Bar
                </button>
                <button onClick={() => setShowChart("pie")}
                    className='cursor-pointer text-white rounded-lg shadow-lg select-none p-2 bg-pink-500 w-[25%] mt-2 mb-2'>
                    Pie
                </button>
            </div>

            <div className='p-4 flex items-center justify-center my-16'>
                {
                    showChart === "bar" && <Chart
                        ref={chartRef}
                        type='bar'
                        onClick={onClick}
                        options={options}
                        data={barData}
                    />
                }

                {
                    showChart === "pie" && <Pie data={pieData} />
                }
            </div>
        </div>
    )
}

export default DashBoard;

