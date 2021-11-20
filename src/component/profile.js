import "./profile.css"
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import uuid from 'react-uuid'
import { ref,uploadBytes,getDownloadURL  } from "@firebase/storage";
import { storage } from "../firebase-config";
import { storeUpdate,upProfile } from "../service/service";
import { useSelector } from "react-redux";

const Input = styled('input')({
    display: 'none',
});

export const Profile = ({user}) => {
const { profile } = useSelector((state) => state.profile)
const uploadImg = (e) =>{
const imgId = uuid()
const storageRef = ref(storage, 'profile/'+ imgId)
const upload = uploadBytes(storageRef, e.target.files[0]).then((snap)=>{
    getDownloadURL(storageRef).then(e=>{
        upProfile(user,e).then((e)=>{storeUpdate()})
    })
}).catch((e)=>console.log(e))

}

    return (
        <div className="profile-main">
            <div className="profile-header">
                <div className="user-detail">
                    <div className="user-image">
                        <img src={profile.photoURL} alt='user'/>
                    </div>
                    <label htmlFor="icon-button-file" style={{marginTop: 'auto'}}>
                            <Input accept="image/*" id="icon-button-file" type="file" onChange={(e)=>uploadImg(e)}/>
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera />
                            </IconButton>
                        </label>
                    <div className="user-data">
                        <h2>{profile.displayName}</h2>
                        <span className="post-label">Admin</span>
                        <p> Lorem ipsum dolor sit amet <strong>adipisicing</strong><br />
                            aliqua. Ut enim
                        </p>
                    </div>
                </div>
                <div className="tab-panel-main">
                    <div id="Basic-detail" className="tab-content current">
                        <div className="skill-box">
                            <ul>
                                <li><strong>My Skills:</strong></li>
                                <li>INBOUND MARKETING</li>
                                <li>ENTERPRENEURSHIP</li>
                                <li>GROWTH MARKETING</li>
                            </ul>
                        </div>
                        <div className="bio-box">
                            <div className="heading">
                                <p>Professional Bio
                                    <label>2 Year Experience</label></p>
                            </div>
                            <div className="desc">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.
                            </div>
                        </div>
                        <div className="detail-box">
                            <p>Detail</p>
                            <ul className="ul-first">
                                <li>Birth date</li>
                                <li>City</li>
                                <li>Country</li>
                                <li>Contact No</li>
                            </ul>
                            <ul className="ul-second">
                                <li>25 March 1990</li>
                                <li>tunisia</li>
                                <li>sousse</li>
                                <li>9900990087</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}