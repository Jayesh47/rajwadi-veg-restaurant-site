import { faFacebook, faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-4 bottom-0 w-[100%]">
      <div className="container mx-auto p-4">
        <div className="flex justify-between mb-2">
          <div className="text-gray-400">
            <p>&copy; 2023 All Rights Reserved</p>
          </div>
          <div className="flex justify-end">
            <a
              href="#"
              className="text-gray-400 hover:text-gray-200 transition duration-300 ease-in-out mr-4"
            >
              <FontAwesomeIcon icon={faFacebook} size="1x" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-200 transition duration-300 ease-in-out mr-4"
            >
              <FontAwesomeIcon icon={faInstagram} size="1x" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-200 transition duration-300 ease-in-out"
            >
              <FontAwesomeIcon icon={faGithub} size="1x" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}