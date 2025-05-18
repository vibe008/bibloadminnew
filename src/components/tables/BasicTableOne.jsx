import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Button from '../ui/button/Button';
import CkEditorClient from "@/components/ui/ckeditor/Editor"
import MultipleSelect from "@/components/ui/multiple-select/MultipleSelect"
import Label from '../form/Label';
import Input from '../form/input/InputField';
import { CheckCircleIcon, Cross1, Delete, Edit, Verified } from "@/icons";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import { deltecatagory, editCatagory, GetAllcatagory } from "@/Services/catagory";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { GetAllTags } from "@/Services/tags";
import { useRouter } from "next/navigation";

export default function BasicTableOne({ tabletitles, catagory, setadded, added, deleteHandler,
  editHandler }) {
  const { isOpen, openModal, closeModal } = useModal();
  const [title, setTitle] = useState("")
  const [title_Id, setTitle_Id] = useState("")
  const [storyItem, setStoryItem] = useState(false)
  const [storyContent, setStoryContent] = useState([])
  const [Tags, AllTags] = useState([])
  const [catagoryitem, AllCatagoryitem] = useState([])
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState();
  const router = useRouter()
  useEffect(() => {
    if (storyContent?.categories && catagoryitem.length > 0) {
      const selectedIds = storyContent.categories.map(cat => cat._id); // <- Fix here
         
      const defaults = catagoryitem
        .filter(cat => selectedIds.includes(cat._id))
        .map(cat => ({
          value: cat._id,
          label: cat.name,
        }));

      setSelectedCategories(defaults);
    }
  }, [storyContent, catagoryitem]);



  useEffect(() => {
    try {
      const getAllTags = async () => {
        const res = await GetAllTags()
        console.log("res", res)

        if (res) {
          AllTags(res)
        }
      }
      getAllTags()
    } catch (error) {
      console.log("get catagory error", error)
    }
  }, [])

  useEffect(() => {
    try {
      const getCatagory = async () => {
        const res = await GetAllcatagory()
        console.log("res", res)

        if (res) {
          AllCatagoryitem(res)
        }
      }
      getCatagory()
    } catch (error) {
      console.log("get catagory error", error)
    }
  }, [])

  const handleDelete = async (id) => {
    console.log("id", id)
    try {
      const res = await deleteHandler(id)
      if (res?.status === 200) {
        toast("Deleted Sucessfully");
        setTimeout(() => {
          window.location.reload(); // refresh the page after a short delay
        }, 1500);
      }
    } catch (error) {
      console.error("error in  deleted", error);
    }
  }

  const HandleEdit = async (item) => {
    setTitle(item.name)
    setTitle_Id(item._id)
    openModal()
  }
  const HandleEditstory = async (item) => {
    router.push(`/edit-read-story/${item.slug}/${item._id}`);
    // console.log("item", item)
    // openModal()
    // setStoryItem(true)
    // setStoryContent(item)
  }

  const EditCatagorysubmit = async () => {
    try {
      const res = await editHandler(title_Id, title);
      console.log("res", res);
      if (res?.status === 200) {
        closeModal()
        setTitle(""); // clear input
        // setadded(true)
        // Add Refresh Page Logic Here
        toast("updated Sucessfully");
        setTimeout(() => {
          window.location.reload(); // refresh the page after a short delay
        }, 1500);
      }
    } catch (error) {
      console.error("Error in Edit", error);
    }
  };


  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {tabletitles.map((item, key) => {
                  return (
                    <TableCell key={key}
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      {item}
                    </TableCell>
                  )
                })}

              </TableRow>
            </TableHeader>
            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {[...catagory].reverse().map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {item.name ? item.name : item.title}
                      </span>
                    </div>
                  </TableCell>
                  {item.hasOwnProperty("isvarified") &&
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <div className="cursor-pointer" onClick={() => {
                        HandleEditstory(item)
                      }}>
                        <Edit />
                      </div>
                    </TableCell>
                  }
                  {!item.hasOwnProperty("isvarified") &&
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <div className="cursor-pointer" onClick={() => {
                        HandleEdit(item)
                      }}>
                        <Edit />
                      </div>
                    </TableCell>
                  }
                  {/* <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="cursor-pointer" onClick={() => {
                      HandleEdit(item)
                    }}>
                      <Edit />
                    </div>
                  </TableCell> */}

                  {item.hasOwnProperty("isvarified") && (
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <div className="cursor-pointer">
                        {item.isvarified === "true" ? <Verified /> : <Cross1 />}
                      </div>
                    </TableCell>
                  )}


                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="cursor-pointer" onClick={() => {
                      handleDelete(item._id)
                    }}>
                      <Delete />
                    </div>

                  </TableCell>
                </TableRow>
              ))
              }
            </TableBody>
            {/* <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {tableData.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <Image
                          width={40}
                          height={40}
                          src={order.user.image}
                          alt={order.user.name}
                        />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {order.user.name}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {order.user.role}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {order.projectName}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex -space-x-2">
                      {order.team.images.map((teamImage, index) => (
                        <div
                          key={index}
                          className="w-6 h-6 overflow-hidden border-2 border-white rounded-full dark:border-gray-900"
                        >
                          <Image
                            width={24}
                            height={24}
                            src={teamImage}
                            alt={`Team member ${index + 1}`}
                            className="w-full"
                          />
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        order.status === "Active"
                          ? "success"
                          : order.status === "Pending"
                            ? "warning"
                            : "error"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {order.budget}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody> */}
          </Table>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        // className=""
        className={`${!storyItem ? "max-w-[700px] p-6 lg:p-10" : "w-[90%] p-6 lg:p-10 h-[90%] relative"}`}
      >
        {storyItem ?
          <div className=" ">
            <div>
              <Label>Story Title</Label>
              <Input value={storyContent.title} onChange={(e) => setTitle(e.target.value)} type="text" />
            </div>

            <div className="h-[300px] overflow-y-scroll my-5">
              <Label>Story</Label>
              <CkEditorClient
                //  className="h-[50px]"
                value={storyContent.story}
              // onChange={(data) => setContent(data)}
              />
            </div>
            <div>
              <Label>Catagory</Label>
              <MultipleSelect items={catagoryitem} onChange={setSelectedCategories} value={selectedCategories} />
            </div>
            <div className="absolute bottom-2 left-[50%] translate-y-1/2">
              <Button size="md" variant="primary">
                Edit Content
              </Button>
            </div>
          </div> :

          <div>

            <div className="">
              <Label>Enter Your Catagory</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} type="text" />
            </div>
            <Button size="md" variant="primary" onClick={EditCatagorysubmit}>
              Add
            </Button>
          </div>

        }


      </Modal>
    </div>
  );
}
