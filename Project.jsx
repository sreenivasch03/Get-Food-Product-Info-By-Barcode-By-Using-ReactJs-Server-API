import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styles from "./project.module.css";
const Project = () => {
  let [barcode,setBarcode] = useState("");
  let [items,setItems] = useState([]);
  let handleChange = (e)=>{
    setBarcode(e.target.value)
  }
  let getProducts = ()=>{
    if(barcode){
      axios.get(`https://world.openfoodfacts.org/api/v2/products/${barcode}.json`).then((res)=>{
        console.log(res.data.product);
        if(res.data && res.data.product){
          setItems([res.data.product])
        }
        else{
          setItems([]);
          console.log("No Data!");
        }
      }).catch(()=>{
        console.log("Data not found!");
      })
    }
  }
  return (
    <div className={styles.container}>
      <h1 id={styles.mainHeading}>Product Details Checker</h1>
       <label name='barcode' className={styles.label} htmlFor="">Barcode here : </label>
       <input type="text" placeholder='Enter your barcode' value={barcode} name='barcode' onChange={handleChange} className={styles.input}/>
       <button id={styles.checkButton} onClick={getProducts}>Check</button>

       {items.map((d)=>{
        return <div key={d._id} id={styles.contentDiv}>
          <div className={styles.leftContent}>
              <div>
                  <h2 className={styles.productName}>{d.product_name}</h2>
              </div>
              <div>
                  <img src={d.image_url} alt="Sorry image not found!" id={styles.image} />
              </div>
          </div>
          <div className={styles.rightContent}>
              <div className={styles.rightSubDiv}>
                  <h2 className={styles.subHeadings}>Country of origin : </h2> <h3 className={styles.contentFont}>{d.countries_tags}</h3>
                  <h2 className={styles.subHeadings}>Categories : </h2>        <h3 className={styles.contentFont}>{d.categories}</h3>
                  <h2 className={styles.subHeadings}>Creator : </h2>           <h3 className={styles.contentFont}> {d.creator}</h3>
                  <h2 className={styles.subHeadings}>Labels : </h2>            <h3 className={styles.contentFont}> {d.labels}</h3>
              </div>
          </div>
        </div>
       })}
    </div>

  )
}

export default Project;
//7622210292742