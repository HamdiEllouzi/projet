import "./profile.css"
export const Profile = ({user}) => {
    return (
        <div className="profile-main">
            <div className="profile-header">
                <div className="user-detail">
                    <div className="user-image">
                        <img src="http://nicesnippets.com/demo/up-profile.jpg" />
                    </div>
                    <div className="user-data">
                        <h2>{user.displayName}</h2>
                        <span className="post-label">Admin</span>
                        <p>Founder and CEO at <strong>NewSpot</strong><br />
                          Boston, MA, United States
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
                                    <label>10 Year Experience</label></p>
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
                                <li>8 March 1997</li>
                                <li>Jamanagar</li>
                                <li>California</li>
                                <li>9900990087</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}