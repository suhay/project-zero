// "use client";
// import { ShoppingBag } from "react-feather";
// // import { CATEGORY_STATUS } from "@/constants";
// import { CategoryStatusContext } from "@/src/context/context";
// import { useContext } from "react";

// // interface JourneyStatusProps {
// //   category: string;
// // }
// const JourneyStatus = () => {
//   const { categoryStatus } = useContext(CategoryStatusContext);
//   // const getJourneyStatus = (category: string): string | undefined => {
//   //   const matchingCategory = CATEGORY_STATUS.find(
//   //     (c) => c.key.toLowerCase() === category,
//   //   );
//   //   return matchingCategory?.status;
//   // };

//   // const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

//   return (
//     <section className="border flex m-10 gap-4 text-green-800">
//       <p className="h-32 w-32 rounded-full bg-secondary-600 text-green-700 flex items-center my-auto">
//         <ShoppingBag className="mx-auto h-8 w-8" />
//       </p>
//       <div className="flex-col ml-6">
//         <p className="mt-10 ">Status: {categoryStatus.status}</p>
//         {/* <h2>{categoryName}</h2> */}
//       </div>
//     </section>
//   );
// };

// export default JourneyStatus;
