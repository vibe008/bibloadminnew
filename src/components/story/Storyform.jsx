"use client"
// import { SimpleEditor } from '@/components/templates/simple/simple-editor'
import { useEffect, useState } from "react";
import ComponentCard from "../common/ComponentCard"
import MultipleSelect from "@/components/ui/multiple-select/MultipleSelect"
import Label from '../form/Label';
import Input from '../form/input/InputField';
import Switch from "@/components/form/switch/Switch";
import dynamic from "next/dynamic";
import CkEditorClient from "@/components/ui/ckeditor/Editor"
import DropzoneComponent from "../form/form-elements/DropZone";
import SelectInputs from "../form/form-elements/SelectInputs";
import { GetAllTags } from "@/Services/tags";
import { GetAllcatagory } from "@/Services/catagory";
import Button from "../ui/button/Button";
import { createPost } from "@/Services/post"
export default function Storyform() {


  const [content, setContent] = useState('');
  const [title, setTitle] = useState("")
  const [showmeidadropbox, setMediaDropBox] = useState(false)
  const [Tags, AllTags] = useState([])
  const [selectedTags, setSelectedTags] = useState([]);
  const [catagory, AllCatagory] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [voice, setVoicefile] = useState()
 const [ working , setIsworking] =useState(false)
  const handleSwitchChange = (checked) => {
    if (checked) {
      setMediaDropBox(true)
    }
    else {
      setMediaDropBox(false)
    }
    console.log("Switch is now:", checked ? "ON" : "OFF");
  };

  // useEffect(() => {
  //   try {
  //     const getAllTags = async () => {
  //       const res = await GetAllTags()
  //       console.log("res", res)

  //       if (res) {
  //         AllTags(res)
  //       }
  //     }
  //     getAllTags()
  //   } catch (error) {
  //     console.log("get catagory error", error)
  //   }
  // }, [])

  useEffect(() => {
    try {
      const getCatagory = async () => {
        const res = await GetAllcatagory()
        console.log("res", res)

        if (res) {
          AllCatagory(res)
        }
      }
      getCatagory()
    } catch (error) {
      console.log("get catagory error", error)
    }
  }, [])

  const HandleSubmit = async () => {
    try {
      setIsworking(true)
      if (!title || !content) {
        alert("Please fill in the title and story.");
        return;
      }
      const formdata = new FormData()
      formdata.append("title", title)
      formdata.append("story", content)

      if (voice) {
        formdata.append("voice", voice);
      }

      formdata.append("tags", JSON.stringify(selectedTags));
      formdata.append("categories", JSON.stringify(selectedCategories));
      const resp = await createPost(formdata)
      console.log("resp", resp)
      if (resp?.status === 201) {
        console.log("ho gya")
        clear()
         setIsworking(false)
      }
    } catch (error) {
      console.log("ni hua", error)
    }

  }
  
    const clear = () => {
      console.log("before", title)
      setTitle("")
      setVoicefile("")
      setContent("")
      setSelectedTags([])
      setSelectedCategories([])
      setMediaDropBox(false)
      console.log("after", title)
    }
  return (
    <div>
      <ComponentCard className="py-10">
        <div className="w-[60%]">
          <Label>Enter Your Title</Label>
          <Input value={title} onChange={(e) => {
            setTitle(e.target.value)
          }} type="text" />
        </div>
        <div className="ck-content prose">
          <Label>Enter Your story</Label>
          <CkEditorClient
            value={content}
            onChange={(data) => setContent(data)}
          />
        </div>

        {/* audio select content */}
        {/* <div className="flex items-center ">
          <Switch
            // label="Checked"
            defaultChecked={false}
            onChange={handleSwitchChange}
          />
          <Label className="mx-3">Add Your Story In Voice</Label>
        </div>
        {showmeidadropbox ? <DropzoneComponent setVoicefile={setVoicefile} /> : ""} */}

        
        <div >
          <Label>Select Tags For Your Story</Label>
          <MultipleSelect items={Tags} onChange={setSelectedTags} value={selectedTags} />
        </div>
        <div >
          <Label>Select Catagory For Your Story</Label>
          <MultipleSelect items={catagory} onChange={setSelectedCategories} value={selectedCategories} />
        </div>
      </ComponentCard>
      <div className="flex justify-center items-center my-10">
        <Button disabled={working} size="md" variant="primary" onClick={HandleSubmit}  >
          Create Your Story
        </Button>
      </div>
    </div>
  )
}