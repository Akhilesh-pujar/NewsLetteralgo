import React,{useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Newsletter.css'
import './Toast.css'

function Newsletter() {
    
    const [isChecked,setIsChecked]=useState(false);
    const[email,setEmail]=useState('');

    const handleChange = (event) => {
        setIsChecked(event.target.checked);
    }

    const handleEmailChange = (event) =>{
        setEmail(event.target.value);
    }

    const handleSubscription = () => {
       if(isChecked && email !== ''){
        toast.success('Successfylly Subscribed!',{
            className: 'custom-toast',
            bodyClassName:'custom-toast-body',
            progressClassName: 'custom-toast-progress',
        });}
        else{
          if(isChecked && email === ''){
            toast.error('Please fill the required data',{
                className: 'custom-toast',
                bodyClassName:'custom-toast-body',
                progressClassName: 'custom-toast-progress',
            });
          }
          if (isChecked === ''){
            toast.error('Please select checkbox',{
                className: 'custom-toast',
                bodyClassName:'custom-toast-body',
                progressClassName: 'custom-toast-progress',
            });
          }
          if(email === ''){
            toast.error('Please enter your email',{
                className: 'custom-toast',
                bodyClassName:'custom-toast-body',
                progressClassName: 'custom-toast-progress',
            });
          }
        }
    };

return (
    <><div className="newsletter">
          <div className="container">
              <div className="row justify-content-center">
                  <div className="col-xl-7 col-lg-7">
                      <div className="section-title">
                          <h2>Our Newslatter</h2>
                          <p>We bring the right people together to challenge established thinking and drive transformation.
                              We will show the way to successive.</p>
                      </div>
                  </div>
              </div>

              <div className="row justify-content-center">
                  <div className="col-xl-7 col-lg-7">
                      <form className="newsletter-form">
                          <input type="email" placeholder="Enter your email..." onChange={handleEmailChange}/>
                          <button type="submit" onClick={handleSubscription}>Subscribe Now</button>
                          <ToastContainer position={toast.POSITION.TOP_RIGHT}/>
                      </form>
                  </div>
              </div>
              <div className='row justify-content-center'>
                <div className='col-xl-7 col-lg-7'>
                    <div className="notice text-center">
                        <input type="checkbox" checked={isChecked} onChange={handleChange}/>
                        <span className="notice__copy">I agree to my email address being stored and uses to recieve monthly newsletter.</span>
                        <span></span>
                    </div>
                </div>
              </div>
              </div>
     </div>

     </>

  )
}

export default Newsletter