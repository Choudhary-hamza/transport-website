"use client";
import { useState, useEffect } from "react";
import styles from "./landing.module.css";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.5 }
};

export default function LandingPage() {
  const [currentIndex, setIndex] = useState(0);
  const steps = [
    {
      id: 1,
      icon: <i className="ri-whatsapp-line" style={{ fontSize: "40px" }}></i>,
      title: "WhatsApp Us",
      description: "Contact our team and provide us with your travel details.",
    },
    {
      id: 2,
      icon: <i className="ri-calculator-line" style={{ fontSize: "40px" }}></i>,
      title: "Get Link Quote",
      description: "We'll provide you with an exact price for your route.",
    },
    {
      id: 3,
      icon: <i className="ri-check-line" style={{ fontSize: "40px" }}></i>,
      title: "Confirm Booking",
      description: "Once you're satisfied, lock in your ride.",
    },
    {
      id: 4,
      icon: <i className="ri-roadster-fill" style={{ fontSize: "40px" }}></i>,
      title: "Relax & Enjoy",
      description: "Your driver will pick you up at the agreed time.",
    },
  ];

  const routes = [
    "Jeddah Airport ⟶ Makkah",
    "Makkah ⟶ Jeddah Airport",
    "Makkah ⟶ Madina",
    "Madina ⟶ Makkah",
    "Jeddah Airport ⟶ Madina",
    "Madina ⟶ Jeddah Airport",
    "Hotel ⟶ Makkah Ziyarat",
    "Madina ⟶ Jeddah Airport",
    "Hotel ⟶ Makkah Ziyarat",
  ];
  const imageContext = [
    {
      bold: "Seamless Airport Transfers",
      bold1: "to Holy Cities",
      paragraph:
        "Arrive with peace of mind—our premium airport taxi service connects you directly to Makkah and Madinah, stress-free and on time.",
    },
    {
      bold: "Your Spiritual Journey",
      bold1: "Starts with Us",
      paragraph:
        "From the moment you land, our courteous drivers ensure Link smooth and respectful ride to your sacred destinations.",
    },
    {
      bold: "Ride with Comfort",
      bold1: "and Confidence",
      paragraph:
        "Modern vehicles, professional chauffeurs, and 24/7 service tailored for pilgrims and travelers across Saudi Arabia.",
    },
    {
      bold: "Connecting Jeddah to",
      bold1: "Makkah & Madinah",
      paragraph:
        "Trusted by thousands, our taxi service offers safe, fast and spiritually considerate transport to the Holy Mosques.",
    },
    {
      bold: "Every Journey Matters",
      bold1: "Every Mile Counts",
      paragraph:
        "Whether you are traveling alone or with family, enjoy Link reliable ride that respects your time and purpose.",
    },
  ];
  const carOptions = [
    {
      id: 1,
      name: "Sonata",
      image: "/sonata.png",
      capacity: 3,
      luggage: 3,
      whatsappMessage:
        "Hi! I'd like to book Link Sonata (3 people, 3 luggage). Please provide pricing and availability.",
    },
    {
      id: 2,
      name: "Hiace",
      image: "/hiace.png",
      capacity: 11,
      luggage: 15,
      whatsappMessage:
        "Hi! I'd like to book Link Hiace (11 people, 15 luggage). Please provide pricing and availability.",
    },
    {
      id: 3,
      name: "GMC Yukon XL",
      image: "/gmc.png",
      capacity: 7,
      luggage: 7,
      whatsappMessage:
        "Hi! I'd like to book Link GMC Yukon XL (7 people, 7 luggage). Please provide pricing and availability.",
    },
    {
      id: 4,
      name: "H1 Hyundai",
      image: "/hyundai.png",
      capacity: 4,
      luggage: 3,
      whatsappMessage:
        "Hi! I'd like to book Link H1 Hyundai (4 seats, 3 luggage). Please provide pricing and availability.",
    },
    {
      id: 5,
      name: "Camry",
      image: "/camry.png",
      capacity: 3,
      luggage: 3,
      whatsappMessage:
        "Hi! I'd like to book Link Camry (3 people, 3 luggage). Please provide pricing and availability.",
    },
    {
      id: 6,
      name: "Coaster",
      image: "/coaster.jpeg",
      capacity: 15,
      luggage: 20,
      whatsappMessage:
        "Hi! I'd like to book Link Coaster (15 people, 20 luggage). Please provide pricing and availability.",
    },
    {
      id: 7,
      name: "Staria",
      image: "/staria.png",
      capacity: 7,
      luggage: 7,
      whatsappMessage:
        "Hi! I'd like to book Link Staria (7 people, 7 luggage). Please provide pricing and availability.",
    },
  ];

  const handleWhatsAppBooking = (message) => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/YOUR_PHONE_NUMBER?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };
  const handleWhatsApp = () => {
    const whatsappUrl = `https://wa.me/YOUR_PHONE_NUMBER`;
    window.open(whatsappUrl, "_blank");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % imageContext.length);
    }, 5000);

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <>
      <div className={styles.imageContainer}>
        <div className={styles.imageCover}></div>
        <div className={styles.textContainer}>
          <motion.h1
            key={`bold-${currentIndex}`}
            className={styles.bold}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {imageContext[currentIndex].bold}
          </motion.h1>

          <motion.h1
            key={`bold1-${currentIndex}`}
            className={styles.bold1}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {imageContext[currentIndex].bold1}
          </motion.h1>

          <motion.p
            key={`paragraph-${currentIndex}`}
            className={styles.paragraph}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {imageContext[currentIndex].paragraph}
          </motion.p>

          <motion.div 
            className={styles.buttonGroup}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link className={styles.primaryButton} href="https" role="button">
              Contact Now
            </Link>
            <Link className={styles.secondaryButton} href="/login" role="button">
              Sign in as Driver
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.div 
        className={styles.container}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className={styles.heading}>Our Private Taxi Routes</h2>
        <p className={styles.subheading}>
          Choose Your Route, Your Private Ride with Us!
        </p>
        <motion.div 
          className={styles.routesWrapper}
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {routes.map((route, index) => (
            <motion.button 
              key={index}
              className={styles.routeButton}
              variants={scaleIn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className={`ri-map-pin-2-fill ${styles.icon}`}></i>
              {route}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      <motion.section 
        className={styles.howItWorksSection}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className={styles.container2}>
          <h2 className={styles.mainTitle}>How It Works: 4 Easy Steps</h2>

          <motion.div 
            className={styles.stepsGrid}
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {steps.map((step, index) => (
              <motion.div 
                key={step.id} 
                className={styles.stepCard}
                variants={scaleIn}
                whileHover={{ y: -10 }}
              >
                <div className={styles.iconWrapper}>{step.icon}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
                <div className={styles.stepNumber}>{step.id}</div>
                {index < steps.length - 1 && (
                  <div className={styles.connector}></div>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className={styles.ctaWrapper}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <button className={styles.whatsappButton} onClick={handleWhatsApp}>
              <i className="ri-whatsapp-line" style={{ fontSize: "20px" }}></i>
              BOOK ON WHATSAPP
            </button>
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        className={styles.taxiOptionsSection} 
        id="cars"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className={styles.container3}>
          <div className={styles.headerContent}>
            <h2 className={styles.mainTitle}>Our Private Taxi Options</h2>
            <p className={styles.subtitle}>
              We provide complete private taxi for couples and families. Book now!
            </p>
          </div>

          <motion.div 
            className={styles.carsGrid}
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {carOptions.map((car) => (
              <motion.div 
                key={car.id} 
                className={styles.carCard}
                variants={scaleIn}
                whileHover={{ y: -10, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
              >
                <div className={styles.carImageWrapper}>
                  <Image
                    src={car.image || "/placeholder.svg"}
                    alt={`${car.name} taxi`}
                    className={styles.carImage}
                    fill
                  />
                </div>

                <div className={styles.carInfo}>
                  <h3 className={styles.carName}>{car.name}</h3>
                  <div className={styles.specifications}>
                    <div className={styles.spec}>
                      <i className="ri-group-line" style={{ fontSize: "16px" }}></i>
                      <span>{car.capacity} people</span>
                    </div>
                    <div className={styles.spec}>
                      <i className="ri-luggage-cart-line" style={{ fontSize: "16px" }}></i>
                      <span>{car.luggage} luggage</span>
                    </div>
                  </div>

                  <motion.button
                    className={styles.bookButton}
                    onClick={() => handleWhatsAppBooking(car.whatsappMessage)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className="ri-whatsapp-line" style={{ fontSize: "16px" }}></i>
                    Book Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.div 
        className={styles.aboutSection} 
        id="about"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className={styles.container4}>
          <h2 className={styles.heading}>About Us</h2>
          <p className={styles.subheading}>Your Trusted Transportation Partner</p>

          <motion.div 
            className={styles.contentBox}
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div 
              className={styles.imageContainer}
              variants={scaleIn}
            >
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Our transportation service"
                width={600}
                height={500}
                className={styles.aboutImage}
              />
            </motion.div>

            <motion.div 
              className={styles.textContent}
              variants={fadeInUp}
            >
              <h3 className={styles.contentTitle}>Your Journey, Our Priority</h3>
              <p className={styles.description}>
                With years of experience in providing exceptional transportation
                services, we have established ourselves as Link leading provider of
                reliable and comfortable travel solutions. Our commitment to
                excellence and customer satisfaction has made us the preferred
                choice for travelers seeking safe and convenient transportation
                options.
              </p>
              <p className={styles.description}>
                We take pride in our fleet of well-maintained vehicles and our
                team of professional drivers who are dedicated to ensuring that
                your journey is smooth, comfortable, and memorable. Whether
                you are traveling or business or leisure, we are here to make
                your transportation experience hassle-free.
              </p>

              <motion.div 
                className={styles.highlights}
                variants={staggerContainer}
              >
                {[
                  "Professional Drivers",
                  "Modern Vehicle Fleet",
                  "24/7 Customer Support",
                  "Comfortable & Safe Journey"
                ].map((text, index) => (
                  <motion.div 
                    key={index}
                    className={styles.highlight}
                    variants={scaleIn}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className={styles.highlightIcon}>✓</div>
                    <div className={styles.highlightText}>{text}</div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.button 
                className={styles.contactButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWhatsApp}
              >
                Contact Us
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <motion.footer 
        className={styles.footer}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.container5}>
          <div className={styles.footerContent}>
            {/* Company Info Column */}
            <div className={styles.column}>
              <div className={styles.logo}>
                <Image
                  src="/placeholder.svg?height=80&width=120"
                  alt="Mehar Transport Logo"
                  width={120}
                  height={80}
                  className={styles.logoImage}
                />
              </div>
              <p className={styles.description}>
                Mehar Umrah Transport offers reliable, comfortable, and affordable services for Umrah and Hajj pilgrims,
                ensuring Link stress-free journey.
              </p>
              <div className={styles.socialIcons}>
                <Link href="#" className={styles.socialIcon}>
                  <span>f</span>
                </Link>
              </div>
            </div>

            {/* Contact Info Column */}
            <div className={styles.column}>
              <h3 className={styles.columnTitle}>Contact Info</h3>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📞</span>
                <span>+966 566027405</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📱</span>
                <span>+447446471605</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>✉</span>
                <span>mehartransport786@gmail.com</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📍</span>
                <span>Building No. 9173, Al Umrah Al Jadidah Dist. MAKKAH, Kingdom of Saudi Arabia</span>
              </div>
            </div>

            {/* Our Info Column */}
            <div className={styles.column}>
              <h3 className={styles.columnTitle}>Our Info</h3>
              <ul className={styles.linkList}>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="#cars">Services</Link>
                </li>
                <li>
                  <Link href="#about">About</Link>
                </li>
              </ul>
            </div>

            {/* Our Services Column */}
            <div className={styles.column}>
              <h3 className={styles.columnTitle}>Our Services</h3>
              <ul className={styles.serviceList}>
                <li>Jeddah Airport To Makkah Taxi</li>
                <li>Makkah to Madina Taxi</li>
                <li>Madina Hotel To Airport Taxi</li>
                <li>Madina Airport To Hotel Taxi</li>
                <li>Makkah Hotel To Jeddah Airport Taxi</li>
                <li>Cheap Airport Taxi or Transfer</li>
                <li>Jeddah Taxi Service</li>
                <li>Madina to Makkah Taxi</li>
              </ul>
            </div>
          </div>

          {/* Copyright Section */}
          <div className={styles.copyright}>
            <p>Copyright © 2025 Mehar Transport, All rights reserved.</p>
          </div>
        </div>
      </motion.footer>
    </>
  );
}
