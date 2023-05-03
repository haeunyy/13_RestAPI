import { useDispatch, useSelector } from 'react-redux';
import RegisterCSS from './Register.module.css';
import { useEffect } from 'react';
import { callGetMemberAPI } from '../../apis/MemberAPICalls';

function Profile() {

    const dispatch = useDispatch();
    const { member } = useSelector(state => state.memberReducer);

    useEffect(
        () => {
            dispatch(callGetMemberAPI());
        },
        []
    )

    return (
        <>
            <div 
                className={ RegisterCSS.backgroundDiv }
                style={ { backgroundColor : 'white'} }
            >
                { member && 
                    <div className={ RegisterCSS.registerDiv }>
                        <h1>내 정보</h1>
                        <input
                            type="text"
                            readOnly={true}
                            value={ member.data.memberId }
                        />
                        <input
                            type="text"
                            readOnly={true}
                            value={ member.data.memberName }
                        />
                        <input
                            type="text"
                            readOnly={true}
                            value={ member.data.memberEmail }
                        />
                    </div>
                }
            </div>
        </>
    );
}

export default Profile;