import React, { Component, useState, useEffect } from "react";
import axios from 'axios'
import Chart from "react-apexcharts";
import "../assets/css/graph.css"

function Graph() {
    const [options, setObject] = useState({

    })
    const [series, setSeries] = useState([{

    }])

    useEffect(() => {
        const age = [];
        const salary = [];

        axios.get('https://dummy.restapiexample.com/api/v1/employees').then(response => {
            console.log("response", response)
            response.data.data.map(item => {
                age.push(item.employee_age);
                salary.push(item.employee_salary);
            })
            setObject({
                chart: {
                    id: "basic-bar"
                },
                xaxis: {
                    categories: salary
                }
            })
            setSeries([{
                name: "age",
                data: age
            }])
        }).catch(e => {
            alert(e);
        })
    }, [])

    return (
        <div className="container mt-5">
            <h1>Menu ApexChart</h1>
            <div className="graph">
                <Chart
                    options={options}
                    series={series}
                    type="bar"
                    width="550"
                />
            </div>

        </div>
    )
}

export default Graph