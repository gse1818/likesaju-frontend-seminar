import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { kakaoSignIn } from 'apis/api';

function Auth() {
  const navigate = useNavigate();

  const getToken = async () => {
    //
  };

  useEffect(() => {
    getToken()
      .then((res) => {
        //
      })
      .catch((err) => console.log(err));
  });

  return <></>;
}

export default Auth;
