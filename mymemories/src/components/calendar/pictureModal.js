import React, { useEffect, useState, useRef } from 'react';
import Modal from 'react-modal';
import styles from './invite.module.css';
import cancelButton from '../../assets/cancelButton.png';
import UserImage from '../../assets/userImage.png';
import { db } from '../../firebase';
import { getDocs } from 'firebase/firestore';

Modal.setAppElement('#root'); // 모달의 루트 엘리먼트 지정

const PictureModal = ({ isOpen, closeModal }) => {
    const [friendEmail, setFriendEmail] = useState('');
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [members, setMembers] = useState([]);
    const memberCount = members.length - 1;
    const modalRef = useRef(null); 

      const handleClickOutside = (event) => {
        // 모달 바깥 영역을 클릭하고 모달 창이 열려 있는 경우에만 모달을 닫음
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          closeModal();
        }
      };
  
      useEffect(() => {
          // 컴포넌트가 마운트되었을 때 이벤트 리스너를 추가
          document.addEventListener('mousedown', handleClickOutside);
  
          // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거
          return () => {
            document.removeEventListener('mousedown', handleClickOutside);
          };
      }, []);
    
    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal}
        className={styles.modalContainer} 
        overlayClassName={styles.modalOverlay}>
            <div ref={modalRef}>
                <div className={styles.modalContent}>
                    <div className={styles.header}>
                        <p>현재 참가중인 멤버</p>
                        <button onClick={closeModal} className={styles.cancelButton}>        
                        <img src={cancelButton} alt="취소" /></button>
                    </div>
                    <div className={styles.inviteContainer}>
                        <img src={UserImage} alt="이미지" className={styles.basicuserImage} />
                        <input
                        type="email"
                        value={friendEmail}
                        onChange={(e) => setFriendEmail(e.target.value)}
                        className={styles.emailInput}
                        placeholder="초대할 친구 이메일 주소 입력"
                        />
                    </div>
                    <div className={styles.memberList}>
                    {members.map(member => (
                        <div key={member.id}>
                            <div className={styles.userImage}>
                            <img src={member.imageUrl} alt="Member" />
                            </div>
                            <p className={styles.memberName}>{member.name}</p>
                            <p className={styles.memberEmail}>{member.email}</p>
                        </div>
                    ))}
                    </div>
                    <div>
                        <p>
                            <span style={{ whiteSpace: 'nowrap' }}>{`님 외 ${memberCount}명이 참여 중인 메모리입니다`}</span>
                        </p>
                    </div>
                </div>
            </div>
        </Modal>
      );
}

export default PictureModal;
