import React from "react";
import { Frown, Smile, Meh, CheckCircle } from "react-feather";
import Link from "next/link";

const DefaultDashboard = () => {
  return (
    <section className="w-full flex">
      <div className="w-10/12 ml-20 my-auto text-primary-500">
        <h2>Welcome, ZeroIn Enthusiast!</h2>
        <p className="text-xl">
          Embark on your ZeroIn journey to sustainable living by tracking
          progress across product categories. Start with our personalized
          dashboard, guiding you through each eco-friendly step
        </p>
        <p>
          Already have an account?
          <span>
            <Link
              href="/login"
              className="hover:text-primary-200 ml-2 font-bold"
            >
              LogIn
            </Link>
          </span>
        </p>
      </div>
      <div className="w-10/12 text-primary-300 bg-white">
        <div className="py-32 mx-4 mt-3">
          <h3 className="py-2">Journey Track</h3>
          <hr className="w-4/5 border-primary-200" />
          <ul className="list-none m-4">
            <li className="flex gap-3 py-1">
              <span>
                <Smile />
              </span>
              Laundry <span>Completed</span>
            </li>
            <li className="flex gap-3 py-1">
              <span>
                <Meh />
              </span>
              Personal Hygiene <span>In Progress</span>
            </li>
            <li className="flex gap-3 py-1">
              <span>
                <Frown />
              </span>
              Kitchen <span>Not Started</span>
            </li>
          </ul>
          <br />
          <h3 className="py-2">Products</h3>
          <hr className="w-4/5 border-primary-200" />
          <ul className="list-none ml-2">
            <li className="mt-4 p-1 flex gap-3">
              <span>
                <CheckCircle />
              </span>
              <span>provider</span>
            </li>
            <li className="p-1 flex gap-3">
              <span>
                <CheckCircle />
              </span>
              <span>functions</span>
            </li>
            <li className="p-1 flex gap-3">
              <span>
                <CheckCircle />
              </span>
              <span>environment score</span>
            </li>
            <li className="p-1 mb-2 flex gap-3">
              <span>
                <CheckCircle />
              </span>
              <span>quality score</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default DefaultDashboard;
