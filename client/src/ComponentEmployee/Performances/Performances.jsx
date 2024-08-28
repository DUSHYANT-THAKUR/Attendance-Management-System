import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReactSpeedometer from 'react-d3-speedometer';
import "../../App.css";
import axios from 'axios';
import baseUrl from '../config/baseUrl';

const calculateMetrics = (value, target) => {
    const totalVolume = target;
    const targetAchieved = value;
    const percentageAchieved = ((value / target) * 100).toFixed(2);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysLeft = lastDayOfMonth - currentDate.getDate();
    const requiredDailyRate = ((target / 30)).toFixed(2);
    const commission = value > target ? (value - target) * 0.025 : 0;
    return {
        totalVolume,
        targetAchieved,
        percentageAchieved,
        daysLeft,
        requiredDailyRate,
        commission
    };
};

export default function Performances() {
    const auth = localStorage.getItem('user');
    const [target, setTarget] = useState(0);
    const [value, setValue] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const calculatePerformance = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                    Authorization: `Bearer ${auth}`
                }
            };
            // const result = await axios.post(`${baseUrl}/defaultPerformance`, {}, config);
            setTarget(90000);
            setValue(7900);
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch performance data');
            setLoading(false);
        }
    };

    useEffect(() => {
        calculatePerformance();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const metrics = calculateMetrics(value, target);

    return (
        <div className='Performance-container'>
            <Typography variant="h6" gutterBottom className='mt-3 ms-3'>
                Performance
            </Typography>
            <div className="p-4 pt-2" style={{ backgroundColor: '#F9F9F9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <div className="row mb-4">
                    <div className="card col-md-4 text-center mb-3 pt-4">
                        <ReactSpeedometer
                            maxValue={target}
                            value={Math.min(value, target)}
                            needleColor="blue"
                            startColor="red"
                            segments={10}
                            endColor="green"
                            textColor="#000"
                            valueFormat="~s"
                        />
                        <Typography variant="h6" gutterBottom className='mb-3 mt-3'>
                            Total Target Achieved
                        </Typography>
                    </div>
                    <div className="card col-md-4 text-center mb-3 pt-4">
                        <ReactSpeedometer
                            maxValue={100}
                            value={Math.min(metrics.percentageAchieved, 100)}
                            needleColor="blue"
                            startColor="yellow"
                            segments={10}
                            endColor="green"
                            textColor="#000"
                        />
                        <Typography variant="h6" gutterBottom className='mb-3 mt-3'>
                            Total Target Achieved Percentage
                        </Typography>
                    </div>
                    <div className="card col-md-4 text-center mb-3 pt-4">
                        <ReactSpeedometer
                            maxValue={metrics.commission}
                            value={metrics.commission}
                            needleColor="blue"
                            startColor="purple"
                            segments={10}
                            endColor="blue"
                            textColor="#000"
                            valueFormat="~s"
                        />
                        <Typography variant="h6" gutterBottom className='mb-3 mt-3'>
                            Commission
                        </Typography>
                    </div>
                </div>
                <table className="table table-bordered table-striped table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>Metric</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Total Volume</td>
                            <td>{metrics.totalVolume}$</td>
                        </tr>
                        <tr>
                            <td>Target Achieved</td>
                            <td>{metrics.targetAchieved}$</td>
                        </tr>
                        <tr>
                            <td>Percentage Achieved</td>
                            <td>{Math.min(metrics.percentageAchieved, 100)}%</td>
                        </tr>
                        <tr>
                            <td>Days Left in Current Month</td>
                            <td>{metrics.daysLeft}</td>
                        </tr>
                        <tr>
                            <td>Required Daily Rate to Achieve Target</td>
                            <td>{metrics.requiredDailyRate}$</td>
                        </tr>
                        <tr>
                            <td>Commission Earned</td>
                            <td>{metrics.commission}$</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
