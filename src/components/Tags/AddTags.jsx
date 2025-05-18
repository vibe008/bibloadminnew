"use client"

import { useEffect, useState } from "react"
import ComponentCard from "../common/ComponentCard"
import Label from '../form/Label';
import Input from '../form/input/InputField';
import { createTag, delteTag, editTag, GetAllTags } from "@/Services/tags"
import Button from '../ui/button/Button';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import BasicTableOne from '../tables/BasicTableOne';
export default function AddTags() {
    const tabletitles = [
        "Tag Name",
        "Edit",
        "Delete"
    ]
    const [title, setTitle] = useState("")
    const [Tags, AllTags] = useState([])
    const [added, setadded] = useState(false)
    useEffect(() => {
        try {
            const getAllTags = async () => {
                const res = await GetAllTags()
                console.log("res", res)

                if (res) {
                    AllTags(res)
                    setadded(false);
                }
            }
            getAllTags()
        } catch (error) {
            console.log("get catagory error", error)
        }
    }, [added])
    const HandleTagAdd = async () => {
        try {
            if (!title.trim()) {
                toast("Please enter a tag name");
                return;
            }
            const res = await createTag(title)
            if (res?.status === 201) {
                clear()
                toast(res.data.message);
                setadded(!added)
            }
            else {
                toast("Catagory Not Created")
            }
        } catch (error) {
            console.log("error", error)
        }
    }
    const clear = () => {
        console.log("before", title)
        setTitle("")
        console.log("after", title)
    }
    return (
        <>
            <div className=' bg-amber-200 '>
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
            </div>
            <ComponentCard>

                <div className="">
                    <Label>Enter Your Tag Name</Label>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} type="text" />
                </div>
                <div className='flex justify-center items-center'>
                    <Button size="md" variant="primary" onClick={HandleTagAdd}>
                        Add
                    </Button>
                </div>
                <BasicTableOne tabletitles={tabletitles} catagory={Tags} setadded={setadded} added={added} deleteHandler={delteTag}
                    editHandler={editTag} />
            </ComponentCard>
        </>
    )
}