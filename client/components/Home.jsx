import BBG from '../src/assets/BBG.jfif';
import hire from '../src/assets/hire.jpg';
import { Link } from 'react-router-dom';
import '../src/index.css'

export default function Home() {
     return <>
     
     <section id="intro">
          <div className="introContent">
          <span className="hello">Hello,</span><br/>
          <span className="introText">I am <span className="introName">TEAM SIGMA</span> 
          <img src={BBG} alt="profile" className="bbg" width="750" height="750" align="right" />
          <br/>Software Engineers</span>
          <p className="introPara">Team Sigma is a dynamic collective of passionate professionals who excel at blending creativity with technical expertise to tackle complex challenges. United by a commitment to innovation and excellence, the team thrives on collaboration and continuous improvement, consistently pushing the boundaries of what's possible to deliver transformative results and inspire lasting change in their field.
        </p>
          <Link><button className="btn"><img src={hire} alt="Hire me" width="100px" height="100px"/></button></Link>
          
          </div>
          
     </section>
    

     </>
     }
    