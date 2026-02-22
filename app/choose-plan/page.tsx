import Image from 'next/image'
import React from 'react'
import photo from '../../assets/pricing-top.png'
import { FaFileAlt, FaHandshake } from 'react-icons/fa'
import { RiPlantFill } from 'react-icons/ri'

const plans = () => {
  return (
    <div className="wrapper wrapper__full">
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
                    <div className="plan__card">
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
                    <div className="plan__card">
                        <div className="plan__card--circle"></div>
                        <div className="plan__card--content">
                            <div className="plan__card--title">Premium Monthly</div>
                            <div className="plan__card--price">$9.99/month</div>
                            <div className="plan__card--text">No trial included</div>
                        </div>
                    </div>
                    <div className="plan__card--cta"></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default plans