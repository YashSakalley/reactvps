import React from 'react';
import styles from './Nav.module.css'; //using DropDown css from here
import { Link } from 'react-router-dom';

export default function Nav() {
    return (
        <>
            <nav className="flex items-center p-3 flex-wrap z-10 absolute w-full">
                <a href="/" className="p-2 mr-4 inline-flex items-center">
                    <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-current text-white h-8 w-8 mr-2">
                        <path
                            d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
                    </svg>
                    <span className="text-xl text-white font-bold uppercase tracking-wide">VIRTUAL POLICE STATION</span>
                </a>
                <button className="text-white inline-flex p-3 hover:bg-gray-900 rounded lg:hidden ml-auto hover:text-white outline-none nav-toggler" data-target="/navigation">
                    <i className="material-icons">menu</i>
                </button>
                <div
                    className="hidden top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto" id="navigation">
                    <div
                        className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto">
                        <a
                            href="/"
                            className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
                        >
                            <span>HOME</span>
                        </a>
                        <a
                            href="#nearby-station"
                            className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
                        >
                            <span>NEARBY POLICE STATION</span>
                        </a>
                        <a
                            href="#login-section"
                            className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
                        >
                            <span>USER LOGIN</span>
                        </a>
                        <a
                            href="#status-section"
                            className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
                        >
                            <span>VIEW STATUS</span>
                        </a>
                        <div className="relative inline-flex">
                            <div className={styles.dropdown}>
                                <button className={`${styles.dropbtn} rounded-tl-lg rounded-tr-lg`}>OFFICERS LOGIN </button>
                                <div className={styles.dropdownContent}>
                                    <Link to="/login/sho">SHO</Link>
                                    <Link to="/login/sp">SP</Link>
                                    <Link to="/login/io">IO</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};