import React, { useContext, useEffect, useState } from 'react';

import './PostDetail.css';
import { PostContext } from '../../Store/PostContext';
import { FirebaseContext } from '../../Store/Context';
import { collection, doc, getDocs, getFirestore, query, where } from "firebase/firestore";

function PostDetail() {
  const {postDetails} = useContext(PostContext);
  const [userDetails, setUserDetails] = useState();
  const {firebase} = useContext(FirebaseContext);
  const firestore = getFirestore(firebase);
  const usersRef = collection(firestore, "users");

  useEffect(() => {
    const { userId } = postDetails;
    const q = query(usersRef, where("id", "==", userId));
    const querySnapshotPromise = getDocs(q);
  
    querySnapshotPromise
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          setUserDetails(doc.data());
        });
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [postDetails]);
  

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      {userDetails && <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{ userDetails.username }</p>
          <p>{ userDetails.phone }</p>
        </div>
      </div> }
    </div>
  );
}
export default PostDetail;
