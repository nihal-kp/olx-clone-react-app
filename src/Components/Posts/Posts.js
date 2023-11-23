import React, { useState, useEffect, useContext } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { collection, getDocs, getFirestore, query } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';
import { FirebaseContext } from '../../Store/Context';
import { useNavigate } from 'react-router-dom';

function Posts() {
  const {firebase} = useContext(FirebaseContext);
  const firestore = getFirestore(firebase);
  const queryProducts = query(collection(firestore, "products"));
  // const auth = getAuth();
  const [products,setProducts] = useState([]);
  const {setPostDetails} = useContext();
  const navigate = useNavigate();

  useEffect(()=>{
    getDocs(queryProducts)
    .then((querySnapshot) => {
      const allPosts = querySnapshot.docs.map((product)=> {
        return {
          ...product.data(),
          id:product.id
        }
      })
      // console.log(allPosts);
      setProducts(allPosts);
    })
    .catch((e) => {
      console.error("Error fetching data: ", e);
    });
  }, [queryProducts]);
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          { products.map(product=>{
              return <div className="card" onClick={()=>{ 
                setPostDetails(product);
                navigate('/post-detail');
               }}>
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={product.url} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.category}</span>
                  <p className="name"> {product.name}</p>
                </div>
                <div className="date">
                  <span>{product.createdAt}</span>
                </div>
              </div>
            })
            
          }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
