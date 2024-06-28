import React, {useState, useCallback, useEffect} from 'react';
import { getRealtorRatingList } from '../../../../common/redux/actions';
import StarRating from '../../../../shared/StarRating/StarRating';
import Image from '../../../../shared/Image/Image';
import Text from '../../../../shared/Text/Text';
import userImageAvatar from '../../../../assets/svg/avatar_sml.svg';
import Loader from '../../../../common/helpers/Loader';
import { useParams } from 'react-router-dom';

const RealtorRatings = props => {

    const [realtorData, setRealtorData] = useState([]);
    const [loading , setLoading] = useState(false);
    const user = useParams();
    console.log("rating page:advisorId", user)
   
    const _getRealtorRatingList = useCallback(() => {
        getRealtorRatingList({ userId: Number(user.userId) , records:'', pageNumber:''})
          .then((response) => {
            setLoading(false);
            if (response.data) {
                if (response.data.resourceData) {
                setRealtorData(response.data.resourceData);
              }
            }
          })
          .catch((error) => {
            setLoading(false);
          })
      }, [getRealtorRatingList])

    useEffect(() => {
        _getRealtorRatingList();
      }, [_getRealtorRatingList])

    return(
        <>
            {loading ? <Loader /> :
            <>
             <div className="ratingSection d-flex justify-content-between align-items-center mb-2">
                <div>
                  <Text size="regular" fontWeight="mediumbold" color="black" text="Rating and Reviews" />
                </div>
                {/* <div className="ratingIcon">

                  <div className="d-flex align-items-start mt-2">
                    <div>
                      <StarRating rating={realtorData?.averageRating} />
                     
                    </div>
                    <Text size="regular" fontWeight="mediumbold" color="black" text={`${realtorData?.averageRating} / 5`} className="ml-3" />
                  </div>
                  <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text={`( ${realtorData?.totalNumberOFRatings} customers )`} className="ml-3" />
                </div> */}
              </div>

              <div className="commentSection">
                {realtorData && realtorData.length ?
                  realtorData.map((data, indx) =>
                    <>
                      <div key={indx}>
                        <div className="d-flex">
                          <div className='userImage mr-2'>
                            <Image
                              name="consumerIcon"
                              src={data?.profileImageUrl ? data?.profileImageUrl : userImageAvatar}
                              className="img-fluid"
                            />
                          </div>
                          <div>
                            <Text size="body" fontWeight="mediumbold" color="black" text={data?.name || '-'} className="mt-1" />
                            <StarRating className="rating-sm" rating={data?.rating} />
                          </div>
                        </div>
                        <Text size="Small" fontWeight="regularbold" color="secondryColor" text={data?.review || ''} className="mt-1" />
                      </div>
                      <div className="separator mt-2 mb-2"></div>
                    </>
                  )
                  : ''}
              </div>
              </>
            }
        </>
    );
}

export default RealtorRatings;