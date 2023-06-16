import React,{useState} from 'react'
import axios from "axios"
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Newsletter.css'
import NewsletterImg from "../../assets/newsletter.jpeg"
import { SubcriptionSchema } from '../../Schemas/SubscriptionSchema';
import './Toast.css'

const initialValues ={
    email:""
};

function Newsletter() {
    
    const {values,errors,touched,handleChange,handleSubmit,handleBlur}=useFormik({
        initialValues,
        validationSchema:SubcriptionSchema,
        onSubmit :(values,action)=>{
            console.log(values)
            
            action.resetForm();
        }
    })

    const [isChecked, setIsChecked] = useState(false);
    const [email, setEmail] = useState('');

    const handleChangeBox = (event) => {
        setIsChecked(event.target.checked);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    async function handleSubscription(e) {
        e.preventDefault();
       
        try {
            await axios.post("http://localhost:5000/", {
                email, isChecked
            })
                .then(res => {
                    if (res.data === "exist") {
                        alert("user already exists");
                    }
                    else if (res.data === "notexist") {
                        //toast.success('Sucessfully subscribed !....',{className: 'custom-toast',})
                        if (isChecked && email !== '') {
                            toast.success('Successfylly Subscribed!', {
                                className: 'custom-toast',
                                bodyClassName: 'custom-toast-body',
                                progressClassName: 'custom-toast-progress',
                            });
                        }
                        else {

                            if (isChecked === false) {
                                toast.error('Please select checkbox', {
                                    className: 'custom-toast',
                                    bodyClassName: 'custom-toast-body',
                                    progressClassName: 'custom-toast-progress',
                                });
                            }
                            else if (email === '') {
                                toast.error('Please enter your email...', {
                                    className: 'custom-toast',
                                    bodyClassName: 'custom-toast-body',
                                    progressClassName: 'custom-toast-progress',
                                });
                            }

                        }

                    }
                })
                .catch(e => {
                    alert("Wrong Credentials ");
                    console.log(e);
                });
        }
        catch (e) {
            console.log(e);
        }

    }
return (
            <div className="newsletter-body">
                <div className='img-container'>
                    <div className='img-top'>
                        <img src={NewsletterImg} alt="img not found" />
</div>
                    <div className='div-bottom'>
                        <div className="bottom-body">
                            <h1>Subscribe to our daily newsletter</h1>
                            <p>We bring the right people together to challenge established thinking and drive transformation.
                                We will show the way to successive.</p>
                            <form className="newsletter-form" onSubmit={handleSubmit}>
                                <input type="email" name="email" placeholder="Enter your email..." onChange={handleEmailChange}
                                  values={values.email}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                />
                                
                                <button type="submit" className="sub-button" onClick={handleSubscription}>Subscribe Now</button><br/>
                                {errors.email && touched.email ?(<span className='form-error'>{errors.email}</span>):null}
                                <ToastContainer position={toast.POSITION.TOP_RIGHT} />
                            </form>
                            <div className="notice">
                                <input type="checkbox" checked={isChecked} onChange={handleChangeBox} />
                                <span className="notice__copy">I agree to my email address being stored and uses to recieve monthly newsletter.</span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Newsletter