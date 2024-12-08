import { useEffect, useState } from "react";

const Home = () => {
    const Handleclick = () => {
        //console.log(pagetitle);
        headercahnge('React JS Tutorial');
        // console.log(pagetitle);

    }
    //let pagetitle='React JS 18.2 Tutorial'
    const [pagetitle, titlecahnge] = useState('React JS 18.2 Tutorial')
    const [pagehaeder, headercahnge] = useState('React JS')
    const obj = { name: 'ravi' };
    useEffect(() => {
      //  console.log('Use Effect hook');
    },[]);

    return (
        <div>
       
        </div>
    );
}

export default Home;