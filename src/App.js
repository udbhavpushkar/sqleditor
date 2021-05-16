import './App.css';
import React, {useState} from "react";
import { CSVReader } from 'react-papaparse'
import Table from "./Table";

function App() {

    const [data, setData] = useState([])
    const [header, setHeader] = useState([])
    const [search, setSearch] = useState({})

    const handleOnError = (err, file, inputElem, reason) => {
        console.log(err)
        setData([])
        setHeader([])
        setSearch({})
    }

    const handleOnDrop = (data) => {
        console.log('--------------------------')
        console.log(data)
        setData(data)
        setHeader(Object.keys(data[0].data))
        setSearch(JSON.parse("{"+header.join(":'' ,")+"}"))
        console.log(header)
        console.log('---------------------------')
    }

    const handleOnRemoveFile = (data) => {
        console.log(data)
        setData([])
        setHeader([])
        setSearch({})
    }

    const handleChange = (e)=>{
        setSearch({...search, [e.target.name]: e.target.value})
        //console.log(e.target.value)
    }

  return (
    <div className="App">
        <h1 className="text-primary align-content-center">SQL Editor</h1>
        <div style={{padding: '20px 50px'}}>
            <CSVReader
                onDrop={handleOnDrop}
                onError={handleOnError}
                style={{width:"50%", backgroundColor: 'red'}}
                config={{header: true}}
                addRemoveButton
                onRemoveFile={handleOnRemoveFile}
            >
                <span>Drop CSV file here or click to upload.</span>
            </CSVReader>
        </div>


        {data.length > 0 ?
            <>
                <h4 className="text-secondary" style={{textAlign: 'center'}}>Data Table</h4>
                <table style={{marginTop: '20px', backgroundColor: '#ffffff91'}} className="table-bordered table-hover table-responsive">
                    <thead>
                    <tr>
                        {header.map(h=>(<th><input name={h} onChange={handleChange} type="text"/></th>))}
                    </tr>
                    <tr>
                        {header.map(h=>(<th>{h}</th>))}
                    </tr>
                    </thead>
                    <tbody>
                    {data.map(row=>(
                        <tr>{header.map(key=>(<td>{row.data[key]}</td>))}</tr>
                    ))}
                    </tbody>
                </table>
            </>
        : null}
    </div>
  );
}

export default App;
