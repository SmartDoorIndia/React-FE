import { compose } from "redux"
import { useState } from "react"
import { useEffect } from "react"
import { getStaticMobNumbers, setStaticMobNumbers } from "../../../common/redux/actions/index"
import { TextField } from "@mui/material"
import Buttons from "../../../shared/Buttons/Buttons"
import { showErrorToast, showSuccessToast } from "../../../common/helpers/Utils"
import Text from "../../../shared/Text/Text"
import Loader from "../../../common/helpers/Loader"
const StaticMobNums = () => {

    const [staticMobile, setStaticMobile] = useState('')
    const [staticOTP, setStaticOTP] = useState(null)
    const [loading, setLoading] = useState(false);

    useEffect(async () => {
        await getMobileArray()
    }, [getStaticMobNumbers])

    const getMobileArray = async () => {
        const response = await getStaticMobNumbers();
        if (response.status === 200) {
            setStaticMobile(response?.data?.resourceData?.mobile)
            setStaticOTP(response?.data?.resourceData?.otp)
        }
        console.log(response)
    }

    const setMobileNumbers = async () => {
        setLoading(true)
        const response = await setStaticMobNumbers({ mobile: staticMobile, otp: staticOTP })
        console.log(response)
        setLoading(false);
        if (response?.data?.status === 200) {
            showSuccessToast("Mobile Numbers Updated Successfully")
        } else {
            showErrorToast("Please try again...");
        }
    }

    return (
        <>
            <div className="whiteBg">
                <div className="row col-12">
                    <Text
                        className='col-3'
                        text={'Static Mobile Numbers'}
                        fontWeight={'700'}
                        style={{ fontSize: '16px', marginTop: '2%' }} />
                    <TextField
                        id="outlined-multiline-flexible"
                        className="w-100 mt-3 col-8"
                        multiline
                        value={staticMobile}
                        onChange={(e) => {
                            console.log(e.target.value)
                            setStaticMobile(e?.target?.value)
                        }}
                        maxRows={4}
                    />
                </div>
                <div className="row col-12">
                    <Text
                        className='col-3'
                        text={'Static OTP'}
                        fontWeight={'700'}
                        style={{ fontSize: '16px', marginTop: '2%' }} />
                    <TextField
                        id="outlined-multiline-flexible"
                        type="number"
                        className="w-100 mt-3 col-2"
                        inputProps={{ min: 0, max: 9999, maxLength: 4 }}
                        value={staticOTP}
                        onChange={(e) => {
                            console.log(e.target.value)
                            const inputValue = e.target.value;
                            const result = inputValue.replace(/\D/g, '');
                            const otp = (result.slice(0, 4));
                            if (otp.length === 4) {
                                setStaticOTP(otp)
                            } else {
                                setStaticOTP(null)
                            }
                        }}
                        maxRows={1}
                    />
                </div>
                <div>
                    {loading ?
                        <Loader></Loader>
                        :
                        <Buttons className="mt-3" name="Set Static Mobile & OTP" onClick={() => { setMobileNumbers() }} />
                    }
                </div>
            </div>
        </>
    )
}

export default compose(StaticMobNums)