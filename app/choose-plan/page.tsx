'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import photo from '../../assets/pricing-top.png'
import { FaFileAlt, FaHandshake } from 'react-icons/fa'
import { RiPlantFill } from 'react-icons/ri'
import AccordianCard from '@/components/AccordianCard'
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { getAuth } from 'firebase/auth'
import app from '@/redux/firebase/firebase'
import { getCheckoutUrl } from './stripepayment'
import { useRouter } from 'next/navigation'
import { ImSpinner2 } from 'react-icons/im'



const plans = () => {
  const auth = getAuth(app);

 const [activeSub, setActiveSub] = useState(false)
 const [loading, setLoading] = useState(false)
 const router = useRouter()
 const upgradePremiumPlus = async () => {
    try {
       setLoading(true)
      const priceId = 'price_1T4eHG3z5GrN3liMifnZiFRC'
      const checkoutUrl = await getCheckoutUrl(app, priceId)
      router.push(checkoutUrl)
      setLoading(false)
    } catch (error) {
      console.error("Stripe checkout error:", error)
    }
  }
 const upgradePremium = async () => {
    try {
        setLoading(true)
      const priceId = 'price_1T4eHe3z5GrN3liMpQnnq1eN'
      const checkoutUrl = await getCheckoutUrl(app, priceId)
      router.push(checkoutUrl)
      setLoading(false)
    } catch (error) {
      console.error("Stripe checkout error:", error)
    }
  }

  useEffect(() => {
  if (typeof window !== "undefined") {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }
}, []);

  return (
    <div className="wrapper wrapper__full" data-aos="fade-left">
        <div className="plan">
            <div className="plan__header--wrapper">
                <div className="plan__header">
                    <div className="plan__title">
                        Get unlimited access to many amazing books to read
                    </div>
                    <div className="plan__sub--title">
                        Turn ordinary moments into amazing learning opportunities
                    </div>
                    <figure className="plan__img--mask">
                        <Image src={photo} width={860} height={722} alt='pricing'/>
                    </figure>
                </div>
            </div>
            <div className="row">
                <div className="container">
                    <div className="plan__features--wrapper">
                        <div className="plan__features">
                            <figure className="plan__features--icon">
                                <FaFileAlt />
                            </figure>
                            <div className="plan__features--text">
                                <b>Key ideas in few min</b> with many books to read
                            </div>
                        </div>
                        <div className="plan__features">
                            <figure className="plan__features--icon">
                                <RiPlantFill />
                            </figure>
                            <div className="plan__features--text">
                                <b>3 million</b> people growing with Summarist everyday
                            </div>
                        </div>
                        <div className="plan__features">
                            <figure className="plan__features--icon">
                                <FaHandshake />
                            </figure>
                            <div className="plan__features--text">
                                <b>Precise recommendations</b> collections curated by experts
                            </div>
                        </div>
                    </div>
                    <div className="section__title">Choose the plan that fits you</div>
                    <div className={`plan__card ${!activeSub ? 'plan__card--active' : ''}`} onClick={() => setActiveSub(false)}>
                        <div className="plan__card--circle"></div>
                        <div className="plan__card--content">
                            <div className="plan__card--title">Premium Plus Yearly</div>
                            <div className="plan__card--price">$99.99/year</div>
                            <div className="plan__card--text">7-day free trial included</div>
                        </div>
                    </div>
                        <div className="plan__card--separator">
                            <div className="plan__separator">or</div>
                        </div>
                    <div className={`plan__card ${activeSub ? 'plan__card--active' : ''}`} onClick={() => setActiveSub(true)}>
                        <div className="plan__card--circle"></div>
                        <div className="plan__card--content">
                            <div className="plan__card--title">Premium Monthly</div>
                            <div className="plan__card--price">$9.99/month</div>
                            <div className="plan__card--text">No trial included</div>
                        </div>
                    </div>
                    {
                        activeSub 
                        ?
                    <div className="plan__card--cta">
                        <span className="btn--wrapper" onClick={upgradePremium}>
                            {
                                loading 
                                ?
                            <button className="btn" style={{width: "300px"}} disabled>
                                <div className="spinner__icon--wrapper">
                                    <ImSpinner2 />
                                </div>
                            </button>
                            :
                            <button className="btn" style={{width: "300px"}}>
                                <span>Start Your First Month</span>
                            </button>
                            }
                        </span>
                        <div className="plan__disclaimer">
                            30-day money back guarantee, no questions asked.
                        </div>
                    </div>
                    :
                    <div className="plan__card--cta">
                        <span className="btn--wrapper" onClick={upgradePremiumPlus}>
                            {
                                loading
                                ?
                            <button className="btn" style={{width: "300px"}} disabled>
                                <div className="spinner__icon--wrapper">
                                    <ImSpinner2 />
                                </div>
                            </button>
                            :
                            <button className="btn" style={{width: "300px"}}>
                                <span>Start your free 7-day trial</span>
                            </button>
                            }
                        </span>
                        <div className="plan__disclaimer">
                            Cancel your trial at any time before it ends, and you won’t be charged.
                        </div>
                    </div>

                    }
                    <div className="faq__wrapper">
                        <AccordianCard title='How does the free 7-day trial work?' body="Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial."/>
                        <AccordianCard title='Can I switch subscriptions from monthly to yearly, or yearly to monthly?' body="While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current month ends, transitioning from a monthly plan to an annual plan is an option."/>
                        <AccordianCard title="What's included in the Premium plan?" body="Premium membership provides you with the ultimate Summarist experience, including unrestricted entry to many best-selling books high-quality audio, the ability to download titles for offline reading, and the option to send your reads to your Kindle."/>
                        <AccordianCard title="Can I cancel during my trial or subscription?" body="You will not be charged if you cancel your trial before its conclusion. While you will not have complete access to the entire Summarist library, you can still expand your knowledge with one curated book per day."/>
                    </div>
                </div>
            </div>
                <section id="footer">
                    <div className="container">
                        <div className="row">
                            <div className="footer__top--wrapper">
                                <div className="footer__block">
                                    <div className="footer__link--title">Actions</div>
                                    <div>
                                        <div className="footer__link--wrapper">
                                            <a className="footer__link">Summarist Magazine</a>
                                        </div>
                                        <div className="footer__link--wrapper">
                                            <a className="footer__link">Cancel Subscription</a>
                                        </div>
                                        <div className="footer__link--wrapper">
                                            <a className="footer__link">Help</a>
                                        </div>
                                        <div className="footer__link--wrapper">
                                            <a className="footer__link">Contact us</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="footer__block">
                                    <div className="footer__link--title">Useful Links</div>
                                    <div>
                                        <div className="footer__link--wrapper">
                                            <a className="footer__link">Pricing</a>
                                        </div>
                                        <div className="footer__link--wrapper">
                                            <a className="footer__link">Summarist Business</a>
                                        </div>
                                        <div className="footer__link--wrapper">
                                            <a className="footer__link">Gift Cards</a>
                                        </div>
                                        <div className="footer__link--wrapper">
                                            <a className="footer__link">Authors & Publishers</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="footer__block">
                                    <div className="footer__link--title">Company</div>
                                    <div>
                                        <div className="footer__link--wrapper">
                                            <a className="footer__link">About</a>
                                        </div>
                                        <div className="footer__link--wrapper">
                                            <a className="footer__link">Careers</a>
                                        </div>
                                        <div className="footer__link--wrapper">
                                            <a className="footer__link">Partners</a>
                                        </div>
                                        <div className="footer__link--wrapper">
                                            <a className="footer__link">Code of Conduct</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="footer__block">
                                    <div className="footer__link--title">Other</div>
                                    <div>
                                        <div className="footer__link--wrapper">
                                            <a className="footer__link">Sitemap</a>
                                        </div>
                                        <div className="footer__link--wrapper">
                                            <a className="footer__link">Legal Notice</a>
                                        </div>
                                        <div className="footer__link--wrapper">
                                            <a className="footer__link">Terms of Service</a>
                                        </div>
                                        <div className="footer__link--wrapper">
                                            <a className="footer__link">Privacy Policies</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="footer__copyright--wrapper">
                                <div className="footer__copyright">
                                    Copyright © 2023 Summarist.
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
        </div>
    </div>
  )
}

export default plans