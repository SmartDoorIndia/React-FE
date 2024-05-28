import { compose } from "redux"
import { useState } from "react"
import { useEffect } from "react"
import { getStaticMobNumbers, setStaticMobNumbers } from "../../../common/redux/actions/index"
import { TextField } from "@mui/material"
import Buttons from "../../../shared/Buttons/Buttons"
import { showSuccessToast } from "../../../common/helpers/Utils"
const StaticMobNums = () => {

    const [staticMobile, setStaticMobile] = useState('')

    useEffect(async () => {
        await getMobileArray()
    }, [getStaticMobNumbers])

    const getMobileArray = async () => {
        const response = await getStaticMobNumbers();
        setStaticMobile(response?.data?.resourceData)
        console.log(response)
    }

    const setMobileNumbers = async () => {
        const response = await setStaticMobNumbers({ mobile: staticMobile })
        console.log(response)
        if (response?.data?.status === 200) {
            showSuccessToast("Mobile Numbers Updated Successfully")
        }
    }

    return (
        <>
            <div className="whiteBg">
                <TextField
                    id="outlined-multiline-flexible"
                    className="w-100 mt-3 col-8"
                    // label="Mobile Numbers"
                    multiline
                    defaultValue={staticMobile}
                    onInput={(e) => {
                        console.log(e.target.value)
                        setStaticMobile(e?.target?.value)
                    }}
                    maxRows={4}
                />
                <div>
                    <Buttons className="mt-3" name="Set Static Mobile Numbers" onClick={() => { setMobileNumbers() }} />
                </div>
            </div>
        </>
    )
}

export default compose(StaticMobNums)