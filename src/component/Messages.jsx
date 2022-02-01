import { useEffect, useState } from "react";

export default function Messages({ user }) {
  return (
    <div className={user ? "chat-msg self" : "chat-msg user"}>
      <span className='msg-avatar'>
        <img
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWMe4YWSC5sE5_ChXM25T1QgtZqjviuOWKTa5inNg-Shf1GceSNzdNtq7QBGI1NUAnuJw&usqp=CAU'
          alt='profile img'
        />
      </span>
      <div className='cm-msg-text'>
        hadh auhduahd ahduh uahduah dahu hduah dahudhauh dajdhuahduah dahu hdauh udhaudhaudh ahudhau d hau
      </div>
    </div>
  );
}
