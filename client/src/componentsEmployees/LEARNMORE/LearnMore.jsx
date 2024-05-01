import React from 'react';
import {Link} from "react-router-dom"

const LearnMore = () => {
    return (
        <div className="learn-more-container" style={{backgroundColor:"rgb(255 225 157)"}}>
            <div className='row'>
                <div className='col-md-11'>
                <h1 className='text-center'>Attendance System</h1>
                </div>
                <div className='col-md-1'>
                    <Link to = "/bankconnect/employee/login-employee">
                    <button className='btn btn-danger'>Back</button>
                    </Link>
                </div>
            </div>
            <p className='mt-4'>
                Welcome to our Attendance System! Our system helps you efficiently manage attendance records, track employee or student attendance, generate reports, and more.
            </p>
            <h2 className='p-2'>Key Features:</h2>
            <ul>
                <li><span style={{color:"red",fontFamily:'sans-serif'}}>Easy to use interface :-</span> Our intuitive interface makes it easy for administrators, teachers, or managers to navigate and use the system.</li>
                <li> <span style={{color:"red",fontFamily:'sans-serif'}}>Real-time attendance tracking :-</span> With real-time tracking, you can monitor attendance as it happens, allowing for immediate action if needed.</li>
                <li><span style={{color:"red",fontFamily:'sans-serif'}}>Customizable reporting :-</span> Generate detailed reports on attendance data, including daily, weekly, and monthly summaries, as well as customized reports tailored to your organization's needs.</li>
                <li><span style={{color:"red",fontFamily:'sans-serif'}}>Integration with other systems :-</span> Seamlessly integrate our attendance system with your existing HR or student management software for enhanced efficiency and data synchronization.</li>
                <li><span style={{color:"red",fontFamily:'sans-serif'}}>Secure and reliable :-</span> We prioritize the security and reliability of our system to ensure that your attendance data is safe and accessible when you need it.</li>
            </ul>
            <h2 className='m-3'>Benefits:</h2>
            <ul>
                <li><span style={{color:"red",fontFamily:'sans-serif'}}>Improved efficiency :-</span> Streamline attendance management processes, reduce manual errors, and save time with automated tracking and reporting.</li>
                <li><span style={{color:"red",fontFamily:'sans-serif'}}>Enhanced accountability :-</span> Hold employees or students accountable for their attendance and ensure compliance with attendance policies.</li>
                <li><span style={{color:"red",fontFamily:'sans-serif'}}>Better decision making :-</span> Access to accurate attendance data enables informed decision-making regarding resource allocation, scheduling, and performance evaluation.</li>
                <li><span style={{color:"red",fontFamily:'sans-serif'}}>Cost savings :-</span> By automating attendance management tasks, you can minimize administrative overhead and reduce costs associated with manual processes.</li>
                <li><span style={{color:"red",fontFamily:'sans-serif'}}>Increased productivity :-</span> With a clearer understanding of attendance patterns, you can identify areas for improvement and implement strategies to boost productivity.</li>
            </ul>
            <h2 className='m-3'>Why Choose Us?</h2>
            <p className='m-3'>
                Our attendance system offers advanced features and functionalities to meet the diverse needs of organizations and educational institutions. With our system, you can streamline attendance management, improve efficiency, and ensure compliance with attendance policies.
            </p>
            <p className='m-3'>
                Whether you're a small business, school, or large corporation, our attendance system is scalable and customizable to suit your unique requirements. Plus, our dedicated support team is here to assist you every step of the way, ensuring a smooth implementation and ongoing support.
            </p>
        </div>
    );
};

export default LearnMore;