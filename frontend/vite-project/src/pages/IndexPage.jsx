import React, { useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';


function IndexPage() {

  const {user} = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('home/')
    }
  }, []);

  return (
    <div className='h-[100%] w-[100%]'>
      <iframe src="/IndexPage.html" title="Index Page" className='h-full w-full' />
    </div>
  );
}

export default IndexPage;
