import React from 'react';
import { container, item } from '../assests/animate/anamation';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <section className="w-full h-full relative">
      <div className="flex w-full h-[642px] relative">
        <img
          src="https://cdn.pixabay.com/photo/2015/06/03/13/38/plymouth-796441_1280.jpg"
          alt="Car"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute top-[200px] left-[150px] text-center w-[800px] h-auto">
        <div className="px-[120px] max-w-[1440px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={container}
            className="flex items-center justify-center"
          >
            <div className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg  rounded-2xl p-10">
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={item}
                className="flex items-center justify-center"
              >
                <h1 className="text-3xl font-semibold font-manrope mb-4 text-blue-500">
                  RentalCarUA
                </h1>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={item}
                className="flex items-center justify-center"
              >
                <h2 className="text-lg font-manrope">
                  Our company specializes in car rentals, offering a diverse
                  range of vehicles to suit every taste and need. Whether you
                  are looking for something practical, luxurious, or
                  adventurous, we have got you covered. Find the perfect vehicle
                  that matches your style and preferences. Explore{' '}
                  <motion.div
                    className="box"
                    whileHover={{ scale: [null, 1.5, 1.4] }}
                    transition={{ duration: 0.3 }}
                  >
                    <NavLink
                      to="/catalog"
                      className="text-blue-500 text-[22px] transition duration-300 ease-in-out"
                    >
                      Catalog
                    </NavLink>
                  </motion.div>
                  to see for yourself!
                </h2>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Home;
