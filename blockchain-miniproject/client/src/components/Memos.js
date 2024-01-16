import {useState, useEffect} from 'react';
/* global BigInt */
const Memos=({state})=>{
    const [memos,getMemos] = useState([]);
    const {contract} = state;

    useEffect(()=>{
        const memosMessage=async()=>{
            const memos = await contract.getMemos();
            getMemos(memos);
        }
        contract && memosMessage();
    },[contract]);
return(
<>
    <p style={{textAlign: "center", marginTop: "20px", fontWeight:"bold"}}>Transactions</p>
    {memos.map((memo)=>{
        return(
            <div 
                className="container-fluid"
                style={{width:"100%"}}
                key={Math.random()}
            >
        <table key={memo.timestamp} style={{marginBottom:"10px",}}>
            <tbody>
                <tr>
                    <td
                        style={{
                            backgroundColor: "#96D4D4",
                            border: "1px solid white",
                            borderCollapse: "collapse",
                            padding: "7px",
                            width: "100px",
                        }}
                    >
                    {memo.name}
                    </td>
                    <td
                        style={{
                            backgroundColor: "#96D4D4",
                            border: "1px solid white",
                            borderCollapse: "collapse",
                            padding: "7px",
                            width: "800px",
                        }}
                    >
                    {String(memo.timestamp)}
                    {/* {new Date(memo.timestamp*1000).toLocaleString()} */}
                    </td>
                    <td
                        style={{
                            backgroundColor: "#96D4D4",
                            border: "1px solid white",
                            borderCollapse: "collapse",
                            padding: "7px",
                            width: "300px",
                        }}
                    >
                    {memo.message}
                    </td>
                    <td
                        style={{
                            backgroundColor: "#96D4D4",
                            border: "1px solid white",
                            borderCollapse: "collapse",
                            padding: "7px",
                            width: "400px",
                        }}
                    >
                    {memo.from}</td>
                </tr>
            </tbody>
        </table>
        </div>
    );
    })}
</>
);
};
export default Memos;