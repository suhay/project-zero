import React from "react";
import Image from "next/image";
import { Frown, Smile, Meh, CheckCircle } from "react-feather";
import Link from "next/link";

const DefaultDashboard = () => {
  return (
    <section className="w-full flex">
      <div className="w-3/5 my-auto mx-24 text-primary-200 border h-3/6">
        <h2 className="mx-24">Welcome, ZeroIn Enthusiast!</h2>
        <p className="text-2xl mx-24">
          Track your ZeroIn journey for products in different categories - start
          your zero waste steps now in customized dashboard.
        </p>
        <p className="mx-24">
          Already have an account?{" "}
          <span>
            <Link href="/signin" className="hover:font-bold ml-2">
              LogIn
            </Link>
          </span>
        </p>
      </div>
      <div className="border w-3/5 relative bg-secondary-700 py-auto">
        {/* <Image
          src="/assets/shampoo-demo.png"
          alt={"shampoo demo product"}
          width={400}
          height={500}
          className="border relative py-auto right-[180px] w-2/3"
        /> */}
        <Image
          src="/assets/shampoo-demo.png"
          alt={"shampoo demo product"}
          width={400}
          height={400}
          className="mx-auto p-auto"
        />
        <div className="text-lg">
          <hr className="w-3/12 relative bottom-80 border-primary-300 right-[-100px]" />
          <ul className="list-none text-primary-300 relative bottom-80 right-[-100px]">
            <li className="mt-4 p-1 flex gap-2">
              <span>
                <CheckCircle />
              </span>
              <span>provider</span>
            </li>
            <li className="p-1 flex gap-2">
              <span>
                <CheckCircle />
              </span>
              <span>high efficient</span>
            </li>
            <li className="p-1 flex gap-2">
              <span>
                <CheckCircle />
              </span>
              <span>environment</span>
            </li>
            <li className="p-1 mb-2 flex gap-2">
              <span>
                <CheckCircle />
              </span>
              <span>quality</span>
            </li>
          </ul>
          <ul className="relative bottom-80 right-[-100px] text-primary-300 mt-6 py-2">
            <hr className="w-3/12 border-primary-300" />
            <p className="py-1">Journey status</p>
            <p className="flex gap-2">
              <Smile />
              <Meh />
              <Frown />
            </p>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default DefaultDashboard;
