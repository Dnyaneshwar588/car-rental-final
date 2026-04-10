import React from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

const Footer = () => {
  const emailAddress = "dnyaneshwarkhune723@gmail.com";
  const instagramUrl = "https://instagram.com/dnyaneshwar_khune18";
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailAddress)}`;

  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 mt-28 text-sm text-gray-500">
      <motion.div
        {...fadeUp(0)}
        className="flex flex-wrap justify-between items-start gap-10 pb-10 border-b border-borderColor"
      >
        <div className="max-w-sm">
          <motion.img
            {...fadeUp(0.2)}
            src={assets.logo}
            alt="logo"
            className="h-9 mb-3"
          />

          <motion.p {...fadeUp(0.3)} className="leading-relaxed text-gray-600">
            Premium car rentals with verified owners, transparent pricing, and a
            seamless booking experience built for modern travelers.
          </motion.p>

          <motion.div
            {...fadeUp(0.4)}
            className="flex items-center gap-4 mt-6"
          >
            <a href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram">
              <img src={assets.instagram_logo} className="w-5 h-5 hover:opacity-70 transition" />
            </a>
            <a href={gmailComposeUrl} target="_blank" rel="noreferrer" aria-label="Email">
              <img src={assets.gmail_logo} className="w-5 h-5 hover:opacity-70 transition" />
            </a>
          </motion.div>
        </div>

        <motion.div
          {...fadeUp(0.3)}
          className="flex flex-wrap justify-between w-full md:w-1/2 gap-10"
        >
          <div>
            <h2 className="text-base font-semibold text-gray-900 uppercase tracking-wide">
              Quick Links
            </h2>
            <ul className="mt-4 flex flex-col gap-2">
              {["Home", "Browse Cars", "List Your Car", "About Us"].map(
                (item) => (
                  <li key={item}>
                    <a className="hover:text-gray-700 transition" href="#">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h2 className="text-base font-semibold text-gray-900 uppercase tracking-wide">
              Resources
            </h2>
            <ul className="mt-4 flex flex-col gap-2">
              {["Help Center", "Terms of Service", "Privacy Policy", "Insurance"].map(
                (item) => (
                  <li key={item}>
                    <a className="hover:text-gray-700 transition" href="#">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h2 className="text-base font-semibold text-gray-900 uppercase tracking-wide">
              Contact
            </h2>
            <ul className="mt-4 flex flex-col gap-2">
              <li>+91 9371656817</li>
              <li>
                <a href={`mailto:${emailAddress}`} className="hover:text-gray-700 transition">
                  {emailAddress}
                </a>
              </li>
              <li>@dnyaneshwar_khune18</li>
            </ul>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        {...fadeUp(0.5)}
        className="flex flex-col md:flex-row gap-3 items-center justify-between py-6 text-gray-600"
      >
        <p>© {new Date().getFullYear()} Brand. All rights reserved.</p>

        <ul className="flex items-center gap-4">
          {["Privacy", "Terms", "Cookies"].map((item, i) => (
            <React.Fragment key={item}>
              <li>
                <a className="hover:text-gray-800 transition" href="#">
                  {item}
                </a>
              </li>
              {i < 2 && <span>|</span>}
            </React.Fragment>
          ))}
        </ul>
      </motion.div>
    </footer>
  );
};

export default Footer;
