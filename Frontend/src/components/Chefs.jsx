import React from 'react'
import '../components/Chefs.css'
import Card from "react-bootstrap/Card";
import chefs1 from '../assets/chefs-1.jpg'
import chefs2 from '../assets/chefs-2.jpg'
import chefs3 from '../assets/chefs-3.jpg'
import { Link } from 'react-router-dom';

export const Chefs = () => {
  return (
    <>
    <section>
      <div class="menu-1">
        <button className="menutop">CHEFS</button>
        <h1 className="mt-3">
          Our Professional<span> Chefs</span>
        </h1>
      </div>

      <div class="carddemochefs mt-5" >
        <div class="g-4 row row-cols-md-4 row-cols-1">
          <div class="col">
            <div id="chefsdemo" class="card" >
              <Card.Img variant="top" src={chefs1} />
            </div>
            <div className='namechefs'> 
            </div>
            <div className='namechef'> 
                <h1>Henry Josan</h1>
                <span>Master Chef</span>
            </div>
            <div className='social-icon'>
            <Link to=""><i class="bi bi-twitter-x"></i></Link>
            <Link to=""><i class="bi bi-facebook"></i></Link>
            <Link to=""><i class="bi bi-instagram"></i></Link>
            <Link to=""><i class="bi bi-linkedin"></i></Link>
            </div>
          </div>
          <div class="col">
            <div id="chefsdemo" class="card">
              <Card.Img variant="top" src={chefs2} />
            </div>
            <div className='namechefs-1'> 
            </div>
            <div className='namechef'> 
                <h1>Jenny Marke</h1>
                <span>Patissier</span>
            </div>
            <div className='social-icon'>
            <Link to=""><i class="bi bi-twitter-x"></i></Link>
            <Link to=""><i class="bi bi-facebook"></i></Link>
            <Link to=""><i class="bi bi-instagram"></i></Link>
            <Link to=""><i class="bi bi-linkedin"></i></Link>
            </div>
          </div>
          <div class="col">
            <div id="chefsdemo" class="card">
              <Card.Img variant="top" src={chefs3} />
            </div>
            <div className='namechefs-2'>  
            </div>
            <div className='namechef'> 
                <h1>David Luso</h1>
                <span>Cook</span>
            </div>
            <div className='social-icon'>
            <Link to=""><i class="bi bi-twitter-x"></i></Link>
            <Link to=""><i class="bi bi-facebook"></i></Link>
            <Link to=""><i class="bi bi-instagram"></i></Link>
            <Link to=""><i class="bi bi-linkedin"></i></Link>
            </div>
          </div>
        </div>
      </div>
      </section>
    </>
  );
}