import React from "react";
import {Link} from "react-router-dom";


const NotFound = () => {
  return (
    <section className='page notfound'>
    <div className="content">
    <img src="/not.png" alt='notfound' className="w-[40rem] h-[40rem]"/>
      <Link to={'/'}>Go Home</Link>
    </div>
    </section>
  )
}

export default NotFound