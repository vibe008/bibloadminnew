"use client"
import UserMetaCard from "@/components/user-profile/UserMetaCard";
import React, { useEffect, useState } from "react";
import BasicTableOne from '@/components/tables/BasicTableOne';
import { GetUserStorys } from "@/Services/post";
import { fetchLoggedInUser } from "@/Services/authService";
// export const metadata: Metadata = {
//   title: "Next.js Profile | TailAdmin - Next.js Dashboard Template",
//   description:
//     "This is Next.js Profile page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
// };

const tabletitles = [
  "Story Title",
  "Read/Edit",
  "Verified",
  "Delete"
]
import { redirect } from 'next/navigation';
export default function Profile() {
  const [posts, setPosts] = useState([])
  const [added, setadded] = useState(false)
   const [user, setUser] = useState(null);

   useEffect(() => {
     const checkUser = async () => {
       const user = await fetchLoggedInUser();
       if (user) {
         // console.log("user", user)
         setUser(user);
       }
       else {
        redirect('/signin');
       }
     };
     checkUser();
   }, [user]);

useEffect(() => {
  if (!user?._id) return; // 🛑 Exit early if undefined

  const getCatagory = async () => {
    try {
      const res = await GetUserStorys(user._id);
      console.log("res", res);
      if (res) {
        setPosts(res);
        setadded(false);
      }
    } catch (error) {
      console.log("get catagory error", error);
    }
  };

  getCatagory();
}, [added, user?._id]); // Also track user._id in the deps

  const delteStory = async () => {

  }
  const editStory = async () => {

  }

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
          <UserMetaCard user={user}/>
          <BasicTableOne tabletitles={tabletitles} catagory={posts} setadded={setadded} added={added} deleteHandler={delteStory}
            editHandler={editStory} />
          {/* <UserInfoCard /> 
          <UserAddressCard /> */}
        </div>
      </div>
    </div>
  );
}
