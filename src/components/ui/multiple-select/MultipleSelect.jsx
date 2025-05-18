"use client"
import { useEffect, useState } from "react";
import Select from "react-select";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import Alert from "../alert/Alert";

export default function MultipleSelect({ items, value, onChange, editable }) {

    const [mounted, setMounted] = useState(false);

    // useEffect(() => {
    //     setMounted(true);
    // }, []);

    // if (!mounted) return null;
    // const multipleselect = items?.map(tag => ({
    //     value: tag._id,
    //     label: tag.name,
    // }));

    const handleChange = (selected) => {
        if (selected.length <= 3) {
            onChange(selected);
            // toast("Only Select 3 option ");

        }
        if (selected.length > 3) {
            alert("You can only select up to 3 options.");
            return;
        }
    };
    const colourStyles = {
        control: (styles) => ({
            ...styles,
            backgroundColor: "white",
            width: "100%",
            // maxWidth:"500px",
            // padding: "10px",
            boxShadow: "none", // removes the blue shadow on focus
            border: "1px solid", // removes the border
            // borderBottom: "1px solid",
            backgroundColor: "transparent", // light grey background for input
            padding: "2px 5px",
            "&:hover": {
                // border: "none",
            },
        }),

        option: () => ({
            backgroundColor: "#101828",
            textAlign: "center",
            color: "white",
            padding: "15px",
            width: "80%",
            margin: "5px auto",
            borderRadius: "50px",
        }),

        multiValue: (styles) => {
            return {
                // ...styles,
                backgroundColor: "#101828",
                borderRadius: "50px",
                padding: "5px",
                display: "flex",
                color: "white",
                margin: "5px",
                alignItems: "center",
            };
        },
        multiValueContainer: (styles) => {
            return {
                ...styles,
                backgroundColor: "red",
            };
        },

        multiValueRemove: (styles) => ({
            borderRadius: "50%",
            backgroundColor: "black",
            padding: "3px",
            display: "flex",
            alignItems: "center",
            margin: "5px",
            color: "white",
            justifyContent: "center",
        }),
        multiValueLabel: (styles) => ({
            ...styles,
            color: "white",
            padding: "2px",
        }),
        menu: (styles) => ({
            ...styles,
            border: "none",
            backgroundColor: "#fff",
            maxWidth: "100%",
            minWidth: "300px",
            width: "100vw",
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            borderRadius: "8px",
            zIndex: 9999,
        }),
        menuPortal: (styles) => ({
            ...styles,
            zIndex: 9999,
        }),
    };
    return (
        <>
            {/* <ToastContainer
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
            <Select
                isDisabled={!editable}
                closeMenuOnSelect={false}
                isMulti
                defaultValue={0}
                value={value}
                options={multipleselect}
                styles={colourStyles}
                width={"100%"}
                onChange={handleChange}
            /> */}
        </>
    )
}