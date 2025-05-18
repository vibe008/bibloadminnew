"use client"
import Label from '../form/Label';
import Input from '../form/input/InputField';
import ComponentCard from "../common/ComponentCard"
import { useEffect, useState } from 'react';
import Button from '../ui/button/Button';
import BasicTableOne from '../tables/BasicTableOne';
import { createCatagory, deltecatagory, editCatagory, GetAllcatagory } from "../../Services/catagory"
import { Bounce, ToastContainer, toast } from 'react-toastify';
export default function AddCatagory() {
    const tabletitles = [
        "Catagory Name",
        "Edit",
        "Delete"
    ]
    const [title, setTitle] = useState("")
    const [catagory, AllCatagory] = useState([])
    const [added, setadded] = useState(false)
    useEffect(() => {
        try {
            const getCatagory = async () => {
                const res = await GetAllcatagory()
                console.log("res", res)

                if (res) {
                    AllCatagory(res)
                    setadded(false);
                }
            }
            getCatagory()
        } catch (error) {
            console.log("get catagory error", error)
        }
    }, [added])

    
    const HandleCatagoryAdd = async (e) => {
        try {
            if (!title.trim()) {
                toast("Please enter a category name");
                return;
            }
            const res = await createCatagory(title)

            if (res?.status === 201) {
                clear()
                console.log("res?.status", "chala")
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
        <div className='relative' >
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
                    <Label>Enter Your Catagory Name</Label>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} type="text" />
                </div>
                <div className='flex justify-center items-center'>
                    <Button size="md" variant="primary" onClick={HandleCatagoryAdd}>
                        Add
                    </Button>
                </div>
                <BasicTableOne tabletitles={tabletitles} catagory={catagory} setadded={setadded} added={added} deleteHandler={deltecatagory}
                    editHandler={editCatagory} />
            </ComponentCard>
        </div>
    )
}