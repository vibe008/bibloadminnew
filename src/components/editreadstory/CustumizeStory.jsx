"use client"
import { appuri } from "../../ApiUrl/appurl"
import { GetStorysbySlug } from "@/Services/post"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation";
import Button from "../ui/button/Button";
import ComponentCard from "../common/ComponentCard";
import Label from '../form/Label';
import MultipleSelect from "@/components/ui/multiple-select/MultipleSelect"
import Input from '../form/input/InputField';
import CkEditorClient from "@/components/ui/ckeditor/Editor"
import { GetAllcatagory } from "@/Services/catagory";
import { GetAllTags } from "@/Services/tags";
import DropzoneComponent from "../form/form-elements/DropZone";
import { Delete } from "@/icons";
export default function CustumizeStory() {
    const [StoryData, SetStoryData] = useState({})

    const [catagoryitem, AllCatagoryitem] = useState([])
    const [selectedCategories, setSelectedCategories] = useState();

    const [Tags, AllTags] = useState([])
    const [selectedTags, setSelectedTags] = useState([]);

    const [content, setContent] = useState('');
    const [title, setTitle] = useState("")

    const [audioFile, setAudioFile] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);

    const [editable, setEditable] = useState(false)

    // const [voice, setVoicefile] = useState()

    const [deleteAudio, setDeleteAudio] = useState(false)
    const params = useParams()

    const slug = params.slug;



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
        if (StoryData.categories && catagoryitem.length > 0) {
            const defaultSelected = catagoryitem
                .filter(cat => StoryData.categories.includes(cat._id))
                .map(cat => ({
                    value: cat._id,
                    label: cat.name,
                }));

            setSelectedCategories(defaultSelected);
        }
    }, [StoryData.categories, catagoryitem]);


    useEffect(() => {
        if (StoryData.tags && Tags.length > 0) {
            const defaultSelected = Tags
                .filter(cat => StoryData.tags.includes(cat._id))
                .map(cat => ({
                    value: cat._id,
                    label: cat.name,
                }));

            setSelectedTags(defaultSelected);
        }
    }, [StoryData.tags, Tags]);


    useEffect(() => {
        try {
            const getStory = async () => {
                const res = await GetStorysbySlug(slug)
                if (res.status === 200) {
                    console.log("res story", res)
                    SetStoryData(res.data)
                    setTitle(res.data.title || "");
                    setContent(res.data.story || "");
                    setAudioUrl(res.data.voiceurl || "");
                }
            }
            getStory()
        } catch (error) {
            console.log("error", error)
        }
    }, [])

    const HandleDeleteAudio = async () => {
        setDeleteAudio(true)
    }

    return (
        <>
            <ComponentCard title="Edit/read Story" className="py-10" editbtn={true} >
                {!editable ? <Button size="md" variant="primary" onClick={() => {
                    setEditable(true)
                }} >
                    Edit
                </Button> : <Button size="md" variant="primary" onClick={() => {
                    setEditable(false)
                }} >
                    Cancle
                </Button>}

                <div className="w-[60%]">
                    <Label>Enter Your Title</Label>
                    <Input disabled={!editable} value={title} onChange={(e) => {
                        setTitle(e.target.value)
                    }} type="text" />
                </div>
                <div >
                    <Label>Story</Label>
                    <CkEditorClient
                        editable={editable}
                        value={content}
                        onChange={(data) => setContent(data)}
                    />
                </div>

                {/* audio content editable */}
                {/* {editable && <DropzoneComponent setVoicefile={setVoicefile} />}

                {audioUrl && !deleteAudio && (
                    <div>
                        <Label>Voice</Label>
                        <div className="flex items-center w-full justify-between">
                            <audio
                                controls
                                src={`${appuri}${audioUrl}`}
                                className="w-[80%] my-3.5"
                            >
                                Your browser does not support the audio element.
                            </audio>
                            <div className="flex items-center">
                                <div className="cursor-pointer mx-3">
                                    <Button size="md" variant="primary">
                                        Replace
                                    </Button>
                                </div>
                                <div className="cursor-pointer" onClick={HandleDeleteAudio}>
                                    <Delete />
                                </div>
                            </div>
                        </div>
                    </div>
                )} */}


                <div>
                    <Label>Catagory</Label>
                    <MultipleSelect items={catagoryitem} onChange={setSelectedCategories} value={selectedCategories} editable={editable} />
                </div>
                <div>
                    <Label>Tags</Label>
                    <MultipleSelect items={Tags} onChange={setSelectedTags} value={selectedTags} editable={editable} />
                </div>
            </ComponentCard>
        </>
    )
}